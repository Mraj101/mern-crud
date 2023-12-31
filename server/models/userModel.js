const mongoose=require('mongoose')
const Schema=mongoose.Schema
const bcrypt=require('bcrypt')

const userSchema=new Schema(
{
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        requried:true,
    },
}

)


userSchema.statics.signup=async function(email,password){
    const exists=await this.findOne({email});

    if(exists)
        throw Error('Email already in use');
    
    const salt=await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(password,salt);

    //user signup or create
    const user=await this.create({email,password:hash});
    return user;
}

module.exports=mongoose.model('User',userSchema)