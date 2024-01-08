"use client"
import { useEffect, useState, useRef } from "react"
import "../../globals.css"
import Hoc from '../../Hoc'
import { useRouter } from "next/navigation"
import axios from "axios"
import { usePathname } from "next/navigation"
function NoteID(props) {
    const router = useRouter()
    const pathname = usePathname()
    const [query, setQuery] = useState(null)
    const [note, setNote] = useState("")
    const [title, setTitle] = useState("")
    const [cursor, setCursor] = useState(9)
    const [text, setText] = useState("")
    const [value, setValue] = useState("")
    const [makingUndo, setMakingUndo] = useState(false)
    const [noteStates, setNoteStates] = useState([null, null, null, null, null, null, null, null, null, null])
    const textAreaRef = useRef(null)
    const textTitleRef = useRef(null)


    useEffect(() => {
        const handleUnload = async (text, title) => {
            console.log("leaving window.,,: ", title, ' - ', text)
            // if (event) {
            //     event.returnValue = ''; 
            // }
            if (text) {

                if (text.length !== 0 && title.length !== 0)
                    await updateDB(text, title)
            }
        };

        window.addEventListener('unload', () => handleUnload(text, title));


        return () => window.removeEventListener('beforeunload', handleUnload(text, title));
    }, [text, title]);
    // useNotepad(textAreaRef.current, value)
    useEffect(() => {
        const textCurrent = textAreaRef.current
        if (textCurrent !== null && textCurrent !== undefined) {

            textCurrent.style.height = "0px"
            const scrollHeight = textCurrent.scrollHeight
            textAreaRef.current.style.height = `${scrollHeight}px`
            // console.log("text height ", textCurrent.height)
        }
    }, [textAreaRef, text])

    useEffect(() => {
        const textCurrent = textTitleRef.current
        if (textCurrent !== null && textCurrent !== undefined) {

            textCurrent.style.height = "0px"
            const scrollHeight = textCurrent.scrollHeight
            textTitleRef.current.style.height = `${scrollHeight}px`
            // console.log("text height ", textCurrent.height)
        }
    }, [textTitleRef, title])

    const id = pathname.split("/")[2]

    useEffect(() => {
        axios.get(`/api/notes/${id}`, {
            headers: {
                'Authorization': `bearer ${localStorage.getItem("token")}`
            }
        })
            .then(async res => {
                console.log("fetched data ", res.data)
                console.log("setting data ")
                setText(res.data.note.note)
                setTitle(res.data.note.title)
                // handleUnload(null, res.data.note.note, res.data.note.title)
                await push(res.data.note.note, res.data.note.title)
            })
    }, [])

    const compareTheText = (a, b) => {

        console.log("a ", a)
        console.log("b ", b)
        if (a === null || a.trim().length === 0)
            return true
        else {
            if (b.startsWith(a)) {
                console.log("retyrn false")
                return false

            }
        }
        console.log("retyrn trye")

        return true
    }

    const updateDB = async (txt, title) => {
        // console.log("updating db - ", txt, '- ', title)
        await axios.put(`/api/notes/${id}`, {
            title: title,
            note: txt
        }, {
            headers: {
                'Authorization': `bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                // console.log(res)
            })
            .catch(err => {
                console.log("err ", err.message)
            })
    }

    const push = async (value, title) => {

        // console.log(" push function val: ", value)
        let currentState = [...noteStates]
        const [, ...last9] = currentState
        currentState = [...last9, value]
        setCursor(9)
        // console.log("current syate : ", currentState)
        // console.log("update from push")
        setNoteStates(currentState)
        // console.log("")
        // await updateDB(value, title)

    }

    const updateNoteStates = (type, value, reset) => {
        // console.log("inside -> ", "type: ", type, "vlaue: ", value, "reset: ", reset)
        let currentState = [...noteStates]
        if (reset) {

        }
        if (type === "push") {

            // console.log("pushing")

            if (value.charAt(value.length - 1) === " " || value.charAt(value.length - 1) === "," || value.charAt(value.length - 1) === "." || value.charAt(value.length - 1) === "!" || value.charAt(value.length - 1) === "?") {

                push(value, title)

            }
            setText(value)

        }
        if (type === "undo") {

            // console.log("undo ")
            // console.log("current syate : ", noteStates)
            // console.log("cursor ", cursor)

            if (cursor > 0) {
                if (cursor - 1 >= 0) {
                    if (noteStates[cursor] !== null)
                        setText(noteStates[cursor - 1])
                    setCursor(cursor - 1)
                }
                else {
                    setNoteStates(null)
                }

            }
        }
        if (type === "redo") {
            // console.log("redo")

            if (cursor < 9) {
                setText(noteStates[cursor + 1])

                const newCursor = cursor + 1
                setCursor(newCursor)
            }
        }
    }
    const handleNotePadChange = (event, fun) => {
        const val = event.target.value
        // console.log("val ", val)
        fun(val)
    }
    return (<div className="flex flex-col gap-y-4 py-3 w-full" style={{ padding: 0, minHeight: '100dvh' }}>
        <div className="flex flex-wrap  justify-between text-white">
            <div>
                <button onClick={async e => {
                    await updateDB(text, title)
                    router.push("/")
                }}>back</button>
            </div>
            <div className="flex gap-x-6">

                <button style={{
                    color: cursor === 0 ? 'rgb(40, 40, 40)' : noteStates[cursor] === null ? 'rgb(40, 40, 40)' : 'white'
                }} onClick={e => updateNoteStates("undo", null, false)}>undo</button>
                <button onClick={e => updateNoteStates("redo", null, false)}>redo</button>
            </div>
        </div>
        <textarea
            onChange={e => {
                handleNotePadChange(e, setTitle)
            }}
            ref={textTitleRef}
            value={title}
            rows={1}
            style={{ backgroundColor: "rgb(19, 19, 22)", border: 'none' }}
            type="text"
            className="mt-2 no-input w-full text-2xl"//text-overflow: ellipsis" // Updated classes
            placeholder="Enter note title"
        >

        </textarea>
        <textarea
            // style={{ border: '2px solid white' }}
            ref={textAreaRef}
            rows={1}
            value={text === null ? "" : text}
            style={{ backgroundColor: 'rgb(19, 19, 22)' }}
            onChange={e => {
                handleNotePadChange(e, setText)
                updateNoteStates("push", e.target.value)
            }}
            className="mt-2 no-input w-full h-full resize-none notepad"
            placeholder="Note...">

        </textarea>

    </div >)
}

export default Hoc(NoteID)