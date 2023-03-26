import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import { useStore } from "../../app/stores/store";
import { PostFormValues } from "../../app/models/post";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Autocomplete, Box, Card, CardContent, CardHeader, CardMedia, Chip, Divider, Grid, TextField, ThemeProvider, Typography } from "@mui/material";
import { theme } from "../../app/common/themes/theme";
import { LoadingButton } from "@mui/lab";
import FormTextField from "../../app/common/form/FormTextField";
import PhotoDropzone from "../../app/common/photo/PhotoDropzone";
import PhotoCropper from "../../app/common/photo/PhotoCropper";
import { toast } from "react-toastify";
import placeholder from "../../assets/placeholder.png";
import { Tag } from "../../app/models/tag";

export default observer(function PostForm() {
    const { postStore, tagStore } = useStore();
    const { createPost, updatePost, loadPost, loadingPosts, post } = postStore;
    const { loadTags, tags, addTag, getTagByTagName } = tagStore;
    const { postId } = useParams<string>();
    const navigate = useNavigate();

    const [editingPost, setEditingPost] = useState<PostFormValues>(new PostFormValues());
    const [editTags, setEditTags] = useState<Tag[]>([]);
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    useEffect(() => {
        return () => {
            files.forEach((file: any) => {
                return URL.revokeObjectURL(file.preview);
            });
        }
    }, [files])

    useEffect(() => {
        loadTags();
        if (postId) {
            loadPost(postId);
            if (post) {
                editingPost.postId = post.postId;
                editingPost.description = post.description;
                setEditTags(post.tags);
            }
        }
    }, [postId, loadPost, loadTags]);

    const handleFormSubmit = async (description: string) => {
        if (!editingPost.postId) {
            if (cropper && files && files.length > 0) {
                const canvas = cropper.getCroppedCanvas();
                editingPost.image = await new Promise(resolve => canvas.toBlob(resolve));
                editingPost.description = description;
                editingPost.tags = editTags;
                await createPost(editingPost);
                setFiles([]);
                navigate("/");
            } else {
                toast.error("Add photo first");
            }
        } else {
            editingPost.description = description;
            editingPost.tags = editTags;
            updatePost(editingPost);
            navigate("/");
        }
    }

    if (loadingPosts || !tags) {
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

                {
                    postId && post
                        ? <CardMedia
                            component="img"
                            image={post.image.url ? post.image.url : placeholder}
                        />
                        : <CardContent>
                            {files && files.length > 0
                                ? <PhotoCropper setCropper={setCropper} imagePreview={files[0].preview} />
                                : <PhotoDropzone setFiles={setFiles} />
                            }
                        </CardContent>
                }

                <Divider variant="middle" sx={{ mt: "2vh" }}>
                    <Typography
                        sx={{
                            color: "hotpink"
                        }}
                    >
                        Tags
                    </Typography>
                </Divider>
                <CardContent>
                    {editTags.map((tag) => (
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
                                onDelete={() => {
                                   setEditTags(editTags.filter(x => x.tagId !== tag.tagId));
                                }}
                            />
                        </Box>
                    ))}
                    <Autocomplete
                        sx={{
                            padding: "2px",
                            display: "inline-block",
                            width: 300
                        }}
                        onChange={async (event, newValue) => {
                            if (newValue) {                                
                                if (typeof (newValue) === 'string') {
                                    await addTag(newValue);
                                    newValue = getTagByTagName(newValue)!;
                                }
                                if (newValue?.tagId === 0) {
                                    await addTag(newValue.tagName);
                                    newValue = getTagByTagName(newValue.tagName)!;
                                }
                                setEditTags([...editTags, newValue]);
                            }
                        }}
                        filterOptions={(options, params) => {
                            const { inputValue } = params;
                            const filtered = options.filter(option => option.tagName.startsWith(inputValue)
                                && !editTags.find(op => op.tagName === option.tagName));
                            const isExisting = options.some((option) => inputValue === option.tagName);
                            if (inputValue !== '' && !isExisting) {
                                filtered.push({
                                    tagId: 0,
                                    tagName: `${inputValue}`
                                });
                            }

                            return filtered;
                        }}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        options={tags}
                        getOptionLabel={(option) => {
                            if (typeof (option) === 'string') {
                                return option;
                            }
                            return option.tagName;
                        }}
                        renderOption={(props, option) => <li {...props}>{option.tagName}</li>}
                        freeSolo
                        renderInput={(params) => (
                            <TextField {...params} placeholder="Add tag" size="small" variant="standard" />
                        )}
                    />
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