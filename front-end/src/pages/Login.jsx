import React, { useRef } from 'react'

const Login = ({ setToken, history }) => {
	const emailRef = useRef()
	const passwordRef = useRef()

	const handleSubmit = async () => {
		const email = emailRef.current.value
		const password = passwordRef.current.value

		//Validate inputs
		if (!(email && password)) {
			return alert('All inputs must be filled!')
		}

		const user = JSON.stringify({ email, password })
		console.log(user)

		const res = await fetch('http://localhost:4000/login', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: user,
		})
		const data = await res.json()
		if (data) {
			setToken(data.token)
			history.push('/')
		}
	}

	return (
		<div id='login'>
			<input
				type='text'
				id='email'
				placeholder='Enter your email'
				ref={emailRef}
			/>
			<input
				type='password'
				id='password'
				placeholder='Enter your password'
				ref={passwordRef}
			/>

			<button onClick={() => handleSubmit()}>Submit</button>
		</div>
	)
}

export default Login
