import {React, useState, useEffect } from 'react';
import '../stylesheets/BookForm.css'

function BookForm({isTriggered, trigger,update,idBook}){

    const [title,setTitle] = useState('');
    const handleTitle = (e)=>{
        setTitle(e.target.value);
    }
    const [author,setAuthor] = useState('');
    const handleAuthor = (e)=>{
        setAuthor(e.target.value);
    }
    const [genres,setGenres] = useState('');
    const handleGenres = (e)=>{
        setGenres(e.target.value);
    }
    const [pages,setPages] = useState('');
    const handlePages = (e)=>{
        setPages(e.target.value);
    }
    const [rating,setRating] = useState('');
    const handleRating = (e)=>{
        setRating(e.target.value);
    }
    const [image,setImage] = useState('');
    const handleImage = (e)=>{
        setImage(e.target.value);
    }

    const [backendData,setBackendData] = useState([{}]);
    useEffect(()=>{

            fetch(`/books/${idBook}`)
            .then((res)=>
                res.json())
                    .then(data=>{setBackendData(data);
                    })  
        
    },[idBook,isTriggered]);

    const handleSumbit=(e)=>{
        e.preventDefault();
        const newBook ={
            title:title,
            author:author,
            genres:genres,
            pages:pages,
            rating:rating,
            image:image
        }
        fetch('/books',
        {method:'POST',
        headers:{'Content-Type':'application/json'},
         body:JSON.stringify(newBook)})
            .then(result=>{result.json()
                .then(data=>{

                    trigger(false)})})
    }

    const handleUpdate = (e)=>{
        e.preventDefault();

        let titleUpdate;
        let authorUpdate;
        let genresUpdate;
        let pagesUpdate;
        let ratingUpdate;
        let imageUpdate;

        if(title==""){
            titleUpdate=backendData.title
        }else{titleUpdate=title}
        if(author==""){
            authorUpdate=backendData.author
        }else{authorUpdate=author}
        if(genres==""){
            genresUpdate=backendData.genres
        }else{genresUpdate=genres}
        if(pages==""){
            pagesUpdate=backendData.pages
        }else{pagesUpdate=pages}
        if(rating==""){
            ratingUpdate=backendData.rating
        }else{ratingUpdate=rating}
        if(image==""){
            imageUpdate=backendData.image
        }else{imageUpdate=image}

        const update ={
            title:titleUpdate,
            author:authorUpdate,
            genres:genresUpdate,
            pages:pagesUpdate,
            rating:ratingUpdate,
            image:imageUpdate
        }


        fetch(`/books/${idBook}`,
        {
            method:"PATCH",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(update)
        })
            .then(result=>{result.json()
                .then(data=>{

                    trigger(false)})})

        
    }


    return((isTriggered===true)?(
        <div className='background-container'>
            <form 
                className='form-container'
                >
                Please insert the information {update? "Note that the empty fields won't affect the content":""}

                <div className='tag'>
                    <label>Title: </label>
                    <input 
                        type='text' 
                        className='info-input'
                        placeholder='Write the title of the book'
                        onChange={handleTitle}
                     />
                </div>
                <div className='tag'>
                    <label>Author: </label>
                    <input 
                        type='text' 
                        className='info-input' 
                        placeholder='Write the author of the book'
                        onChange={handleAuthor}/>
                </div>
                <div className='tag'>
                    <label>Genres: </label>
                    <input 
                        type='text' 
                        className='info-input' 
                        placeholder='Write the genres of the book'
                        onChange={handleGenres}/>
                </div>
                <div className='tag'>
                    <label>N. pages: </label>
                    <input 
                        type='text' 
                        className='info-input' 
                        placeholder='Write the number of pages of the book'
                        onChange={handlePages}/>
                </div>
                <div className='tag'>
                    <label>Rating: </label>
                    <input 
                        type='text' 
                        className='info-input' 
                        placeholder='Write the rating of the book'
                        onChange={handleRating}/>
                </div>
                <div className='tag'>
                    <label>Image: </label>
                    <input 
                        type='text' 
                        className='info-input' placeholder='Specify an image url'
                        onChange={handleImage}/>
                </div>

                <div className='btns'>
                    <button 
                        className='cancel-btn' 
                        onClick={()=>{trigger(false)}}>
                            Cancelar
                    </button>
                    <button 
                        className='save-btn'
                        onClick={update?handleUpdate:handleSumbit}>
                            Guardar 
                    </button>
                </div>
                
            </form>
            

        </div>)
        :""
    );
}

export default BookForm;