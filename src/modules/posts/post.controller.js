import {createpost,deletePost,RetrieveAllPosts,countcommentsforposts} from './services/post.service.js'
import { Router } from 'express'
const post=Router()


post.post('/createpost',createpost)
post.delete('/deletepost/:id',deletePost)
post.get('/posts/details',RetrieveAllPosts)
post.get('/posts/countcomments',countcommentsforposts)

export default post
