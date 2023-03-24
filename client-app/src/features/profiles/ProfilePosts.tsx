import { observer } from "mobx-react-lite";
import { Masonry } from "@mui/lab";
import { Card, CardContent, CardHeader, IconButton, Tooltip } from "@mui/material";
import { Post } from "../../app/models/post";
import placeholder from "../../assets/placeholder.png";
import AddIcon from '@mui/icons-material/Add';
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../app/common/themes/theme";
import { router } from "../../app/router/router";
import { useStore } from "../../app/stores/store";

interface Props {
    posts: Post[];
    profileId: string;
}

export default observer(function ProfilePosts({ posts, profileId }: Props) {
    const { userStore } = useStore();
    const { currentUser } = userStore;
    
    return (
        <ThemeProvider theme={theme}>
            <Card sx={{
                margin: "auto",
                width: "75vw"
            }}>
                <CardHeader
                    sx={{
                        textAlign: "center",
                        backgroundColor: "hotpink",
                        color: "white"
                    }}
                    action={(currentUser?.id === profileId)
                        ? <Tooltip title="Add post" >
                            <IconButton onClick={() => router.navigate("post/create")}>
                                <AddIcon fontSize="large" sx={{ color: "white" }} />
                            </IconButton>
                        </Tooltip> : null
                    }
                    title="POSTS"
                    titleTypographyProps={{
                        display: "inline-block",
                        width: "min-content",
                        fontSize: "13pt",
                        fontWeight: "bold"
                    }}
                />
                <CardContent>
                    <Masonry columns={3} spacing={2}
                        sx={{
                            width: "auto",
                            margin: "auto"
                        }}
                    >
                        {posts.map((post) => (
                            <div key={post.postId} onClick={() => router.navigate(`/post/${post.postId}`)}>
                                <img
                                    src={`${post.image.url ? post.image.url : placeholder}?w=162&auto=format`}
                                    srcSet={`${post.image.url ? post.image.url : placeholder}?w=162&auto=format&dpr=2 2x`}
                                    alt="post"
                                    loading="lazy"
                                    style={{
                                        borderRadius: 4,
                                        display: 'block',
                                        width: '100%',
                                    }}
                                />
                            </div>
                        ))}
                    </Masonry>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
})