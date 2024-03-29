import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-user-and-authenticate'

describe('Create Bill (e2e)', () => {
	it('should be able to create a bill', async () => {
		const { token } = await createAndAuthenticateUser(app)

		const response = await request(app)
			.post('/bills')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'bills-01',
				description: 'api de pagamentos',
				imageUrl: null,
				amount: 3500,
				dueDate: new Date('12-20-2023'),
				lastCharge: null,
				paid_at: null,
			})

		expect(response.status).toEqual(201)
		expect(response.body.bill).toEqual(
			expect.objectContaining({
				id: expect.any(String),
			}),
		)
	})
})
