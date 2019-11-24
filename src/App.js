import React from 'react';
import Routes from "./Routes";
import './static/style/reset.scss';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tab from "./components/Tab";


function App() {
  return (
    <div className="App">
        <Header />
        <Tab/>
        <Routes/>
        <Footer/>
    </div>
  );
}

export default App;
