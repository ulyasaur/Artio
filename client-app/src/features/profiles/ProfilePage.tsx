import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import ProfileHeader from "./ProfileHeader";
import ProfilePosts from "./ProfilePosts";

export default observer(function ProfilePage() {
    const { username } = useParams<string>();
    const { profileStore , postStore} = useStore();
    const { loadingProfile, loadProfile, profile } = profileStore;
    const { loadingPosts, loadUserPosts, userPosts } = postStore;

    useEffect(() => {
        loadProfile(username!);
        if (profile)
        {
            loadUserPosts(profile!.id);
        }        
    }, [username, profile?.id]);
    
    if (loadingProfile || loadingPosts) {
        return <LoadingComponent content="Loading profile..." />
    }

    return (
        <>
            {profile && userPosts &&
                <>
                    <ProfileHeader profile={profile!} />
                    <ProfilePosts posts={userPosts!} profileId={profile.id}/>
                </>
            }
        </>
    );
})