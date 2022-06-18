import express from 'express'
import sequelize from './src/database/connection'

const app = express()

const PORT = process.env.PORT || 8000


const checkConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
checkConnection();

app.get("/", (req,res) => {
    res.send("Hello World1!!!!!!")
})

app.listen(PORT, () => console.log(`Server Running at ${PORT}`))