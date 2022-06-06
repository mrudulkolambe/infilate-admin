import { useRouter } from 'next/router'
import React, { useState } from 'react'
import EmployeeAccessSwitch from '../components/EmployeeAccessSwitch';
import HeadComponent from '../components/HeadComponent';

const EmployeeAccess = () => {
	const [tabPos, setTabPos] = useState(0);
	const tabs = [
		{
			tab: 'Ad Manager',
			path: '/ad-manager'
		},
		{
			tab: 'SEO Manager',
			path: '/seo-manager'
		},
		{
			tab: 'Affiliate Manager',
			path: '/affiliate-manager'
		},
		{
			tab: 'Finance',
			path: '/finance'
		},
		{
			tab: 'Messenger',
			path: '/messenger'
		}
	]
	const router = useRouter()
	console.log(router, tabs)
	return (
		<>
			<HeadComponent title={'Employee Access'} />
			<div className='left-position absolute top-20 px-5 py-6 Nunito w-10/12'>
				<h2 className='text-4xl font-bold'>Employee Access </h2>
				<div className='flex justify-between px-28 mt-10'>
					{
						tabs.map((tab, i) => {
							return <div onClick={() => { setTabPos(i) }} className={tabPos === i ? 'w-44 text-center border rounded-lg border-gray-500 cursor-pointer bg-gray-900 text-white duration-200 font-bold px-2 py-2 mx-2' : 'w-44 text-center border rounded-lg border-gray-500 cursor-pointer hover:bg-gray-200 duration-200 font-bold px-2 py-2 mx-2'} key={tab.path}>{tab.tab}</div>
						})
					}
				</div>
				<div className='mt-8 px-10'>
					<EmployeeAccessSwitch label={'Campaign Upload'} checked={false} />
					<EmployeeAccessSwitch label={'Campaign Upload'} checked={true} />
					<EmployeeAccessSwitch label={'Campaign Upload'} checked={false} />
					<EmployeeAccessSwitch label={'Campaign Upload'} checked={false} />
				</div>
				<div className='w-6/12 mt-8'>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='employeeName' className='font-bold text-gray-600 cursor-pointer'>Employee Name</label>
						<input id='employeeName' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='John Doe' />
					</div>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='employeeEmail' className='font-bold text-gray-600 cursor-pointer'>Employee Email</label>
						<input id='employeeEmail' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='johndoe@gmail.com' />
					</div>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='employeePassword' className='font-bold text-gray-600 cursor-pointer'>Employee Password</label>
						<input id='employeePassword' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='employee123' />
					</div>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='employeeType' className='font-bold text-gray-600 cursor-pointer'>Employee Type</label>
						<select id='employeeType' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' placeholder='employee123'>
							<option value="Ad Manager" key="Ad Manager">Ad Manager</option>
							<option value="SEO Manager" key="SEO Manager">SEO Manager</option>
							<option value="Messenger" key="Messenger">Messenger</option>
							<option value="Affiliate Manager" key="Affiliate Manager">Affiliate Manager</option>
							<option value="Finance" key="Finance">Finance</option>
						</select>
					</div>
					<div className='mt-4'>
						<button className='py-2 px-3 bg-gray-900 duration-200 rounded-lg text-white font-bold hover:bg-gray-700'>Submit</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default EmployeeAccess