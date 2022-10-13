const bcrypt =  require ('bcrypt')
const User = require("../models/User")
const Tasks = require("../models/Tasks")

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

//Controlador para actualizar datos del USER, se requiere id en postman

ctrlUser.putUser = async (req, res) => {

    const id = req.params.id

    const { user, email} = req.body


    try {
        const userUpdate = await User.findByIdAndUpdate(id,{user,email},{new:true});

        return res.json({
            msg: 'Usuario actualizado correctamente',
            userUpdate
        })
    } catch (error) {
        return res.json({
            msg:'Error al actualizar usuario'
        })
    }
};

//controlador para eliminar usuario
ctrlUser.deleteUser= async(req,res)=>{
    const id=req.params.id

    try {
        const userDelete = await User.findByIdAndUpdate(id,{isActive:false},{new:true})
        
        await Tasks.deleteMany({userId:req.user._id})

        return res.json(
            {
                message:`El usuario ha sido eliminado de la bd junto con sus tareas`,
                userDelete:userDelete.user
            }
        )

        
    } catch (error) {
        console.log(error)
    }

}


module.exports = ctrlUser
