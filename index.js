const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

let emp = {
    id:1, 
    username: "Thomaskutty",
    email: "kutty123@gmail.com",
    isManager:false, 
    leave: "",
    leaveApplied: false,
    leaveApprove: false
}
const manager = {
    id:2,
    username: "------",
    email: "email@gmail.com",
    isManager: true
}

function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1]

        req.token = bearerToken;
        next()
    }else{
        res.sendStatus(403)
    }
}

app.post('/applyleave', verifyToken, (req, res)=>{
    jwt.verify(req.token, 'abc123@3$#', (err, data) =>{
        if(err){
            res.sendStatus(403)
        }else{
            if (emp.leave === "Available"){
                data.emp.leaveApplied = true
                emp.leaveApplied = true
                console.log(emp)
                res.json({
                    status: emp.leaveApplied,
                    message: "leave applied"
                })
            }else{
                res.json({
                    
                    message: "Can't apply for the leave"
                })
            }
            
        }
    })
})

app.get('/getleave', verifyToken, (req, res) =>{
    jwt.verify(req.token, 'abc123@3$#', (err, data) =>{
        if(err){
            res.sendStatus(403)
        }else{
            res.json(
                {
                    leave: data.emp.leave
                }
            )
        }
    })
    
})


app.post('/login', (req, res) =>{
    jwt.sign({emp}, "abc123@3$#", (err, token) =>{
        res.json({
           token
        })
    })
    
})
app.post('/adminlogin', (req, res) =>{
    jwt.sign({manager}, "abc123@3$#", (err, token) =>{
        res.json({
           token
        })
    })
    
})




app.listen(5555, ()=>{
    console.log("Server started.")
})