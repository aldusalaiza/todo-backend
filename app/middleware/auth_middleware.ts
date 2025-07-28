import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const token = ctx.request.header('Authorization')
    const isAuthenticated = token && token.startsWith('Bearer ')

    if (!isAuthenticated) {
      ctx.response.status(401).send({
        code: 401,
        status: 'Unauthorized',
        message: 'You must be authenticated to access this resource.',
      })
    }

    await next()
  }
}
