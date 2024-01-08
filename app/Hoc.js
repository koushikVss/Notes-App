"use client"
import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from './Context';
import axios from 'axios';
import login from './login/page';
import { useRouter } from 'next/navigation';
function Hoc(WrappedComponent) {
    return () => {
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        const {user, setUser} = useContext(AppContext)
        const router = useRouter()
console.log("making hoc")
        useEffect(() => {
            // Replace this with your API call to check if user is logged in
            axios.get('/api/authorize', {
                headers: {
                    'Authorization': `bearer ${localStorage.getItem("token")}`
                }
            })
                .then((data) => {
                    console.log("data ", data)
                    setIsLoggedIn(data.data.authorized)
                    setUser(data.data.user)
                })
                .catch(err => {
                    console.log("authorize err ", err.response.data)
                    router.push("/login")

                })
        }, []);
        // console.log(isLoggedIn)

        return isLoggedIn ? <WrappedComponent  /> : null
    }
};

export default Hoc;
