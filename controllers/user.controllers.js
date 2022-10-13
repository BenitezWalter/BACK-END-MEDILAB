const User =  require('../models/User')
const bcrypt =  require ('bcrypt')

const ctrlUser = {}


//Controladores del usuario

//Obtener los usuarios de la BD

ctrlUser.getUser = async (req,res)=>{
    
    const users = await User.find()

    return res.json(users)
}

//Controlador para crear un nuevo usuario (POST)

ctrlUser.postUser = async (req,res)=>{
    
    const {user, password:passwordRecibido, email} =  req.body

    const passwordCrypt = bcrypt.hashSync(passwordRecibido, 10)//Encriptar

    const newUser = new User({
        user,
        password:passwordCrypt,
        email
    })

    const username = await newUser.save()

    return res.json({
        message:"Usuario creado correctamente, sus datos son:",
        username
    })

}