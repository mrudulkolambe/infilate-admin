import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react'
import { BsTrash } from 'react-icons/bs'
import { db } from '../context/firebase_config';
import { useAuthContext } from '../context/Auth';

const CampaignCard = ({ data, setDisplayCard, setDetailsData }) => {
	const { setAlert } = useAuthContext()
	const handleDelete = async () => {
		await deleteDoc(doc(db, "campaign_data", data.id))
			.then(() => {
				setAlert('Campaign Deleted Successfully!')
			})
			.catch(() => {
				setAlert('Something went wrong!')
			})
	}
	return (
		<>
			<div className='border shadow-lg p-4 w-max w-68 rounded-lg'>
				<div>
					<img className='rounded-md aspect-video h-36 shadow-md' src={data && data.img || "https://images.unsplash.com/photo-1595835018349-198460e1d309?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8MTYlM0E5fGVufDB8fDB8fA%3D%3D&w=1000&q=80"} alt="" />
				</div>
				<div className='mt-3'>
					<h1 className='text-xl font-bold w-64 overflow-hidden text-ellipsis whitespace-nowrap my-2'>{data && data.campaign_name}</h1>
					<p className='font-bold w-64 overflow-hidden text-ellipsis whitespace-nowrap'>Advertiser Name: {data && data.advertiser_name}</p>
					<p className='font-bold w-64 overflow-hidden text-ellipsis whitespace-nowrap'>Affiliate Pricing: {data && data.affiliate_pricing}</p>
				</div>
				<div className='mt-3 flex items-center justify-between'>
					<button onClick={() => {
						setDisplayCard(true)
						setDetailsData(data)
					}} className='bg-gray-900 text-white hover:bg-gray-700 duration-150 rounded-lg font-bold px-3 py-1 w-9/12'>Details</button>
					<button onClick={handleDelete} className='flex justify-center bg-red-600 text-white hover:bg-red-500 duration-150 rounded-lg font-bold px-3 py-2 w-2/12 stroke-2'><BsTrash /></button>
				</div>
			</div>
		</>
	)
}

export default CampaignCard