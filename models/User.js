const {model, Schema} =  require('mongoose')

const UserSchema = new Schema ({
    user:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    role:{
        type:String,
        default:"user"
    }
},{
    versionKey:false,
    timestamps:true
})


module.exports = model('Users', UserSchema);