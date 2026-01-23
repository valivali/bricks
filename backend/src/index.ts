import cors from "cors"
import express from "express"
import helmet from "helmet"
import { env } from "./config/env.config.js"
import routes from "./routes/index.js"

const app = express()
const port = env.port

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    }
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}))
app.use(cors())
app.use(express.json())

app.use("/api", routes)

app.listen(port, () => {
  console.log(`API listening on port ${port}`)
})

