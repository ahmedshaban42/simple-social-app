
import user from '../../../DB/models/user.model.js' 



export const adduser=async(req,res)=>{
    try{
    const {name,email,role,password}=req.body
    if(!name||!email||!role||!password){
        return res.status(400).json({ message: 'plase complete your personal data' });
    }
    const [userdata,created]=await user.findOrCreate({
        where:{email},
        defaults:{name,email,role,password}
    })
    if(created){
        return res.status(201).json({message:'user add successfuly',newuser:userdata})
    }
    return res.status(409).json({message:'Email already exists'})

    }catch (err) {
        if (err.name === 'SequelizeValidationError') {
            const errors = err.errors.map(el => el.message);
            return res.status(400).json({ errors });
        }
        return res.status(500).json({ error: 'Server error' });
    }
}

export const createOrUpdate=async(req,res)=>{
    try{
        const id = req.params.id;
        const {name,email,role,password}=req.body
        const data=await user.findByPk(id)
        if(data===null){
            //can not find id and create new user
            try{
                if(!name||!email||!role||!password){
                    return res.status(400).json({ message: 'plase complete your personal data' });
                }
                const createnewuser=await user.create({name,email,role,password},{validator:false})
                if(createnewuser){
                    return res.status(201).json({message:'user add successfuly',newuser:createnewuser})
                }else{
                    return res.status(409).json({message:'Email already exists'})
                }
                
            }catch(err) {
                if (err.name === 'SequelizeValidationError') {
                    const errors = err.errors.map(el => el.message);
                    return res.status(400).json({ errors });
                }
                return res.status(500).json({ error: 'Server error' });
            }
        }else{
            //found id end update user data
            try{
                const [userUpdatedata]=await user.update({name,email,role,password},{where:{id}},{validator:false})
                if (userUpdatedata === 0) {
                    return res.status(404).json({ message: 'User not found or no changes made' });
                } else {
                    return res.status(200).json({ message: 'User updated successfully' });
                }

            }catch(err) {
                if (err.name === 'SequelizeValidationError') {
                    const errors = err.errors.map(el => el.message);
                    return res.status(400).json({ errors });
                }
                return res.status(500).json({ error: 'Server error' });
            }
        }
    }catch(err) {
        if (err.name === 'SequelizeValidationError') {
            const errors = err.errors.map(el => el.message);
            return res.status(400).json({ errors });
        }
        return res.status(500).json({ error: 'Server error' });
    }
}


export const findbyemail=async (req,res)=>{
    const {email}=req.query
    if(!email){
        return res.status(400).json({ message: 'enter email' });
    }
    try{
        const data=await user.findOne({where:{email}})
        if(data===null){
            return res.status(400).json({ message: 'user not found' });
        }else{
            return res.status(200).json({ message: 'user is' ,data });
        }

    }catch(err) {
        if (err.name === 'SequelizeValidationError') {
            const errors = err.errors.map(el => el.message);
            return res.status(400).json({ errors });
        }
        return res.status(500).json({ error: 'Server error' });
    }
}



export const RetrieveAUserByTheirPK=async(req,res)=>{
    const { id } = req.params;
    if(!id){
        return res.status(400).json({ message: 'enter id' });
    }
    //
    try{
        const data=await user.findByPk(id,{
            attributes:{exclude:['role']}
        })
        if(data===null){
            return res.status(400).json({ message: 'user not found' });
        }else{
            return res.status(200).json({ message: 'user is' ,data });
        }

    }catch(err) {
        if (err.name === 'SequelizeValidationError') {
            const errors = err.errors.map(el => el.message);
            return res.status(400).json({ errors });
        }
        return res.status(500).json({ error: 'Server error' });
    }

}


