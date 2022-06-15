import Link from 'next/link'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { MdOutlineClose } from 'react-icons/md'
import { useAuthContext } from '../context/Auth'

const Topbar = ({ show, setShow }) => {
	const router = useRouter()
	const { user, routes } = useAuthContext()
	useEffect(() => {
		let validPaths = []
		routes && routes.forEach((route) => {
			validPaths.push(route.path)
		})
		validPaths.push('/')
		validPaths.push('/profile-edit')
		validPaths.push('/notifications')
		if (!validPaths.includes(router.pathname)) {
			router.push(validPaths[0])
		}
	}, [router, routes]);
	return (
		<>
			<div className={user ? 'lg:block hidden w-10/12 fixed left-position border-b top-6 h-20 bg-white shadow-lg z-50 Nunito rounded-tr-3xl' : 'hidden'}>
				<div className='flex justify-between px-5 items-center h-20'>
					{
						routes && routes.map((nav) => {
							return <Link href={nav.path} key={nav.path}><p className='cursor-pointer p-3 accent-color py-1 rounded-md'>{nav.tab}</p></Link>
						})
					}
				</div>
			</div>

			{user ? <div className={show ? 'sm:block lg:hidden w-full h-screen fixed top-0 left-0 bg-white Nunito duration-300 zindex2000' : 'zindex2000 sm:block w-full h-screen fixed top-0 left-full bg-white Nunito duration-300'}>
				<div className='absolute top-5 right-5 p-3 bg-gray-200 bg-opacity-50 rounded-full' onClick={() => { setShow(false) }}><MdOutlineClose /></div>
				<div className='flex flex-col w-full justify-evenly h-5/6 text-center font-bold text-lg mt-8'>
					{
						routes && routes.map((nav) => {
							return <Link key={nav.path} href={nav.path}>{nav.tab}</Link>
						})
					}
				</div>
			</div> : null}
		</>
	)
}

export default Topbar