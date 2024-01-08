// import connectDB from '../../../dbConnection'
// import User from '../../../models/User'
import middleware from '../middleware'
import jwt from 'jsonwebtoken'

import prisma from '../PrismaClient'


const login = async (req, res) => {
    // await connectDB()
    // const user = await User.findOne({ email: req.body.email, password: req.body.password })
    const { email, Password } = req.body
    const user = await prisma.users.findUnique({
        where: {
            email, Password
        }
    })
    await prisma.$disconnect()
    console.log("user: ", user)
    if (!user || user === null) {

        res.status(401).json({ message: "Invalid credentials try again" })
        return
    }

    const secretKey = process.env.SECRET_JWT

    const token = jwt.sign({ id: user.id.toString(), email: user.email }, secretKey, { expiresIn: '30m' })
    res.status(200).json({ message: "logged in", token: token })
}


const handler = (req, res) => {
    if (req.method === "POST") {
        login(req, res)
    }
}
export default handler;
