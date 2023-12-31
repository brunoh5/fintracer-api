import { TransactionsRepository } from '@/repositories/transactions-repository'
import { Transaction } from '@prisma/client'

interface FetchUserTransactionsUseCaseRequest {
	userId: string
	type: string | null
}

interface FetchUserTransactionsUseCaseResponse {
	transactions: Transaction[]
}

export class FetchUserTransactionsUseCase {
	constructor(private transactionsRepository: TransactionsRepository) {}

	async execute({
		userId,
		type,
	}: FetchUserTransactionsUseCaseRequest): Promise<FetchUserTransactionsUseCaseResponse> {
		const transactions = await this.transactionsRepository.findManyByUserId({
			id: userId,
			type,
		})

		return {
			transactions,
		}
	}
}
