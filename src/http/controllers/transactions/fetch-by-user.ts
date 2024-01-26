import { Request, Response } from 'express'
import { z } from 'zod'

import { makeFetchUserTransactionUseCase } from '@/use-cases/factories/makeFetchUserTransactionsUseCase'

export async function fetchByUser(req: Request, res: Response) {
	const fetchByUserQuerySchema = z.object({
		type: z.string().nullable().default(null),
	})

	const { type } = fetchByUserQuerySchema.parse(req.query)

	const fetchUserTransactionUseCase = makeFetchUserTransactionUseCase()

	const { transactions } = await fetchUserTransactionUseCase.execute({
		userId: req.user.sub,
		type,
	})

	return res.status(200).json({ transactions })
}
