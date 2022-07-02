import React, { useState, useEffect } from 'react'
import PublisherDBTableRow from '../components/PublisherDBTableRow'
import HeadComponent from '../components/HeadComponent'
import { useAuthContext } from '../context/Auth'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../context/firebase_config'

const PublisherDatabase = () => {
	const [data, setData] = useState()
	const { user } = useAuthContext()
	useEffect(() => {
		if (user) {
			if (user.userType === 'Admin') {
				const q = query(collection(db, "publisher_database"));
				const unsubscribe = onSnapshot(q, (querySnapshot) => {
					const arr = [];
					querySnapshot.forEach((doc) => {
						let newData = doc.data()
						newData.id = doc.id
						arr.push(newData);
					});
					console.log(arr)
					setData(arr)
				});
				return () => {
					unsubscribe()
				};
			} else {
				const q = query(collection(db, "publisher_database"), where('uid', 'in', user && user.publishers));
				const unsubscribe = onSnapshot(q, (querySnapshot) => {
					const arr = [];
					querySnapshot.forEach((doc) => {
						let newData = doc.data()
						newData.id = doc.id
						arr.push(newData);
					});
					console.log(arr)
					setData(arr)
				});
				return () => {
					unsubscribe()
				};
			}
		}
	}, [user]);
	return (
		<>
			<HeadComponent title={'Publisher Database'} />
			<div className='hidden lg:block left-position absolute top-24 mt-2 px-5 py-6 Nunito w-10/12 h-calc-height overflow-scroll'>
				<h2 className='text-4xl font-bold'>Publisher Database</h2>
				<div className='mt-10 w-full'>
					<table className='w-full text-center'>
						<thead>
							<tr className='w-full border-b'>
								<th className='w-2/12 px-2 py-3 whitespace-nowrap text-ellipsis overflow-hidden'>Publisher Id</th>
								<th className='w-2/12 px-2 py-3 whitespace-nowrap text-ellipsis overflow-hidden'>Publisher Name</th>
								<th className='w-2/12 px-2 py-3 whitespace-nowrap text-ellipsis overflow-hidden'>Publisher Email</th>
								<th className='w-2/12 px-2 py-3 whitespace-nowrap text-ellipsis overflow-hidden'>Contact No.</th>
								<th className='w-2/12 px-2 py-3 whitespace-nowrap text-ellipsis overflow-hidden'>Image</th>
								<th className='w-2/12 px-2 py-3 whitespace-nowrap text-ellipsis overflow-hidden'>Details</th>
							</tr>
						</thead>
						<tbody className='mt-3'>
							{
								data && data.map((item) => {
									return <PublisherDBTableRow key={`${item.id}1`} data={item} />
								})
							}
						</tbody>
					</table>
				</div>
			</div>

			<div className='lg:hidden sm:block absolute top-20 px-5 py-6 Nunito w-full'>
				<h2 className='text-4xl font-bold'>Publisher Database</h2>
				<div className='mt-10 w-full overflow-x-scroll'>
					<table className='w-full text-center '>
						<thead>
							<tr className='w-full border-b'>
								<th className='w-2/12 px-2 py-3 whitespace-nowrap text-ellipsis overflow-hidden'>Publisher Id</th>
								<th className='w-2/12 px-2 py-3 whitespace-nowrap text-ellipsis overflow-hidden'>Publisher Name</th>
								<th className='w-2/12 px-2 py-3 whitespace-nowrap text-ellipsis overflow-hidden'>Publisher Email</th>
								<th className='w-2/12 px-2 py-3 whitespace-nowrap text-ellipsis overflow-hidden'>Contact No.</th>
								<th className='w-2/12 px-2 py-3 whitespace-nowrap text-ellipsis overflow-hidden'>Image</th>
								<th className='w-2/12 px-2 py-3 whitespace-nowrap text-ellipsis overflow-hidden'>Details</th>
							</tr>
						</thead>
						<tbody className='mt-3'>
							{
								data && data.map((item) => {
									return <PublisherDBTableRow key={`${item.id}1`} data={item} />
								})
							}
						</tbody>
					</table>
				</div>
			</div>
		</>
	)
}

export default PublisherDatabase