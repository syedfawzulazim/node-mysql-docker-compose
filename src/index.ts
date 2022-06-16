import express from 'express'

const app = express()

const PORT = process.env.PORT || 8000

app.get("/", (req,res) => {
    res.send("Hello World1!!!!!!")
})

app.listen(PORT, () => console.log(`Server Running at ${PORT}`))