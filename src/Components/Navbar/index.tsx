import * as React from 'react';
import './index.scss'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
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

const NavBar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate()

  const location = useLocation()
  const nav = document.querySelector('.nav-bar')
  const { user } = useAppSelector((store) => store.user)

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
  }

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
                    <Typography textAlign="center">LogOut</Typography>
                  </MenuItem>
                </Menu>
              </Box>
              :
              <Button variant="text">
                <NavLink to="login">Sign In</NavLink>
              </Button>}
        </Stack>
      </nav>
    </div>)
}

export default NavBar
