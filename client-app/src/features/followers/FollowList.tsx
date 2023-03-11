import { Card, CardHeader, ThemeProvider } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { theme } from "../../app/common/themes/theme";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import UserCard from "./UserCard";

interface Props {
    predicate: string;
}

export default observer(function FollowButton({ predicate }: Props) {
    const { username } = useParams<string>();
    const { profileStore } = useStore();
    const { loadingProfile,
        loadProfile,
        followers,
        followings,
        loadingFollowers,
        loadingFollowings } = profileStore;

    useEffect(() => {
        loadProfile(username!);
    }, [username, loadProfile]);

    if (loadingProfile || loadingFollowers || loadingFollowings) {
        return <LoadingComponent content={`Loading ${predicate}...`} />
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
                    title={predicate === "followers" ? "Followers" : "Followings"}
                    titleTypographyProps={{
                        display: "inline-block",
                        width: "min-content",
                        fontSize: "13pt",
                        fontWeight: "bold"
                    }}
                />

                {predicate === "followers"
                    ? followers!.map(follower => (
                        <UserCard key={follower.id} user={follower} />
                    ))
                    : followings!.map(following => (
                        <UserCard key={following.id} user={following} />
                    ))
                }
            </Card>
        </ThemeProvider>
    );
})