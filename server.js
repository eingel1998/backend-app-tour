// server.ts (TypeScript, ESM)
import { createServer } from 'http'
import next from 'next'
import { parse } from 'url'
import { setupWebSocket } from './src/lib/websocket'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url || '', true)
    handle(req, res, parsedUrl)
  })

  setupWebSocket(server)

  const port = process.env.PORT || 3000
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
    console.log('> WebSocket server listo')
  })
})
