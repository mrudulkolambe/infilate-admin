import React, { useEffect, useState } from 'react'
import { useEmployeeAccess } from '../../context/employeeAccessFile'
import { BiLinkExternal } from 'react-icons/bi'
import { useRouter } from 'next/router'
import { BsSearch } from 'react-icons/bs'
import Head from 'next/head'

const PublisherAccess = () => {
	const { employeeData } = useEmployeeAccess()
	const [searchEmployeeData, setSearchEmployeeData] = useState()
	const router = useRouter()
	const [searchString, setSearchString] = useState('')
	useEffect(() => {
		setSearchEmployeeData(employeeData)
	}, [employeeData]);

	useEffect(() => {
		let arr = []
		employeeData && employeeData.forEach((data) => {
			if (data.email.toLowerCase().includes(searchString.toLowerCase()) || data.name.toLowerCase().includes(searchString.toLowerCase()) || data.id.toLowerCase().includes(searchString.toLowerCase()) || data.type.toLowerCase().includes(searchString.toLowerCase())) {
				arr.push(data)
			}
		})
		setSearchEmployeeData(arr)
	}, [searchString]);
	return (
		<>
			<Head>
				<title>Infilate | Publisher Access</title>
			</Head>
			<div className='hidden lg:block left-position absolute top-24 mt-2 px-10 py-6 Nunito w-10/12 bg-white z-20'>
				<div className='relative flex items-center border-gray-500 border rounded-lg overflow-hidden mb-10'>
					<input onChange={(e) => { setSearchString(e.target.value) }} value={searchString} type="text" className='outline-none px-4 py-2 pr-8 w-full' placeholder='Search...' />
					<BsSearch className='absolute right-2 ml-3' />
				</div>
				{
					searchEmployeeData && searchEmployeeData.map((data) => {
						return <div key={data.email} className='border rounded-lg p-4 flex bg-white shadow-lg mt-3'>
							<p className='flex items-center w-4/12'><BiLinkExternal className='text-blue-500 cursor-pointer mr-2' onClick={() => { router.push(`/publisher-access/${data.id}`) }} />{data.id}</p>
							<p className='w-3/12 overflow-hidden text-ellipsis whitespace-nowrap ml-4'>{data.name}</p>
							<p className='w-2/12 overflow-hidden text-ellipsis whitespace-nowrap'>{data.type}</p>
							<p className='w-3/12 overflow-hidden text-ellipsis whitespace-nowrap'>{data.email}</p>
						</div>
					})
				}
			</div>
			<div className='block lg:hidden absolute top-20 mt-2 px-2 py-6 Nunito w-full bg-white z-20'>
				<div className='relative flex items-center border-gray-500 border rounded-lg overflow-hidden mb-10'>
					<input onChange={(e) => { setSearchString(e.target.value) }} value={searchString} type="text" className='outline-none px-4 py-2 pr-8 w-full' placeholder='Search...' />
					<BsSearch className='absolute right-2 ml-3' />
				</div>
				<div className='overflow-x-scroll w-full'>
					{
						searchEmployeeData && searchEmployeeData.map((data) => {
							return <div key={data.email} className='border rounded-lg p-4 flex bg-white shadow-lg mt-3 w-max'>
								<p className='flex items-center'><BiLinkExternal className='text-blue-500 cursor-pointer mr-2' onClick={() => { router.push(`/publisher-access/${data.id}`) }} />{data.id}</p>
								<p className='text-ellipsis whitespace-nowrap ml-4'>{data.name}</p>
								<p className='text-ellipsis whitespace-nowrap'>{data.type}</p>
								<p className='text-ellipsis whitespace-nowrap'>{data.email}</p>
							</div>
						})
					}
				</div>
			</div>
		</>
	)
}

export default PublisherAccess