import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { env } from '@/env'

interface PayloadProps {
	sub: string
}

export async function verifyJWT(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const authHeader = req.headers.authorization

	if (!authHeader) {
		return res.status(401).json({ message: 'Unauthorized' })
	}

	const [, token] = authHeader.split(' ')

	try {
		const { sub: userId } = verify(token, env.JWT_SECRET) as PayloadProps

		req.user = {
			sub: userId,
		}

		next()
	} catch {
		return res.status(401).json({ message: 'Unauthorized' })
	}
}
