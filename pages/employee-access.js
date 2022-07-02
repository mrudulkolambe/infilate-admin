import React, { useState, useEffect } from 'react'
import EmployeeAccessSwitch from '../components/EmployeeAccessSwitch';
import HeadComponent from '../components/HeadComponent';
import { db2, secondaryAuth } from '../context/firebase_config2'
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore';
import { useAuthContext } from '../context/Auth'
import Spinner from '../components/Spinner'
import { useEmployeeAccess } from '../context/employeeAccess';
import Alert from '../components/Alert';
import { auth } from '../context/firebase_config';

const EmployeeAccess = () => {
	const [tabPos, setTabPos] = useState('ad_manager');
	const [loading, setLoading] = useState(false);
	const { user, showAlert, setShowAlert } = useAuthContext()
	const { employeeAccess, ad_manager, setAd_manager, seo_manager, setSEO_manager, affiliate_manager, setAffiliate_manager, finance, setFinance, messenger, setMessenger } = useEmployeeAccess()
	const initialAccess = [ad_manager, seo_manager, affiliate_manager, finance, messenger]
	const initialState = {
		email: '',
		password: '',
		name: '',
		type: '',
		userType: "User",
		publishers: []
	}
	const [userData, setUserData] = useState(initialState)


	const handleChange = (evt) => {
		const value = evt.target.value;
		setUserData({
			...userData,
			[evt.target.name]: value
		});
	}
	const handleClick = () => {
		setLoading(true)
		createUserWithEmailAndPassword(secondaryAuth, userData.email, userData.password)
			.then(async (userCredential) => {
				const newUser = userCredential.user;
				updateProfile(newUser, {
					displayName: userData.name,
				}).then(async () => {
					await setDoc(doc(db2, "employee_details", newUser.uid), userData)
						.then(() => {
							console.log("done")
							setLoading(false)
							setUserData(initialState)
						})
				}).catch((error) => {
					console.log(error)
				});
			})
			.catch((error) => {
				setLoading(false)
				console.log(error)
			});

	}

	useEffect(() => {
		onAuthStateChanged(secondaryAuth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				const uid = user.uid;
				console.log(user)
				// ...
			} else {
				// User is signed out
				// ...
			}
		});
	}, []);
	const filterAccess = (data) => {
		return data.id === tabPos
	}
	const tabs = [
		{
			tab: 'Ad Manager',
			id: 'ad_manager'
		},
		{
			tab: 'SEO Manager',
			id: 'seo_manager'
		},
		{
			tab: 'Affiliate Manager',
			id: 'affiliate_manager'
		},
		{
			tab: 'Finance',
			id: 'finance'
		},
		{
			tab: 'Messenger',
			id: 'messenger'
		}
	]
	return (
		<>
			<HeadComponent title={'Employee Access'} />
			{/* <Alert show={showAlert} /> */}
			<div className='left-position absolute top-24 mt-2 px-5 py-6 Nunito w-10/12 h-calc-height overflow-scroll flex items-center justify-center flex-col'>
				<h2 className='text-4xl font-bold text-center '>Employee Access </h2>
				<div className='flex justify-between px-28 mt-10 hidden'>
					{
						tabs.map((tab) => {
							return <div onClick={() => { setTabPos(tab.id) }} className={tabPos === tab.id ? 'w-44 text-center border rounded-lg border-gray-500 cursor-pointer bg-gray-900 text-white duration-200 font-bold px-2 py-2 mx-2' : 'w-44 text-center border rounded-lg border-gray-500 cursor-pointer hover:bg-gray-200 duration-200 font-bold px-2 py-2 mx-2'} key={tab.id}>{tab.tab}</div>
						})
					}
				</div>
				<div className='mt-8 px-10 hidden'>
					{
						<EmployeeAccessSwitch data={employeeAccess && employeeAccess.filter(filterAccess)[0]} id={employeeAccess && employeeAccess.filter(filterAccess)[0] && employeeAccess.filter(filterAccess)[0].id} />
					}
				</div>
				<div className='w-6/12 mt-8 m-auto'>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='employeeName' className='font-bold text-gray-600 cursor-pointer'>Employee Name</label>
						<input id='employeeName' name='name' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' value={userData.name} onChange={handleChange} type="text" placeholder='John Doe' />
					</div>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='employeeEmail' className='font-bold text-gray-600 cursor-pointer'>Employee Email</label>
						<input id='employeeEmail' name='email' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="text" placeholder='johndoe@gmail.com' value={userData.email} onChange={handleChange} />
					</div>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='employeePassword' className='font-bold text-gray-600 cursor-pointer'>Employee Password</label>
						<input id='employeePassword' name='password' className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' type="password" placeholder='employee123' value={userData.password} onChange={handleChange} />
					</div>
					<div className='flex flex-col items-start mt-3'>
						<label htmlFor='employeeType' className='font-bold text-gray-600 cursor-pointer'>Employee Type</label>
						<select id='employeeType' name='type' value={userData.type} onChange={handleChange} className='w-full mt-1 outline-none py-3 px-5 border border-gray-500 font-semibold rounded-lg' placeholder='employee123'>
							<option value="Ad Manager" key="Ad Manager">Ad Manager</option>
							<option value="SEO Manager" key="SEO Manager">SEO Manager</option>
							<option value="Messenger" key="Messenger">Messenger</option>
							<option value="Affiliate Manager" key="Affiliate Manager">Affiliate Manager</option>
							<option value="Finance" key="Finance">Finance</option>
						</select>
					</div>
					<div className='mt-4'>
						<button disabled={loading} type='button' onClick={handleClick} className='py-2 px-3 bg-gray-900 duration-200 rounded-lg text-white font-bold hover:bg-gray-700'>{loading ? <Spinner /> : 'Submit'}</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default EmployeeAccess