import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import AdvertiserCampaignCard from '../../components/AdvertiserCampaignCard';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import { useAuthContext } from '../../context/Auth';
import { db } from '../../context/firebase_config';


const Campaigns = () => {
	const { user } = useAuthContext()
	const [campaignData, setCampaignData] = useState()
	useEffect(() => {
		if (user) {
			const q = query(collection(db, "advertiser_campaigns"));
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const arr = [];
				querySnapshot.forEach((doc) => {
					let obj = doc.data()
					obj.id = doc.id
					arr.push(obj);
				});
				setCampaignData(arr)
			});
			return () => {
				unsubscribe()
			};
		}
	}, [user]);
	return (
		<>
			<Sidebar />
			<Topbar />
			<div className='bg-white hidden lg:block left-position absolute top-24 mt-2 px-5 py-6 Nunito w-10/12 justify-center items-center h-calc-height'>
				<h1 className='font-bold text-3xl text-center'>Campaigns</h1>
				<div className='mt-4 grid grid-cols-4 gap-3'>
					{
						campaignData && campaignData.map((data) => {
							return <AdvertiserCampaignCard data={data} key={data.id} />
						})
					}
				</div>
			</div>
		</>
	)
}

export default Campaigns