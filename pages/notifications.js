import React, { useEffect, useState } from 'react'
import NotificationComponent from '../components/NotificationComponent'
import { useAuthContext } from '../context/Auth';
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from '../context/firebase_config';

const Notifications = () => {
	const [notificationData, setNotificationData] = useState();
	const { user } = useAuthContext()
	useEffect(() => {
		if (user) {
			const q = query(collection(db, "Notifications"), orderBy('timestamp', "desc"));
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const data = [];
				querySnapshot.forEach((doc) => {
					let obj = doc.data()
					obj.id = doc.id
					data.push(obj);
				});
				setNotificationData(data)
			});
			return () => {
				unsubscribe()
			};
		}
	}, []);
	return (
		<>
			<div className='bg-white lg:block hidden left-position absolute top-20 h-calc-height px-10 py-6 Nunito w-10/12 overflow-auto'>
				<h2 className='my-3 text-4xl font-bold mt-5'>Notifications</h2>
				{
					notificationData && notificationData.map((data) => {
						return <NotificationComponent data={data} key={data.id} />
					})
				}
			</div>
		</>
	)
}

export default Notifications