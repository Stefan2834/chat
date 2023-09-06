import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const accessExpire = '10s'
    if (req.method === 'GET') {
        try {
            const header = req?.headers?.['authorization']
            if (header) {
                const accessToken: string = header.split(' ')[1]
                const accessKey: string = process.env.ACCESS_TOKEN ? process.env.ACCESS_TOKEN : ''
                if (accessToken && accessKey) {
                    jwt.verify(accessToken, accessKey, async (err, user: any) => {
                        if (err) {
                            if (err.name === 'TokenExpiredError') {
                                const refreshToken = req.cookies.refreshToken
                                const refreshKey: string = process.env.REFRESH_TOKEN ? process.env.REFRESH_TOKEN : ''
                                console.log(refreshKey, refreshToken)
                                if (refreshToken && refreshKey) {
                                    jwt.verify(refreshToken, refreshKey, async (err: any, user: any) => {
                                        if (err) {
                                            if (err.name === 'TokenExpiredError') {
                                                return res.json({ success: false, message: 'Session expired', logout: true })
                                            } else return res.json({ success: false, message: 'Refresh Token changed without permission', logout: true })
                                        } else {
                                            const newAccessToken = jwt.sign({ username: user.username, avatar: user.avatar, email: user.email }, accessKey, { expiresIn: accessExpire });
                                            return res.json({
                                                success: true,
                                                message: 'New togen generate',
                                                username: user?.username,
                                                email: user?.email,
                                                newAccessToken: newAccessToken,
                                                avatar: user?.avatar,
                                            })
                                        }
                                    })
                                } else return res.json({ success: false, message: 'Invalid Refresh Token', logout: true })
                            } else return res.json({ success: false, message: 'Token changed without permission', logout: true })
                        } else {
                            return res.json({
                                success: true,
                                message: 'Token is valid',
                                username: user?.username,
                                email: user?.email,
                                avatar: user?.avatar,
                            })
                        }
                    })
                } else {
                    return res.json({ success: false, message: 'You are not logged in' })
                }
            } else return res.json({ success: false, message: 'Invalid header', logout: true })
        } catch (err: any) {
            res.json({ success: false, message: err.message, logout: true })
        }
    } else if (req.method === 'POST') {
        try {
            const { refreshToken } = req.body
            res.setHeader('Set-Cookie', `refreshToken=${refreshToken}`);
            res.json({ success: true, message: 'Refresh Token saved' })
        } catch (err) {
            res.json({ success: false, message: 'Refresh Token not saved' })
        }
    } else if (req.method === 'DELETE') {
        res.setHeader('Set-Cookie', 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/');
    }
}