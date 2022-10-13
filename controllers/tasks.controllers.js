const Tasks = require ('../models/Tasks')
ctrlTask = {}

ctrlTask.getTasks = async (req,res)=>{
    const tasks = await Tasks.find({isActive:true})
    
    return res.json({
        message:"Tareas de todos los usuarios",
        tasks
    })
}

ctrlTask.getTasksForUserId = async (req,res)=>{
    const idUser = req.user._id
    
    const filterTasks = await Tasks.find({idUser})
    .populate('userId', ['user'])

    return res.json({
        message:`Tareas del usuario ${req.user.user}`,
        filterTasks
    })
}

ctrlTask.postTasks = async (req,res)=>{
 try {
    const {titulo,descripcion} = req.body
    console.log(req.user)
    const newTask = new Tasks({
        titulo,descripcion, userId:req.user._id
    })

    const task = await newTask.save()
    
    return res.json({
        message:"Tarea guardada",
        task
    })
 } catch (error) {
    console.log(error)
 }
}

ctrlTask.putTasks = async (req,res)=>{
    const id = req.params.id
    const user = req.user

    const tarea = await Tasks.findById(id)
    console.log(tarea.userId)
    console.log(user._id)
    const {titulo, descripcion} = req.body

    try {
        if(toString(tarea.userId) != user._id){
            return res.json({
                message:"La tarea no le pertenece"
            })
        }

        const tareaUpdate = await Tasks.findByIdAndUpdate(id,{titulo,descripcion},{new:true})

        return res.json({
            message:"Tarea actualizada",
            tareaUpdate,
            id
        })


    } catch (error) {
        console.log("No se pudo actualizar")
        console.log(error)
    }
}

ctrlTask.putStatusTasks=async(req,res)=>{
    const id = req.params.id
    
    const {isDone} = req.body

    try {
        const tarea = await Tasks.findByIdAndUpdate(id,{isDone},{new:true})

        return res.json({
            message:"Tarea actualizada",
            tarea,
            id
        })


    } catch (error) {
        console.log("No se pudo actualizar")
        console.log(error)
    }
}

ctrlTask.deleteTask = async (req,res)=>{
    const id = req.params.id

    try {
        const taskDelete =  await Tasks.findByIdAndDelete(id)
        return res.json({
            message:`Tarea con el id ${taskDelete.id} ha sido eliminada`
        })
    } catch (error) {
        console.log(error)
    }
}


module.exports = ctrlTask;