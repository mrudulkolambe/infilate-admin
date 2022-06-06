import React from 'react'
import { GrClose } from 'react-icons/gr'

const PublisherDBDetailsModal = ({ display, setDisplay }) => {
	return (
		<>
			<div className={display ? 'opacity-100 duration-300 h-screen w-screen bg-black bg-opacity-30 fixed top-0 left-0 zindex1000' : 'opacity-0 pointer-events-none duration-300 h-screen w-screen bg-black bg-opacity-10 fixed top-0 left-0 zindex1000'}></div>
			<div className={display ? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 zindex2000 bg-white rounded-lg shadow-lg lg:w-5/12 w-11/12 md:w-8/12 flex justify-center py-10 items-center flex-col' : 'hidden'}>
				<div className='absolute right-3 top-4 hover:bg-gray-200 duration-150 h-8 w-8 flex items-center justify-center cursor-pointer rounded-full' onClick={() => { setDisplay(false) }}>
					<GrClose />
				</div>
				<div className='flex w-full flex-col lg:flex-row'>
					<div className='lg:w-1/3 w-11/12 flex items-center justify-center flex-col'>
						<img className='h-20 w-20 rounded-lg' src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg" alt="" />
						<div className='w-full mt-4 font-bold text-lg'>
							Pratit Todkar
						</div>
						<button className='px-3 py-1 bg-gray-900 text-white font-bold hover:bg-gray-700 duration-200 rounded-lg mt-2'>Approve KYC</button>
					</div>
					<div className='w-2/3 px-4'>
						<div className='text-left w-11/12 mt-2 font-bold text-lg'>
							Email: PratitTodkar@gmail.com
						</div>
						<div className='text-left w-11/12 mt-1 font-bold text-lg'>
							Phone: 7057094772
						</div>
						<div className='text-left w-11/12 mt-1 font-bold text-lg'>
							Pan Card No.: 7057094772
						</div>
						<div className='text-left w-11/12 mt-1 font-bold text-lg'>
							Aadhaar No.: 7057094772
						</div>
						<div className='text-left w-11/12 mt-1 font-bold text-lg'>
							KYC Status.: Pending
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default PublisherDBDetailsModal