import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { AuthContextProvider } from '../context/Auth'
import { CampaignUploadProvider } from '../context/campaignUpload'
import { EmployeeAccessProvider } from '../context/employeeAccessFile'
import { ReportDataProvider } from '../context/reportData'
import '../styles/globals.css'
import '../styles/Main.css'
import {MainContextProvider } from '../context/Main'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [shifting, setShifting] = useState(false)
  const [show, setShow] = useState(false);
  const handleRouteChange = () => {
    setShifting(true)
  }
  const handleRouteComplete = () => {
    setShifting(false)
    setShow(false)
  }
  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteComplete)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeComplete', handleRouteComplete)
    }
  }, []);
  return (
    <>
      <AuthContextProvider>
        <MainContextProvider>
          <CampaignUploadProvider>
            <ReportDataProvider>
              <EmployeeAccessProvider>
                <div className='fixed top-0 left-0 w-full bg-gradient-top h-20 -z-20'></div>
                <Sidebar setShow={setShow} />
                <Topbar show={show} setShow={setShow} />
                <div className={shifting ? 'opacity-100 fixed top-20 left-position w-10/12 calc-height bg-white zindex2000 duration-300' : 'pointer-events-none opacity-0 fixed top-20 left-position w-10/12 calc-height bg-white zindex2000 duration-300'}></div>
                <Component {...pageProps} />
              </EmployeeAccessProvider>
            </ReportDataProvider>
          </CampaignUploadProvider>
        </MainContextProvider>
      </AuthContextProvider>
    </>
  )
}

export default MyApp
