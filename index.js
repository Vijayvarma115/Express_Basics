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