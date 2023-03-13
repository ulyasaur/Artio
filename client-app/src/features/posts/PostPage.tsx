import { ThemeProvider } from "@emotion/react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { theme } from "../../app/common/themes/theme";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import CommentSection from "./CommentSection";
import PostInfo from "./PostInfo";

export default observer(function PostPage() {
    const { postId } = useParams<string>();
    const { postStore} = useStore();
    const { loadingPosts, loadPost, post } = postStore;

    useEffect(() => {
        loadPost(postId!);
    }, [loadPost, postId]);
    
    if (loadingPosts || !post) {
        return <LoadingComponent content="Loading post..." />
    }
    return (
        <ThemeProvider theme={theme}>
            <PostInfo post={post!} elevation={2}/>
            <CommentSection post={post!}/>
        </ThemeProvider>
    );
})
