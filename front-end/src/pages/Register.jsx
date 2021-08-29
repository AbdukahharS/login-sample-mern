import React, { useRef } from 'react'

const Register = ({ validator }) => {
	const fNameRef = useRef()
	const lNameRef = useRef()
	const emailRef = useRef()
	const passwordRef = useRef()
	const rPassRef = useRef()

	const handleSubmit = async () => {
		const firstName = fNameRef.current.value
		const lastName = lNameRef.current.value
		const email = emailRef.current.value
		const password = passwordRef.current.value
		const repeatPass = rPassRef.current.value

		//Validate inputs
		if (!(firstName && lastName && email && password && repeatPass)) {
			return alert('All inputs must be filled!')
		} else if (!validator.isEmail(email)) {
			return alert('Enter a valid email address!')
		} else if (password !== repeatPass) {
			return alert('Enter same passwords!')
		}

		const newUser = JSON.stringify({ firstName, lastName, email, password })
		console.log(newUser)

		const res = await fetch('http://localhost:4000/register', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: newUser,
		})
		const data = await res.json()
		console.log(data)
	}

	return (
		<div id='register'>
			<input
				type='text'
				id='firstName'
				placeholder='Enter your first name'
				ref={fNameRef}
			/>
			<input
				type='text'
				id='lastName'
				placeholder='Enter your last name'
				ref={lNameRef}
			/>
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
			<input
				type='password'
				id='repeatPass'
				placeholder='Repeat the password'
				ref={rPassRef}
			/>

			<button onClick={() => handleSubmit()}>Submit</button>
		</div>
	)
}

export default Register
