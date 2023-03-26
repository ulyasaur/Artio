import { Button, ThemeProvider } from "@mui/material";
import { observer } from "mobx-react-lite";
import { theme } from "../../app/common/themes/theme";
import { Tag } from "../../app/models/tag";
import { useStore } from "../../app/stores/store";

interface Props {
    tag: Tag;
}

export default observer(function TagFollowButton({ tag }: Props) {
    const { userStore } = useStore();
    const { isTagFollowing, toggleTagFollowing } = userStore;

    return (
        <ThemeProvider theme={theme}>
            {isTagFollowing(tag.tagId)
                ? <Button
                    sx={{
                        width: "100%"
                    }}
                    color="error"
                    variant="outlined"
                    onClick={() => toggleTagFollowing(tag)}
                >
                    Unfollow
                </Button>
                : <Button
                    sx={{
                        width: "100%"
                    }}
                    variant="contained"
                    onClick={() => toggleTagFollowing(tag)}
                >
                    Follow
                </Button>}
        </ThemeProvider>
    );
})