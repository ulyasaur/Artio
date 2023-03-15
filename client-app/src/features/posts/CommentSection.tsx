import { Avatar, Card, CardContent, CardHeader, Link, ThemeProvider, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { theme } from "../../app/common/themes/theme";
import { Post } from "../../app/models/post";
import userPlaceHolder from "../../assets/user.png";
import formatDate from "../../app/formatting/formatDate";
import { Link as RouterLink } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import FormTextArea from "../../app/common/form/FormTextArea";

interface Props {
    post: Post;
}

export default observer(function CommentSection({ post }: Props) {
    const { commentStore } = useStore();

    useEffect(() => {
        if (post.postId) {
            commentStore.createHubConnection(post.postId);
        }
        return () => {
            commentStore.clearComments();
        }
    }, [commentStore, post.postId]);

    return (
        <ThemeProvider theme={theme}>
            <Card>
                <CardHeader
                    sx={{
                        textAlign: "center",
                        backgroundColor: "hotpink",
                        color: "white"
                    }}
                    title="Comments"
                    titleTypographyProps={{
                        display: "inline-block",
                        width: "min-content",
                        fontSize: "13pt",
                        fontWeight: "bold"
                    }}
                />
                <CardContent>
                    <Formik
                        onSubmit={(values, { resetForm }) =>
                            commentStore.addComment(values).then(() => resetForm())
                        }
                        initialValues={{ body: '' }}
                        validationSchema={Yup.object({
                            body: Yup.string().required()
                        })}
                    >
                        {({ isSubmitting, isValid, handleSubmit }) => (
                            <form onSubmit={() => isValid && handleSubmit()}>
                                <FormTextArea name="body" placeholder='Enter your comment' />
                                <LoadingButton
                                    loading={isSubmitting}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: "5px", mb: 2 }}
                                >
                                    Add comment
                                </LoadingButton>
                            </form>
                        )}
                    </Formik>
                </CardContent>
                <CardContent sx={{ paddingTop: 0 }}>
                    {commentStore.comments.map(comment => (
                        <Card key={comment.commentId} sx={{ marginBottom: "2vh" }}>
                            <CardHeader
                                avatar={
                                    <Link component={RouterLink} to={`/profile/${comment.user.username}`}>
                                        <Avatar
                                            alt="display name"
                                            src={comment.user.image ? comment.user.image?.url : userPlaceHolder}
                                            variant="circular"
                                        />
                                    </Link>
                                }
                                title={
                                    <Link
                                        component={RouterLink}
                                        to={`/profile/${comment.user.username}`}
                                        style={{
                                            color: "black",
                                            textDecoration: "none"
                                        }}
                                    >
                                        {comment.user.displayName}
                                    </Link>
                                }
                                subheader={formatDate(comment.createdAt)}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {comment.body}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </ThemeProvider >
    );
})