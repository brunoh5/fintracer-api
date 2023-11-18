import { AccountsRepository } from '@/repositories/accounts-repository'
import { InMemoryAccountsRepository } from '@/repositories/in-memory/in-memory-accounts-repository'
import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteAccountUseCase } from './delete-account'

let accountsRepository: AccountsRepository
let sut: DeleteAccountUseCase

describe('Delete Account UseCase', () => {
	beforeEach(() => {
		accountsRepository = new InMemoryAccountsRepository()
		sut = new DeleteAccountUseCase(accountsRepository)
	})

	it('should be able to delete a account', async () => {
		const createdAccount = await accountsRepository.create({
			balance: 3500,
			bank: 'Nubank-01',
			type: 'Conta Corrente',
			number: '1111 2222 3333 4444',
			userId: randomUUID(),
		})

		await sut.execute({
			accountId: createdAccount.id,
		})

		const deleteAccount = await accountsRepository.findById(createdAccount.id)

		expect(deleteAccount).toEqual(null)
	})
})