import { Avatar, Card, CardContent, CardHeader, CircularProgress, Link, TextareaAutosize, ThemeProvider, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { theme } from "../../app/common/themes/theme";
import { Post } from "../../app/models/post";
import userPlaceHolder from "../../assets/user.png";
import formatDate from "../formatting/formatDate";
import { Link as RouterLink } from "react-router-dom";
import { Field, FieldProps, Formik } from "formik";
import * as Yup from "yup";

interface Props {
    post: Post;
}

export default observer(function CommentSection({ post }: Props) {
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
                        resetForm()
                    }
                    initialValues={{ body: '' }}
                    validationSchema={Yup.object({
                        body: Yup.string().required()
                    })}
                >
                    {({ isSubmitting, isValid, handleSubmit }) => (
                        <form>
                            <Field name='body'>
                                {(props: FieldProps) => (
                                    <div style={{ position: 'relative' }}>
                                        {isSubmitting && <CircularProgress />}
                                        <TextareaAutosize
                                            placeholder='Enter your comment (Enter to submit, SHIFT + Enter for new line)'
                                            minRows={6}
                                            style={{
                                                width: "100%",
                                                resize: "none"
                                            }}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter' && e.shiftKey) {
                                                    return;
                                                }
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    isValid && handleSubmit();
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            </Field>
                        </form>
                    )}
                </Formik>
                </CardContent>
                <CardContent>
                    <Card>
                        <CardHeader
                            avatar={
                                <Link component={RouterLink} to={`/profile/${post.user.username}`}>
                                    <Avatar
                                        alt="display name"
                                        src={userPlaceHolder}
                                        variant="circular"
                                    />
                                </Link>
                            }
                            title={
                                <Link
                                    component={RouterLink}
                                    to={`/profile/${post.user.username}`}
                                    style={{
                                        color: "black",
                                        textDecoration: "none"
                                    }}
                                >
                                    User
                                </Link>
                            }
                            subheader={formatDate((new Date()).toString())}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                                luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                                Suspendisse congue vulputate lobortis. Pellentesque at interdum
                                tortor. Quisque arcu quam, malesuada vel mauris et, posuere
                                sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
                                metus, efficitur lobortis nisi quis, molestie porttitor metus.
                                Pellentesque et neque risus. Aliquam vulputate, mauris vitae
                                tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
                                lectus vitae ex.
                            </Typography>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </ThemeProvider >
    );
})