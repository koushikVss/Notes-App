
// import connectDB from '../../../dbConnection'
// import User from '../../../models/User'
import { Jwt } from 'jsonwebtoken';
import prisma from '../PrismaClient';

const getUsers = async (req, res) => {
  // await connectDB();
  // console.log("USER : ", User)
  // const users = await User.find()
  const users = await prisma.users.find()
  await prisma.$disconnect()

  res.json({ users });
};

const findUser = async (emailToFind) => {
  console.log(" em :",emailToFind)
  // const user = await User.find({ email: email })
  const user = await prisma.Users.findUnique({
    where: {
      email:emailToFind
    }
  })
  console.log("user ", user)

  // return user[0]
  return user
}

const createUser = async (req, res) => {
  // await connectDB();
  console.log(req.body)
  try {
    const existingUser = await findUser(req.body.email);
    if (existingUser !== undefined &&  existingUser !== null) {
      res.status(400).json({ message: 'User exists' });
      return
    }
    // const newUser = new User(req.body);
    // await newUser.save();
    const {email,password,name} = req.body
    const newUser = await prisma.users.create({
      data: {
        email, password,name
      }
    })
    await prisma.$disconnect()

    res.status(201).json({ message: 'User created successfully' });
    return 
  }
  catch (error) {
    console.log("error in adding user ", error.message)
    res.status(400).json({ message: 'Operation failed' });
  }

};


// export default { getUsers, createUser };
const handler = async (req, res) => {
  if (req.method === "GET")
    return Null//getUsers(req, res)
  else if (req.method === "POST") {
    // console.log("method ", req.body)
    return createUser(req, res)
  }
}
export default handler;
// export default createUser;


