import comments from "../../../DB/models/comments.model.js"
import posts from "../../../DB/models/posts.model.js"
import user from "../../../DB/models/user.model.js"


export const createpost=async(req,res)=>{
    const {titel,content,userid}=req.body
    if(!titel||!content||!userid){
        return res.status(401).json({message:'plase enter require data'})
    }
    try{
        const data=await posts.create({titel,content,userid})
        if(data){
            return res.status(201).json({message:'post create successfully'})
        }
        return res.status(401).json({message:'can not create post'})

    }catch(err) {
        if (err.name === 'SequelizeValidationError') {
            const errors = err.errors.map(el => el.message);
            return res.status(400).json({ errors });
        }
        return res.status(500).json({ error: 'Server error' });
    }
}


export const deletePost=async(req,res)=>{
    const {id} = req.params;
    const {userid,fk_userid}=req.body
    
    if(userid!==fk_userid){
        return res.status(401).json({message:'you are not authorized to deiete this post'})
    }
    try{
        const data = await posts.destroy({ where: { id } });
        if (data) {
            return res.status(200).json({ message: 'Post deleted' });
        } else {
            return res.status(404).json({ message: 'Post not found' });
        }
        
    }catch(err) {
        if (err.name === 'SequelizeValidationError') {
            const errors = err.errors.map(el => el.message);
            return res.status(400).json({ errors });
        }
        return res.status(500).json({ error: 'Server error' });
    }
}

export const RetrieveAllPosts=async(req,res)=>{
    try{
        const data=await posts.findAll({
            include: [
                {
                    model: user,
                    as: 'userdata',
                    attributes: ['name']
                },
                {
                    model: comments,
                    as: 'commentdata',
                    attributes: ['id', 'content']
                }
            ],
            attributes:['id','titel']
        })
        if (data.length) {
            return res.status(200).json({ data });
        } else {
            return res.status(404).json({ message: 'can not find posts' });
        }
    }catch(err) {
        if (err.name === 'SequelizeValidationError') {
            const errors = err.errors.map(el => el.message);
            return res.status(400).json({ errors });
        }
        console.log(err)
        return res.status(500).json({ error: 'Server error' });
    }

}



export const countcommentsforposts=async (req,res)=>{
    try{
        const countcomments=await comments.findAndCountAll({
            include:[{
                model:posts,
                as:'postdata',
                attributes:['id','titel']
            }],
            attributes:[]
        })
        
        if (!countcomments[0]) {
            return res.status(200).json({ countcomments});
        } else {
            return res.status(404).json({ message: 'Cannot find comments for posts' });
        }
    }catch(err) {
        if (err.name === 'SequelizeValidationError') {
            const errors = err.errors.map(el => el.message);
            return res.status(400).json({ errors });
        }
        console.log(err)
        return res.status(500).json({ error: 'Server error' });
    }
}







