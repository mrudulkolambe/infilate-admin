import React, { useRef, useState } from 'react'
import { useAuthContext } from '../context/Auth'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import Spinner from '../components/Spinner'
import { useRouter } from 'next/router'

const ProfileEdit = () => {
	const imageInput = useRef()
	const { user } = useAuthContext()
	const [loading, setLoading] = useState(false)
	const router = useRouter()
	return (
		<>
			<div className='hidden lg:block left-position absolute top-24 mt-2 px-10 py-6 Nunito w-10/12 bg-white z-20'>
				<div className='flex items-center cursor-pointer mt-7' onClick={() => {router.back()}}><MdKeyboardArrowLeft className='mr-1 text-3xl' />  Back to campaign list</div>
				<div className='flex mt-6 sticky'>
					<div className='px-2 w-3/12'>
						<div className='flex flex-col items-center'>
							<img className='h-5/6 w-5/6' src={user && user.photoURL || "https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg"} alt="" />
							<input type="file" accept='image/png, image/jpg, image/jpeg' className='hidden' ref={imageInput} />
							<button disabled={loading} onClick={() => {imageInput.current.click()}} className='px-3 py-1 bg-gray-900 rounded-lg text-white font-bold hover:bg-gray-700 duration-200 mt-3 flex items-center'>{loading ? <Spinner/> : 'Upload'}</button>
							<h1 className='mt-2 text-3xl font-bold text-center'>{user && user.displayName}</h1>
						</div>
					</div>
					<div className='px-2 w-9/12'>
						<div className='flex'>
							<div className='mx-1 px-8 rounded-lg py-4 w-8/12 bg-red-300'>Payout upto 32%</div>
							<div className='mx-1 px-8 rounded-lg py-4 w-4/12 bg-green-300'>Active</div>
						</div>
						<div className='flex mt-4'>
							<div className='mx-1 px-8 rounded-lg py-4 w-3/12 bg-red-300'>CPS</div>
							<div className='mx-1 px-8 rounded-lg py-4 w-6/12 bg-red-300'>{user && user.displayName}</div>
							<div className='mx-1 px-8 rounded-lg py-4 w-3/12 bg-green-300'>11</div>
						</div>
						<div className='flex mt-4'>
							<div className='mx-1 px-8 rounded-lg overflow-scroll py-4 w-full h-72 bg-green-300'>{user && user.email}</div>
						</div>
					</div>
				</div>
			</div>

			<div className='lg:hidden sm:block absolute top-20 px-7 py-3 Nunito w-full bg-white z-20'>
				<div className='flex items-center cursor-pointer mt-4'  onClick={() => {router.back()}}><MdKeyboardArrowLeft className='mr-1 text-3xl' />  Back to campaign list</div>
				<div className='flex flex-col mt-6'>
					<div className='px-2 w-full'>
						<div className='flex flex-col items-center'>
							<img className='h-4/6 w-4/6 md:h-3/6 md:w-3/6' src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg" alt="" />
							<h1 className='mt-4 text-3xl font-bold text-center'>Python</h1>
						</div>
					</div>
					<div className='w-full'>
						<div className='flex flex-col'>
							<div className='my-1  px-8 rounded-lg py-4 w-full bg-red-300'>Payout upto 32%</div>
							<div className='my-1  px-8 rounded-lg py-4 w-full bg-green-300'>Active</div>
						</div>
						<div className='flex mt-4 flex-col'>
							<div className='my-1  px-8 rounded-lg py-4 w-full bg-red-300'>Payout upto 32%</div>
							<div className='my-1  px-8 rounded-lg py-4 w-full bg-red-300'>Payout upto 32%</div>
							<div className='my-1  px-8 rounded-lg py-4 w-full bg-green-300'>Active</div>
						</div>
						<div className='flex mt-4'>
							<div className=' px-8 rounded-lg overflow-scroll py-4 w-full h-72 bg-green-300'>Active</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ProfileEdit