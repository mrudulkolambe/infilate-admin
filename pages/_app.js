import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import '../styles/globals.css'
import '../styles/Main.css'

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
      <Sidebar setShow={setShow} />
      <Topbar show={show} setShow={setShow} />
      <div className={shifting ? 'opacity-100 fixed top-20 left-position w-10/12 calc-height bg-white zindex2000 duration-300' : 'pointer-events-none opacity-0 fixed top-20 left-position w-10/12 calc-height bg-white zindex2000 duration-300'}></div>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
