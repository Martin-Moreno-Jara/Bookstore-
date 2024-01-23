import React from 'react';
import '../stylesheets/Header.css'
import BookForm from './BookForm';
function Header({triggerForm, isTriggered}){
    return(
        <header className='header'>
            The Book Corner

            <button className='insert-btn' onClick={()=>{triggerForm(true)}}>Insert New Book</button>
            <BookForm isTriggered={isTriggered} trigger={triggerForm} update={false}/>
        
        </header>
    );
}

export default Header;