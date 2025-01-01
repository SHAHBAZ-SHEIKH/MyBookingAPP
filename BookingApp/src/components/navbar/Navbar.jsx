import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  return (
    <div className='navbar'>
        <div className="navContainer">
            <Link to='/' style={{color:"inherit" , textDecoration:"none"}} className="logo">Booking.com</Link>
            {user ? user.username : <div className="navItems">
                <button className="navButton" onClick={()=>navigate("/signup")}>Register</button>
                <button className="navButton" onClick={()=>navigate("/login")}>Login</button>
            </div>}
        </div>
      
    </div>
  )
}

export default Navbar
