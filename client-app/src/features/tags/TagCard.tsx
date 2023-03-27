import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, ThemeProvider } from "@mui/material";
import { observer } from "mobx-react-lite";
import { theme } from "../../app/common/themes/theme";
import { router } from "../../app/router/router";
import TagFollowButton from "./TagFollowButton";
import { Tag } from "../../app/models/tag";
import TagIcon from '@mui/icons-material/Tag';

interface Props {
    tag: Tag;
}

export default observer(function UserCard({ tag }: Props) {
    return (
        <ThemeProvider theme={theme}>
            <ListItem
                secondaryAction={
                    <TagFollowButton tag={tag} />
                }>
                <ListItemAvatar onClick={() => router.navigate(`/tag/${tag.tagId}`)}>
                    <Avatar>
                        <TagIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    onClick={() => router.navigate(`/tag/${tag.tagId}`)}
                    primary={tag.tagName} />
            </ListItem>
            <Divider variant="middle" />
        </ThemeProvider>
    );
})