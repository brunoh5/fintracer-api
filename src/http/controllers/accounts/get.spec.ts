import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-user-and-authenticate'
import request from 'supertest'
import { describe, expect, it } from 'vitest'

describe('Get Account (e2e)', () => {
	it('should be able to get a account', async () => {
		const { token } = await createAndAuthenticateUser(app)

		const accountResponse = await request(app)
			.post('/accounts')
			.set('Authorization', `Bearer ${token}`)
			.send({
				initialAmount: 3500,
				bank: 'bank-02',
				type: 'Conta Corrente',
				number: '1111 2222 3333 4444',
			})

		const { id } = accountResponse.body.account

		const response = await request(app)
			.get(`/accounts/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.status).toEqual(200)
		expect(response.body.account).toEqual(
			expect.objectContaining({ id: expect.any(String) }),
		)
	})
})
