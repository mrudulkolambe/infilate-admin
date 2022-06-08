import { doc, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { db } from '../context/firebase_config';
import EmployeeSwitch from './EmployeeSwitch'

const EmployeeAccessSwitch = ({ data, id }) => {
	useEffect(() => {
		setCampaignUpload(data && data.campaign_upload)
		setEmailerSoftware(data && data.emailer_software)
		setPaymentWallet(data && data.payment_wallet)
		setReportManager(data && data.report_manager)
		setTrackingPanel(data && data.tracking_panel)
		setPublisherDatabase(data && data.publisher_database)
	}, [data]);
	const [campaignUpload, setCampaignUpload] = useState(data && data.campaign_upload)
	const [emailerSoftware, setEmailerSoftware] = useState(data && data.emailer_software)
	const [paymentWallet, setPaymentWallet] = useState(data && data.payment_wallet)
	const [reportManager, setReportManager] = useState(data && data.report_manager)
	const [trackingPanel, setTrackingPanel] = useState(data && data.tracking_panel)
	const [publisherDatabase, setPublisherDatabase] = useState(data && data.publisher_database)

	useEffect(() => {
		const docRef = doc(db, "employee_access", id);
		updateDoc(docRef, {
			campaign_upload: campaignUpload,
			emailer_software: emailerSoftware,
			payment_wallet: paymentWallet,
			report_manager: reportManager,
			tracking_panel: trackingPanel,
			publisher_database: publisherDatabase
		})
			.then(() => {
				console.log(`${id} document updated`)
			})
	}, [campaignUpload, emailerSoftware, paymentWallet, reportManager, trackingPanel, publisherDatabase]);

	return (
		<>
			<EmployeeSwitch label={'Campaign Upload'} checked={campaignUpload} setChecker={setCampaignUpload} />
			<EmployeeSwitch label={'Emailer Software'} checked={emailerSoftware} setChecker={setEmailerSoftware} />
			<EmployeeSwitch label={'Payment Wallet'} checked={paymentWallet} setChecker={setPaymentWallet} />
			<EmployeeSwitch label={'Report Manager'} checked={reportManager} setChecker={setReportManager} />
			<EmployeeSwitch label={'Tracking Panel'} checked={trackingPanel} setChecker={setTrackingPanel} />
			<EmployeeSwitch label={'Publisher Dashboard'} checked={publisherDatabase} setChecker={setPublisherDatabase} />
		</>
	)
}

export default EmployeeAccessSwitch