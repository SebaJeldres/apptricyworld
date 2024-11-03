import React from 'react';
import './App.css';
import Header from './Pages/Header';
import Footer from './Pages/Footer';
import Home from './Pages/Home';

function App() {
  return (
    <div className="App">
      <Header />

      <Home/>

      <Footer/>
    </div>
  );
}

export default App;
