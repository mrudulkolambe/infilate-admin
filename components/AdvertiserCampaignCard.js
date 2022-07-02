import { useRouter } from 'next/router'
import React from 'react'

const AdvertiserCampaignCard = ({ data }) => {
	const router = useRouter()
	return (
		<>
			<div className='shadow-xl bg-white p-5  rounded-xl w-max border-2'>
				<div>
					<img className='rounded-md aspect-video h-36 shadow-md' src={data && data.image} />
				</div>
				<h1 className='font-bold text-lg mt-2 text-center'>{data && data.companyName}</h1>
				<div className='text-center'>
					<div>Name: <span className='font-bold'>{data && data.firstName} {data && data.lastName}</span></div>
				</div>
				<div className='flex justify-center'>
					<button onClick={() => { router.push(`/advertiser-campaign/${data && data.id}`) }} className='font-bold text-white bg-gray-900 hover:bg-gray-700 rounded-lg duration-300 px-3 py-1 mx-auto mt-3'>View</button>
				</div>
			</div>
		</>
	)
}

export default AdvertiserCampaignCard