import express from'express'
import {connection} from './DB/connection.js'
import routerhandellar from './utils/router-handeller.utils.js'

const bootstrab=()=>{
    const app=express()
    const port=3000
    connection()
    app.use(express.json())

    routerhandellar(app)



    app.listen(port,()=>{
        console.log(`server work in port ${port} successfuly` )
    })
}
export default bootstrab