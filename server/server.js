const express = require('express');
const { connectToDb,getDb } = require('./db');
const { ObjectId } = require('mongodb');
//initialize 
const app = express();
app.use(express.json())
app.get('/',(req,res)=>{
    res.json({'message':'todo bien'})
})
//db connection
let db;
connectToDb((err)=>{
    if(!err){
        app.listen(5000, ()=>{console.log('The program is running and connected to db')});
        db=getDb();
    }
})

//routes
app.get('/books/getAll/:p/:title/:author', (req,res)=>{
    const booksPerPage = parseInt(req.params.p)
    const bookTitle = req.params.title;
    const bookAuthor = req.params.author;
    let books = []

    const examineSearch=()=>{
        if(bookTitle==='undefined' && bookAuthor==='undefined'){
            return {}
        }
        if(bookTitle==='undefined' && bookAuthor!=='undefined'){
            return {author:bookAuthor}
        }
        if (bookAuthor==='undefined' && bookTitle!=='undefined'){
            return {$text: {$search: bookTitle}}
        }
        if(bookTitle!=='undefined' && bookAuthor!=='undefined'){
            return {$text: {$search: bookTitle}, author:bookAuthor}
        }
    }
    const objetctSearch = examineSearch();
    console.log(objetctSearch)
    db.collection('books').
    find(objetctSearch).limit(booksPerPage)
    .sort({author:1}).forEach(book =>{books.push(book)})
        .then(()=>{
            res.status(200).json(books)
        })
        .catch(()=>{res.status(500).json({error:'Could not fetch documents'})})
})

app.post('/books',(req,res)=>{
    const book = req.body;
    db.collection('books').insertOne(book)
        .then(result=>{
            res.status(201).json(result)
        })
        .catch(err=>{
            res.status(500).json({err:'couldnt create new book'})
        })
})

app.delete('/books/:id',(req,res)=>{
    if(ObjectId.isValid(req.params.id)){
        db.collection('books').deleteOne({_id: new ObjectId(req.params.id)})
        .then((result)=>{
            res.status(200).json(result)
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).json({error:'could not delete'})
        })
    }else{
        res.status(500).json({error:"Not valid id"})
    }
})

app.get('/books/:id',(req,res)=>{
    let id = req.params.id;
    if(ObjectId.isValid(id)){
        db.collection('books').findOne({_id: new ObjectId(id)})
        .then((doc)=>{
            res.status(200).json(doc)
        })
        .catch((err)=>{
            res.status(500).json({error:'could not fetch'})
        })
    }else{
        res.status(500).json({error:"Not valid id"})
    }

})

app.patch('/books/:id',(req,res)=>{
    const updates = req.body
    if(ObjectId.isValid(req.params.id)){
        db.collection('books').updateOne({_id: new ObjectId(req.params.id)},{$set:updates})
        .then((result)=>{
            res.status(200).json(result)
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).json({error:'could not update'})
        })
    }else{
        res.status(500).json({error:"Not valid id"})
    }
})