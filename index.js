const express=require("express");
const app=express();



////This is our Dummmy DB as of now
const user={
    name:"John",
    kidney:[
        {healthy:true},
        {healthy:false},
        {healthy:true}
    ]
}

const users=[user];


///GET-->get info
///send in "Query Parameter"(input)
app.get("/",(req,res)=>{
    const val=users[0].kidney;
    const n=val.length;
    let tk=0;
    let fk=0;
    for(let i=0;i<n;i++){
        if(val[i].healthy === true){
            tk++;
        }else{
            fk++;
        }
    }
    res.json({
        n,
        tk,
        fk
    })
})



///"MIDDLEware"(Express app to automatically parse incoming JSON data)
app.use(express.json());



///POST-->add the values
///send in "Body"(input) 
app.post("/",(req,res)=>{

    const isHeal=req.body.isHeal;
    users[0].kidney.push({
        healthy:isHeal
    })

    res.json({
        msg:"Done"
    })

})


///PUT-->Modify the DB
app.put("/",(req,res)=>{
    ///EdgeCase-2: Where there are healthyKidneys(true) why again making healthy "NO SENSE" 
    ///If all are healthy make none healthy
    for(let i=0;i<users[0].kidney.length;i++){
        users[0].kidney[i].healthy=true;
    }
    res.json({
        msg:"Done"
    })

})




app.delete("/",(req,res)=>{
    ///EdgeCase-1: When there is "NO KIDNEY" return "none/411"
    ///only if atleast one unhealthy kidney is there do this,else return 411

    let atleastunHea=false;
    for(let i=0;i<users[0].kidney.length;i++){
        if(!users[0].kidney[i].healthy){
            atleastunHea=true;
        }
    }
    if(atleastunHea){
    let newk=[];
    for(let i=0;i<users[0].kidney.length;i++){
        if(users[0].kidney[i].healthy){
            newk.push({
                healthy:true
            })
        }
    }
    users[0].kidney=newk;
    res.json({
        msg:"Done"
    })
    }else{
        res.sendStatus(411);
    }


    
})


app.listen(3000);






////////////////////////////////////ASSIGNMENT/////////////////////////////

/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const fpath='./folder';

app.get("/files",(req,res)=>{
    fs.readdir(fpath,(err,files)=>{

    const filenames=[];

    for(const file of files){
        const full=path.join(fpath,file);
        const stat=fs.statSync(full);

        if(stat.isFile()){
            filenames.push(file);
        }
    }

    res.json(filenames)
})
})


app.get("/files/:filename",(req,res)=>{
    const name=req.params.filename;
    const full1=path.join(fpath,name);

    fs.readFile(full1,"utf-8",(err,data)=>{
        if(err){
            res.send("Error");
        }
        res.send({data});
    })
})


app.listen(3000);
module.exports = app;
