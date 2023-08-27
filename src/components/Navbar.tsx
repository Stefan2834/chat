import React, { useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import { useDefault } from '@/contexts/Default';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { signOut } from "next-auth/react"



import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Toolbar,
  AppBar,
  IconButton,
  Typography
} from '@mui/material';


import home from '../svg/black/home.svg'
import mail from '../svg/black/mail.svg'
import settings from '../svg/black/setting.svg'
import doubleRight from '../svg/black/double-right.svg'
import search from '../svg/black/people-search-one.svg'
import message from '../svg/black/text-message.svg'
import userImg from '../svg/black/user.svg'


import homeActive from '../svg/black/homeActive.svg'
import settingsActive from '../svg/black/settingActive.svg'
import userActive from '../svg/black/userActive.svg'
import messageActive from '../svg/black/text-messageActive.svg'
import mailActive from '../svg/black/mailActive.svg'
import searchActive from '../svg/black/people-search-oneActive.svg'


export default function Navbar() {
  const { navOpen, setNavOpen, user } = useDefault()
  const router = useRouter()
  const [phone, setPhone] = useState(window.innerWidth < 1000 ? true : false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setPhone(true)
      } else {
        setPhone(false)
      }
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])



  const changePath = (path: string) => {
    router.push(path)
  }

  return (
    <>
      {!phone ? (
        <Paper elevation={10} sx={{ transition: "400ms ease width", zIndex: 10 }} className={navOpen ? `${styles.navbar}` : `${styles.navbarClosed}`}>
          <Button sx={{ textTransform: 'none', position: "absolute", color: "black", transition: "400ms ease", left: 20 }}
            className='w-68 h-14 cursor-pointer flex items-center justify-start hover:translate-x-2 absolute top-2'
            onClick={() => { changePath('/main/home'); signOut() }}
          >
            <div className='h-10 w-14 mx-2 flex items-center'>
              <Image src={home} alt='Poza' width='40' height='40' className='trans' />
            </div>
            <div className='h-10 w-60 font-normal text-xl flex items-center ml-8'>Chat-app</div>
          </Button>
          <Button onClick={() => changePath('/main/home')} sx={{ textTransform: 'none', color: "black", transition: "400ms ease", margin: "8px 0", position: 'relative', left: -10 }}
            className='w-68 h-14cursor-pointer flex items-center justify-start hover:translate-x-2'
          >
            <div className='h-10 w-14 mx-2 flex items-center'>
              <Image src={router.asPath === '/main/home' ? homeActive : home} alt="Poza" width="40" height="40" />
            </div>
            <div className={`h-10 w-60 ${router.asPath === '/main/home' ? 'font-bold' : 'font-normal'} text-xl flex items-center ml-8`}>Home</div>
          </Button>
          <Button onClick={() => changePath('/main/messages')} sx={{ textTransform: 'none', color: "black", transition: "400ms ease", margin: "8px 0", position: 'relative', left: -10 }}
            className='w-68 h-14 cursor-pointer flex items-center justify-start hover:translate-x-2'
          >
            <div className='h-10 w-14 mx-2 flex items-center'>
              <Image src={router.asPath.includes('/main/messages') ? messageActive : message} alt='Poza' width='40' height='40' />
            </div>
            <div className={`h-10 w-60 ${router.asPath.includes('/main/messages') ? 'font-bold' : 'font-normal'} text-xl flex items-center ml-8`}>Messages</div>
          </Button>
          <Button onClick={() => changePath('/main/users')} sx={{ textTransform: 'none', color: "black", transition: "400ms ease", margin: "8px 0", position: 'relative', left: -10 }}
            className='w-68 h-14 cursor-pointer flex items-center justify-start hover:translate-x-2'
          >
            <div className='h-10 w-14 mx-2 flex items-center'>
              <Image src={router.asPath === '/main/users' ? searchActive : search} alt='Poza' width='40' height='40' />
            </div>
            <div className={`h-10 w-60 ${router.asPath === '/main/users' ? 'font-bold' : 'font-normal'} text-xl flex items-center ml-8`}>Users</div>
          </Button>
          <Button onClick={() => changePath('/main/notifications')} sx={{ textTransform: 'none', color: "black", transition: "400ms ease", margin: "8px 0", position: 'relative', left: -10 }}
            className='w-68 h-14 cursor-pointer flex items-center justify-start hover:translate-x-2'
          >
            <div className='h-10 w-14 mx-2 flex items-center'>
              <Image src={router.asPath === '/main/notifications' ? mailActive : mail} alt='Poza' width='40' height='40' />
            </div>
            <div className={`h-10 w-60 ${router.asPath === '/main/notifications' ? 'font-bold' : 'font-normal'} text-xl flex items-center ml-8`}>Notifications</div>
          </Button>
          <Button onClick={() => changePath(`/main/users/${user?.email}`)} sx={{ textTransform: 'none', color: "black", transition: "400ms ease", margin: "8px 0", position: 'relative', left: -10 }}
            className='w-68 h-14 cursor-pointer flex items-center justify-start hover:translate-x-2'
          >
            <div className='h-10 w-14 mx-2 flex items-center'>
              <Image src={router.asPath === `/main/users/${user?.email}` ? userActive : userImg} alt='Poza' width='40' height='40' />
            </div>
            <div className={`h-10 w-60 ${router.asPath === `/main/users/${user?.email}` ? 'font-bold' : 'font-normal'} text-xl flex items-center ml-8`}>Profile</div>
          </Button>
          <Button onClick={() => changePath('/main/settings')} sx={{ textTransform: 'none', color: "black", transition: "400ms ease", margin: "8px 0", position: 'relative', left: -10 }}
            className='w-68 h-14 cursor-pointer flex items-center justify-start hover:translate-x-2'
          >
            <div className='h-10 w-14 mx-2 flex items-center'>
              <Image src={router.asPath === '/main/settings' ? settingsActive : settings} alt='Poza' width='40' height='40' />
            </div>
            <div className={`h-10 w-60 ${router.asPath === '/main/settings' ? 'font-bold' : 'font-normal'} text-xl flex items-center ml-8`}>Settings</div>
          </Button>
          <Button sx={{ textTransform: 'none', position: "absolute", color: "black", transition: "400ms ease", left: 20 }}
            className='w-68 h-14 cursor-pointer flex items-center justify-start hover:translate-x-2 absolute bottom-2'
            onClick={() => setNavOpen(!navOpen)}
          >
            <div className='h-10 w-14 mx-2 flex items-center'>
              {navOpen ? (
                <Image src={doubleRight} alt='Poza' width='40' height='40' className='rotate-180 trans' />
              ) : (
                <Image src={doubleRight} alt='Poza' width='40' height='40' className='trans' />
              )}
            </div>
            <div className='h-10 w-60 font-normal text-xl flex items-center ml-8'>Collapse</div>
          </Button>
        </Paper>
      ) : (
        <>
          <div className={router.route === '/main/messages/[email]' ? `${styles.custom1} h-full z-20` : `${styles.custom2} h-full z-20`}
          >
            <Paper sx={{ position: 'fixed', left: 0, top: 0, zIndex: 20, width: '100vw' }} elevation={3}
            >
              <AppBar position="static" sx={{ backgroundColor: "#eee" }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Image alt='Poza' src={home} width={35} height={35} className='' />
                  <Image onClick={() => changePath('/main/settings')} className='cursor-pointer'
                    alt='Poza'
                    src={router.asPath === '/main/settings' ? settingsActive : settings}
                    width={35} height={35}
                  />
                </Toolbar>
              </AppBar>
            </Paper>
            <Paper sx={{ position: 'sticky', left: 0, top: 'calc(100vh)', zIndex: 20, width: '100vw', height: '56px' }} elevation={3}>
              <BottomNavigation
                showLabels
              >
                <BottomNavigationAction onClick={() => changePath('/main/home')} label="Home"
                  icon={<Image alt='Poza' width={30} height={30} src={router.asPath === '/main/home' ? homeActive : home} />}
                />
                <BottomNavigationAction onClick={() => changePath('/main/messages')} label="Messages"
                  icon={<Image alt='Poza' width={30} height={30} src={router.asPath.includes('/main/messages') ? messageActive : message} />}
                />
                <BottomNavigationAction onClick={() => changePath('/main/users')} label="Users"
                  icon={<Image alt='Poza' width={30} height={30} src={router.asPath === '/main/users' ? searchActive : search} />}
                />
                <BottomNavigationAction onClick={() => changePath('/main/notifications')} label="Notifications"
                  icon={<Image alt='Poza' width={30} height={30} src={router.asPath === '/main/notifications' ? mailActive : mail} />}
                />
                <BottomNavigationAction onClick={() => changePath(`/main/users/${user?.email}`)} label="Profile"
                  icon={<Image alt='Poza' width={30} height={30} src={router.asPath === `/main/users/${user?.email}` ? userActive : userImg} />}
                />
              </BottomNavigation>
            </Paper>
          </div>
        </>
      )}
    </>
  )
}
