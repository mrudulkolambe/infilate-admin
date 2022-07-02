import React from 'react'
import { useEmployeeAccess } from '../../context/employeeAccessFile'
import { BiLinkExternal } from 'react-icons/bi'
import { useRouter } from 'next/router'

const PublisherAccess = () => {
	const { employeeData } = useEmployeeAccess()
	const router = useRouter()

	return (
		<>
			<div className='hidden lg:block left-position absolute top-24 mt-2 px-10 py-6 Nunito w-10/12 bg-white z-20'>
				{
					employeeData && employeeData.map((data) => {
						return <div className='border rounded-lg p-4 flex bg-white shadow-lg mt-3'>
							<p className='flex items-center w-4/12'><BiLinkExternal className='text-blue-500 cursor-pointer mr-2' onClick={() => { router.push(`/publisher-access/${data.id}`) }} />{data.id}</p>
							<p className='w-3/12 overflow-hidden text-ellipsis whitespace-nowrap ml-4'>{data.name}</p>
							<p className='w-2/12 overflow-hidden text-ellipsis whitespace-nowrap'>{data.type}</p>
							<p className='w-3/12 overflow-hidden text-ellipsis whitespace-nowrap'>{data.email}</p>
						</div>
					})
				}
			</div>
		</>
	)
}

export default PublisherAccess