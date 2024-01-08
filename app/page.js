"use client"
import Image from 'next/image'
import Link from 'next/link'
import Hoc from './Hoc'
import "./globals.css"
import axios from 'axios'
import Navbar from "./components/Navbar"
import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
function Home() {
  const [notes, setNotes] = useState([])
  const [windowWidth, setWindowWidth] = useState(12)
  const router = useRouter()
  const getNotes = async () => {
    await axios.get("/api/notes", {
      headers: {
        'Authorization': `bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => {
        setNotes(res.data.notes)
      })

  }

  useEffect(() => {
    getNotes()
  }, [])
  useEffect(() => {
    const handleResize = () => setWindowWidth(parseInt(window.innerWidth * 0.03));
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove the event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  const AddNote = async () => {
    console.log("addint note")
    await axios.post("/api/notes", { title: '', note: '' }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },

    })
      .then(res => {
        console.log("dat ", res.data)
        router.push(`/note/${res.data.ID}`)
      })
      .catch(err => {
        console.log("er ", err.message)
        console.log("error adding note")
      })
  }
  // useEffect(()=>{

  // },[])
  return (
    <div>

      <div className='overflow-hidden text-overflow-ellipsis whitespace-nowrap' style={{ color: 'rgb(30,30,30)' }}>
        lorem ipysjn -
        {
          windowWidth
        }
      </div>
      <div className='m-2 md:m-8 lg:m-12 flex flex-wrap gap-x-2 sm:gap-x-2 md:gap-x-3 lg:gap-x-3 justify-start text-white'>
        {
          notes.map(note => <div onClick={e => router.push(`/note/${note.id}`)} key={note.id} style={{ border: '1px solid rgb(110,110,110)', borderRadius: '2px' }}
            className='  mt-2 flex flex-col px-3 sm:px-3 md:px-3 lg:px-3 py-2 lg:py-4 sm:py-1 md:py-1  '>
            <div className='overflow-hidden text-overflow-ellipsis whitespace-nowrap' style={{ fontSize: '1.4rem' }} >
              {
                note.title.length > windowWidth ? `${note.note.slice(0, windowWidth)}..` : note.title
              }

            </div>

            {
              note.title.trim().length === 0 && note.note.trim().length === 0 ?
                <pre className='px-4 py-4' style={{ width: '3rem', height: '2rem', fontSize: '1rem', color: 'rgb(19, 19, 22)' }}>
                </pre>
                :
                note.note.length > windowWidth ?



                  <pre className='' style={{ fontSize: '1rem', color: 'rgb(100,100,100)' }}>

                    {note.note.slice(0, windowWidth * 3)}..
                  </pre>
                  :
                  <pre className='' style={{ fontSize: '1rem', color: 'rgb(100,100,100)' }}>

                    {note.note}
                  </pre>

            }

          </div>)
        }
      </div>
      <button type="button" style={{ fontSize: '1rem', padding: '0.6rem 1.2rem 0.6rem 1.2rem' }} className="flex justify-center align-middle fixed bottom-0 right-0 mb-8 mr-8 bg-gray-500 hover:bg-gray-700 rounded-full text-white text-xl   shadow-lg ">
        <span style={{ marginBottom: 4 }} onClick={e => AddNote()}>
          +
        </span>
      </button>
    </div>
  )
}

export default Hoc(Home)
