import { arrayRemove, doc, increment, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useAuthContext } from '../context/Auth'
import { db } from '../context/firebase_config'
import Spinner from './Spinner'

const ReportEditCard = ({ id, data, setDisplay }) => {
	const [loading, setLoading] = useState(false)
	const { setAlert } = useAuthContext()
	const [clicks, setClicks] = useState(data && data.clicks)
	const [conversion, setConversions] = useState(data && data.conversion)
	const [readyForWithdrawal, setReadyForWithdrawal] = useState(data && data.ready_for_withdrawal)

	const updateFunc = async () => {
		setLoading(true)
		if (!data.validation_completed) {
			const docRef = doc(db, "campaign_details", id);
			await updateDoc(docRef, {
				ready_for_withdrawal: readyForWithdrawal,
				clicks: clicks,
				conversion: conversion,
				validation_completed: true,
				status: 'Verification Completed',
				applied_verification: false
			})
				.then(async () => {
					const docRef = doc(db, "publisher_database", data.publisher_id);
					await updateDoc(docRef, {
						advertiserHold: increment(-data.revenue),
						ready_for_withdrawal: increment(readyForWithdrawal),
						advertiserHoldData: arrayRemove(document.id)
					})
						.then(() => {
							setAlert('Document Updated Successfully!')
							setDisplay(false)
							setLoading(false)
						})
				})
				.catch((err) => {
					setAlert(err.message)
					setLoading(false)
				})
		} else {
			const docRef = doc(db, "campaign_details", id);
			await updateDoc(docRef, {
				clicks: clicks,
				conversion: conversion,
				validation_completed: true,
			})
				.then(async () => {
					setLoading(false)
					setAlert('Document updated successfully')
				})
				.catch((err) => {
					setAlert(err.message)
					setLoading(false)
				})
		}
	}
	return (
		<>
			<div className='fixed h-screen w-screen bg-black bg-opacity-40 top-0 left-0 z-50'>
				<div className='p-5 rounded-xl bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center w-2/5 shadow-xl'>
					<h1 className='font-bold text-xl text-center'>Update Report</h1>
					<div className='flex flex-col'>
						<div className='flex flex-col mt-5'>
							<label className='font-bold cursor-pointer'>Campaign Id: </label>
							<input readOnly className='border outline-none px-4 py-2 rounded-lg my-1 border-gray-700 bg-gray-200 font-semibold' value={data && data.campaign_id} />
						</div>
						<div className='flex flex-col mt-1'>
							<label htmlFor='clicks' className='font-bold cursor-pointer'>Clicks: </label>
							<input id="clicks" className='border outline-none px-4 py-2 rounded-lg my-1 border-gray-700' value={clicks} onChange={(e) => { setClicks(e.target.value) }} type="number" placeholder='Clicks' />
						</div>
						<div className='flex flex-col mt-1'>
							<label htmlFor='conversion' className='font-bold cursor-pointer'>Conversion: </label>
							<input id='conversion' className='border outline-none px-4 py-2 rounded-lg my-1 border-gray-700' value={conversion} onChange={(e) => { setConversions(e.target.value) }} type="number" placeholder='Conversions' />
						</div>
						<div className='flex flex-col mt-1'>
							<label htmlFor='readyforwithdrawal' className='font-bold cursor-pointer'>Ready For Withdrawal: </label>
							<input readOnly={data && data.validation_completed} id='readyforwithdrawal' className='read-only:bg-gray-300 border outline-none px-4 py-2 rounded-lg my-1 border-gray-700' value={readyForWithdrawal} onChange={(e) => { setReadyForWithdrawal(e.target.value) }} type="number" placeholder='Ready For Withdrawal' />
						</div>

						<div className='flex justify-between'>
							<button onClick={updateFunc} className='w-20 font-bold text-white bg-gray-900 hover:bg-gray-700 duration-700 rounded-lg px-3 py-1 mt-4'>{loading ? <Spinner /> : "Update"}</button>
							<button onClick={() => { setDisplay(false) }} className='w-20 font-bold text-white bg-red-600 hover:bg-red-500 duration-700 rounded-lg px-3 py-1 mt-4'>Cancel</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ReportEditCard