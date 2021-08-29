import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import validator from 'validator'

import Nav from './components/Nav'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
	return (
		<Router>
			<Nav />
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
				<Route path='/login'>
					<Login />
				</Route>
				<Route path='/register'>
					<Register validator={validator} />
				</Route>
			</Switch>
		</Router>
	)
}

export default App
