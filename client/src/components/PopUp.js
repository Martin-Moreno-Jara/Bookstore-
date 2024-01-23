import { React, useState, useEffect } from 'react';
import '../stylesheets/PopUp.css';
import BookForm from './BookForm';

function PopUp(props){
    const [book,setBook] = useState(null);
    const [triggerEdit,setTriggerEdit] = useState(false);


    useEffect(()=>{
        fetch(`/books/${props.id}`)
            .then((res)=>
                res.json())
                    .then(data=>{setBook(data);})
    },[props.id])

    const deleteBook=()=>{
        fetch(`/books/${props.id}`,{method:'DELETE'})
            .then(result=>{result.json()
                .then(data=>{console.log(data);props.setVisible(false)})})
    }

    return( (props.isVisible)?
        (<div className='popup-container'>
            <div className='popup-inner-container'>
                <div className='image'>
                    <img src={book.image}/>
                </div>
                <div className='meta-info'>
                <div className='info'>
                    <p className='title'>{book.title}</p>
                    <p className='author'><strong>author:</strong> {book.author}</p>
                    <p className='secondary'><strong>genres:</strong></p> {book.genres}
                    <p className='secondary'><strong>pages: </strong>{book.pages}</p>
                    <p className='secondary'><strong>rating: </strong>{book.rating}</p>
                    <p className='third'> <strong>database id: </strong>{book._id}</p>
                </div>
                <div className='buttons'>
                    <button 
                        className='close-btn'
                        onClick={()=>{props.setVisible(false)}}>
                        Close
                    </button>

                    <button 
                        className='delete-btn'
                        onClick={deleteBook}>
                            Delete</button>

                    <button 
                        className='edit-btn'
                        onClick={()=>{setTriggerEdit(true)}}
                        >
                        Edit
                    </button>

                    <BookForm 
                        isTriggered={triggerEdit}
                        trigger={setTriggerEdit}
                        update={true}
                        idBook={props.id}/>
                    
                </div>
                    
                
                </div>
                
                
            </div>

        </div>)
        :""
    );

};

export default PopUp;