import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import CampaignUploadDetailsComponent from './CampaignUploadDetailsComponent'

const CampaignUploadDetails = ({ setDisplayCard, data }) => {
	const [edit, setEdit] = useState(false);
	const router = useRouter()
	return (
		<>
			<div className='hidden lg:block left-position absolute top-24 mt-2 px-10 py-6 Nunito w-10/12 bg-white z-20'>
				<div className='flex justify-between'>
					<div onClick={() => { setDisplayCard(false) }} className='flex items-center cursor-pointer mt-7'><MdKeyboardArrowLeft className='mr-1 text-3xl' />  Back to campaign list</div>
					<p className='font-bold cursor-pointer' onClick={() => {router.push(`/edit/${data && data.id}`)}}>Edit</p>
				</div>
				<div className='flex mt-6 sticky'>
					<div className='px-2 w-3/12'>
						<div className='flex flex-col items-center'>
							<img className='h-5/6 w-5/6' src={data && data.img} alt="" />
							{edit ? <input className='mt-2 text-3xl font-bold text-center' value={data && data.campaign_name}/> : <h1 className='mt-2 text-3xl font-bold text-center'>{data && data.campaign_name}</h1>}
						</div>
					</div>
					<div className='px-2 w-9/12'>
						<div className='flex'>
							<div className='mx-1 px-8 rounded-lg py-4 w-8/12 border'>Campaign Id: <span className='font-bold'>{data && data.id}</span></div>
							<div className='mx-1 px-8 rounded-lg py-4 w-4/12 border'>Active</div>
						</div>
						<div className='flex mt-4'>
							<div className='mx-1 px-8 rounded-lg py-4 w-3/12 border'>CPS</div>
							<div className='mx-1 px-8 rounded-lg py-4 w-6/12 border'>Advertiser: <span className='font-bold'>{data && data.advertiser_name}</span></div>
							<div className='mx-1 px-8 rounded-lg py-4 w-3/12 border'>11</div>
						</div>
						<div className='flex mt-4'>
							<div className='mx-1 px-8 rounded-lg overflow-scroll py-4 w-full h-72 border'>{data && data.campaign_brief}</div>
						</div>
						<CampaignUploadDetailsComponent />
					</div>
				</div>
			</div>

			<div className='lg:hidden sm:block absolute top-20 px-7 py-3 Nunito w-full bg-white z-20'>
				<div onClick={() => { setDisplayCard(false) }} className='flex items-center cursor-pointer mt-4'><MdKeyboardArrowLeft className='mr-1 text-3xl' />  Back to campaign list</div>
				<div className='flex flex-col mt-6'>
					<div className='px-2 w-full'>
						<div className='flex flex-col items-center'>
							<img className='h-4/6 w-4/6 md:h-3/6 md:w-3/6' src={data && data.img} alt="" />
							<h1 className='mt-4 text-3xl font-bold text-center'>Python</h1>
						</div>
					</div>
					<div className='w-full'>
						<div className='flex flex-col'>
							<div className='my-1  px-8 rounded-lg py-4 w-full border'>Campaign Id: <span className='font-bold'>{data && data.id}</span></div>
							<div className='my-1  px-8 rounded-lg py-4 w-full border'>Active</div>
						</div>
						<div className='flex mt-4 flex-col'>
							<div className='my-1  px-8 rounded-lg py-4 w-full border'>Payout upto 32%</div>
							<div className='my-1  px-8 rounded-lg py-4 w-full border'>Payout upto 32%</div>
							<div className='my-1  px-8 rounded-lg py-4 w-full border'>Active</div>
						</div>
						<div className='flex mt-4'>
							<div className=' px-8 rounded-lg overflow-scroll py-4 w-full h-72 border'>Active</div>
						</div>
						<CampaignUploadDetailsComponent />
					</div>
				</div>
			</div>
		</>
	)
}

export default CampaignUploadDetails