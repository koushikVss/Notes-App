"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import navbarComponent from "../components/Navbar";
export default function Page() {
    const [val, setval] = useState(null);
    let d = "null";
    d = localStorage.getItem("test")

    // useEffect(() => {

    //     if (typeof window !== "undefined" && window.localStorage) {

    //         d = localStorage.getItem("test")
    //         setval(d)

    //         document.getElementById("flag").innerText = d
    //     }
    // }, [])
    return (<>
    <navbarComponent />
        <div>Test Page {val}</div>
        <h1 id="flag"></h1>
        <Link href="/test/insidetest">InsideTest {d}</Link>
    </>
    )
}

