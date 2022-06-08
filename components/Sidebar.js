import React, { useState } from "react";
import { FaRegLifeRing, FaBars } from "react-icons/fa";
import { useAuthContext } from "../context/Auth";
import Link from 'next/link'

const Sidebar = ({ setShow }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useAuthContext()
  return (
    <>
      <div className="lg:block hidden fixed w-2/12 bg-white border-r shadow-xl h-screen p-3 pt-0 Nunito">
        <div className="flex items-center h-20 justify-center">
          <h1 className="font-bold text-5xl text-center">infilate</h1>
        </div>
        <div>
          <div className="flex flex-col items-center mt-8">
            <img
              className="h-40 w-40 rounded-lg"
              src={user && user.photoURL || "https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg"}
            />
            <h2 className="mt-3 font-bold">{user && user.email}</h2>
            {
              user ? <button className="w-7/12 font-bold py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 duration-200 mt-5">
                Edit
              </button> : null
            }
            <button className="w-7/12 font-bold py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 duration-200 mt-4 flex items-center justify-center">
              <FaRegLifeRing />
              <p className="ml-2">Support</p>
            </button>
            {user ? <button className="w-7/12 font-bold py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 duration-200 mt-4">
              Logout
            </button>
              :null
            }
          </div>
        </div>
      </div>

      <div className='fixed left-0 top-0 px-4 md:px-12 flex items-center justify-between Nunito lg:hidden h-20 bg-red-400 w-full zindex1000'>
        <div className="flex items-center"><FaBars className="mr-4" onClick={() => { setShow(true) }} /><h1 className="text-3xl font-bold">Infilate</h1></div>
        <div className="relative">
          <img className="h-10 w-10 rounded-full" src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg" alt="" onClick={() => { showMenu ? setShowMenu(false) : setShowMenu(true) }} />
          <div className={showMenu ? 'origin-top-right absolute top-full mt-2 rounded-lg shadow-lg right-2/3 w-48 p-3 bg-white scale-100 duration-300' : 'origin-top-right absolute top-full mt-2 rounded-lg shadow-lg right-2/3 w-48 p-3 bg-gray-300 scale-0 duration-300'}>
            {user ? <button className="w-full font-bold py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 duration-200 my-2 mt-0">
              Edit
            </button> : null}
            <button className="w-full font-bold py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 duration-200 my-2 mt-0 flex items-center justify-center">
              <FaRegLifeRing />
              <p className="ml-2">Support</p>
            </button>
            {
              user ? <button className="w-full font-bold py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 duration-200 mt-0">
                Logout
              </button> : null
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
