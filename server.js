require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())
app.use("/", require("./routes/schools"))

app.listen(process.env.PORT || 8080, () => {
  console.log("Server listening on port 8080")
})
