"use client"
import { useEffect, useState,useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AppContext } from "../Context";
import "../globals.css"
const login = () => {

    // const {user,setUser} = useContext(AppContext)
    const [trigger, setTrigger] = useState(true)
    const router = useRouter()


    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setmessage] = useState(" ")
    const Register = async (e) => {
        e.preventDefault()
        axios.post("/api/users", { name: username, email, password }).then(res => {
            console.log(res)
            setTrigger(true)
            setUsername("")
            setEmail("")
            setmessage("Registered Successs!!!")
            setPassword("")
        }).catch(err => {
            console.log("error ", err.response.data)

            setmessage(err.response.data.message)


        })
    }

    const Login = (e) => {
        e.preventDefault()
        setmessage("Logging in...")
        axios.post("/api/login", { email, password })
            .then(res => {
                if (res.status === 200) {

                    setmessage("Logged In...")

                    localStorage.setItem("token", res.data.token)


                    router.push("/")
                }
            })
            .catch(err => {
                console.log("error")
                setmessage(err.response.data.message)
            })


    }
    return (
        <div className=" flex justify-start text-center align-middle flex-col mt-7">
            <div style={{}} className="text-white text-lg sm:text-xl flex justify-center gap-x-1">
                Takes Notes Anywhere!
            </div>
            <div className="text-white mt-4 " style={{ display: 'block', fontFamily: 'monospace' }}>
                <span>
                    {message.trim("") === "" ? "   " : message}
                </span>
            </div>
            <div className="text-white flex justify-center align-middle gap-x-4 mt-8 mb-11 w-full mx-auto sm:w-3/4 md:w-1/2 lg:w-1/4 xl:w-1/4 " style={{}}>
                <button onClick={e => setTrigger(true)} className="w-1/2 px-2 py-3" style={{ fontSize: '0.7rem', backgroundColor: !trigger ? "rgb(50,50,50)" : "" }}>Login</button>
                <button onClick={e => setTrigger(false)} className="w-1/2 px-2 py-3" style={{ fontSize: '0.7rem', backgroundColor: trigger ? "rgb(50,50,50)" : "" }}>Register</button>
            </div>
            {
                trigger ?
                    <form id='login-page' className="flex justify-center align-bottom flex-col gap-y-5 ">
                        <input value={email} onChange={e => setEmail(e.target.value)} style={{ fontSize: '0.7rem' }} className="text-white bg-dropdown py-3 px-3 w-full mx-auto sm:w-3/4 md:w-1/2 lg:w-1/4 xl:w-1/4 " type="email" required placeholder="Username or Email" />
                        <input value={password} onChange={e => setPassword(e.target.value)} style={{ fontSize: '0.7rem' }} className="text-white bg-dropdown py-3 px-3 w-full mx-auto sm:w-3/4 md:w-1/2 lg:w-1/4 xl:w-1/4" type="password" required placeholder="Password" />
                        <button onClick={Login} style={{ fontSize: '0.7rem',backgroundColor:'rgb(50,50,50)' }} className="font-bold text-white py-3 px-3 w-full mx-auto sm:w-3/4 md:w-1/2 lg:w-1/4 xl:w-1/4" type="submit" >Login</button>
                    </form>
                    :
                    <form id='register-page' className="flex justify-center align-bottom flex-col gap-y-5 ">

                        <input value={username} onChange={e => setUsername(e.target.value)} style={{ fontSize: '0.7rem' }} className="text-white bg-dropdown py-3 px-3 w-full mx-auto sm:w-3/4 md:w-1/2 lg:w-1/4 xl:w-1/4 " type="text" required placeholder="Username" />
                        <input value={email} onChange={e => setEmail(e.target.value)} style={{ fontSize: '0.7rem' }} className="text-white bg-dropdown py-3 px-3 w-full mx-auto sm:w-3/4 md:w-1/2 lg:w-1/4 xl:w-1/4" type="email" required placeholder="Email" />
                        <input value={password} onChange={e => setPassword(e.target.value)} style={{ fontSize: '0.7rem' }} className="text-white bg-dropdown py-3 px-3 w-full mx-auto sm:w-3/4 md:w-1/2 lg:w-1/4 xl:w-1/4" type="password" required placeholder="Password" />
                        <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} style={{ fontSize: '0.7rem' }} className="text-white bg-dropdown py-3 px-3 w-full mx-auto sm:w-3/4 md:w-1/2 lg:w-1/4 xl:w-1/4" type="password" required placeholder="Retype password" />
                        <button onClick={Register} style={{ fontSize: '0.7rem',backgroundColor:'rgb(50,50,50)' }} className="font-bold text-white py-3 px-3 w-full mx-auto sm:w-3/4 md:w-1/2 lg:w-1/4 xl:w-1/4" type="submit" >Register</button>
                    </form>
            }
        </div>
    )
}
export default login;
