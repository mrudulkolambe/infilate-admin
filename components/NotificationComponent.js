import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React from 'react'
import { useAuthContext } from '../context/Auth';
import { db } from '../context/firebase_config';

const NotificationComponent = ({ data }) => {
	const { setAlert } = useAuthContext()
	const handleRead = async () => {
		const docRef = doc(db, "Notifications", data && data.id);
		await updateDoc(docRef, {
			read: true
		})
	}
	const handleDelete = async () => {
		await deleteDoc(doc(db, "Notifications", data && data.id))
			.then(() => {
				setAlert('Document Deleted Successfully!');
			})
	}
	return (
		<>
			<div className={data && !data.read ? "w-full rounded-lg shadow-lg my-3 bg-white p-3 border flex" : 'w-full rounded-lg shadow-lg my-3 bg-gray-100 text-gray-600 p-3 border flex'}>
				<div className='w-10/12 flex flex-col'>
					<h1 className='font-bold text-xl'>Campaign Name: {data && data.campaign_name || data && data.campaign_name}</h1>
					<h1 className='font-bold mt-2 text-xl text-gray-500'>Publisher Name: {data && data.name}</h1>
					<p className='text-sm text-gray-500 mt-2'>Campaign Id: {data && data.campaign_id || data && data.campaign_id_list}  </p>
					<p className='text-sm text-gray-500 mt-1'>Publisher Id: {data && data.user_id}</p>
					{data && data.amount ? <p className='text-sm text-gray-500 mt-1'>Amount: {data && data.amount}</p> : null}
				</div>
				<div className='w-2/12 flex justify-center flex-col'>
					<button onClick={handleRead} disabled={data && data.read} className='disabled:bg-green-400 disabled:cursor-not-allowed px-3 py-1 bg-green-600 hover:bg-green-500 text-white duration-300 rounded-lg font-bold'>{data && !data.read ? 'Mark as read' : 'Read'}</button>
					<button onClick={handleDelete} className='mt-2 disabled:bg-green-400 disabled:cursor-not-allowed px-3 py-1 bg-red-600 hover:bg-red-500 text-white duration-300 rounded-lg font-bold'>{'Delete'}</button>
				</div>
			</div>
		</>
	)
}

export default NotificationComponent