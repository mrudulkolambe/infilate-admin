import { onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase_config";
import { secondaryAuth } from "./firebase_config2";
import { useRouter } from "next/router";
import { doc, getDoc, onSnapshot } from "firebase/firestore";




const AuthContext = createContext();

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState()
	const [userAccessData, setUserAccessData] = useState()
	const router = useRouter()
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
			path: '/tracking-panel',
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
			path: '/employee-access',
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
			// An error happened.
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
				console.log(data_access)
				const docRef = doc(db, "employee_access", data_access);
				const docSnap = await getDoc(docRef);
				navsItems = []
				console.log(docSnap.data() && Object.entries(docSnap.data()).forEach(handleNavAccess))
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
		console.log(navsItems)
		setRoutes(navsItems)
		return navsItems
	}

	const handleSignIn = (email, password) => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log(user)
				setUser(user)
				const unsub = onSnapshot(doc(db, "employee_details", user.uid), (doc) => {
					if (doc.data()) {
						console.log(doc.data())
						setUserAccessData(doc.data().type)
					}
					else {
						setUserAccessData('Admin')
					}
				});
				router.push('/campaign-upload')
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(error)
			});
	}

	return (
		<AuthContext.Provider value={{ auth, handleSignIn, user, handleSignOut, userAccessData, routes }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	return useContext(AuthContext);
}
