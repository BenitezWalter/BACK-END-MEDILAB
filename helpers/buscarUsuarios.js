import User from "../models/User";
const buscar={};

buscar.findUsuario=async(dni,email,res)=>{
    const datos=await User.findOne({$or:[{dni:dni},{email:email}]})//busca si existe un usuario con el mismo dni
    if (datos) {
        return res.status(404).json({
            message:"Existe un usuario con ese dni"
        })}
    }

module.exports=buscar;