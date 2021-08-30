import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({ token }) => {
	return (
		<nav>
			<h1 id='logo'>
				<Link to='/'>LogoName</Link>
			</h1>
			{!token && (
				<div className='nav-links'>
					<Link to='/login'>Login</Link>
					<Link to='/register'>Register</Link>
				</div>
			)}
		</nav>
	)
}

export default Nav
