const {model, Schema} =  require('mongoose')

const AdminSchema = new Schema ({
    dni:{
        type:String,
        required:true
    },
    nombreyape:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    codeAdmin:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{
    versionKey:false,
    timestamps:true
})


module.exports = model('Admins', AdminSchema);