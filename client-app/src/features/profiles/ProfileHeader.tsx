import { ThemeProvider } from "@emotion/react";
import { Avatar, Button, Card, CardContent, CardMedia, Chip, Container, Divider, Grid, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { observer } from "mobx-react-lite";
import { theme } from "../../app/common/themes/theme";
import { Profile } from "../../app/models/profile";
import { User } from "../../app/models/user";
import { useStore } from "../../app/stores/store";
import placeholder from "../../assets/placeholder.png";
import userPlaceHolder from "../../assets/user.png";
import FollowButton from "../followers/FollowButton";
import { Link as RouterLink } from "react-router-dom";
import { router } from "../../app/router/router";

interface Props {
    profile: Profile;
}

export default observer(function ProfileHeader({ profile }: Props) {
    const { userStore } = useStore();
    const { currentUser } = userStore;

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
                <CardContent>
                    <Grid
                        container
                    >
                        <Grid
                            xs={8}
                            sx={{
                                position: "relative",
                                paddingTop: "20px",
                            }}
                        >
                            <Typography variant="h5" component="h2">
                                {profile.displayName}
                            </Typography>
                            <Typography color="textSecondary">
                                @{profile.username}
                            </Typography>
                        </Grid>
                        <Grid xs={0.5} />
                        <Grid xs={1.5}>
                            <Link
                                component={RouterLink}
                                to={`/${profile.username}/followings`}
                                sx={{
                                    color: "black", textDecoration: "none"
                                }}
                            >
                                <Container>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: "bold"
                                        }}
                                        textAlign={"center"}
                                    >
                                        {profile.followingsCount}
                                    </Typography>
                                    <Typography variant="h6" textAlign={"center"}>
                                        followings
                                    </Typography>
                                </Container>
                            </Link>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid xs={1.5}>
                            <Link
                                component={RouterLink}
                                to={`/${profile.username}/followers`}
                                sx={{
                                    color: "black", textDecoration: "none"
                                }}
                            >
                                <Container>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: "bold"
                                        }}
                                        textAlign={"center"}
                                    >
                                        {profile.followersCount}
                                    </Typography>
                                    <Typography variant="h6" textAlign={"center"}>
                                        followers
                                    </Typography>
                                </Container>
                            </Link>
                        </Grid>

                        <Grid
                            xs={8}
                            sx={{
                                paddingTop: "10px"
                            }}
                        >
                            <Typography variant="h6" component="p">
                                {profile.bio}
                            </Typography>
                        </Grid>
                        <Grid
                            xs={4}
                            sx={{
                                paddingTop: "10px"
                            }}
                        >
                            {(currentUser?.id === profile.id)
                                ? <Button
                                    sx={{
                                        width: "100%"
                                    }}
                                    variant="outlined"
                                    onClick={() => router.navigate("/settings")}
                                >
                                    Edit profile
                                </Button>
                                : <FollowButton user={new User(
                                    profile.id,
                                    profile.username,
                                    profile.username,
                                    profile.image)} />}

                        </Grid>
                    </Grid>
                </CardContent>
                <Divider variant="middle">
                    <Typography
                        sx={{
                            color: "hotpink"
                        }}
                    >
                        INTERESTED IN
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