import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "./firebase_config";
import { useAuthContext } from "./Auth";


const ReportData = createContext();

export function ReportDataProvider({ children }) {
	const { user } = useAuthContext()
	const [reportData, setReportData] = useState();

	useEffect(() => {
		if (user) {
			if (user.userType === 'User') {
				const q = query(collection(db, "campaign_details"), where('publisher_id', 'in', user && user.publishers));
				const unsubscribe = onSnapshot(q, (querySnapshot) => {
					const data = [];
					querySnapshot.forEach((doc) => {
						let obj = doc.data()
						obj.id = doc.id
						data.push(obj)
					});
					setReportData(data)
				});
				return () => {
					unsubscribe()
				}
			}
			else {
				const q = query(collection(db, "campaign_details"));
				const unsubscribe = onSnapshot(q, (querySnapshot) => {
					const data = [];
					querySnapshot.forEach((doc) => {
						let obj = doc.data()
						obj.id = doc.id
						data.push(obj)
					});
					setReportData(data)
				});
				return () => {
					unsubscribe()
				}
			}
		}
	}, [user]);


	return (
		<ReportData.Provider value={{ reportData }}>
			{children}
		</ReportData.Provider>
	);
}

export function useReportData() {
	return useContext(ReportData);
}
