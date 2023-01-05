import './index.scss'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import ScubaDivingIcon from '@mui/icons-material/ScubaDiving'
import { Typography } from '@mui/material'

const NavBar = () => {
  const location = useLocation()
  const nav = document.querySelector('.nav-bar')

  if (location.pathname !== '/') {
    nav?.classList.add('nav-bar-overlay')
  } else {
    nav?.classList.remove('nav-bar-overlay')
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
          <Button variant="text">
            <NavLink to="login">Sign In</NavLink>
          </Button>
        </Stack>
      </nav>
    </div>
  )
}

export default NavBar
