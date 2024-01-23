import React from 'react';
import '../stylesheets/Book.css'

function Book({title, author,image,id,triggerPopUp,getId}){
 return(
    <div 
        className='Book-container' 
        onClick={()=>{getId(id);triggerPopUp(true);}}>
    
        <img  className='Book-image' src={image} />
        <div className='Book-description'>
        <div>
            {title}
        </div>
        <div>
        {author}
        </div>
    </div>
        
    
 </div>
 )

};

export default Book;