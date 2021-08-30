import React from 'react'

const Home = ({ token }) => {
	return (
		<div id='home'>
			<h1>{token ? 'Home' : 'You must first login'}</h1>
		</div>
	)
}

export default Home
