import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import { useStore } from "../../app/stores/store";
import { PostFormValues } from "../../app/models/post";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Box, Card, CardContent, CardHeader, Chip, Divider, Grid, ThemeProvider, Typography } from "@mui/material";
import { theme } from "../../app/common/themes/theme";
import { LoadingButton } from "@mui/lab";
import FormTextField from "../../app/common/form/FormTextField";
import PhotoDropzone from "../../app/common/photo/PhotoDropzone";
import PhotoCropper from "../../app/common/photo/PhotoCropper";
import { toast } from "react-toastify";

export default observer(function ActivityForm() {
    const { postStore } = useStore();
    const { createPost, loadPost, loadingPosts, post } = postStore;
    const { postId } = useParams();
    const navigate = useNavigate();

    const [editingPost, setEditingPost] = useState<PostFormValues>(new PostFormValues());
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    // function onCrop() {
    //     if (cropper) {
    //         cropper.getCroppedCanvas().toBlob(blob => setImage(blob));
    //         setFiles([]);
    //     }
    // }

    useEffect(() => {
        return () => {
            files.forEach((file: any) => {
                return URL.revokeObjectURL(file.preview);
            });
        }
    }, [files])

    // useEffect(() => {
    //     if (id) {
    //         loadPost(id);
    //         if (post) {
    //             setEditingPost(new PostFormValues(post.postId, post.image, post.description, post.tags));
    //         }
    //     }
    // }, [id, loadPost]);

    const handleFormSubmit = async (description: string) => {
        if (!editingPost.postId) {
            if (cropper && files && files.length > 0) {
                const canvas = cropper.getCroppedCanvas();
                // const blob = await new Promise(resolve => canvas.toBlob(resolve));

                // canvas.toBlob(blob => {
                //     console.log(blob)
                //     setImage(blob)
                // });
                // setEditingPost(new PostFormValues(undefined, blob as Blob, description, []))
                editingPost.image = await new Promise(resolve => canvas.toBlob(resolve));
                editingPost.description = description;
                editingPost.tags = [];
                await createPost(editingPost);
                setFiles([]);
                navigate("/");
            } else {
                toast.error("Add photo firt");
            }
        }
        // } else {
        //     updatePost(post).then(() => navigate(`/activities/${activity.id}`));
        // }
    }

    if (loadingPosts) {
        return <LoadingComponent />
    }

    return (
        <ThemeProvider theme={theme}>
            <Card
                sx={{
                    minHeight: "89vh"
                }}
            >
                <CardHeader
                    sx={{
                        textAlign: "center",
                        backgroundColor: "hotpink",
                        color: "white"
                    }}
                    title={postId ? "Update post" : "Create post"}
                    titleTypographyProps={{
                        display: "inline-block",
                        fontSize: "16pt",
                        fontWeight: "bold"
                    }}
                />
                <CardContent>
                    {files && files.length > 0
                        ? <PhotoCropper setCropper={setCropper} imagePreview={files[0].preview} />
                        : <PhotoDropzone setFiles={setFiles} />
                    }
                </CardContent>

                <Divider variant="middle">
                    <Typography
                        sx={{
                            color: "hotpink"
                        }}
                    >
                        Tags
                    </Typography>
                </Divider>
                <CardContent>
                    {editingPost.tags.map((tag) => (
                        <Box
                            key={tag.tagName}
                            sx={{
                                padding: "2px",
                                display: "inline-block",
                                width: "min-content"
                            }}
                        >
                            <Chip
                                label={tag.tagName}
                            // onClick={handleClick}
                            />
                        </Box>
                    ))}
                </CardContent>
                <Divider variant="middle" />
                <CardContent>
                    <Formik
                        initialValues={{ description: editingPost.description, error: null }}
                        onSubmit={(values) => handleFormSubmit(values.description)}
                    >
                        {({ handleSubmit, isSubmitting, errors }) => (
                            <form autoComplete="false" onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormTextField
                                            multiline
                                            minRows={6}
                                            label="Description"
                                            placeholder="Description"
                                            defaultValue={editingPost.description}
                                            name="description"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ErrorMessage
                                            name="error"
                                            render={() =>
                                                <Typography color="error">
                                                    {errors.error}
                                                </Typography>}
                                        />
                                    </Grid>
                                </Grid>
                                <LoadingButton
                                    loading={isSubmitting}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Save changes
                                </LoadingButton>
                            </form>)}
                    </Formik>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
});