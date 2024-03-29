require('dotenv').config()
require('./config/database').connect()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

// importing user context
const User = require('./model/user')

// Register
app.post('/register', async (req, res) => {
	// Our register logic starts here
	try {
		// Get user input
		const { firstName, lastName, email, password } = req.body

		// Validate user input
		if (!(email && password && firstName && lastName)) {
			res.status(400).send({ message: 'All input is required' })
		}

		// check if user already exist
		// Validate if user exist in our database
		const oldUser = await User.findOne({ email })

		if (oldUser) {
			return res
				.status(409)
				.send({ message: 'User Already Exist. Please Login' })
		}

		//Encrypt user password
		encryptedPassword = await bcrypt.hash(password, 10)

		// Create user in our database
		const user = await User.create({
			firstName,
			lastName,
			email: email.toLowerCase(), // sanitize: convert email to lowercase
			password: encryptedPassword,
		})

		// Create token
		const token = jwt.sign(
			{ user_id: user._id, email },
			process.env.TOKEN_KEY,
			{
				expiresIn: '1h',
			}
		)
		// save user token
		user.token = token

		// return new user
		res.status(201).json(user)
	} catch (err) {
		console.log(err)
	}
})

// Login
app.post('/login', async (req, res) => {
	// Our login logic starts here
	try {
		// Get user input
		const { email, password } = req.body

		// Validate user input
		if (!(email && password)) {
			res.status(400).send({ message: 'All input is required' })
		}
		// Validate if user exist in our database
		const user = await User.findOne({ email })

		if (user && (await bcrypt.compare(password, user.password))) {
			// Create token
			const token = jwt.sign(
				{ user_id: user._id, email },
				process.env.TOKEN_KEY,
				{
					expiresIn: '1h',
				}
			)

			// save user token
			user.token = token

			// user
			res.status(200).json(user)
			return
		}
		res.status(400).send({ message: 'Invalid Credentials' })
	} catch (err) {
		console.log(err)
	}
	// Our register logic ends here
})

const auth = require('./middleware/auth')

app.post('/welcome', auth, (req, res) => {
	res.status(200).send({ message: 'valid' })
})

module.exports = app
