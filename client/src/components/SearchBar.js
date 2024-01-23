import { React, useState } from 'react';
import '../stylesheets/SearchBar.css'

function SearchBar(props){
    const [title,setTitle] = useState('');
    const [author,setAuthor] = useState('');

    const handleTitle = (e)=>{
        setTitle(e.target.value);
    }

    const handleAuthor = (e)=>{
        setAuthor(e.target.value);
    }

    const handleSumbit = (e)=>{
        e.preventDefault();
        let sendtitle;
        let sendAuthor;
        if(title===''){
            sendtitle='undefined'
        }else{sendtitle=title}
        if(author===''){
            sendAuthor='undefined'
        }else{sendAuthor=author}
        const search={
            title:sendtitle,
            author:sendAuthor
        }
        console.log(search)
        props.onSubmit(search)
    }

    return(
        <form className='search-form' onSubmit={handleSumbit}>
            <div className='absolut-container'>
            
                <div className='field-container'>
                    <label className='search-label'>Title:</label>
                    <input 
                        type='text' 
                        placeholder='Search by Title'
                        className='search-input'
                        onChange={handleTitle}/>
                </div>
                
                <div className='field-container'>
                <label className='search-label'>Author: </label>
                <input 
                    type='text' 
                    placeholder='Search by Author'
                    className='search-input'
                    onChange={handleAuthor}/>
                </div>
            </div>
            <button className='send-btn'>Search</button>

        </form>
    )
}

export default SearchBar;