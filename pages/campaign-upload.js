import React from 'react'
import CampaignCard from '../components/CampaignCard'
import HeadComponent from '../components/HeadComponent'
import CampaignUploadDetails from '../components/CampaignUploadDetails'
import { useState } from 'react'

const CampaignUpload = () => {
	const [displayCard, setDisplayCard] = useState(false)
	const [detailsData, setDetailsData] = useState()
	return (
		<>
			{displayCard ? <CampaignUploadDetails setDisplayCard={setDisplayCard} data={detailsData} /> : null}
			<HeadComponent title={'Campaign Upload'} />
			<div className='lg:block hidden left-position absolute top-20 px-10 py-6 Nunito w-10/12'>
				<div className='flex justify-between items-center'>
					<h2 className='text-4xl font-bold'>Campaign List</h2>
					<button className='bg-gray-900 text-white hover:bg-gray-700 font-bold duration-200 rounded-lg px-3 py-1'>Add Campaign</button>
				</div>
				<div className='grid mt-8 grid-cols-4 gap-y-4'>
					<CampaignCard setDetailsData={setDetailsData} setDisplayCard={setDisplayCard} />
				</div>
			</div>

			<div className='items-center lg:hidden sm:flex flex-col absolute top-20 px-7 py-6 Nunito w-full'>
				<div className='flex flex-col md:flex-row md:items-center md:justify-between w-full'>
					<h2 className='text-4xl font-bold'>Campaign List</h2>
					<button className='mt-3 md:mt-0 w-max bg-gray-900 text-white hover:bg-gray-700 font-bold duration-200 rounded-lg px-3 py-1'>Add Campaign</button>
				</div>
				<div className='grid md:grid-cols-2 md:gap-x-10 items-center mt-8 gap-y-4'>
					<CampaignCard setDetailsData={setDetailsData} setDisplayCard={setDisplayCard} />
					<CampaignCard setDetailsData={setDetailsData} setDisplayCard={setDisplayCard} />
					<CampaignCard setDetailsData={setDetailsData} setDisplayCard={setDisplayCard} />
				</div>
			</div>
		</>
	)
}

export default CampaignUpload