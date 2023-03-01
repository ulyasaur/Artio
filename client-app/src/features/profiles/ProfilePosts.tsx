import { observer } from "mobx-react-lite";
import { Masonry } from "@mui/lab";
import { Card, CardContent, CardHeader, IconButton, Tooltip } from "@mui/material";
import { Post } from "../../app/models/post";
import placeholder from "../../assets/placeholder.png";
import AddIcon from '@mui/icons-material/Add';
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../app/common/themes/theme";

interface Props {
    posts: Post[];
}

export default observer(function ProfilePosts({ posts }: Props) {

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
                    action={
                        <Tooltip title="Add post" >
                            <IconButton>
                                <AddIcon fontSize="large" sx={{ color: "white" }} />
                            </IconButton>                            
                        </Tooltip>
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
                            <div key={post.postId}>
                                <img
                                    src={`${post.imageUrl || placeholder}?w=162&auto=format`}
                                    srcSet={`${post.imageUrl || placeholder}?w=162&auto=format&dpr=2 2x`}
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