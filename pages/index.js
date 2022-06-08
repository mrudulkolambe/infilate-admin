import { useState } from 'react'
import HeadComponent from "../components/HeadComponent";
import Sidebar from "../components/Sidebar";
import Spinner from '../components/Spinner';
import Topbar from "../components/Topbar";
import { useAuthContext } from "../context/Auth";

export default function Home() {
  const { handleSignIn } = useAuthContext()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const signIn = () => {
    setLoading(true)
    handleSignIn(email, password)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }
  return (
    <>
      <Sidebar />
      <Topbar />
      <HeadComponent title={'Authentication'} />
      <div className='hidden lg:flex left-position absolute top-20 px-5 py-6 Nunito w-10/12 justify-center items-center calc-height'>
        <div className='w-6/12 shadow-lg p-5 rounded-lg border'>
          <h1 className="text-center font-bold text-3xl mb-6">Infilate Authentication</h1>
          <div className='flex flex-col items-start mt-3'>
            <label htmlFor='email' className='font-bold text-gray-600 cursor-pointer'>Email Id</label>
            <input id='email' value={email} onChange={(e) => { setEmail(e.target.value) }} className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='eg. user@gmail.com' />
          </div>
          <div className='flex flex-col items-start mt-3'>
            <label htmlFor='password' className='font-bold text-gray-600 cursor-pointer'>Password</label>
            <input id='password' value={password} onChange={(e) => { setPassword(e.target.value) }} className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='********' />
          </div>
          <div>
            <button onClick={signIn} className='flex items-center justify-center text-white font-bold bg-gray-900 duration-200 px-3 py-2 rounded-lg hover:bg-gray-700 mt-5 w-full'>{loading ? <Spinner /> : 'Sign In'}</button>
          </div>
        </div>
      </div>

      <div className='lg:hidden sm:block absolute top-20 px-5 py-6 Nunito w-full flex flex-col md:flex-row  justify-center items-center calc-height'>
        <div className='w-full shadow-lg p-3 rounded-lg mt-5'>
          <h1 className='mt-4 font-bold text-4xl'>Infilate Authentication</h1>
          <div className='flex flex-col items-start mt-3'>
            <label htmlFor='email' className='font-bold text-gray-600 cursor-pointer'>Email Id</label>
            <input id='email' value={email} onChange={(e) => { setEmail(e.target.value) }} className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='eg. user@gmail.com' />
          </div>
          <div className='flex flex-col items-start mt-3'>
            <label htmlFor='password' className='font-bold text-gray-600 cursor-pointer'>Password</label>
            <input id='password' value={password} onChange={(e) => { setPassword(e.target.value) }} className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='********' />
          </div>
          <div>
            <button onClick={signIn} className='text-white font-bold bg-gray-900 duration-200 px-3 py-2 rounded-lg hover:bg-gray-700 mt-3 w-full'>Send Mail</button>
          </div>
        </div>
      </div>
    </>
  )
}
