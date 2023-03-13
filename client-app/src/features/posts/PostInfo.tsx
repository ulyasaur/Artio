import { ThemeProvider } from "@emotion/react";
import { observer } from "mobx-react-lite";
import { theme } from "../../app/common/themes/theme";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Post } from "../../app/models/post";
import placeholder from "../../assets/placeholder.png";
import userPlaceHolder from "../../assets/user.png";
import formatDate from "../../app/formatting/formatDate";
import { Box, Chip, Divider, Link } from "@mui/material";
import { useStore } from "../../app/stores/store";
import { Link as RouterLink } from "react-router-dom";
import FollowButton from "../followers/FollowButton";

interface Props {
    post: Post;
    elevation?: number;
}

export default observer(function PostInfo({ post, elevation }: Props) {
    const { postStore, userStore } = useStore();
    const { isLiked, toggleLike } = postStore;
    const { currentUser } = userStore;

    function handleClick() {

    }

    return (
        <ThemeProvider theme={theme}>
            <Card
                sx={{
                    minHeight: "89vh"
                }}
                elevation={elevation || 0}
            >
                <CardHeader
                    avatar={
                        <Link component={RouterLink} to={`/profile/${post.user.username}`}>
                            <Avatar
                                alt="display name"
                                src={post.user.imageUrl || userPlaceHolder}
                                variant="circular"
                            />
                        </Link>
                    }
                    action={
                        (currentUser?.username === post.user.username) 
                        ? <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                        : <FollowButton user={post.user}/>
                    }
                    title={
                        <Link
                            component={RouterLink}
                            to={`/profile/${post.user.username}`}
                            style={{
                                color: "black",
                                textDecoration: "none"
                            }}
                        >
                            {post.user.displayName}
                        </Link>
                    }
                    subheader={formatDate(post.createdAt)}
                />
                <CardMedia
                    component="img"
                    image={post.imageUrl || placeholder}
                    alt={post.user.username}
                />
                <CardActions disableSpacing>
                    <IconButton size="large" onClick={() => toggleLike(post)}>
                        <FavoriteIcon color={isLiked(post) ? "error" : "inherit"} />
                    </IconButton>
                    <Typography sx={{ fontWeight: "bold" }} variant="body2">
                        {post.likes.length} likes
                    </Typography>
                </CardActions>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {post.description}
                    </Typography>
                </CardContent>
                <Divider variant="middle">
                    <Typography
                        sx={{
                            color: "hotpink"
                        }}
                    >
                        Tags
                    </Typography>
                </Divider>
                <CardContent>
                    {post.tags.map((tag) => (
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
                            />
                        </Box>
                    ))}
                </CardContent>
            </Card>
        </ThemeProvider>
    );
})