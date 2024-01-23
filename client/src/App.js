import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import Book from './components/Book';
import PopUp from './components/PopUp';
import Header from './components/Header';
import SearchBar from './components/SearchBar';


 function App() {


  const [selectedId,setSelectedId] = useState(null);

  const [trigger,setTrigger] = useState(false);

  const [formTrigger,setFormTrigger] = useState(false);
  
  
  const [backendData,setBackendData] = useState([]);

  const [BooksPerPage,setBooksPerPage] = useState(8);

  const [titleToSearch,setTitleToSearch] = useState('undefined');
  const [authorToSearch,setAuthorToSearch] = useState('undefined')

  const showMoreBooks = ()=>{setBooksPerPage(BooksPerPage+8)}

  useEffect(()=>{
    fetch(`/books/getAll/${BooksPerPage}/${titleToSearch}/${authorToSearch}`)
      .then((res)=>
        res.json())
          .then(data=>{setBackendData(data)})
  },[BooksPerPage,titleToSearch,authorToSearch]);

const searchInfo=(info)=>{
  setTitleToSearch(info.title);
  setAuthorToSearch(info.author)
}
  return (
    <div className='main-container'>
    <Header triggerForm={setFormTrigger} isTriggered={formTrigger}></Header>
    <SearchBar onSubmit={searchInfo}/>
    <div className="App">
      
      {backendData.map(book=>
      <Book 
        title={book.title} 
        author={book.author} 
        image={book.image} 
        id={book._id} 
        triggerPopUp={setTrigger}
        getId={setSelectedId}
      />)}
      {
        <PopUp 
          isVisible={trigger} 
          setVisible={setTrigger}
          id={selectedId}>
        </PopUp>
      }
      
      
    </div>
      <button 
        className='expand-btn'
        onClick={showMoreBooks}> See more books
      </button>
    </div>
  );
}
export default App;