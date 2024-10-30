import React from 'react'
import Header from './Components/Header';
import List from './Components/List';
import Footer from './Components/Footer';
import notes from './notes';

function App(){
  return(
    <div>
      <Header />
      {notes.map((eachItem) => (
        <List 
          key = {eachItem.key}
          title = {eachItem.title}
          content = {eachItem.content}
        />
      ))} 
      <Footer />
    </div>
  )
}

export default App
