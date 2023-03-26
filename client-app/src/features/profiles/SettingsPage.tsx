import { ThemeProvider } from "@emotion/react";
import { Autocomplete, Avatar, Badge, Card, CardContent, CardMedia, Chip, Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { observer } from "mobx-react-lite";
import { theme } from "../../app/common/themes/theme";
import { useStore } from "../../app/stores/store";
import placeholder from "../../assets/placeholder.png";
import userPlaceHolder from "../../assets/user.png";
import { Key, useEffect, useState } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { ErrorMessage, Formik } from "formik";
import FormTextField from "../../app/common/form/FormTextField";
import { LoadingButton } from "@mui/lab";
import { PhotoCamera } from "@mui/icons-material";
import PhotoUploadWidget from "../../app/common/photo/PhotoUploadWidget";


export default observer(function SettingsPage() {
    const { userStore, profileStore, tagStore } = useStore();
    const { currentUser } = userStore;
    const { loadTags, loading, tags, addTag, getTagByTagName } = tagStore;
    const { loadingProfile,
        loadProfile,
        profile,
        updateProfile,
        uploading,
        uploadProfilePicture,
        uploadBackgroundPicture,
        deleteTagFromUser,
        addTagToUser } = profileStore;

    const [openDialog, setOpenDialog] = useState(false);
    const [uploadPhoto, setUpload] = useState<string>("profile");
    const [cropperProps, setCropperProps] = useState<{}>();

    const [key, setKey] = useState<Key>(1);

    useEffect(() => {
        loadProfile(currentUser?.username!);
        loadTags();
    }, [currentUser?.username, profile?.id, loadProfile, loadTags]);

    if (loadingProfile || !profile || loading || !tags) {
        return <LoadingComponent content="Loading profile..." />
    }

    return (
        <ThemeProvider theme={theme}>
            <Card
                sx={{
                    margin: "auto",
                    width: "75vw"
                }}
            >
                <IconButton
                    sx={{
                        color: "white",
                        position: "absolute",
                        zIndex: "999"
                    }}
                    onClick={() => {
                        setUpload("background");
                        setCropperProps({
                            initialAspectRatio: 1,
                            aspectRatio: 2.5
                        });
                        setOpenDialog(true);
                    }}>
                    <PhotoCamera />
                </IconButton>

                <Box
                    sx={{
                        display: "block",
                        paddingTop: "170px",
                        paddingLeft: "20px",
                        position: "absolute",
                    }}>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                            <IconButton sx={{ color: "white" }} onClick={() => {
                                setUpload("profile");
                                setCropperProps({
                                    initialAspectRatio: 1,
                                    aspectRatio: 1
                                });
                                setOpenDialog(true);
                            }}>
                                <PhotoCamera />
                            </IconButton>
                        }
                    >
                        <Avatar
                            alt="display name"
                            src={profile.image ? profile.image?.url : userPlaceHolder}
                            variant="rounded"
                            sx={{
                                width: 100,
                                height: 100
                            }}
                        />
                    </Badge>
                </Box>

                <CardMedia
                    sx={{ height: 250 }}
                    image={profile.background ? profile.background?.url : placeholder}
                />

                <CardContent sx={{ paddingTop: "40px" }}>
                    <Formik
                        initialValues={{ displayName: profile.displayName, bio: profile.bio, error: null }}
                        onSubmit={(values, { setErrors }) => updateProfile(values).catch(error =>
                            setErrors({ error: "Invalid email or password" }))}
                    >
                        {({ handleSubmit, isSubmitting, errors }) => (
                            <form autoComplete="false" onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormTextField
                                            required
                                            label="Display name"
                                            placeholder="Display name"
                                            defaultValue={profile.displayName}
                                            name="displayName"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormTextField
                                            multiline
                                            minRows={6}
                                            label="Bio"
                                            placeholder="Bio"
                                            defaultValue={profile.bio}
                                            name="bio"
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
                    {profile.tags.map((tag) => (
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
                                onDelete={() => deleteTagFromUser(tag)}
                            />
                        </Box>
                    ))}
                    <Autocomplete
                        sx={{
                            padding: "2px",
                            display: "inline-block",
                            width: 300
                        }}
                        key={key}
                        onChange={async (event, newValue) => {
                            setKey(0);
                            if (newValue) {
                                if (typeof (newValue) === 'string') {
                                    await addTag(newValue);
                                    newValue = getTagByTagName(newValue)!;
                                }
                                if (newValue?.tagId === 0) {
                                    await addTag(newValue.tagName);
                                    newValue = getTagByTagName(newValue.tagName)!;
                                }
                                await addTagToUser(newValue!);
                            }
                            setKey(1);
                        }}
                        filterOptions={(options, params) => {
                            const { inputValue } = params;
                            const filtered = options.filter(option => option.tagName.startsWith(inputValue)
                                && !profile.tags.find(op => op.tagName === option.tagName));
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
                        disablePortal
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
            </Card>

            <PhotoUploadWidget
                loading={uploading}
                uploadPhoto={uploadPhoto === "profile" ? uploadProfilePicture : uploadBackgroundPicture}
                open={openDialog}
                handleClose={setOpenDialog}
                cropperProps={cropperProps!}
            />
        </ThemeProvider>
    );
})