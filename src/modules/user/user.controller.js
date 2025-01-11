import {adduser,createOrUpdate,findbyemail,RetrieveAUserByTheirPK} from './services/user.service.js'
import { Router } from 'express'
const user=Router()


user.post('/adduser',adduser)
user.post('/users/:id',createOrUpdate)
user.get('/users/by-email',findbyemail)
user.get('/users/:id',RetrieveAUserByTheirPK)
export default user
