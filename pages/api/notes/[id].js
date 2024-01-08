
// import Notes from ".././../../models/Notes"
import middleware from "../middleware";
// import connectDB from "../../../dbConnection";
import { ObjectId } from "mongodb";
import prisma from "../PrismaClient";
async function getNote(req, res) {

    // console.log("into id note")
    // console.log(req.query)
    // await connectDB()
    // const note = await Notes.findOne({ _id: new ObjectId(req.query.id) })
    const note = await prisma.notes.findUnique({
        where: {
            id: req.query.id
        }
    })
    await prisma.$disconnect()

    res.status(200).json({ note })

}

async function updateNotes(req, res) {
    console.log("updating")
    console.log(req.body)
    try {
        // await Notes.findOneAndUpdate({ _id: req.query.id }, { updatedAt: Date.now(), title: req.body.title, note: req.body.note })
        const note = await prisma.notes.findUnique({
            where: {
                id: req.query.id
            }
        })
        if (note) {
            note.title = req.body.title
            note.note = req.body.note
            note.updatedAt = new Date().toISOString()
            const UpdatedNote = await prisma.notes.update({
                where: {
                    id: req.query.id
                },
                data: note
            })

        }
        else {
            await prisma.$disconnect()

            res.status(500).json({ message: "Note not found for Updating Note" })

        }

        await prisma.$disconnect()

        res.status(200).json({ message: "Note Updated" })
    }
    catch (err) {
        console.log("err ", err)
        await prisma.$disconnect()

        res.status(500).json({ message: "Error Updating Note" })

    }
}


async function Handler(req, res) {
    // await connectDB()
    console.log("into get one noyte")
    await middleware(req, res)
    if (req.method === "GET")
        return getNote(req, res)
    else if (req.method === "PUT")
        return updateNotes(req, res)
    else
        return Null
}

export default Handler;