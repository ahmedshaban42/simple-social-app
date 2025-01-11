import { DataTypes,Model } from "sequelize";
import{sequelizeconfig} from '../connection.js'
import user from './user.model.js'
import posts from './posts.model.js'

class comments extends Model{}

comments.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    content:{
        type:DataTypes.STRING,
        allowNull:false
    }
},
{
    sequelize:sequelizeconfig, 
    modelName: 'tbl_comments',
    timestamps: true, 
    freezeTableName:true
})
export default comments
//Associations (user,comments)
user.hasMany(comments,{
    foreignKey:'userid',
    onDelete:'CASCADE',
    onUpdate:'CASCADE',
    as:'commentdata'
})
comments.belongsTo(user,{
    foreignKey:'userid',
    as:'userdata'
})

//Associations (post,comments)
posts.hasMany(comments,{
    foreignKey:'postid',
    onDelete:'CASCADE',
    onUpdate:'CASCADE',
    as:'commentdata'
})
comments.belongsTo(posts,{
    foreignKey:'postid',
    as:'postdata'
})