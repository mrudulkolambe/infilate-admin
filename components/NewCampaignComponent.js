import React, { useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import Spinner from './Spinner'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../context/firebase_config'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuthContext } from '../context/Auth'

const NewCampaignComponent = ({ setDisplayCampaign }) => {
	const storage = getStorage();
	const {user} = useAuthContext()
	const initialState = {
		campaign_name: "",
		advertiser_name: "",
		advertiser_pricing: 0,
		affiliate_pricing: 0,
		offer_category: '',
		currency: '',
		target_country: "",
		terms: '',
		campaign_brief: "",
		tracking_information: "",
		traffic_source: "",
		img: '',
		campaign_category: '',
		POCNAME: '',
		POCEMAIL: '',
		POCPHONE: '',
		delete: false
	}
	const [formData, setFormData] = useState(initialState)
	const [files, setFiles] = useState()
	const [loading, setLoading] = useState(false)
	const handleChange = (evt) => {
		const value = evt.target.value;
		setFormData({
			...formData,
			[evt.target.name]: value
		});
	}
	const handleClick = async () => {
		if (files && user) {
			setLoading(true)
			const docRef = await addDoc(collection(db, "campaign_data"), formData)
				.then((document) => {
					console.log("first")
					setLoading(false)
					setFormData(initialState)
					handleUpload(document.id)
				})
		}
	}
	const handleUpload = (id) => {
		if (user) {
			const storageRef = ref(storage, `campaign/${id}.jpg`);
			console.log(storageRef)
			const uploadTask = uploadBytesResumable(storageRef, files);
			uploadTask.on('state_changed',
				(snapshot) => {
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log('Upload is ' + progress + '% done');
					switch (snapshot.state) {
						case 'paused':
							console.log('Upload is paused');
							break;
						case 'running':
							console.log('Upload is running');
							break;
					}
				},
				(error) => {
					// Handle unsuccessful uploads
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
						const docRef = doc(db, "campaign_data", id);
						await updateDoc(docRef, {
							img: downloadURL
						});
					});
				}
			);
		}
	}

	return (
		<>
			<div className='lg:block hidden left-position absolute top-24 mt-2 px-10 py-6 Nunito w-10/12 bg-white zindex2000 h-calc-height overflow-scroll'>
				<h1 className='font-bold text-4xl'>Add Campaign</h1>
				<div onClick={() => { setDisplayCampaign(false) }} className='cursor-pointer absolute top-4 right-12 w-max p-3 rounded-full hover:bg-gray-100 bg-opacity-25 duration-300'>
					<MdOutlineClose />
				</div>
				<div className='w-full flex flex-col'>
					<div className='w-full flex'>
						<div className='w-6/12 p-4'>
							<div className='my-3'>
								<label htmlFor='campaignName' className='font-bold text-gray-600 cursor-pointer'>Campaign Name</label>
								<input id='campaignName' value={formData.campaign_name} onChange={handleChange} name='campaign_name' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='Enter Campaign Name' />
							</div>
							<div className='my-3'>
								<label htmlFor='advertiserName' className='font-bold text-gray-600 cursor-pointer'>Advertiser Name</label>
								<input id='advertiserName' value={formData.advertiser_name} onChange={handleChange} name='advertiser_name' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='Enter Advertiser Name' />
							</div>
							<div className='my-3'>
								<label htmlFor='category' className='font-bold text-gray-600 cursor-pointer'>Category</label>
								<input id='category' value={formData.campaign_category} onChange={handleChange} name='campaign_category' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='Enter Campaign Category' />
							</div>
							<div className='my-3'>
								<label htmlFor='pocContact' className='font-bold text-gray-600 cursor-pointer'>POC Contact</label>
								<input id='pocContact' value={formData.POCPHONE} onChange={handleChange} name='POCPHONE' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='Enter POC Contact' />
							</div>
							<div className='my-3'>
								<label htmlFor='advertiser_pricing' className='font-bold text-gray-600 cursor-pointer'>Advertiser Pricing (Revenue)</label>
								<select id='advertiser_pricing' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg'>
									<option value="CPA" key="CPA">CPA</option>
								</select>
							</div>
							<div className='my-3'>
								<label htmlFor='affiliate_pricing' className='font-bold text-gray-600 cursor-pointer'>Affiliate Pricing (Revenue)</label>
								<select id='affiliate_pricing' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg'>
									<option value="CPA" key="CPA">CPA</option>
								</select>
							</div>
							<div className='my-3'>
								<label htmlFor='affiliateName' className='font-bold text-gray-600 cursor-pointer'>Date Range</label>
								<input id='affiliateName' onChange={handleChange} name='affiliate_pricing' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='Enter Advertiser Name' />
							</div>
						</div>


						<div className='w-6/12 p-4'>
							<div className='my-3'>
								<label htmlFor='campaignLogo' className='font-bold text-gray-600 cursor-pointer'>Campaign Logo</label>
								<input id='campaignLogo' name='campaign_logo' className='w-full mt-1 outline-none h-12 py-2 px-5 border border-gray-500 font-semibold rounded-lg bg-white' type="file" onChange={(e) => { setFiles(e.target.files[0]) }} placeholder='Enter Campaign Name' />
							</div>
							<div className='my-3'>
								<label htmlFor='offerCategory' className='font-bold text-gray-600 cursor-pointer'>Offer Category</label>
								<select id='offerCategory' value={formData.offer_category} onChange={handleChange} name='offer_category' className='w-full mt-1 outline-none h-12 py-2 px-5 border border-gray-500 font-semibold rounded-lg bg-white' type="text">
									<option value="Item 1" key="Item 1">Item 1</option>
								</select>
							</div>
							<div className='my-3'>
								<label htmlFor='pocname' className='font-bold text-gray-600 cursor-pointer'>POC Name</label>
								<input id='pocname' value={formData.POCNAME} onChange={handleChange} name='POCNAME' className='w-full mt-1 outline-none h-12 py-2 px-5 border border-gray-500 font-semibold rounded-lg bg-white' type="text" placeholder='Enter POC Name' />
							</div>
							<div className='my-3'>
								<label htmlFor='pocEmail' className='font-bold text-gray-600 cursor-pointer'>POC Email</label>
								<input id='pocEmail' value={formData.POCEMAIL} onChange={handleChange} name='POCEMAIL' className='w-full mt-1 outline-none h-12 py-2 px-5 border border-gray-500 font-semibold rounded-lg bg-white' type="text" placeholder='Enter POC Email'/>
							</div>
							<div className='my-3 flex justify-between mt-4'>
								<div className='w-5/12'>
									<label htmlFor='advertiser_pricing' className='font-bold text-gray-600 cursor-pointer'>Amount</label>
									<input id='advertiser_pricing' value={formData.advertiser_pricing} onChange={handleChange} name='advertiser_pricing' className='w-full mt-1 outline-none h-12 py-2 px-5 border border-gray-500 font-semibold rounded-lg bg-white' type="number" placeholder='Enter Amount' min={0} />
								</div>
								<div className='w-6/12'>
									<label htmlFor='currency' className='font-bold text-gray-600 cursor-pointer'>Currency</label>
									<select id='currency' value={formData.currency} onChange={handleChange} name='currency' className='w-full mt-1 outline-none h-12 py-2 px-5 border border-gray-500 font-semibold rounded-lg bg-white' type="text" placeholder='Enter Campaign Name' >
										<option value="INR" key="INR">INR</option>
									</select>
								</div>
							</div>
							<div className='my-3 flex justify-between mt-4'>
								<div className='w-5/12'>
									<label htmlFor='offerCategory' className='font-bold text-gray-600 cursor-pointer'>Amount</label>
									<input id='offerCategory' value={formData.affiliate_pricing} onChange={handleChange} name='affiliate_pricing' className='w-full mt-1 outline-none h-12 py-2 px-5 border border-gray-500 font-semibold rounded-lg bg-white' type="number" placeholder='Enter Amount' min={0} />
								</div>
								<div className='w-6/12 hidden'>
									<label htmlFor='offerCategory' className='font-bold text-gray-600 cursor-pointer'>Offer Category</label>
									<input id='offerCategory' name='offerCategory' value={formData.offer_category} className='w-full mt-1 outline-none h-12 py-2 px-5 border border-gray-500 font-semibold rounded-lg bg-white' type="text" placeholder='Enter Campaign Name' />
								</div>
								<div className='w-6/12 hidden'>
									<label htmlFor='pocName' className='font-bold text-gray-600 cursor-pointer'>POC Name</label>
									<input id='pocName' name='POCNAME' className='w-full mt-1 outline-none h-12 py-2 px-5 border border-gray-500 font-semibold rounded-lg bg-white' type="text" placeholder='Enter POC Name' />
								</div>
							</div>
							<div className='my-3'>
								<label htmlFor='offerCategory' className='font-bold text-gray-600 cursor-pointer'>Country Target</label>
								<input id='offerCategory' value={formData.target_country} onChange={handleChange} name='target_country' className='w-full mt-1 outline-none h-12 py-2 px-5 border border-gray-500 font-semibold rounded-lg bg-white' type="text" placeholder='Target Country' />
							</div>
						</div>
					</div>


					<div className='w-full p-4 flex items-center flex-col'>
						<div className='flex flex-col w-full'>
							<label htmlFor='campaignName' className='font-bold text-gray-600 cursor-pointer'>Terms</label>
							<textarea onChange={handleChange} value={formData.terms} name='terms' className='resize-y w-full mt-1 outline-none h-44 py-2 px-5 border border-gray-500 font-semibold rounded-lg bg-white' placeholder='Offer Description'></textarea>
						</div>
						<div className='flex flex-col w-full'>
							<label htmlFor='campaignName' className='font-bold text-gray-600 cursor-pointer'>Campaign Brief</label>
							<textarea name='campaign_brief' value={formData.campaign_brief} onChange={handleChange} className='resize-y w-full mt-1 outline-none h-44 py-2 px-5 border border-gray-500 font-semibold rounded-lg bg-white' placeholder='Offer Description'></textarea>
						</div>
						<div className='flex flex-col w-full'>
							<label htmlFor='campaignName' className='font-bold text-gray-600 cursor-pointer'>Tracking Information</label>
							<textarea name='tracking_information' value={formData.tracking_information} onChange={handleChange} className='resize-y w-full mt-1 outline-none h-44 py-2 px-5 border border-gray-500 font-semibold rounded-lg bg-white' placeholder='Tracking Information'></textarea>
						</div>
						<div className='flex flex-col w-full'>
							<label htmlFor='campaignName' className='font-bold text-gray-600 cursor-pointer'>Traffic Source</label>
							<textarea name='traffic_source' value={formData.traffic_source} onChange={handleChange} className='resize-y w-full mt-1 outline-none h-44 py-2 px-5 border border-gray-500 font-semibold rounded-lg bg-white' placeholder='Traffic Source'></textarea>
						</div>
						<button onClick={handleClick} disabled={loading} className='px-4 py-2 rounded-lg bg-gray-900 text-white font-bold hover:bg-gray-700 duration-200 shadow-lg mt-4 m-auto'>{loading ? <Spinner /> : <p>Submit</p>}</button>
					</div>
				</div>
			</div>



			<div className='lg:hidden block absolute top-20 mt-2 px-3 py-6 Nunito w-full bg-white zindex2000 overflow-scroll'>
				<h1 className='font-bold text-4xl'>Add Campaign</h1>
				<div onClick={() => { setDisplayCampaign(false) }} className='cursor-pointer absolute top-4 right-12 w-max p-3 rounded-full hover:bg-gray-100 bg-opacity-25 duration-300'>
					<MdOutlineClose />
				</div>
				<div className='w-full flex flex-col'>
					<div className='w-full flex'>
						<div className='w-6/12 p-4'>
							<div className='my-3'>
								<label htmlFor='campaignName' className='font-bold text-gray-600 cursor-pointer'>Campaign Name</label>
								<input id='campaignName' value={formData.campaign_name} onChange={handleChange} name='campaign_name' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='Enter Campaign Name' />
							</div>
							<div className='my-3'>
								<label htmlFor='advertiserName' className='font-bold text-gray-600 cursor-pointer'>Advertiser Name</label>
								<input id='advertiserName' value={formData.advertiser_name} onChange={handleChange} name='advertiser_name' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='Enter Advertiser Name' />
							</div>
							<div className='my-3'>
								<label htmlFor='category' className='font-bold text-gray-600 cursor-pointer'>Category</label>
								<input id='category' value={formData.campaign_category} onChange={handleChange} name='campaign_category' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='Enter Campaign Category' />
							</div>
							<div className='my-3'>
								<label htmlFor='pocContact' className='font-bold text-gray-600 cursor-pointer'>POC Contact</label>
								<input id='pocContact' value={formData.POCPHONE} onChange={handleChange} name='POCPHONE' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='Enter POC Contact' />
							</div>
							<div className='my-3'>
								<label htmlFor='advertiser_pricing' className='font-bold text-gray-600 cursor-pointer'>Advertiser Pricing (Revenue)</label>
								<select id='advertiser_pricing' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg'>
									<option value="CPA" key="CPA">CPA</option>
								</select>
							</div>
							<div className='my-3'>
								<label htmlFor='affiliate_pricing' className='font-bold text-gray-600 cursor-pointer'>Affiliate Pricing (Revenue)</label>
								<select id='affiliate_pricing' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg'>
									<option value="CPA" key="CPA">CPA</option>
								</select>
							</div>
							<div className='my-3'>
								<label htmlFor='affiliateName' className='font-bold text-gray-600 cursor-pointer'>Date Range</label>
								<input id='affiliateName' onChange={handleChange} name='affiliate_pricing' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='Enter Advertiser Name' />
							</div>
						</div>


						<div className='w-6/12 p-4'>
							<div className='my-3'>
								<label htmlFor='campaignLogo' className='font-bold text-gray-600 cursor-pointer'>Campaign Logo</label>
								<input id='campaignLogo' name='campaign_logo' className='w-full mt-1 outline-none h-12 py-2 px-5 border border-gray-500 font-semibold rounded-lg bg-white' type="file" onChange={(e) => { setFiles(e.target.files[0]) }} placeholder='Enter Campaign Name' />
							</div>
							<div className='my-3'>
								<label htmlFor='offerCategory' className='font-bold text-gray-600 cursor-pointer'>Offer Category</label>
								<select id='offerCategory' value={formData.offer_category} onChange={handleChange} name='offer_category' className='w-full mt-1 outline-none h-12 py-2 px-5 border border-gray-500 font-semibold rounded-lg bg-white' type="text">
									<option value="Item 1" key="Item 1">Item 1</option>
								</select>
							</div>
							<div className='my-3'>
								<label htmlFor='pocname' className='font-bold text-gray-600 cursor-pointer'>POC Name</label>
								<input id='pocname' value={formData.POCNAME} onChange={handleChange} name='POCNAME' className='w-full mt-1 outline-none h-12 py-2 px-5 border border-gray-500 font-semibold rounded-lg bg-white' type="text" placeholder='Enter POC Name' />
							</div>
							<div className='my-3'>
								<label htmlFor='pocEmail' className='font-bold text-gray-600 cursor-pointer'>POC Email</label>
								<input id='pocEmail' value={formData.POCEMAIL} onChange={handleChange} name='POCEMAIL' className='w-full mt-1 outline-none h-12 py-2 px-5 border border-gray-500 font-semibold rounded-lg bg-white' type="text" placeholder='Enter POC Email'/>
							</div>
							<div className='my-3 flex justify-between mt-4'>
								<div className='w-5/12'>
									<label htmlFor='advertiser_pricing' className='font-bold text-gray-600 cursor-pointer'>Amount</label>
									<input id='advertiser_pricing' value={formData.advertiser_pricing} onChange={handleChange} name='advertiser_pricing' className='w-full mt-1 outline-none h-12 py-2 px-5 border border-gray-500 font-semibold rounded-lg bg-white' type="number" placeholder='Enter Amount' min={0} />
								</div>
								<div className='w-6/12'>
									<label htmlFor='currency' className='font-bold text-gray-600 cursor-pointer'>Currency</label>
									<select id='currency' value={formData.currency} onChange={handleChange} name='currency' className='w-full mt-1 outline-none h-12 py-2 px-5 border border-gray-500 font-semibold rounded-lg bg-white' type="text" placeholder='Enter Campaign Name' >
										<option value="INR" key="INR">INR</option>
									</select>
								</div>
							</div>
							<div className='my-3 flex justify-between mt-4'>
								<div className='w-5/12'>
									<label htmlFor='offerCategory' className='font-bold text-gray-600 cursor-pointer'>Amount</label>
									<input id='offerCategory' value={formData.affiliate_pricing} onChange={handleChange} name='affiliate_pricing' className='w-full mt-1 outline-none h-12 py-2 px-5 border border-gray-500 font-semibold rounded-lg bg-white' type="number" placeholder='Enter Amount' min={0} />
								</div>
								<div className='w-6/12 hidden'>
									<label htmlFor='offerCategory' className='font-bold text-gray-600 cursor-pointer'>Offer Category</label>
									<input id='offerCategory' name='offerCategory' value={formData.offer_category} className='w-full mt-1 outline-none h-12 py-2 px-5 border border-gray-500 font-semibold rounded-lg bg-white' type="text" placeholder='Enter Campaign Name' />
								</div>
								<div className='w-6/12 hidden'>
									<label htmlFor='pocName' className='font-bold text-gray-600 cursor-pointer'>POC Name</label>
									<input id='pocName' name='POCNAME' className='w-full mt-1 outline-none h-12 py-2 px-5 border border-gray-500 font-semibold rounded-lg bg-white' type="text" placeholder='Enter POC Name' />
								</div>
							</div>
							<div className='my-3'>
								<label htmlFor='offerCategory' className='font-bold text-gray-600 cursor-pointer'>Country Target</label>
								<input id='offerCategory' value={formData.target_country} onChange={handleChange} name='target_country' className='w-full mt-1 outline-none h-12 py-2 px-5 border border-gray-500 font-semibold rounded-lg bg-white' type="text" placeholder='Target Country' />
							</div>
						</div>
					</div>


					<div className='w-full p-4 flex items-center flex-col'>
						<div className='flex flex-col w-full'>
							<label htmlFor='campaignName' className='font-bold text-gray-600 cursor-pointer'>Terms</label>
							<textarea onChange={handleChange} value={formData.terms} name='terms' className='resize-y w-full mt-1 outline-none h-44 py-2 px-5 border border-gray-500 font-semibold rounded-lg bg-white' placeholder='Offer Description'></textarea>
						</div>
						<div className='flex flex-col w-full'>
							<label htmlFor='campaignName' className='font-bold text-gray-600 cursor-pointer'>Campaign Brief</label>
							<textarea name='campaign_brief' value={formData.campaign_brief} onChange={handleChange} className='resize-y w-full mt-1 outline-none h-44 py-2 px-5 border border-gray-500 font-semibold rounded-lg bg-white' placeholder='Offer Description'></textarea>
						</div>
						<div className='flex flex-col w-full'>
							<label htmlFor='campaignName' className='font-bold text-gray-600 cursor-pointer'>Tracking Information</label>
							<textarea name='tracking_information' value={formData.tracking_information} onChange={handleChange} className='resize-y w-full mt-1 outline-none h-44 py-2 px-5 border border-gray-500 font-semibold rounded-lg bg-white' placeholder='Tracking Information'></textarea>
						</div>
						<div className='flex flex-col w-full'>
							<label htmlFor='campaignName' className='font-bold text-gray-600 cursor-pointer'>Traffic Source</label>
							<textarea name='traffic_source' value={formData.traffic_source} onChange={handleChange} className='resize-y w-full mt-1 outline-none h-44 py-2 px-5 border border-gray-500 font-semibold rounded-lg bg-white' placeholder='Traffic Source'></textarea>
						</div>
						<button onClick={handleClick} disabled={loading} className='px-4 py-2 rounded-lg bg-gray-900 text-white font-bold hover:bg-gray-700 duration-200 shadow-lg mt-4 m-auto'>{loading ? <Spinner /> : <p>Submit</p>}</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default NewCampaignComponent