import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "./firebase_config";
import { useAuthContext } from "./Auth";
import { useRouter } from 'next/router'


const EmployeeAccess = createContext();

export function EmployeeAccessProvider({ children }) {
	const router = useRouter()
	const [employeeData, setEmployeeData] = useState()
	const { user } = useAuthContext()
	useEffect(() => {
		if (user) {
			const q = query(collection(db, "employee_details"));
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const arr = [];
				querySnapshot.forEach((doc) => {
					let obj = doc.data()
					obj.id = doc.id
					arr.push(obj);
				});
				setEmployeeData(arr)
			});
			return () => {
				unsubscribe()
			};
		}
	}, [user]);
	return (
		<EmployeeAccess.Provider value={{employeeData, setEmployeeData}}>
			{children}
		</EmployeeAccess.Provider>
	);
}

export function useEmployeeAccess() {
	return useContext(EmployeeAccess);
}
