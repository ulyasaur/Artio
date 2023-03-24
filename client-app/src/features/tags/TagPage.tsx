import { Avatar, Card, CardContent, CardHeader, CardMedia, Divider, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { router } from "../../app/router/router";
import { useStore } from "../../app/stores/store";
import TagIcon from '@mui/icons-material/Tag';
import TagFollowButton from "./TagFollowButton";
import { Masonry } from "@mui/lab";
import placeholder from "../../assets/placeholder.png";

export default observer(function TagPage() {
    const { tagId } = (useParams<string>());
    const { postStore, tagStore } = useStore();
    const { loadTag, tag, loading } = tagStore;
    const { loadingPosts, loadPostsByTag, posts } = postStore;

    useEffect(() => {
        loadTag(tagId!);
        if (tag) {
            loadPostsByTag(tagId!);
        }
    }, [tagId, tag?.tagId, loadPostsByTag, loadTag]);

    if (loadingPosts || loading) {
        return <LoadingComponent content="Loading content..." />
    }

    return (
        <>
            {tag && posts &&
                <Card
                    sx={{
                        minHeight: "89vh"
                    }}
                >
                    <CardMedia
                    sx={{ height: 250 }}
                    image={posts[0].image.url || placeholder}
                />
                    <CardHeader
                        avatar={
                            <Avatar>
                                <TagIcon />
                            </Avatar>
                        }
                        action={
                            <TagFollowButton tag={tag} />
                        }
                        title={tag.tagName}
                        titleTypographyProps={{
                            fontSize: "15pt"
                        }}
                    />
                    
                    <Divider variant="middle">
                        <Typography
                            sx={{
                                color: "hotpink"
                            }}
                        >
                            POSTS
                        </Typography>
                    </Divider>
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
            }
        </>
    );
})