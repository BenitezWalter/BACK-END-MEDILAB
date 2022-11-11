const buscar={};

buscar.findUsuarioDNI=async(model,dni,rol,res)=>{
    const datos=await model.findOne({$and:[{dni:dni},{role:rol}]})//busca si existe un usuario con el mismo dni
    if (datos) {
        return res.status(404).json({
            message:"Existe un usuario con ese dni"
        })}
    }
    
buscar.findUsuarioEMAIL=async(model,email,rol,res)=>{
    const datos=await model.findOne({$and:[{email:email},{role:rol}]})//busca si existe un usuario con el mismo dni
    if (datos) {
        return res.status(404).json({
            message:"Existe un usuario con ese correo"
        })}
    }
module.exports=buscar;