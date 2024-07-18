const router=require("express").Router();
const Task=require("../models/task");
const verify=require('../verifyToken');

//CREATE

router.post("/addTask",async(req,res)=>{
    const newTask= new Task(req.body);
    try{
    const savedTask= await newTask.save();
    res.status(201).json(savedTask);
    }catch(err){
    res.status(500).json(err);
    }
    
});


//UPDATE

router.post("/:id",verify,async(req,res)=>{
    try{
        const oldTask= await Task.findById(req.params.id);
        const updatedTask= await Task.findByIdAndUpdate(req.params.id,{
            $set:req.body,}
        ,{new:true});
        const changes={name:{},description:{}};
        if(oldTask.name!==req.body.name){
            changes.name={from:oldTask.name, to:req.body.name};
        }
        if(oldTask.description!==req.body.description){
            changes.description={from:oldTask.description, to:req.body.description};
        }
        updatedTask.history.push({
                    action: 'edit',
                    timestamp: new Date(),
                    changes:{...oldTask.history.changes,...changes},
                  });
        await updatedTask.save();

        res.status(200).json(updatedTask);
        }catch(err){
        res.status(500).json(err);
        }
    
})

  

//history

router.get("/history/:id",verify,async(req,res)=>{
    try{
    const task= await Task.findById(req.params.id);
    res.status(200).json(task.history);
    }catch(err){
    res.status(500).json(err);
    }
    
})


//DELETE

router.delete("/find/:id",async(req,res)=>{
    try{
        const task=await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success:true,
            Task:Task,
            des:"Task is deleted succesfully",
        })
    }
    catch(err){
        res.status(500).json(err);
    }
    
})



//GET ALL
router.get("/getAll", verify, async (req, res) => {
    try {
      const userId =req.userId
      const tasks = await Task.find({ userId: userId });
      res.status(200).json(tasks.reverse());
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports=router;