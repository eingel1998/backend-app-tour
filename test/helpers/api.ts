import request from 'supertest'
import { NextApiHandler } from 'next'
import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'

interface NextApp {
  prepare(): Promise<void>
  getRequestHandler(): (req: unknown, res: unknown, parsedUrl: unknown) => Promise<void>
  close(): Promise<void>
}

interface TestServer {
  listen(port: number, callback: () => void): void
  close(callback: () => void): void
  address(): { port: number } | null
}

/**
 * Helper para testing de APIs de Next.js
 */
export class NextTestHelper {
  private app: NextApp | null = null
  private server: TestServer | null = null

  async setup() {
    this.app = next({
      dev: false,
      conf: {
        distDir: '.next',
      },
    }) as NextApp

    await this.app.prepare()

    this.server = createServer(async (req, res) => {
      const parsedUrl = parse(req.url!, true)
      await this.app!.getRequestHandler()(req, res, parsedUrl)
    }) as TestServer

    return new Promise<void>((resolve) => {
      this.server!.listen(0, () => {
        resolve()
      })
    })
  }

  async cleanup() {
    if (this.server) {
      await new Promise<void>((resolve) => {
        this.server!.close(() => resolve())
      })
    }
    if (this.app) {
      await this.app.close()
    }
  }

  getRequest() {
    return request(this.server as Parameters<typeof request>[0])
  }

  getPort() {
    return this.server?.address()?.port
  }
}

/**
 * Helper simplificado para testing de rutas API
 */
export function testApiRoute(handler: NextApiHandler) {
  return {
    get: (query?: Record<string, unknown>) => {
      const req = {
        method: 'GET',
        query: query || {},
        body: {},
        headers: {},
      } as unknown as Parameters<NextApiHandler>[0]

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
        end: jest.fn(),
      } as unknown as Parameters<NextApiHandler>[1]

      return { req, res, handler: () => handler(req, res) }
    },

    post: (body?: Record<string, unknown>, query?: Record<string, unknown>) => {
      const req = {
        method: 'POST',
        query: query || {},
        body: body || {},
        headers: { 'Content-Type': 'application/json' },
      } as unknown as Parameters<NextApiHandler>[0]

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
        end: jest.fn(),
      } as unknown as Parameters<NextApiHandler>[1]

      return { req, res, handler: () => handler(req, res) }
    },
  }
}
