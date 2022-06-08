import React from 'react'

const ReportManagerTableRow = ({ data, index }) => {
	return (
		<>
			<tr className='hover:bg-gray-100 duration-150 py-3'>
				<td className='w-1/12 px-2 py-3' style={{ width: '10%' }}>{index + 1}</td>
				<td className='w-3/12 px-2 py-3' style={{ width: '24%' }}>{data && data.campaign_name}</td>
				<td className='w-2/12 px-2 py-3' style={{ width: '10%' }}>{index + 1}</td>
				<td className='w-2/12 px-2 py-3' style={{ width: '19%' }}>{data && data.publisher_name}</td>
				<td className='w-1/12 px-2 py-3' style={{ width: '6%' }}>{data && data.clicks}</td>
				<td className='w-1/12 px-2 py-3' style={{ width: '6%' }}>{data && data.conversion}</td>
				<td className='w-1/12 px-2 py-3' style={{ width: '16%' }}>{data && data.payout_per_conversion}</td>
				<td className='w-2/12 px-2 py-3'>{data && data.total}</td>
			</tr>
		</>
	)
}

export default ReportManagerTableRow