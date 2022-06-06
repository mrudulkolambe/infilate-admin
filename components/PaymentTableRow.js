import React, { useState } from 'react'
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi'


const PaymentTableRow = () => {
	const [expand, setExpand] = useState(false)
	return (
		<>
			<div className='w-full border-b'>
				<div className='py-2 flex w-full'>
					<div className='w-6/12'>Pratit Todkar</div>
					<div className='w-3/12'>500</div>
					<div className='w-3/12 flex justify-between cursor-pointer'>500 {!expand ? <HiOutlineChevronDown onClick={() => { expand ? setExpand(false) : setExpand(true) }} /> : <HiOutlineChevronUp onClick={() => { expand ? setExpand(false) : setExpand(true) }} />}</div>
				</div>
				<div className={expand ? 'flex justify-between pb-3 duration-150' : 'h-0 overflow-hidden duration-150'}>
					<div className='w-6/12 flex sm:flex-col'>
						<button className='h-max mx-2 py-1 px-3 bg-gray-900 duration-150 text-white rounded-lg hover:bg-gray-700 font-bold'>Approve Invoice</button>
						<button className='h-max mx-2 py-1 px-3 bg-gray-900 duration-150 text-white rounded-lg hover:bg-gray-700 font-bold'>On Hold</button>
					</div>
					<button className='h-max py-1 px-3 bg-red-700 duration-150 text-white rounded-lg hover:bg-red-500 font-bold'>Reject Invoice</button>
				</div>
			</div>
		</>
	)
}

export default PaymentTableRow