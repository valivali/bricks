import cors from "cors"
import express from "express"
import helmet from "helmet"
import { env } from "./config/env.config.js"
import { logger } from "./lib/logger/index.js"
import { requestContextMiddleware } from "./middleware/request-context.middleware.js"
import { requestLoggerMiddleware } from "./middleware/request-logger.middleware.js"
import routes from "./routes/index.js"

const app = express()
const port = env.port

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"]
      }
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" }
  })
)
app.use(cors())
app.use(express.json())
app.use(requestContextMiddleware)
app.use(requestLoggerMiddleware)

app.use("/api", routes)

app.listen(port, () => {
  logger.info("server.started", { port })
})
