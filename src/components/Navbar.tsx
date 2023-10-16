import React, { useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import { useDefault } from '@/contexts/Default';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { signOut } from "next-auth/react"



import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Toolbar,
  AppBar,
} from '@mui/material';


import logOut from '../svg/logout.svg'
import logo from '../svg/wechat.svg'

export default function Navbar() {
  const { user } = useDefault()
  const router = useRouter()
  const [phone, setPhone] = useState<boolean>(window.innerWidth < 1000 ? true : false)

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
        <Paper elevation={10} sx={{ transition: "400ms ease width", zIndex: 10 }} className={`${styles.navbarClosed}`}>
          <Button sx={{ textTransform: 'none', position: "absolute", color: "black", transition: "400ms ease", left: 20 }}
            className='w-68 h-14 cursor-pointer flex items-center justify-start hover:translate-x-2 absolute top-2'
            onClick={() => router.push('/main/messages')}
          >
            <div className='h-10 w-14 mx-2 flex items-center'>
              <Image src={logo} alt='Poza' width='40' height='40' className='trans' />
            </div>
          </Button>
          <Button sx={{ textTransform: 'none', position: "absolute", color: "black", transition: "400ms ease", left: 20 }}
            className='w-68 h-14 cursor-pointer flex items-center justify-start hover:translate-x-2 absolute bottom-2'
            onClick={() => { signOut() }}
          >
            <div className='h-10 w-14 mx-2 flex items-center'>
              <Image src={logOut} alt='Poza' width='40' height='40' className='trans' />
            </div>
          </Button>
        </Paper>
      ) : (
        <>
          <Box sx={{ zIndex: '20', height: '100%', cursor: "pointer" }}
            onClick={() => router.push('/main/messages')}
            className={router.route === '/main/messages/[email]' ? `${styles.custom1}` : `${styles.custom2}`}
          >
            <Paper sx={{ position: 'fixed', left: 0, top: 0, zIndex: 20, width: '100vw' }} elevation={3}
            >
              <AppBar position="static" sx={{ backgroundColor: "#eee" }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Image alt='Poza' src={logo} width={35} height={35} />
                  <Image onClick={() => signOut()} className='cursor-pointer'
                    alt='Poza'
                    src={logOut}
                    width={35} height={35}
                  />
                </Toolbar>
              </AppBar>
            </Paper>
          </Box>
        </>
      )}
    </>
  )
}
