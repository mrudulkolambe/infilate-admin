import { useState } from 'react'
import Sidebar from "../components/Sidebar";
import Spinner from '../components/Spinner';
import Topbar from "../components/Topbar";
import { useAuthContext } from "../context/Auth";
import Link from 'next/link'

export default function poc() {
	const { POCFunc } = useAuthContext()
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false)
	const signIn = () => {
		setLoading(true)
		POCFunc(email, phone, name)
		setTimeout(() => {
			setLoading(false)
		}, 1000);
	}
	return (
		<>
			<Sidebar />
			<Topbar />
			<div className='hidden lg:flex left-position absolute top-20 px-5 py-6 Nunito w-10/12 justify-center items-center calc-height'>
				<div className='w-6/12 shadow-lg p-5 rounded-lg border'>
					<h1 className="text-center font-bold text-3xl mb-6">Infilate POC</h1>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='name' className='font-bold text-gray-600 cursor-pointer'>Name</label>
						<input id='name' value={name} onChange={(e) => { setName(e.target.value) }} className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='John Doe' />
					</div>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='email' className='font-bold text-gray-600 cursor-pointer'>Email Id</label>
						<input id='email' value={email} onChange={(e) => { setEmail(e.target.value) }} className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='eg. user@gmail.com' />
					</div>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='email' className='font-bold text-gray-600 cursor-pointer'>Phone Number</label>
						<input id='number' value={phone} onChange={(e) => { setPhone(e.target.value) }} className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='1234567890' />
					</div>
					<div>
						<button onClick={signIn} className='flex items-center justify-center text-white font-bold bg-gray-900 duration-200 px-3 py-2 rounded-lg hover:bg-gray-700 mt-5 w-full'>{loading ? <Spinner /> : 'Add'}</button>
					</div>
				</div>
			</div>

			<div className='lg:hidden sm:block absolute top-20 px-5 py-6 Nunito w-full flex flex-col md:flex-row  justify-center items-center calc-height'>
				<div className='w-full shadow-lg p-3 rounded-lg mt-5'>
					<h1 className='mt-4 font-bold text-4xl'>Infilate Sign Up</h1>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='name' className='font-bold text-gray-600 cursor-pointer'>Name</label>
						<input id='name' value={name} onChange={(e) => { setName(e.target.value) }} className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='John Doe' />
					</div>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='email' className='font-bold text-gray-600 cursor-pointer'>Email Id</label>
						<input id='email' value={email} onChange={(e) => { setEmail(e.target.value) }} className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='eg. user@gmail.com' />
					</div>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='email' className='font-bold text-gray-600 cursor-pointer'>Phone Number</label>
						<input id='email' value={phone} onChange={(e) => { setPhone(e.target.value) }} className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='1234567890' />
					</div>
					<div>
						<button onClick={signIn} className='text-white font-bold bg-gray-900 duration-200 px-3 py-2 rounded-lg hover:bg-gray-700 mt-3 w-full'>{loading ? <Spinner /> : "Add"}</button>
					</div>
				</div>
			</div>
		</>
	)
}
