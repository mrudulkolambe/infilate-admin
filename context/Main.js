import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "./firebase_config";
import { useAuthContext } from "./Auth";


const MainContext = createContext();

export function MainContextProvider({ children }) {
	const { user } = useAuthContext()
	const [campaignData, setCampaignData] = useState();

	useEffect(() => {
		if (user) {
			const q = query(collection(db, "campaign_data"));
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const data = [];
				querySnapshot.forEach((doc) => {
					let obj = doc.data()
					obj.id = doc.id
					data.push(obj)
				});
				setCampaignData(data)
			});
			return () => {
				unsubscribe()
			}
		}
	}, [user]);

	useEffect(() => {
		if (user) {
			const q = query(collection(db, "campaign_details"), where('requested', '==', true));
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const data = [];
				querySnapshot.forEach((doc) => {
					let obj = doc.data()
					obj.id = doc.id
					data.push(obj)
				});
				console.log(data)
			});
			return () => {
				unsubscribe()
			}
		}
	}, [user]);

	return (
		<MainContext.Provider value={{ campaignData }}>
			{children}
		</MainContext.Provider>
	);
}

export function useMainContext() {
	return useContext(MainContext);
}
