const router = require('express').Router()
const Todo = require('../models/create')
//list all todo
router.get('/',(req,res)=>{
Todo.find().exec((err,todos)=>{
    if(err){
       return res.json({error:err})
    }
    return res.json({data:todos})
})
})
//create a todo
router.post('/create',(req,res)=>{
const todo = Todo({
    title : req.body.title,
    content : req.body.content
})
todo.save((err,todo)=>{
    if(err){
        return res.json({error:err})
     }
     return res.json({data:todo})
 })
})

//edit a todo
router.put('/:id',(req,res)=>{
Todo.findById(req.params.id)
.exec((err,todo)=>
{
    if (err){
        return res.json({error : err})
    }//todo.title=req.body.title ?? todo.titlE-
    //IF CONTENT NOT PROVIDEDD THEN DEFAULT
    todo.title=req.body.title ?? todo.title
    todo.content=req.body.content?? todo.content
    todo.completed=req.body.completed ?? todo.completed
    todo.save((err,todo)=>{
        if (err){
            return res.json({error : err})
        } 
        return res.json({data : todo})
    })
})

})
//delete a todo
router.delete('/:id',(req,res)=>{
    Todo.remove({
        _id:req.params.id
    })
    .exec((err,result)=>{
        if (err){
            return res.json({error : err})
        }
        if(result.deletedCount == 0)
        return res.json({data :'No todo found with given id'})
        return res.json({data:"Deleted sucessfuly"})
    })
    
})
module.exports=router