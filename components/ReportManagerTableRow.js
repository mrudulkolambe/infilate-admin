import React, { useState } from 'react'
import ReportEditCard from './ReportEditCard'

const ReportManagerTableRow = ({ data, index }) => {
	const [display, setDisplay] = useState(false);
	return (
		<>
			{display ? <ReportEditCard id={data && data.id} setDisplay={setDisplay} data={data} /> : null}
			<tr className='hover:bg-gray-100 duration-150 py-3 cursor-pointer' onClick={() => {setDisplay(true)}}>
				<td className='w-1/12 px-2 py-3' style={{ width: '10%' }}>{data && data.campaign_id}</td>
				<td className='w-3/12 px-2 py-3' style={{ width: '24%' }}>{data && data.campaign_name}</td>
				<td className='w-2/12 px-2 py-3' style={{ width: '10%' }}>{data && data.publisher_id}</td>
				<td className='w-2/12 px-2 py-3' style={{ width: '19%' }}>{data && data.publisher_name}</td>
				<td className='w-1/12 px-2 py-3' style={{ width: '6%' }}>{data && data.clicks}</td>
				<td className='w-1/12 px-2 py-3' style={{ width: '6%' }}>{data && data.conversion}</td>
				<td className='w-1/12 px-2 py-3' style={{ width: '16%' }}>{data && data.payout_per_account}</td>
				<td className='w-2/12 px-2 py-3'>{data && data.revenue}</td>
			</tr>
		</>
	)
}

export default ReportManagerTableRow