import usercontroller from '../modules/user/user.controller.js'
import postcontroller from '../modules/posts/post.controller.js'
import commentcontroler from '../modules/commentes/comment.controller.js'



const routerhandellar=(app)=>{

    app.use('/user',usercontroller)
    app.use('/post',postcontroller)
    app.use('/comment',commentcontroler)

}

export default routerhandellar