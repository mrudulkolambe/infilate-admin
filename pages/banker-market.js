import React, { useEffect, useState } from 'react'
import BankerMarketApprove from '../components/BankerMarketApprove'
import { db } from '../context/firebase_config'
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";
import { useCampaignUpload } from '../context/campaignUpload';
import CampaignTrackingLink from '../components/CampaignTrackingLink';
import BankerCard from '../components/BankerCard';


const BankerMarket = () => {
  const [tab, setTab] = useState(0)
  const [approveData, setApproveData] = useState()
  const [currentPublisher, setCurrentPublisher] = useState()
  const { campaignData } = useCampaignUpload()
  const [adminData, setAdminData] = useState()
  const [currentPublisherData, setCurrentPublisherData] = useState()
  useEffect(() => {
    if (currentPublisher) {
      const unsub = onSnapshot(doc(db, "publisher_database", currentPublisher), (doc) => {
        let obj = doc.data()
        obj.id = doc.id
        setAdminData(obj)
      });
      return () => {
        unsub()
      };
    }
  }, [currentPublisher]);
  useEffect(() => {
    const q = query(collection(db, "publisher_database"), where('appliedBanker', '==', true));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      setApproveData(arr)
    });
    return () => {
      unsubscribe()
    };
  }, []);

  useEffect(() => {
    if (currentPublisher) {
      console.log(currentPublisher)
      const q = query(collection(db, "banker_data"), where("publisher_uid", "==", currentPublisher));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const arr = [];
        querySnapshot.forEach((doc) => {
          let obj = doc.data()
          obj.id = doc.id
          arr.push(obj);
        });
        setCurrentPublisherData(arr)
      });

      return () => {
        unsubscribe()
      };
    }
  }, [currentPublisher]);
  return (
    <>
      <div className='hidden lg:block left-position absolute top-24 mt-2 px-5 py-6 Nunito w-10/12 h-calc-height overflow-scroll'>
        <div className='border rounded-lg overflow-hidden w-full'>
          <button onClick={() => { setTab(0) }} className={tab === 0 ? 'text-white font-bold border-r py-2 text-center w-1/3 duration-200 bg-blue-600' : 'font-bold border-r py-2 text-center w-1/3 duration-200'}>Approve</button>
          <button onClick={() => { setTab(1) }} className={tab === 1 ? 'text-white font-bold border-r py-2 text-center w-1/3 duration-200 bg-blue-600' : 'font-bold border-r py-2 text-center w-1/3 duration-200'}>Update Campaign Details</button>
          <button onClick={() => { setTab(2) }} className={tab === 2 ? 'text-white font-bold border-r py-2 text-center w-1/3 duration-200 bg-blue-600' : 'font-bold border-r py-2 text-center w-1/3 duration-200'}>Details</button>
        </div>
        <div className={tab === 0 ? 'mt-8 gap-y-6 flex flex-col' : 'hidden'}>
          {
            approveData && approveData.map((data, i) => {
              return <BankerMarketApprove key={i} setTab={setTab} setCurrentPublisher={setCurrentPublisher} data={data} />
            })
          }
        </div>
        <div className={tab === 1 ? 'mt-8 gap-y-6 grid grid-cols-3' : 'hidden'}>
          {
            campaignData && campaignData.map((data) => {
              return <CampaignTrackingLink key={data.id} adminData={adminData} currentPublisher={currentPublisher} data={data} />
            })
          }
        </div>
        <div className={tab === 2 ? 'mt-8 gap-y-6 grid grid-cols-3' : 'hidden'}>
          {
            currentPublisherData && currentPublisherData.map((data, i) => {
              console.log(data)
              return <BankerCard key={i} data={data} />
            })
          }
        </div>
      </div>
    </>
  )
}

export default BankerMarket