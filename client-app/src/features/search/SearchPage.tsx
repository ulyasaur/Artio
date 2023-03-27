import { TabContext, TabPanel } from "@mui/lab";
import { Box, Tab, Tabs, ThemeProvider } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { theme } from "../../app/common/themes/theme";
import PeopleIcon from '@mui/icons-material/People';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { useEffect, useState } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import UserCard from "../followers/UserCard";
import TagCard from "../tags/TagCard";
import NothingFound from "../../app/common/placeholders/NothingFound";

export default observer(function SearchPage() {
    const { search } = useParams<string>();
    const { profileStore, tagStore } = useStore();
    const { loadSearchedTags, searchedTags, loading } = tagStore;
    const { loadSearchedUsers, searchedUsers, loadingSearch } = profileStore;
    const [value, setValue] = useState("users");

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    useEffect(() => {
        loadSearchedTags(search!);
        loadSearchedUsers(search!);
    }, [search, loadSearchedTags, loadSearchedUsers]);

    return (
        <ThemeProvider theme={theme}>
            <TabContext value={value}>
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <Tabs value={value} onChange={handleChange} centered>
                        <Tab icon={<PeopleIcon />} iconPosition="start" label="Users" value="users" />
                        <Tab icon={<CollectionsBookmarkIcon />} iconPosition="start" label="Tags" value="tags" />
                    </Tabs>
                </Box>
                <TabPanel value='users'>
                    {(loadingSearch || !searchedUsers)
                        ? <LoadingComponent content="Loading posts..." />
                        : (searchedUsers.length === 0)
                            ? <NothingFound />
                            : searchedUsers.map(user => (
                                <UserCard key={user.id} user={user} />
                            ))}
                </TabPanel>
                <TabPanel value='tags'>
                    {(loading || !searchedTags)
                        ? <LoadingComponent content="Loading posts..." />
                        : (searchedTags.length === 0)
                            ? <NothingFound />
                            : searchedTags.map(tag => (
                                <TagCard key={tag.tagId} tag={tag} />
                            ))}
                </TabPanel>
            </TabContext>
        </ThemeProvider>
    );
})