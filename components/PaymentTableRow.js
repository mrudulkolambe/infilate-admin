import React, { useState } from 'react'
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi'
import { useAuthContext } from '../context/Auth'
import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from '../context/firebase_config';


const PaymentTableRow = ({ data }) => {
	const { user, setAlert } = useAuthContext()
	const [expand, setExpand] = useState(false)
	const handleApprove = async () => {
		const docRef = doc(db, "publisher_database", data && data.id);
		await updateDoc(docRef, {
			paymentCompleted: true,
		})
			.then(async () => {
				setAlert('Payment Completed!')
			})
	}

	const handleDeny = async () => {
		const docRef = doc(db, "publisher_database", data && data.id);
		await updateDoc(docRef, {
			paymentCompleted: true,
			ready_for_withdrawal: increment(data && data.requested_withdrawal.amount)
		})
			.then(async () => {
				setAlert('Payment denied!')
			})
	}
	return (
		<>
			<div className='w-full border-b'>
				<div className='py-2 flex w-full'>
					<div className='w-6/12'>{data && data.name}</div>
					<div className='w-3/12'>{data && data.requested_withdrawal.amount}</div>
					<div className='w-3/12 flex justify-between cursor-pointer'>{data && data.requested_withdrawal.type} {!expand ? <HiOutlineChevronDown onClick={() => { expand ? setExpand(false) : setExpand(true) }} /> : <HiOutlineChevronUp onClick={() => { expand ? setExpand(false) : setExpand(true) }} />}</div>
				</div>
				<div className={expand ? 'flex justify-between pb-3 duration-150' : 'h-0 overflow-hidden duration-150'}>
					<div className='w-6/12 flex flex-col md:flex-row'>
						<button onClick={handleApprove} className='h-max mb-1 md:mb-0 mx-2 py-1 px-3 bg-gray-900 duration-150 text-white rounded-lg hover:bg-gray-700 font-bold'>Approve Invoice</button>
					</div>
					<button onClick={handleDeny} className='h-max py-1 px-3 bg-red-700 duration-150 text-white rounded-lg hover:bg-red-500 font-bold'>Reject Invoice</button>
				</div>
			</div>
		</>
	)
}

export default PaymentTableRow