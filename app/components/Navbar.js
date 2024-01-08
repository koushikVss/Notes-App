"use client"
import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../Context';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import "../globals.css"
const Navbar = () => {
  const router = useRouter()
  // Manage logged-in state, user information, and dropdown visibility
  const { user, setUser } = useContext(AppContext)
  const [showDropdown, setShowDropdown] = useState(false);
  // const router = useRouter();

  // Implement login/logout logic to update state
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdownElement = document.getElementById('profile-icon');
      // console.log("dropdown ", dropdownElement)
      // console.log("evemt target ", event.target)
      if (dropdownElement) {
        if (!dropdownElement.contains(event.target)) {
          setShowDropdown(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [showDropdown]);

  const handleProfileClick = (event) => {
    setShowDropdown(!showDropdown);

  };



  return (
    <nav className=" flex justify-between items-center px-1 py-1 text-gray-300">
      <Link href="/">
        {/* <img src="/logo.png" alt="Logo" className="h-8 w-auto mr-2" /> */}
        <span className="font-bold text-xl">Notes</span>
      </Link>

      {user && (
        <div className="flex space-x-2">
          <div>
            <div id="profile-icon" className='flex gap-x-3'>
              {user.name}
              <svg width="24" height="24" onClick={e => handleProfileClick(e)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            {/* <div>{user.name}</div> */}

          </div>
          {showDropdown ?
            <ul style={{ fontSize: '0.95rem' }} className="absolute right-3 bg-dropdown rounded-lg shadow-md py-4 mt-9 px-3 flex justify-center align-middle flex-col gap-y-2">
              <li>
                <Link href="/profile" onClick={e => { e.preventDefault() }}>Profile</Link>
              </li>
              <li>
                <Link href="/change-password">Change Password</Link>
              </li>
              <li style={{ borderTop: '1px solid white', marginTop: '0.rem' }}>
                <button style={{ marginTop: '1rem' }} onClick={async (e) => {

                  await fetch("/api/logout").then(res => res.json()).then(res => {
                    console.log("res", res)
                    if (res.loggedout) {

                      setUser(undefined)
                      localStorage.clear()
                      router.push("/login")
                    }
                  })
                }}>Logout</button>
              </li>
            </ul>
            : null
          }
        </div>
      )}

      {!user && (
        <div className="hidden md:flex space-x-2">
          <Link href="/login">Login</Link>
          <Link href="/signup">SignUp</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
