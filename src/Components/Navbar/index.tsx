import * as React from 'react';
import './index.scss'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu';
import ScubaDivingIcon from '@mui/icons-material/ScubaDiving'
import { Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import { useAppSelector } from '../../hooks'
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { auth } from '../../firebaseConfig'
import { signOut } from 'firebase/auth';
import useMediaQuery from '@mui/material/useMediaQuery';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';

const NavBar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate()
  const location = useLocation()
  const nav = document.querySelector('.nav-bar')
  const { user } = useAppSelector((store) => store.user)
  const matches = useMediaQuery('(min-width:600px)');
  const [open, setOpen] = React.useState(false);

  if (location.pathname !== '/') {
    nav?.classList.add('nav-bar-overlay')
  } else {
    nav?.classList.remove('nav-bar-overlay')
  }

  const stringAvatar = (name: string) => {
    return {
      sx: {
        bgcolor: 'white',
        color: '#1e73be'
      },
      children: `${name[0]}`,
    };
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logOut = () => {
    if (user.uid) {
      signOut(auth)
        .then(() => {
          console.log('Logged out')
          navigate('/')
        })
        .catch((error) => {
          console.log(error)
        })
    }
    setOpen(false);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="nav-bar">
      <IconButton className="icon" size="large" edge="start">
        <ScubaDivingIcon />
      </IconButton>
      <Link className="logo" to="/">
        <Typography variant="h6" component="div">
          DIVELOG
        </Typography>
      </Link>
      {(matches) ?
        <nav>
          <Stack className="btn-container" spacing={2} direction="row">
            <Button variant="text">
              <NavLink to="/">Home</NavLink>
            </Button>
            <Button variant="text">
              <NavLink to="dives">Dives</NavLink>
            </Button>
            <Button variant="text">
              <NavLink to="about">About</NavLink>
            </Button>
            {
              (user.displayName) ?
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar {...stringAvatar(user.displayName)} />
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
                    <MenuItem key='Profile' onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                    <MenuItem key='LogOut' onClick={logOut}>
                      <Typography textAlign="center">Log Out</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
                :
                <Button variant="text">
                  <NavLink to="login">Sign In</NavLink>
                </Button>
            }
          </Stack>
        </nav>
        :
        <nav>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ color: "#fff" }}
            onClick={handleClickOpen}
          >
            <MenuIcon fontSize='large' />
          </IconButton>
          <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            className='dialog-menu'
          // TransitionComponent={Transition}
          >
            <Toolbar
              sx={{ display: 'flex', justifyContent: 'space-between', m: 3, mb: 5 }}
            >
              <Typography variant="h6" component="div" sx={{ color: '#1e73be' }}>
                MENU
              </Typography>
              <IconButton
                edge="end"
                color="error"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon fontSize='medium' />
              </IconButton>
            </Toolbar>
            <Divider />
            <Stack className="btn-container" spacing={2} direction="column">
                <NavLink to="/" onClick={handleClose}>HOME</NavLink>
                <NavLink to="dives" onClick={handleClose}>DIVES</NavLink>
                <NavLink to="about" onClick={handleClose}>ABOUT</NavLink>
                {
              (user.displayName) ?
              <>
                <NavLink to="login" onClick={handleClose}>PROFILE</NavLink>
                <Button variant="text" color='error' onClick={logOut}>LOG OUT</Button>
              </>
                :
                <NavLink to="login" onClick={handleClose}>SIGN IN</NavLink>
            }
            </Stack>
            <Divider />
          </Dialog>
        </nav>
      }

    </div>
  )
}

export default NavBar
