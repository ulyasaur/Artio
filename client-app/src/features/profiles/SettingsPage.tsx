import { ThemeProvider } from "@emotion/react";
import { Avatar, Card, CardContent, CardMedia, Chip, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { observer } from "mobx-react-lite";
import { theme } from "../../app/common/themes/theme";
import { useStore } from "../../app/stores/store";
import placeholder from "../../assets/placeholder.png";
import userPlaceHolder from "../../assets/user.png";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { ErrorMessage, Formik } from "formik";
import FormTextField from "../../app/common/form/FormTextField";
import { LoadingButton } from "@mui/lab";

export default observer(function SettingsPage() {
    const { userStore, profileStore } = useStore();
    const { currentUser } = userStore;
    const { loadingProfile, loadProfile, profile, updateProfile } = profileStore;

    useEffect(() => {
        loadProfile(currentUser?.username!);
    }, [currentUser?.username, profile?.id, loadProfile]);

    if (loadingProfile || !profile) {
        return <LoadingComponent content="Loading profile..." />
    }

    function handleClick() {

    }

    function handleDelete() {

    }

    return (
        <ThemeProvider theme={theme}>
            <Card
                sx={{
                    margin: "auto",
                    width: "75vw"
                }}
            >
                <Avatar
                    alt="display name"
                    src={profile.image ? profile.image?.url : userPlaceHolder}
                    variant="rounded"
                    sx={{
                        display: "block",
                        paddingTop: "170px",
                        paddingLeft: "20px",
                        position: "absolute",
                        width: 100,
                        height: 100
                    }}
                />
                <CardMedia
                    sx={{ height: 250 }}
                    image={profile.background ? profile.background?.url : placeholder}
                />
                <CardContent sx={{paddingTop: "40px"}}>
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
                                onClick={handleClick}
                                onDelete={handleDelete}
                            />
                        </Box>
                    ))}
                </CardContent>
            </Card>
        </ThemeProvider>
    );
})