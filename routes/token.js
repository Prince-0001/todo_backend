const router=require("express").Router();
const CryptoJS=require("crypto-js");
const dotenv=require("dotenv");
const jwt=require("jsonwebtoken");

dotenv.config();

router.post("/verify-token", async(req,res)=>{

    try{
        const token=req.body.token;

        jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
            if(err) res.status(403).json("Token is not valid");

            req.user=user;
            
        })
        res.status(201).json(req.user);
    }
    catch(err){
        res.status(500).json(err);
    }

});
module.exports=router;