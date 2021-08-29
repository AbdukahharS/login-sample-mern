import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
	return (
		<nav>
			<h1 id='logo'>
				<Link to='/'>LogName</Link>
			</h1>
			<div className='nav-links'>
				<Link to='/login'>Login</Link>
				<Link to='/register'>Register</Link>
			</div>
		</nav>
	)
}

export default Nav
