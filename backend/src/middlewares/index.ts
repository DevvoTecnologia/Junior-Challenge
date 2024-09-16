import { NextFunction, Request, Response } from "express";
import { getUserBySessionToken } from "../services/userServices";
import { get, merge } from "lodash";

export const isOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const currentUserId = get(req, 'identify._id') as string

        if (!currentUserId) {
            return res.sendStatus(403)
        }

        if(currentUserId.toString() !== id) {
            return res.sendStatus(403)
        }

        return next()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionToken = req.cookies['AUTH_TOKEN']

        if (!sessionToken) {
            return res.sendStatus(403)
        }

        const existingUser = await getUserBySessionToken(sessionToken)

        if(!existingUser) {
            return res.sendStatus(403)
        }

        merge(req, { identity: existingUser })

        return next()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

