import React from 'react'
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../context/firebase_config';

const BankerMarketApprove = ({ data, setCurrentPublisher, setTab }) => {

	const handleApprove = async () => {
		const docRef = doc(db, "publisher_database", data && data.uid);
		await updateDoc(docRef, {
			banker: true
		});
	}
	const handleDeny = async () => {
		const docRef = doc(db, "publisher_database", data && data.uid);
		await updateDoc(docRef, {
			banker: false
		});
	}
	return (
		<>
			<div className='flex justify-between items-center p-3 border rounded-lg shadow-lg'>
				<div className='flex'>
					<div>
						<img className='h-28 rounded-lg aspect-square shadow-lg' src={data && data.photoURL} alt="" />
					</div>
					<div className='ml-8'>
						<div>
							<p className='font-bold text-xl'>Name: {data && data.username}</p>
							<p className='font-bold text-xl'>Email: {data && data.email}</p>
						</div>
						<div>
							<p className='font-bold text-xl'>Phone: {data && data.phone}</p>
							<p className='font-bold text-sm text-gray-400'>UID: {data && data.uid}</p>
						</div>
					</div>
				</div>
				<div className='flex flex-col'>
					{
						data && !data.banker ?
							<button onClick={handleApprove} className='my-2 mr-12 py-1 px-4 bg-gray-900 hover:bg-gray-700 duration-300 rounded-lg text-white font-bold'>Approve</button>
							: <button onClick={handleDeny} className='mr-12 py-1 px-4 bg-red-600 hover:bg-red-500 duration-300 rounded-lg text-white font-bold'>Deny</button>
					}
					<button onClick={() => {
						setCurrentPublisher(data.uid)
						setTab(1)
					}} className={data && data.banker ? 'my-2 mr-12 py-1 px-4 bg-gray-900 hover:bg-gray-700 duration-300 rounded-lg text-white font-bold' : 'hidden'}>Update Campaign Data</button>
				</div>
			</div>
		</>
	)
}

export default BankerMarketApprove