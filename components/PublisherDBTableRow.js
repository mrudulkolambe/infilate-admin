import { data } from 'autoprefixer'
import React, { useState } from 'react'
import PublisherDBDetailsModal from './PublisherDBDetailsModal'

const PublisherDBTableRow = ({ data }) => {
	const [display, setDisplay] = useState(false)
	return (
		<>
			<PublisherDBDetailsModal display={display} data={data} setDisplay={setDisplay} />
			<tr className={data && data.kyc === 'Approved' ? 'cursor-pointer bg-green-100 hover:bg-green-200 duration-150 py-3 w-full border-b' : 'cursor-pointer hover:bg-gray-100 duration-150 py-3 w-full border-b'}>
				<td className='w-2/12 px-2 py-3 whitespace-nowrap text-ellipsis overflow-hidden'>{data && data.id}</td>
				<td className='w-2/12 px-2 py-3 whitespace-nowrap text-ellipsis overflow-hidden'>{data && data.name}</td>
				<td className='w-2/12 px-2 py-3 whitespace-nowrap text-ellipsis overflow-hidden'>{data && data.email}</td>
				<td className='w-2/12 px-2 py-3 whitespace-nowrap text-ellipsis overflow-hidden'>{data && data.phone || 'Not Submitted'}</td>
				<td className='w-2/12 px-2 py-3 whitespace-nowrap text-ellipsis overflow-hidden'>
					<div className='w-full h-full flex justify-center'>
						<img src={data && data.photoURL || "https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg"} className='aspect-square h-12 rounded-full' alt="" />
					</div>
				</td>
				<td className='w-2/12 px-2 py-3 whitespace-nowrap text-ellipsis overflow-hidden'>
					<button className='bg-gray-900 text-white font-bold px-3 py-1 duration-200 rounded-lg hover:bg-gray-700' onClick={() => { setDisplay(true) }}>Details</button>
				</td>
			</tr>
		</>
	)
}

export default PublisherDBTableRow