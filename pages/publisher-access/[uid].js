import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/Auth';
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from '../../context/firebase_config';
import Spinner from '../../components/Spinner';
import { MdKeyboardArrowLeft } from 'react-icons/md'


const PublisherAccessDynamic = () => {

	const router = useRouter()
	const { user, setAlert } = useAuthContext()
	const [data, setData] = useState()
	const [UIDs, setUIDs] = useState('')
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		if (user && router) {
			const unsub = onSnapshot(doc(db, "employee_details", router.query.uid), (doc) => {
				let obj = doc.data()
				obj.id = doc.id
				setData(obj);
			});
			return () => {
				unsub()
			};
		}
	}, [user]);

	useEffect(() => {
		setUIDs(data && data.publishers && data.publishers.toString().split(',').join(', '))
	}, [data]);

	const handleSubmit = async () => {
		setLoading(true)
		const docRef = doc(db, "employee_details", data && data.id);
		await updateDoc(docRef, {
			publishers: UIDs.length != 0 ? UIDs.split(', ') : ""
		})
			.then(() => {
				setLoading(false)
				setAlert('Document updated successfully!');
			})

	}

	return (
		<>
			<div className='hidden lg:block left-position absolute top-24 mt-2 px-10 py-6 Nunito w-10/12 bg-white z-20'>
				<p className='flex items-center cursor-pointer' onClick={() => { router.back() }}><MdKeyboardArrowLeft className='mr-2' /> Back to list</p>
				<h1 className='mt-3 font-bold text-4xl'>Publisher Management</h1>
				<div className='flex flex-col mt-4'>
					<h1 className='font-bold text-2xl'>Employee:</h1>
					<div>
						<div className='flex flex-col mt-3 w-2/3'>
							<label htmlFor='name' className='font-bold text-gray-500'>Employee Name: </label>
							<input type="text" id='name' value={data && data.name} readOnly className='mt-1 border-2 p-3 rounded-lg bg-gray-100 outline-none cursor-pointer' />
						</div>
						<div className='flex flex-col mt-3 w-2/3'>
							<label htmlFor='name' className='font-bold text-gray-500'>Employee UID: </label>
							<input type="text" id='name' value={data && data.id} readOnly className='mt-1 border-2 p-3 rounded-lg bg-gray-100 outline-none cursor-pointer' />
						</div>
						<div className='flex flex-col mt-3 w-2/3'>
							<label htmlFor='name' className='font-bold text-gray-500'>Employee Email: </label>
							<input type="text" id='name' value={data && data.email} readOnly className='mt-1 border-2 p-3 rounded-lg bg-gray-100 outline-none cursor-pointer' />
						</div>
						<div className='flex flex-col mt-3 w-2/3'>
							<label htmlFor='name' className='font-bold text-gray-500'>Publisher Uid: </label>
							<textarea value={UIDs} onChange={(e) => { setUIDs(e.target.value) }} className='mt-1 border-2 p-3 rounded-lg outline-none cursor-pointer' placeholder="Publisher Uid's"></textarea>
						</div>
						<button onClick={handleSubmit} className='bg-gray-900 hover:bg-gray-700 duration-300 text-white font-bold rounded-lg px-3 py-2 mt-4'>{loading ? <Spinner /> : 'Submit'}</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default PublisherAccessDynamic