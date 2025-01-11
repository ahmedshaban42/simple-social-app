import { DataTypes,Model } from "sequelize";
import { sequelizeconfig } from "../connection.js"
import user from '../models/user.model.js'
class posts extends Model{}
posts.init({

    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    titel:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    content:{
        type:DataTypes.TEXT,
        allowNull:false,
    }
},{
    sequelize:sequelizeconfig, 
    modelName: 'tbl_posts',
    timestamps: true, 
    freezeTableName:true,
    paranoid:true
})

export default posts;


user.hasMany(posts,{
    foreignKey: 'userid',
    onDelete:'CASCADE',
    onUpdate:'CASCADE',
    as:"postdata"
});
posts.belongsTo(user,
    {
        foreignKey: 'userid',as:'userdata'
    }
);