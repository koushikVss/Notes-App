// import Notes from "../../../models/Notes"
import middleware from "../middleware"
// import { ObjectId } from "mongodb"

import prisma from "../PrismaClient";
// import connectDB from "../../../dbConnection";

async function getNotes(req, res) {
    // await middleware(req, res);
    // const notes = await Notes.find({ used: req.user._id })
    // console.log("psma note ", prisma.notes)
    const notes = await prisma.notes.findMany({
        where: {
            userId: req.user.id
        }
    })
    await prisma.$disconnect()

    res.status(200).json({ notes })
}

async function addNotes(req, res) {
    // await middleware(req, res);
    console.log("backed adding noye")
    // const ID = new ObjectId()
    const userId = req.user.id
    console.log(" req body ", req.body)
    // const now = new Date();
    const currentDateTime =new Date().toISOString()
    // const notes = new Notes({ _id: ID, title: '', note: '', user: userId, updatedAt: Date.now(), createdAt: Date.now() })
    try {
        const newNote = await prisma.notes.create({
            data: {
                title: '', note: '', userId: userId, updatedAt: currentDateTime, createdAt: currentDateTime
            }
        })
        // console.log(" note: ", { _id: ID, title: req.body.title, note: req.body.note, user: req.user.id, updatedAt: Date.now(), createdAt: Date.now() })
        console.log("saving notes ",newNote)
        // await notes.save()
        console.log("saved")
        await prisma.$disconnect()

        res.status(201).json({ message: "Note Added", ID: newNote.id })
        return
    }
    catch (err) {
        console.log(err.message)
        await prisma.$disconnect()
        res.status(500).json({ message: "Error Adding Note" })

    }
}



async function Handler(req, res) {
    // await connectDB()

    console.log("into notes route ")
    await middleware(req, res)

    console.log("after middel ", req.user)
    if (req.method === "GET")
        return getNotes(req, res)
    else if (req.method === "POST") {
        console.log("posy note")
        return addNotes(req, res)
    }
    else if (req.method === "PUT")
        return updateNotes(req, res)
    else
        return Null

}



export default Handler;
