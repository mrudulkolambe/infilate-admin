import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Spinner from '../../components/Spinner'
import Topbar from '../../components/Topbar'
import { useAuthContext } from '../../context/Auth'
import { db } from '../../context/firebase_config'

const CampaignCardViewAndEdit = () => {
	const { user, setAlert } = useAuthContext()
	const router = useRouter()
	const [data, setData] = useState()

	useEffect(() => {
		if (user && router) {
			const unsub = onSnapshot(doc(db, "advertiser_campaigns", router.query.id), (doc) => {
				let obj = doc.data()
				obj.id = doc.id
				setData(obj);
			});
			return () => {
				unsub
			};
		}
	}, [user, router]);

	const [loading, setLoading] = useState(false)
	const [readOnly, setReadOnly] = useState(true)


	const handleFormInput = (evt) => {
		const value = evt.target.value;
		setData({
			...data,
			[evt.target.name]: value
		});
	}

	const saveData = async () => {
		setLoading(true)
		if (user && data) {
			await updateDoc(doc(db, "advertiser_campaigns", data && data.id), data)
				.then(() => {
					setLoading(false)
					setAlert('Document updated successfully!')
					setReadOnly(true)
				})
		}
	}
	return (
		<>
			<Sidebar />
			<Topbar />
			<div className='bg-white hidden lg:block left-position absolute top-24 mt-2 px-5 py-6 Nunito w-10/12 justify-center items-center h-calc-height overflow-scroll'>
				<div className='flex justify-between items-center'>
					<h1 className='font-bold text-4xl'>{'View Campaign'}</h1>
				</div>
				<div className='mt-12 px-4 w-full flex justify-between'>
					<div className='w-1/2 h-full'>
						<div className='flex flex-col'>
							<label className='font-bold cursor-pointer' htmlFor='promotionURL'>Enter the page you want to promote: </label>
							<input readOnly={readOnly} value={data && data.promotionURL} type="text" id="promotionURL" placeholder='http://www.my-url.com/design' className='read-only:bg-gray-100 read-only:cursor-pointer outline-none w-3/4 px-3 py-2 rounded-lg border-2 border-gray-400 mt-2' name='promotionURL' />
							<p className='text-xs text-gray-500 mt-2'>*This can be an article, homepage or any URL.</p>
						</div>
						<div className='flex flex-col mt-12'>
							<label className='font-bold cursor-pointer' htmlFor='campaignLogo'>Upload the logo for campaign:</label>
							<input readOnly={readOnly} type="file" id="campaignLogo" className='read-only:bg-gray-100 read-only:cursor-pointer outline-none w-3/4 px-3 py-2 rounded-lg border border-gray-400 mt-2' />
						</div>
					</div>
					<div className='w-1/2'>
						<div className='flex flex-col items-center w-full mt-4'>
							<p className='font-bold text-2xl mb-2'>Preview</p>
							<img className='rounded-md aspect-video h-60 shadow-md' src={data && data.image} alt="" />
						</div>
					</div>
				</div>

				<div className='flex w-full mt-4'>
					<div className='w-1/2 h-full p-2'>
						<div className="py-6 px-4 rounded-xl shadow-lg bg-white border-2 mt-3">
							<h1 className=' font-bold text-2xl'>Marketing Objective</h1>
							<p className='font-bold mt-2 text-gray-500'>What is your campaign&#39;s goal?</p>
							<input disabled name="marketingObjective" id="" value={data && data.marketingObjective} className='mt-1 p-3 rounded-lg border-2 w-full read-only:bg-gray-100 read-only:cursor-pointer outline-none' />
							<h1 className='mt-5 font-bold text-2xl'>Targeting</h1>
							<p className='font-bold mt-2 text-gray-500'>Where is your audience located?</p>
							<input disabled name="targeting" id="" value={data && data.targeting} className='mt-1 p-3 rounded-lg border-2 w-full read-only:bg-gray-100 read-only:cursor-pointer outline-none' />
						</div>

						<div className="py-6 px-4 rounded-xl shadow-lg bg-white border-2 mt-10">
							<h1 className=' font-bold text-2xl'>Budgeting</h1>
							<p className='text-gray-500 mt-2'>Define the direct impact of your campaign&#39;s daily reach by setting your campaign budget</p>
							<p className='font-bold mt-2 text-gray-500'>Daily Budget</p>
							<input readOnly={readOnly} name="dailyBudget" id="" value={data && data.dailyBudget} className='mt-1 p-3 rounded-lg border-2 w-full read-only:bg-gray-100 read-only:cursor-pointer outline-none placeholder:font-bold' placeholder='Daily Budget' />
							<p className='font-bold mt-2 text-gray-500'>Cost Per Click (CPC)</p>
							<input readOnly={readOnly} name="costPerClick" id="" value={data && data.costPerClick} className='mt-1 p-3 rounded-lg border-2 w-full read-only:bg-gray-100 read-only:cursor-pointer outline-none placeholder:font-bold' placeholder='Cost Per Click' />
						</div>
					</div>
					<div className='w-1/2 h-full'></div>
				</div>



				<div className='w-full m-auto border-2 rounded-lg shadow-xl mt-12 p-5'>
					<h2 className='font-bold text-2xl'>Billing Information</h2>
					<div>
						<div>
							<div className='flex items-start flex-col'>
								<label className='font-bold mt-2 text-gray-500'>Campany Name:</label>
								<input readOnly={readOnly} type="text" value={data && data.companyName} className='outline-none read-only:bg-gray-100 p-3 border-2 rounded-lg w-full mt-1' placeholder='Company Name' name='companyName' />
							</div>
						</div>
						<div className='flex justify-between mt-2'>
							<div className='flex items-start flex-col mr-3 w-full'>
								<label className='font-bold mt-2 text-gray-500'>First Name:</label>
								<input readOnly={readOnly} type="text" className='read-only:bg-gray-100 outline-none p-3 border-2 rounded-lg w-full mt-1' value={data && data.firstName} placeholder='First Name' name='firstName' />
							</div>
							<div className='flex items-start flex-col ml-3 w-full'>
								<label className='font-bold mt-2 text-gray-500'>Last Name:</label>
								<input readOnly={readOnly} type="text" className='read-only:bg-gray-100 outline-none p-3 border-2 rounded-lg w-full mt-1' value={data && data.lastName} placeholder='Last Name' name='lastName' />
							</div>
						</div>
						<div className='flex justify-between mt-2'>
							<div className='flex items-start flex-col mr-3 w-full'>
								<label className='font-bold mt-2 text-gray-500'>Address (Line 1) :</label>
								<input readOnly={readOnly} type="text" className='read-only:bg-gray-100 outline-none p-3 border-2 rounded-lg w-full mt-1' placeholder='Address (Line 1)' value={data && data.address1} name='address1' />
							</div>
							<div className='flex items-start flex-col ml-3 w-full'>
								<label className='font-bold mt-2 text-gray-500'>Address (Line 2):</label>
								<input readOnly={readOnly} type="text" className='read-only:bg-gray-100 outline-none p-3 border-2 rounded-lg w-full mt-1' placeholder='Address (Line 2)' value={data && data.address2} name='address2' />
							</div>
						</div>
						<div className='flex justify-between mt-2'>
							<div className='flex items-start flex-col mr-3 w-full'>
								<label className='font-bold mt-2 text-gray-500'>City:</label>
								<input readOnly={readOnly} type="text" className='read-only:bg-gray-100 outline-none p-3 border-2 rounded-lg w-full mt-1' placeholder='City' value={data && data.city} name='city' />
							</div>
							<div className='flex items-start flex-col ml-3 w-full'>
								<label className='font-bold mt-2 text-gray-500'>State:</label>
								<input readOnly={readOnly} type="text" className='read-only:bg-gray-100 outline-none p-3 border-2 rounded-lg w-full mt-1' placeholder='State' value={data && data.state} name='state' />
							</div>
						</div>
						<div className='flex justify-between mt-2'>
							<div className='flex items-start flex-col mr-3 w-full'>
								<label className='font-bold mt-2 text-gray-500'>Zip Code:</label>
								<input readOnly={readOnly} type="text" className='read-only:bg-gray-100 outline-none p-3 border-2 rounded-lg w-full mt-1' placeholder='Zip Code' value={data && data.zipcode} name='zipcode' />
							</div>
							<div className='flex items-start flex-col ml-3 w-full'>
								<label className='font-bold mt-2 text-gray-500'>Country:</label>
								<input readOnly={readOnly} type="text" className='read-only:bg-gray-100 outline-none p-3 border-2 rounded-lg w-full mt-1' placeholder='Country' value={data && data.country} name='country' />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default CampaignCardViewAndEdit