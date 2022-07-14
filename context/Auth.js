import { onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase_config";
import { secondaryAuth } from "./firebase_config2";
import { useRouter } from "next/router";
import { collection, doc, getDoc, onSnapshot, query, setDoc } from "firebase/firestore";




const AuthContext = createContext();

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState()
	const [userAccessData, setUserAccessData] = useState()
	const [userType, setUserType] = useState()
	const router = useRouter()
	const [alert, setAlert] = useState('')
	const [suggestions, setSuggestions] = useState('')
	const navs = [
		{
			tab: 'Campaign Upload',
			path: '/campaign-upload',
			id: 'campaign_upload'
		},
		{
			tab: 'Payment Wallet',
			path: '/payment-wallet',
			id: 'payment_wallet'
		},
		{
			tab: 'Tracking Panel',
			path: 'https://infilatemediagroup296.offer18.com/m/loginhttps://infilatemediagroup296.offer18.com/m/login',
			id: 'tracking_panel'
		},
		{
			tab: 'Report Manager',
			path: '/report-manager',
			id: 'report_manager'
		},
		{
			tab: 'Emailer Software',
			path: '/emailer-software',
			id: 'emailer_software'
		},
		{
			tab: 'Employee Access',
			path: '/publisher-access',
			id: 'employee_access'
		},
		{
			tab: 'Publisher Database',
			path: '/publisher-db',
			id: 'publisher_database'
		}
	]
	const [routes, setRoutes] = useState(navs)

	const handleSignOut = () => {
		signOut(auth).then(() => {
			setUser()
			router.push('/')
		}).catch((error) => {
			setAlert('Something went wrong!')
		});
	}
	useEffect(() => {
		handleRoutes()
	}, [userAccessData]);


	const handleRoutes = async () => {
		if (userAccessData) {
			if (userAccessData === 'Admin') {
				setRoutes(navs)
			} else {
				let data_access = userAccessData && userAccessData.toLowerCase().split(' ').join("_")
				const docRef = doc(db, "employee_access", data_access);
				const docSnap = await getDoc(docRef);
				navsItems = []
			}
		}
	}
	let navsItems = []
	const handleNavAccess = (data) => {
		navs.forEach((navItem) => {
			if (data[0] === navItem.id) {
				if (data[1] === true) {
					navsItems.push(navItem)
				}
			}
		})
		setRoutes(navsItems)
		return navsItems
	}

	useEffect(() => {
		if (user) {
			const unsub = onSnapshot(doc(db, "employee_details", user.uid), (doc) => {
				if (doc.exists()) {
					setUserAccessData(doc.data().type)
					setUserType(doc.data().userType)
					user.userType = doc.data().userType
					user.publishers = doc.data().publishers
					setUser(user)
				}
			})
			return () => {
				unsub()
			};
		}
	}, [user]);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				if (router.pathname === ('/')) {
					router.push('/campaign-upload')
				}

				const unsub = onSnapshot(doc(db, "employee_details", user.uid), (doc) => {
					if (doc.exists()) {
						setUserAccessData(doc.data().type)
						setUserType(doc.data().userType)
						user.userType = doc.data().userType
						user.publishers = doc.data().publishers
						setUser(user)
						let userNavs = []
						navs.forEach((item) => {
							if (item.id === 'employee_access') {
								return
							} else {
								userNavs.push(item)
							}
						})
						setRoutes(userNavs)
					}
					else {
						setUserAccessData('Admin')
						setUserType('Admin')
						user.userType = 'Admin'
						setUser(user)
					}
				});
			}
		});
	}, []);
	const handleSignIn = (email, password) => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				router.push('/campaign-upload')
			})
			.catch((error) => {
				setAlert(error.message)
			});
	}

	useEffect(() => {
		if (alert.length !== 0) {
			setTimeout(() => {
				setAlert('')
			}, 3000);
		}
	}, [alert]);

	const POCFunc = async (email, phone, name) => {
		await setDoc(doc(db, "POC", "POC"), {
			name: name,
			phone: phone,
			email: email
		})
			.then(() => {
				setAlert('Data Added')
			})
	}
	return (
		<AuthContext.Provider value={{ auth, handleSignIn, user, handleSignOut, userAccessData, routes, alert, setAlert, POCFunc, suggestions }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	return useContext(AuthContext);
}
