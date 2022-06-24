import express from 'express'
import sequelize from './src/database/connection'
import User from './src/calculators/machinen/models/user'

const PORT = process.env.PORT || 8080

const app = express()
app.use(express.json())


const checkConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
//checkConnection();

app.get("/", async (req,res) => {   
    res.send("Hello World1!!!!!!")
})

app.get("/get-user", async (req,res) => {

    // const users = await User.findAll({where: {
    //     age: 23
    // }})
    const users = await User.findAll({
        attributes: ['name', 'age']
    })


    res.send({users: users})
})

app.post('/add-user', async (req, res) => {
    const request = req.body;
    
    const newUser = User.build({ name: request.name, age: request.age})
    await newUser.save();

    res.send({message: 'User Added Successfully', res: request})
})

app.listen(PORT, () => console.log(`Server Running at ${PORT}`))