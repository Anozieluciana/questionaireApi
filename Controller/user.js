const { FieldRequiredError, AlreadyTakenError, DoesNotExist } = require("../ErrorHandler/Customized")
const user = require ("../Models/userModel")
const jwt = require("jsonwebtoken")
const { bcryptHash, bycrptCompare } = require("../MiddleWare/Bcrypt")


const signUpUser = async(req,res, next)=>{
    try{
        const {full_name,user_name, password, email} = req.body
        if (!full_name) throw new FieldRequiredError(`a name required`)
        if (!user_name) throw new FieldRequiredError(`a username required`)
        if(!password) throw new FieldRequiredError(`a password required`)
        if(!email) throw new FieldRequiredError(`an email required`)

        // const otp = crypto.randomBytes(10).toString('hex');

        const alreadyUser = await user.findOne({email})
        if(alreadyUser){
            if(alreadyUser){
                 throw new AlreadyTakenError("Email", "try loggin")
        }
        } 
       const users = await user.create({
        full_name:full_name,
        user_name:user_name,
        email:email,
        password: await bcryptHash(password)
       })

       const token = jwt.sign({id: users.id}, process.env.MYSECRETKEY, {expiresIn:process.env.days})

       await users.save()
       res.status(201).json({users, token})
        
    }
    catch(error){
        next(error)
    }
}


const signUpAdmin = async(req,res, next)=>{
    try{
        const {full_name,user_name, password, email} = req.body
        if (!full_name) throw new FieldRequiredError(`a name required`)
        if (!user_name) throw new FieldRequiredError(`a username required`)
        if(!password) throw new FieldRequiredError(`a password required`)
        if(!email) throw new FieldRequiredError(`an email required`)

        // const otp = crypto.randomBytes(10).toString('hex');

        const alreadyUser = await user.findOne({email})
        if(alreadyUser){
            if(alreadyUser.isAdmin){
                 throw new AlreadyTakenError("Email", "try loggin")
        }
        } 
       const users = await user.create({
        full_name:full_name,
        user_name:user_name,
        email:email,
        password: await bcryptHash(password),
        isAdmin: true
       })

       const token = jwt.sign({id: users.id}, process.env.MYSECRETKEY, {expiresIn:process.env.days})

       await users.save()
       res.status(201).json({users, token})
        
    }
    catch(error){
        next(error)
    }
}



const signInAdmin = async(req, res, next) =>{
    try{
        const {email, password} = req.body;

        const thisAdmin = await user.findOne({email})

        if(thisAdmin){
            const checkDetails = await bycrptCompare (password,thisAdmin.password)

            if(checkDetails){
                const token = jwt.sign({thisAdmin}, process.env.MYSECRETKEY, {expiresIn: process.env.days})

                const {password, ...info} = thisAdmin._doc

                res.status(200).json({
                    status:"succesfully loggedin",
                    data:{token, ...info}
                })
            }else{
                res.status(404).json({message: "incorrect password"})
            }
        }else{
            res.status(404).json({message: "user not found"})
        }
    }
    catch(error){
        next(error)
    }
}

const ResetPassWord = async(req, res, next)=>{
    try{
        const {email, password, newPassword} = req.body;

        const findUser = await user.findOne({email});
        if(findUser){
            const checkPassword = await bycrptCompare(password, findUser.password);
            if(checkPassword){
                const updatePassword = await user.findByIdAndUpdate(findUser._id, {password:newPassword}, {new:true})
            }
            else{
               res.status(404).json({message: "please check your password or email"})
            }
        }
        else{
            res.status(404).json({message: "this user doesn't exist"})
        }
    }
    catch(error){
        next(error)
    }
}

const forgotPassword = async(req, res, next)=>{
    try{
        const {email, password} = req.body;
        const findUser = await user.findOne({email})
    }
    catch(error){
        next(error)
    }
}


const updateUser = async (req, res, next) => {
    const { full_name, user_name } = req.body;
    try {
      const updateUser = await user.findByIdAndUpdate(req.params.id, {
        full_name:full_name,
        user_name:user_name,
      });
      res
        .status(201)
        .json({ message: 'User Updated Sucessfully', data: updateUser });
    } catch (error) {
      next(error)
    }
  };

  const getAllUser = async(req, res, next)=>{
    try{
        const users = await user.find()

        res.status(200).json({
            status:"all users",
            data:users
        })

    }
    catch(error){
        next(error)
    }
   
  }


module.exports={
    signUpAdmin,
    signInAdmin,
    signUpUser,
    ResetPassWord,
    updateUser,
    getAllUser
}