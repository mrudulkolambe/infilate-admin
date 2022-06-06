import React, { useState } from 'react'

const EmployeeAccessSwitch = ({ label, checked }) => {
	const [bool, setBool] = useState(checked)
	return (
		<>
			<div className='flex items-center my-4'>
				<div className='font-bold mr-3'>{label}</div>
				<div onClick={() => { bool ? setBool(false) : setBool(true) }} className={bool ? 'cursor-pointer relative flex items-center w-10 h-6 bg-blue-500 rounded-full px-1 duration-300' : 'cursor-pointer relative flex items-center w-10 h-6 bg-gray-300 rounded-full px-1 duration-300'}>
					<div className={bool ? 'duration-300 switchOn absolute w-4 h-4 rounded-full bg-white' : ' duration-300 switchOff absolute w-4 h-4 rounded-full bg-white'}></div>
				</div>
			</div>
		</>
	)
}

export default EmployeeAccessSwitch