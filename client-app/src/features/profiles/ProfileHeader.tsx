import { Avatar, Button, Card, CardContent, CardMedia, Chip, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { observer } from "mobx-react-lite";
import { Profile } from "../../app/models/profile";
import placeholder from "../../assets/placeholder.png";
import userPlaceHolder from "../../assets/user.png";

interface Props {
    profile: Profile;
}

export default observer(function ProfileHeader({ profile }: Props) {
    function handleClick() {

    }

    function handleDelete() {

    }

    return (
        <Card
            sx={{
                margin: "auto",
                width: "75vw"
            }}
        >
            <Avatar
                alt="display name"
                src={profile.imageUrl || userPlaceHolder}
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
                image={profile.backgroundUrl || placeholder}
            />
            <CardContent

            >
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
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid xs={1.5}>
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
                        <Button
                            sx={{
                                width: "100%",
                                backgroundColor: "hotpink",
                                '&:hover': {
                                    backgroundColor: "deeppink"
                                }
                            }}
                            variant="contained"
                        >
                            Follow
                        </Button>
                        <Button
                            sx={{
                                width: "100%"
                            }}
                            color="error"
                            variant="outlined"
                        >
                            Unfollow
                        </Button>
                        <Button
                            sx={{
                                width: "100%",
                                color: "grey",
                                borderColor: "grey",
                                '&:hover': {
                                    borderColor: "grey"
                                }
                            }}
                            variant="outlined"
                        >
                            Edit profile
                        </Button>
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
    );
})