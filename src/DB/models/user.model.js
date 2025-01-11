import { DataTypes,Model } from "sequelize";
import {sequelizeconfig} from '../connection.js'


class user extends Model{}
user.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        unique:'idx_email_unique',
        allowNull:false,
        validate:{
            isEmail:true,
        }
    },
    role:{
        type:DataTypes.ENUM('user','admin'),
        allowNull:false
    },
    password: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            checkPasswordLength(value) {
                if (value.length <= 6) {
                    throw new Error('Password must be longer than 6 characters');
                }
            }
        }
    }
},{
    sequelize:sequelizeconfig,
    modelName:'tbl_users',
    timestamps:true,
    freezeTableName:true,
    hooks: {
        beforeCreate: (user) => {
            const noSpaces = user.name.replace(/\s+/g, '')  // removing any spaces from the name
            if(noSpaces.length <= 2 ){
                throw new Error('The name must be longer than 2 characters!')
            }
        }
    }

})
export default user