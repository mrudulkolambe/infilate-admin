import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import HeadComponent from '../components/HeadComponent'
import PaymentTableRow from '../components/PaymentTableRow'
import { useAuthContext } from '../context/Auth'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../context/firebase_config'

const PaymentWallet = () => {
	const { user } = useAuthContext()
	const [paymentData, setPaymentData] = useState();
	useEffect(() => {
		if (user) {
			const q = query(collection(db, "payment"), where("completed", "==", false));
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const arr = [];
				querySnapshot.forEach((doc) => {
					let obj = doc.data()
					obj.id = doc.id
					arr.push(obj);
				});
				setPaymentData(arr)
			});
		}
	}, [user]);
	return (
		<>
			<HeadComponent title={'Payment Wallet'} />
			<div className='hidden lg:block left-position absolute top-24 mt-2 px-10 py-6 Nunito w-10/12 h-calc-height over'>
				<div className='flex justify-between items-center'>
					<h2 className='text-4xl font-bold'>Payment Wallet</h2>
					<div className='relative flex items-center border-gray-500 border rounded-lg overflow-hidden'>
						<input type="text" className='outline-none px-4 py-2 pr-8' placeholder='Search...' />
						<BsSearch className='absolute right-2 ml-3' />
					</div>
				</div>
				<input type="text" className='mt-4 border outline-none px-4 py-2 pr-8' placeholder='Search...' />
				<div className='font-bold text-xl w-full h-10 mt-10 flex items-center px-3 border-b'>
					<div className='w-6/12'>Publisher Name</div>
					<div className='w-3/12'>Payment Amount</div>
					<div className='w-3/12'>Payment Request Type</div>
				</div>
				<div className='font-bold text-lg w-full h-10 flex flex-col items-center px-3 mt-2'>
					{
						paymentData && paymentData.map((data) => {
							return <PaymentTableRow data={data} key={data.id} />
						})
					}
				</div>
			</div>

			<div className='lg:hidden sm:block absolute top-20 px-4 py-6 Nunito w-full'>
				<div className='flex flex-col justify-between'>
					<h2 className='text-4xl font-bold'>Payment Wallet</h2>
					<div className='mt-3 relative flex items-center border-gray-500 border rounded-lg overflow-hidden'>
						<input type="text" className='outline-none px-4 py-2 pr-8' placeholder='Search...' />
						<BsSearch className='absolute right-2 ml-3' />
					</div>
				</div>
				<input type="text" className='mt-4 border outline-none px-4 py-2 pr-8' placeholder='Search...' />
				<div className='font-extrabold w-full h-10 mt-10 flex items-center px-3 border-b'>
					<div className='w-6/12'>Publisher Name</div>
					<div className='w-3/12'>Payment Amount</div>
					<div className='w-3/12'>Payment Request Type</div>
				</div>
				<div className='font-bold w-full h-10 flex flex-col items-center px-3 mt-2'>
					{
						paymentData && paymentData.map((data) => {
							return <PaymentTableRow data={data} key={data.id} />
						})
					}
				</div>
			</div>
		</>
	)
}

export default PaymentWallet