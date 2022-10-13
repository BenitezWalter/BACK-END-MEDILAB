const router = require('express').Router()

const {getTasks,postTasks,putTasks,deleteTask,getTasksForUserId, putStatusTasks} = require('../controllers/tasks.controllers')
const validarJWT = require('../middlewares/validar-jwt')

router.get("/tareas",getTasks)
router.get("/tareas/tareasFiltradas",[validarJWT],getTasksForUserId)
router.post("/tareas",[validarJWT],postTasks)
router.put("/tareas/:id",[validarJWT],putTasks)
router.put("/tareas/actualizarEstado/:id",[validarJWT],putStatusTasks)
router.delete("/tareas/:id",[validarJWT],deleteTask)


module.exports = router