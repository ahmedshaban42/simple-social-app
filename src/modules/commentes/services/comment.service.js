import { Sequelize } from "sequelize";
import comments from '../../../DB/models/comments.model.js'
import user from "../../../DB/models/user.model.js";
import posts from "../../../DB/models/posts.model.js";

export const createcomment=async(req,res)=>{
    const {comment}=req.body
    if (!Array.isArray(comment) || comment.length === 0) {
        return res.status(400).json({ message: 'Please provide an array of comments' });
    }
    try{
        const createcomment=await comments.bulkCreate(comment)
        //console.log(createcomment)
        
        if(createcomment.length){
                return res.status(201).json({
                message: 'Comments created successfully',
                comments: createcomment,
            });
        }else {
            return res.status(400).json({ message: 'No comments were created' });
        }
    }catch(err) {
        if (err.name === 'SequelizeValidationError') {
            const errors = err.errors.map(el => el.message);
            return res.status(400).json({ errors });
        }
        return res.status(500).json({ error: 'Server error' });
    }

}



export const dpdatecomment=async(req,res)=>{
    const {id} = req.params;
    const{userid,fk_userid,content}=req.body
    if(!userid||!fk_userid){
        return res.status(400).json({message:'plasse complete data'})
    }
    if(userid===fk_userid){
        try{
            const update=await comments.update({content},{where:{id}})
            if(update[0]){
                return res.status(200).json({message:'comment updated'})
            }else{
                return res.status(401).json({message:'can not find comment'})
            }

        }catch(err) {
            if (err.name === 'SequelizeValidationError') {
                const errors = err.errors.map(el => el.message);
                return res.status(400).json({ errors });
            }
            console.log(err)
            return res.status(500).json({ error: 'Server error' });
        }
    }else{
        return res.status(401).json({message:'you are not authorized to deiete this post'})
    }
}




export const findORcreate=async(req,res)=>{
    const {id,content,userid,postid}=req.body;
        try{
            const [data,created]=await comments.findOrCreate({
                where:{id},
                defaults:{userid,postid,content}
            })
            if(created){
                return res.status(201).json({
                    message: 'Comment created successfully',
                    comment: data,created
                });
            }else{
                return res.status(201).json({
                    message: 'Comment already exists',
                    comment: data,created
                })
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


export const retrieveCommentsByWord = async (req, res) => {
    const { word } = req.query; 

    if (!word) {
        return res.status(400).json({ message: 'Please provide a word to search for' });
    }

    try {
        const commentsData = await comments.findAndCountAll({
            where: {
                content: {
                    [Sequelize.Op.like]: `%${word}%` 
                }
            },
        });

        if (commentsData.count > 0) {
            return res.status(200).json({
                count: commentsData.count,
                comments: commentsData.rows
            });
        } else {
            return res.status(404).json({ message: 'No comments found containing the specified word' });
        }
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            const errors = err.errors.map(el => el.message);
            return res.status(400).json({ errors });
        }
        console.error(err); 
        return res.status(500).json({ error: 'Server error' });
    }
};



export const retrieveRecentComments = async (req, res) => {
    const { postId } = req.params;

    if (!postId) {
        return res.status(400).json({ message: 'Please provide a post ID' });
    }

    try {
        const commentsData = await comments.findAll({
            where: { postid: postId },
            order: [['createdAt', 'DESC']],
            limit: 3, 
            attributes: ['id', 'content', 'createdAt'] 
        });

        if (commentsData.length > 0) {
            return res.status(200).json({
                comments: commentsData
            });
        } else {
            return res.status(404).json({ message: 'No comments found for this post' });
        }
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            const errors = err.errors.map(el => el.message);
            return res.status(400).json({ errors });
        }
        console.error(err); 
        return res.status(500).json({ error: 'Server error' });
    }
};


export const getcomment=async(req,res)=>{
    const {id}=req.params
    if (!id) {
        return res.status(400).json({ message: 'Please provide a comment ID' });
    }
    try{
        const commentdata=await comments.findOne({
            where:{id},
            attributes:['id','content'],
            include:[
            {
                model:user,
                as:'userdata',
                attributes:['id','name','email'],
            },
            {
                model:posts,
                as:'postdata',
                attributes:['titel','content'],
            }]
        })
        if(commentdata===null){
            res.status(401).json({message:'no coment found'})
        }else{
            res.status(201).json({commentdata})
        }

    }catch(err) {
        if (err.name === 'SequelizeValidationError') {
            const errors = err.errors.map(el => el.message);
            return res.status(400).json({ errors });
        }
        console.error(err); 
        return res.status(500).json({ error: 'Server error' });
    }
}