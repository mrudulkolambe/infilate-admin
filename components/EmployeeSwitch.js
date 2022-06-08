import { updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'

const EmployeeSwitch = ({ label, checked, setChecker }) => {
	return (
		<>
			<div className='flex items-center my-4'>
				<div className='font-bold mr-3 w-52 capitalize'>{label}</div>
				<div onClick={() => { checked ? setChecker(false) : setChecker(true) }} className={checked ? 'cursor-pointer relative flex items-center w-10 h-6 bg-blue-500 rounded-full px-1 duration-300' : 'cursor-pointer relative flex items-center w-10 h-6 bg-gray-300 rounded-full px-1 duration-300'}>
					<div className={checked ? 'duration-300 switchOn absolute w-4 h-4 rounded-full bg-white' : ' duration-300 switchOff absolute w-4 h-4 rounded-full bg-white'}></div>
				</div>
			</div>
		</>
	)
}

export default EmployeeSwitch