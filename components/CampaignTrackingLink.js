import React, { useEffect, useState } from 'react'
import { doc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";
import { useAuthContext } from '../context/Auth';
import Spinner from './Spinner'
import { db } from '../context/firebase_config';


const CampaignTrackingLink = ({ data, currentPublisher, adminData }) => {
	const { user, setAlert } = useAuthContext()
	const [link, setLink] = useState('')
	const [loading, setLoading] = useState(false)
	const manageTrackingURLs = (item) => {
		console.log(item)
	}
	const handlelink = async () => {
		if (user) {
			setLoading(true)
			console.log(currentPublisher)
			const docRef = doc(db, "publisher_database", currentPublisher);
			let obj1 = {}
			obj1[`${data.id}`] = {
				campaignId: data.id,
				trackingLink: link
			}
			let trackingURLs = adminData && adminData.trackingURLs
			await updateDoc(docRef, {
				trackingURLs: { ...trackingURLs, ...obj1 }
			})
				.then(() => {
					if (adminData) {
						Object.entries(adminData.trackingURLs).filter(manageTrackingURLs)
						console.log(Object.values(adminData.trackingURLs))
					}
					setLoading(false)
					setAlert('Link Added!');
				})
		}
	}
	return (
		<div className='p-2 border bg-white rounded-lg shadow-lg w-96'>
			<div>
				<img src={data.img} className='h-48 m-auto rounded-lg' alt="" />
			</div>
			<div className='mt-2 px-3'>
				<h3 className='font-bold w-11/12 whitespace-nowrap overflow-hidden text-ellipsis'>{data.campaign_name}</h3>
				<div className='flex items-center justify-between'>
					<input type="text" value={link} onChange={(e) => { setLink(e.target.value) }} placeholder='Tracking link' name={data.id} className='px-2 py-1 rounded-lg border-2 w-9/12 mt-1 outline-none' />
					<button onClick={handlelink} className='w-2/12 bg-gray-900 font-bold text-white hover:bg-gray-700 rounded-lg px-2 py-1 duration-200'>{loading ? <Spinner /> : 'Done'}</button>
				</div>
			</div>
		</div>
	)
}

export default CampaignTrackingLink