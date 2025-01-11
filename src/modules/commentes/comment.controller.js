import {createcomment,dpdatecomment,findORcreate,retrieveCommentsByWord,retrieveRecentComments,getcomment}from './services/comment.service.js'
import { Router } from 'express'
const comment=Router()

comment.post('/createcomments',createcomment)
comment.patch('/updatecomment/:id',dpdatecomment)
comment.post('/find-or-create',findORcreate)
comment.get('/comments/search',retrieveCommentsByWord)
comment.get('/newest/:postId',retrieveRecentComments)
comment.get('/details/:id',getcomment)
export default comment