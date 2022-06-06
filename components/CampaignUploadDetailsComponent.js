import React from 'react'

const CampaignUploadDetailsComponent = () => {
	return (
		<>
			<div className='hidden lg:block mt-6'>
				<h1 className='my-3 font-bold text-2xl'>Payout Details</h1>
				<div className='w-full'>
					<div className='mt-5 w-full flex justify-between font-bold my-3'>
						<span className='w-7/12'>Category</span>
						<span className='text-right w-5/12 text-blue-700'>Payout</span>
					</div>
					<div className='w-full flex justify-between font-bold my-3'>
						<span className='w-7/12'>Advertiser Pricing</span>
						<span className='text-right w-5/12 text-blue-700'>700</span>
					</div>
					<div className='w-full flex justify-between font-bold my-3'>
						<span className='w-7/12'>Affilitate Pricing</span>
						<span className='text-right w-5/12 text-blue-700'>500</span>
					</div>
				</div>
			</div>

			<div className='lg:hidden sm:block mt-6 px-2'>
				<h1 className='my-3 font-bold text-2xl'>Payout Details</h1>
				<div className='text-lg w-full'>
					<div className='mt-5 w-full flex justify-between font-bold my-3'>
						<span className='w-7/12'>Category</span>
						<span className='text-right w-5/12 text-blue-700'>Payout</span>
					</div>
					<div className='w-full flex justify-between font-bold my-3'>
						<span className='w-7/12'>Advertiser Pricing</span>
						<span className='text-right w-5/12 text-blue-700'>700</span>
					</div>
					<div className='w-full flex justify-between font-bold my-3'>
						<span className='w-7/12'>Affilitate Pricing</span>
						<span className='text-right w-5/12 text-blue-700'>500</span>
					</div>
				</div>
			</div>
		</>
	)
}

export default CampaignUploadDetailsComponent