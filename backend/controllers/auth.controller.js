import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { genereteTokenAndSetCookie } from "../utils/genereteToken.js"

export async function login(req, res) {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'login wrong' })
    }
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ success: false, message: 'user wrong' })
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: 'password wrong' })
    }
    genereteTokenAndSetCookie(user._id, res)
    res.status(200).json({
      success: true, user: { ...user._doc, password: '' }
    })
  } catch (error) {
    console.log(error, 'error login')
  }
}

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body
    if (!email || !password || !username) {
      return res.status(400).json({ success: false, message: "Error all field are required" })
    }
    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
      return res.status(400).json({ success: false, message: "Email alredy exist" })
    }
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User alredy exist" })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const Profile_Pics = ['/ava.jpg', '/ava1.jpeg', '/cat.jpg', '/smile.jpg']
    const image = Profile_Pics[Math.floor(Math.random() * Profile_Pics.length)]

    const newUser = new User({
      email, username,
      password: hashedPassword,
      image
    })

    genereteTokenAndSetCookie(newUser._id, res)
    await newUser.save()
    res.status(200).json({ success: true, user: { ...newUser._doc, password: '' } })


  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: "Error singup" })
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie('jwt-netflix')
    res.status(200).json({ success: true, message: 'Logout worked' })
  } catch (error) {
    console.log(error, 'error logout')
  }
}

export async function authCheck(req, res) {

  try {
    res.status(200).json({ success: true, user: req.user })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ success: false, message: "authCheck is wrong" })
  }
}