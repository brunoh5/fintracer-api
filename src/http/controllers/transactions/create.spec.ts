import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-user-and-authenticate'

describe('Create Transaction (e2e)', () => {
	it('should be able to create a transaction', async () => {
		const { token } = await createAndAuthenticateUser(app)

		const accountResponse = await request(app)
			.post('/accounts')
			.set('Authorization', `Bearer ${token}`)
			.send({
				initialAmount: 3500,
				bank: 'bank-01',
				type: 'Conta Corrente',
				number: '1111 2222 3333 4444',
			})

		const { id: accountId } = accountResponse.body.account

		const categoryResponse = await request(app)
			.get(`/categories`)
			.set('Authorization', `Bearer ${token}`)
			.send()

		const { id: categoryId } = categoryResponse.body.categories[0]

		const response = await request(app)
			.post('/transactions')
			.set('Authorization', `Bearer ${token}`)
			.send({
				categoryId,
				accountId,
				amount: 3500,
				shopName: 'KaBuM',
				type: 'sent',
				payment_method: 'credit-card',
				paid_at: null,
				name: 'RTX 3060',
			})

		expect(response.statusCode).toEqual(201)
		expect(response.body.transaction).toEqual(
			expect.objectContaining({
				id: expect.any(String),
			}),
		)
	})
})
