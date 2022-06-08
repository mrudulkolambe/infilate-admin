import React from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import CampaignUploadDetailsComponent from './CampaignUploadDetailsComponent'

const CampaignUploadDetails = ({ setDisplayCard, data }) => {
	return (
		<>
			<div className='hidden lg:block left-position absolute top-20 px-10 py-6 Nunito w-10/12 bg-white z-20'>
				<div onClick={() => { setDisplayCard(false) }} className='flex items-center cursor-pointer mt-7'><MdKeyboardArrowLeft className='mr-1 text-3xl' />  Back to campaign list</div>
				<div className='flex mt-6 sticky'>
					<div className='px-2 w-3/12'>
						<div className='flex flex-col items-center'>
							<img className='h-5/6 w-5/6' src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg" alt="" />
							<h1 className='mt-2 text-3xl font-bold text-center'>{data && data.campaign_name}</h1>
						</div>
					</div>
					<div className='px-2 w-9/12'>
						<div className='flex'>
							<div className='mx-1 px-8 rounded-lg py-4 w-8/12 bg-red-300'>Payout upto 32%</div>
							<div className='mx-1 px-8 rounded-lg py-4 w-4/12 bg-green-300'>Active</div>
						</div>
						<div className='flex mt-4'>
							<div className='mx-1 px-8 rounded-lg py-4 w-3/12 bg-red-300'>CPS</div>
							<div className='mx-1 px-8 rounded-lg py-4 w-6/12 bg-red-300'>{data && data.advertiser_name}</div>
							<div className='mx-1 px-8 rounded-lg py-4 w-3/12 bg-green-300'>11</div>
						</div>
						<div className='flex mt-4'>
							<div className='mx-1 px-8 rounded-lg overflow-scroll py-4 w-full h-72 bg-green-300'>{data && data.campaign_brief}</div>
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
							<img className='h-4/6 w-4/6 md:h-3/6 md:w-3/6' src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg" alt="" />
							<h1 className='mt-4 text-3xl font-bold text-center'>Python</h1>
						</div>
					</div>
					<div className='w-full'>
						<div className='flex flex-col'>
							<div className='my-1  px-8 rounded-lg py-4 w-full bg-red-300'>Payout upto 32%</div>
							<div className='my-1  px-8 rounded-lg py-4 w-full bg-green-300'>Active</div>
						</div>
						<div className='flex mt-4 flex-col'>
							<div className='my-1  px-8 rounded-lg py-4 w-full bg-red-300'>Payout upto 32%</div>
							<div className='my-1  px-8 rounded-lg py-4 w-full bg-red-300'>Payout upto 32%</div>
							<div className='my-1  px-8 rounded-lg py-4 w-full bg-green-300'>Active</div>
						</div>
						<div className='flex mt-4'>
							<div className=' px-8 rounded-lg overflow-scroll py-4 w-full h-72 bg-green-300'>Active</div>
						</div>
						<CampaignUploadDetailsComponent />
					</div>
				</div>
			</div>s
		</>
	)
}

export default CampaignUploadDetails