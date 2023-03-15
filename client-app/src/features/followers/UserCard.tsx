import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, ThemeProvider } from "@mui/material";
import { observer } from "mobx-react-lite";
import { theme } from "../../app/common/themes/theme";
import { User } from "../../app/models/user";
import userPlaceHolder from "../../assets/user.png";
import FollowButton from "./FollowButton";
import { router } from "../../app/router/router";
import { useStore } from "../../app/stores/store";

interface Props {
    user: User;
}

export default observer(function UserCard({ user }: Props) {
    const {userStore} = useStore();
    const {currentUser} = userStore;

    return (
        <ThemeProvider theme={theme}>
            <ListItem
                secondaryAction={
                    (currentUser!.id !== user.id)
                    ? <FollowButton user={user} />
                    : null
                }>
                <ListItemAvatar onClick={() => router.navigate(`/profile/${user.username}`)}>
                    <Avatar
                        alt="display name"
                        src={user.image ? user.image?.url : userPlaceHolder}
                        variant="circular"
                    />
                </ListItemAvatar>
                <ListItemText
                    onClick={() => router.navigate(`/profile/${user.username}`)}
                    primary={user.displayName}
                    secondary={`@${user.username}`} />
            </ListItem>
            <Divider variant="middle" />
        </ThemeProvider>
    );
})