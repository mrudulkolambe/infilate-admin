import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "./firebase_config";
import { useAuthContext } from "./Auth";
import {useRouter} from 'next/router'


const EmployeeAccess = createContext();

export function EmployeeAccessProvider({ children }) {
	const router = useRouter()
	const { user } = useAuthContext()
	const initialAccess = [
		{
			label: 'Campaign Upload',
			bool: false
		},
		{
			label: 'Payment Wallet',
			bool: false
		},
		{
			label: 'Tracking Panel',
			bool: false
		},
		{
			label: 'Report Manager',
			bool: false
		},
		{
			label: 'Emailer Software',
			bool: false
		},
		{
			label: 'Publisher Database',
			bool: false
		}
	]
	const [employeeAccess, setEmployeeAccess] = useState(initialAccess);
	const [ad_manager, setAd_manager] = useState(initialAccess)
	const [seo_manager, setSEO_manager] = useState(initialAccess)
	const [affiliate_manager, setAffiliate_manager] = useState(initialAccess)
	const [finance, setFinance] = useState(initialAccess)
	const [messenger, setMessenger] = useState(initialAccess)
	useEffect(() => {
		if (user) {
			const q = query(collection(db, "employee_access"), orderBy('campaign_upload'));
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const data = [];
				querySnapshot.forEach((doc) => {
					let obj = doc.data()
					obj.id = doc.id
					data.push(obj)
				});
				setEmployeeAccess(data)
			});
			return () => {
				unsubscribe()
			}
		}else{
			router.push('/')
		}
	}, [user]);


	return (
		<EmployeeAccess.Provider value={{ employeeAccess, ad_manager, setAd_manager, seo_manager, setSEO_manager, affiliate_manager, setAffiliate_manager, finance, setFinance, messenger, setMessenger }}>
			{children}
		</EmployeeAccess.Provider>
	);
}

export function useEmployeeAccess() {
	return useContext(EmployeeAccess);
}
