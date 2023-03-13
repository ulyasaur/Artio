import { ThemeProvider } from "@emotion/react";
import { TabContext, TabPanel } from "@mui/lab";
import { Box, Button, Divider, Link, Paper, Tab, Tabs } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { theme } from "../../app/common/themes/theme";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import PostInfo from "./PostInfo";
import { Link as RouterLink } from "react-router-dom";
import PeopleIcon from '@mui/icons-material/People';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

export default observer(function PostPage() {
    const { postStore } = useStore();
    const { loadingPosts, loadPosts, posts } = postStore;

    const [value, setValue] = useState("users");

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    useEffect(() => {
        loadPosts(value);
    }, [value, loadPosts]);
    
    return (
        <ThemeProvider theme={theme}>
            <TabContext value={value}>
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <Tabs value={value} onChange={handleChange} centered>
                        <Tab icon={<PeopleIcon />} iconPosition="start" label="Followed users" value="users" />
                        <Tab icon={<CollectionsBookmarkIcon />} iconPosition="start" label="Followed tags" value="tags" />
                    </Tabs>
                </Box>
                <TabPanel value='users'>
                    {(loadingPosts || !posts)
                        ? <LoadingComponent content="Loading posts..." />
                        : posts.map(post => (
                            <Paper sx={{ marginBottom: "5px" }}>
                                <PostInfo key={post.postId} post={post} />
                                <Divider variant="middle" />
                                <Link
                                    component={RouterLink}
                                    to={`/post/${post.postId}`}
                                    sx={{
                                        textDecoration: "none"
                                    }}
                                >
                                    <Button
                                        variant="text"
                                        sx={{
                                            color: 'grey',
                                            borderColor: "grey",
                                            margin: "6px",
                                            textTransform: "none"
                                        }}
                                    >
                                        View comments ({post.commentCount})
                                    </Button>
                                </Link>
                            </Paper>

                        ))}
                </TabPanel>
                <TabPanel value='tags'>
                    {(loadingPosts || !posts)
                        ? <LoadingComponent content="Loading posts..." />
                        : posts.map(post => (
                        <Paper sx={{ marginBottom: "5px" }}>
                            <PostInfo key={post.postId} post={post} />
                            <Divider variant="middle" />
                            <Link
                                component={RouterLink}
                                to={`/post/${post.postId}`}
                                sx={{
                                    textDecoration: "none"
                                }}
                            >
                                <Button
                                    variant="text"
                                    sx={{
                                        color: 'grey',
                                        borderColor: "grey",
                                        margin: "6px",
                                        textTransform: "none"
                                    }}
                                >
                                    View comments ({post.commentCount})
                                </Button>
                            </Link>
                        </Paper>
                    ))}
                </TabPanel>
            </TabContext>
        </ThemeProvider>
    );
})