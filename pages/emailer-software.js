import React from 'react'
import HeadComponent from '../components/HeadComponent'

const EmailerSoftware = () => {
	return (
		<>
			<HeadComponent title={'Emailer Software'} />
			<div className='hidden lg:flex left-position absolute top-24 mt-2 px-5 py-6 Nunito w-10/12 justify-center items-center calc-height'>
				<div className='w-6/12 shadow-lg p-5 rounded-lg'>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='receipients' className='font-bold text-gray-600 cursor-pointer'>Receipients</label>
						<input id='receipients' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='eg. receipient@gmail.com' />
					</div>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='subject' className='font-bold text-gray-600 cursor-pointer'>Subject</label>
						<input id='subject' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='Subject' />
					</div>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='body' className='font-bold text-gray-600 cursor-pointer'>Body</label>
						<textarea id='body' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg resize-y h-32' placeholder='Body'></textarea>
					</div>
					<div>
						<button className='text-white font-bold bg-gray-900 duration-200 px-3 py-2 rounded-lg hover:bg-gray-700 mt-3 w-full'>Send Mail</button>
					</div>
				</div>
			</div>

			<div className='lg:hidden sm:block absolute top-20 px-5 py-6 Nunito w-full flex flex-col md:flex-row  justify-center items-center calc-height'>
				<h1 className='mt-4 font-bold text-4xl'>Emailer Software</h1>
				<div className='w-full shadow-lg p-3 rounded-lg mt-5'>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='receipients' className='font-bold text-gray-600 cursor-pointer'>Receipients</label>
						<input id='receipients' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='eg. receipient@gmail.com' />
					</div>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='subject' className='font-bold text-gray-600 cursor-pointer'>Subject</label>
						<input id='subject' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='Subject' />
					</div>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='body' className='font-bold text-gray-600 cursor-pointer'>Body</label>
						<textarea id='body' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg resize-y h-32' placeholder='Body'></textarea>
					</div>
					<div>
						<button className='text-white font-bold bg-gray-900 duration-200 px-3 py-2 rounded-lg hover:bg-gray-700 mt-3 w-full'>Send Mail</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default EmailerSoftware