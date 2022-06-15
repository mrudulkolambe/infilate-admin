import React, { useState, useRef, useEffect } from 'react'
import { BsSearch } from 'react-icons/bs'
import HeadComponent from '../components/HeadComponent'
import ReportManagerTableRow from '../components/ReportManagerTableRow'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { read, utils } from 'xlsx';
import { addDoc, collection, doc, setDoc} from 'firebase/firestore'
import { db } from '../context/firebase_config'
import Spinner from '../components/Spinner';
import { useReportData } from '../context/reportData';
import moment from 'moment';

const ReportManager = () => {
	const fileRef = useRef()
	const [value, onChange] = useState(new Date());
	const [files, setFiles] = useState()
	const [xlsxData, setXlsxData] = useState()
	const [loading, setLoading] = useState(false)
	const { reportData } = useReportData()
	useEffect(() => {
		if (files) {
			setLoading(true)
			const fileReader = new FileReader()
			fileReader.readAsBinaryString(files)
			fileReader.onload = (event) => {
				const data = event.target.result
				const workbook = read(data, { type: "binary" });
				workbook.SheetNames.forEach((sheet) => {
					let header = ['sr. no', 'date', 'publisher_id', 'publisher_name', 'campaign_id', 'campaign_name', 'no_of_accounts', 'payout_per_account', 'clicks', 'conversion', 'revenue', 'advertiser_hold_date', 'ready_for_withdrawal']
					const rowObj = utils.sheet_to_row_object_array(workbook.Sheets[sheet], { header: header })
					setXlsxData(rowObj)
				})
			}
		}
	}, [files]);
	function ExcelDateToJSDate(serial) {
		var utc_days = Math.floor(serial - 25569);
		var utc_value = utc_days * 86400;
		var date_info = new Date(utc_value * 1000);
		const date = new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate());
		const newDate = moment(date).format("DD[-]MM[-]YYYY")
		return newDate
	}

	useEffect(() => {
		xlsxData && xlsxData.forEach(async (data, i) => {
			if (i !== 0) {
				data.date = ExcelDateToJSDate(data.date)
				data.advertiser_hold_date = ExcelDateToJSDate(data.advertiser_hold_date)
				data.timestamp = Date.now()
				data.reached_advertiser_hold = false;
				data.completed_withdrawal = false
				let doc_id = `${data.campaign_id}-${data.publisher_id}`
				await setDoc(doc(db, "campaign_details", doc_id), data);
			}
		})
		setLoading(false)
	}, [xlsxData]);
	return (
		<>
			<HeadComponent title={'Report Manager'} />
			<div className='hidden lg:block left-position absolute top-24 mt-2 bg-white px-5 py-6 Nunito w-10/12 h-calc-height overflow-scroll'>
				<div className='flex justify-between items-center px-4'>
					<h2 className='text-4xl font-bold'>Report</h2>
					<div className='relative flex items-center border-gray-500 border rounded-lg overflow-hidden'>
						<input type="text" className='outline-none px-4 py-2 pr-8' placeholder='Search...' />
						<BsSearch className='absolute right-2 ml-3' />
					</div>
				</div>
				{/* <Calendar returnValue='range' selectRange={true} onChange={onChange} value={value} /> */}
				<div className='flex justify-between items-center px-4 mt-4'>
					<input type="text" className='border outline-none px-4 py-2 pr-8 ml-4' placeholder='Search...' />
					<input ref={fileRef} onChange={(e) => { setFiles(e.target.files[0]) }} type="file" className='hidden' accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
					<button disabled={loading} onClick={() => { fileRef.current.click() }} className='bg-gray-900 text-white font-bold rounded-lg px-3 py-1 hover:bg-gray-700'>{loading ? <Spinner /> : 'Upload Data'}</button>
				</div>
				<div className='mt-10 w-full'>
					<table className='w-full text-left'>
						<thead>
							<tr className='w-full border-b'>
								<th className='px-2 py-3' style={{ width: '10%' }}>Campaign Id</th>
								<th className='px-2 py-3' style={{ width: '24%' }}>Campaign Name</th>
								<th className='px-2 py-3' style={{ width: '10%' }}>Publisher Id</th>
								<th className='px-2 py-3' style={{ width: '19%' }}>Publisher Name</th>
								<th className='px-2 py-3' style={{ width: '6%' }}>Clicks</th>
								<th className='px-2 py-3' style={{ width: '6%' }}>Conversion</th>
								<th className='px-2 py-3' style={{ width: '16%' }}>Payout Per Account</th>
								<th className='px-2 py-3'>Total Payout</th>
							</tr>
						</thead>
						<tbody className='mt-3 height-report overflow-auto'>
							{
								reportData && reportData.map((data, i) => {
									return <ReportManagerTableRow key={i} index={i} data={data} />
								})
							}
						</tbody>
					</table>
				</div>
			</div>

			<div className='sm:block lg:hidden absolute top-20 px-5 py-6 Nunito w-full'>
				<div className='flex justify-between md:items-center px-4 flex-col md:flex-row w-full'>
					<h2 className='text-4xl font-bold'>Report</h2>
					<div className='mt-3 md:mt-0 relative flex items-center border-gray-500 border rounded-lg overflow-hidden'>
						<input type="text" className='outline-none px-4 py-2 pr-8' placeholder='Search...' />
						<BsSearch className='absolute right-2 ml-3' />
					</div>
				</div>
				{/* <Calendar returnValue='range' selectRange={true} onChange={onChange} value={value} /> */}
				<div className='flex justify-between md:items-center flex-col md:flex-row px-4 mt-8'>
					<input type="text" className='border outline-none px-4 py-2' placeholder='Search...' />
					<input ref={fileRef} onChange={(e) => { setFiles(e.target.files[0]) }} type="file" className='hidden' accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
					<button disabled={loading} onClick={() => { fileRef.current.click() }} className='md:mt-0 mt-4 w-max bg-gray-900 text-white font-bold rounded-lg px-3 py-1 hover:bg-gray-700'>{loading ? <Spinner /> : 'Upload Data'}</button>
				</div>
				<div className='mt-10 w-full overflow-x-auto'>
					<table className='w-full text-left'>
						<thead>
							<tr className='w-full border-b'>
								<th className='px-2 py-3' style={{ width: '10%' }}>Campaign Id</th>
								<th className='px-2 py-3' style={{ width: '24%' }}>Campaign Name</th>
								<th className='px-2 py-3' style={{ width: '10%' }}>Publisher Id</th>
								<th className='px-2 py-3' style={{ width: '19%' }}>Publisher Name</th>
								<th className='px-2 py-3' style={{ width: '6%' }}>Clicks</th>
								<th className='px-2 py-3' style={{ width: '6%' }}>Conversion</th>
								<th className='px-2 py-3' style={{ width: '16%' }}>Payout Per Conversion</th>
								<th className='px-2 py-3'>Total Payout</th>
							</tr>
						</thead>
						<tbody className='mt-3 height-report overflow-auto'>
							{
								reportData && reportData.map((data, i) => {
									return <ReportManagerTableRow key={i} index={i} data={data} />
								})
							}
						</tbody>
					</table>
				</div>
			</div>
		</>
	)
}

export default ReportManager