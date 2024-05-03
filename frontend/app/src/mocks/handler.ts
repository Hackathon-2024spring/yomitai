import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('/api/login', async ({ request }) => {
    const loginForm = await request.json()

    return HttpResponse.json(loginForm, { status: 200 })
  })
]
