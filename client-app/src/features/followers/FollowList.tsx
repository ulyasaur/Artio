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
        profile,
        followers,
        followings,
        loadFollowers,
        loadFollowings,
        loadingFollowers,
        loadingFollowings } = profileStore;

    useEffect(() => {
        const fetchData = async () => {
            await loadProfile(username!);
        };

        fetchData();
    }, [username, loadProfile]);

    useEffect(() => {
        if (profile) {
            if (predicate === "followers") {
                loadFollowers();
            } else {
                loadFollowings();
            }
        }
    }, [profile, predicate, loadFollowers, loadFollowings]);

    const loading = predicate === "followers" ? loadingFollowers : loadingFollowings;

    if (loadingProfile || loading) {
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
                    title={predicate === "followers" ? `Followers (${followers.length})` : `Followings (${followings.length})`}
                    titleTypographyProps={{
                        display: "inline-block",
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