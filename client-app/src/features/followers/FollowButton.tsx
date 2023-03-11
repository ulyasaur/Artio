import { Button, ThemeProvider } from "@mui/material";
import { observer } from "mobx-react-lite";
import { theme } from "../../app/common/themes/theme";
import { User } from "../../app/models/user";
import { useStore } from "../../app/stores/store";

interface Props {
    user: User;
}

export default observer(function FollowButton({ user }: Props) {
    const { userStore } = useStore();
    const { isFollowing, toggleFollowing } = userStore;

    return (
        <ThemeProvider theme={theme}>
            {isFollowing(user.id)
                ? <Button
                    sx={{
                        width: "100%"
                    }}
                    color="error"
                    variant="outlined"
                    onClick={() => toggleFollowing(user)}
                >
                    Unfollow
                </Button>
                : <Button
                    sx={{
                        width: "100%"
                    }}
                    variant="contained"
                    onClick={() => toggleFollowing(user)}
                >
                    Follow
                </Button>}
        </ThemeProvider>
    );
})