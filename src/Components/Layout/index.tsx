import './index.scss'
import { Outlet } from 'react-router-dom'
import NavBar from '../Navbar'

const Layout = () => {
  const video = require('../../Assets/diveShort.mp4')

  return (
    <div className="App">
      <NavBar />
      <div className="page">
        <Outlet />
      </div>
      <video autoPlay loop muted>
        <source src={video} type="video/mp4"></source>
      </video>
    </div>
  )
}

export default Layout
