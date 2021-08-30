import React, { useEffect, useState } from 'react'
import {
	BrowserRouter as Router,
	Route,
	Switch,
	useHistory,
} from 'react-router-dom'
import validator from 'validator'

import Nav from './components/Nav'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

const localStorage = window.localStorage

function App() {
	const [token, setToken] = useState(localStorage.getItem('token'))

	const history = useHistory()

	const checkToken = async () => {
		const res = await fetch('http://localhost:4000/welcome', {
			method: 'POST',
			headers: {
				'x-access-token': token,
			},
		})
		const data = await res.json()
		if (data.message !== 'valid') {
			localStorage.removeItem('token')
		}
	}

	checkToken()

	useEffect(() => {
		if (localStorage.getItem('token')) {
			localStorage.removeItem('token')
		}
		localStorage.setItem('token', token)
	}, [token])

	return (
		<Router>
			<Nav token={token} />
			<Switch>
				<Route exact path='/'>
					<Home token={token} />
				</Route>
				<Route path='/login'>
					<Login setToken={setToken} history={history} />
				</Route>
				<Route path='/register'>
					<Register
						validator={validator}
						setToken={setToken}
						history={history}
					/>
				</Route>
			</Switch>
		</Router>
	)
}

export default App
