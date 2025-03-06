const app = require("express")()

app.get("/", (req, res) => {
  res.send("Hello Express!")
})

app.listen(8080, () => {
  console.log("Server listening on port 8080")
})
