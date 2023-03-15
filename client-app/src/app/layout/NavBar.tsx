import { alpha, AppBar, Avatar, Box, Button, Container, Divider, Icon, IconButton, InputBase, Link, ListItemIcon, Menu, MenuItem, styled, Toolbar, Tooltip, Typography } from '@mui/material';
import logo from "../../assets/logo.png";
import userPlaceholder from "../../assets/user.png";
import SearchIcon from '@mui/icons-material/Search';
import * as React from 'react';
import { useStore } from '../stores/store';
import PersonIcon from '@mui/icons-material/Person';
import { Logout, Settings } from '@mui/icons-material';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../common/themes/theme';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink } from "react-router-dom";
import { router } from '../router/router';

function NavBar() {
  const { userStore: { currentUser, isLoggedIn, logout } } = useStore();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '16ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        sx={{
          position: "absolute"
        }}
      >
        <Container>
          <Toolbar disableGutters>
            <Icon
              sx={{
                padding: "4px"
              }}
            >
              <img alt="artio" height={27} width={27} src={logo} />
            </Icon>
            <Link component={RouterLink} to="/">
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                ARTIO
              </Typography>
            </Link>


            {isLoggedIn &&
              <>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  <Link
                    component={RouterLink}
                    to={`/feed`}
                    sx={{
                      color: "black", textDecoration: "none"
                    }}
                  >
                    <Button
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      Feed
                    </Button>
                  </Link>
                </Box>

                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search for tags…"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search>


                <Box sx={{ flexGrow: 0, padding: "2px" }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu}>
                      <Avatar alt={currentUser?.displayName} src={currentUser?.image ? currentUser?.image?.url : userPlaceholder} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={() => {
                      handleCloseUserMenu();
                      router.navigate(`profile/${currentUser?.username}`);
                    }}>
                      <ListItemIcon>
                        <PersonIcon fontSize="small" />
                      </ListItemIcon>
                      Profile
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleCloseUserMenu}>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Settings
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        logout();
                        handleCloseUserMenu();
                      }}
                    >
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </Box>
              </>}
          </Toolbar>
        </Container>
      </AppBar >
    </ThemeProvider>
  );
}
export default observer(NavBar);