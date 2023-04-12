import { useEffect, useState } from 'react';
import './App.css'
import loader from './loader.gif'

import {bgColorList, API_URL} from './config/bgColor';

function App() {
  const [quote, setQuote] = useState(null)
  const [bgColor, setBgColor] = useState("#FFF")


  async function getQuote() {
    setQuote(null)
    const response = await fetch(API_URL);
    const data = await response.text();
    const jsonData = await JSON.parse(data);
    setQuote(jsonData[Math.floor(Math.random()*jsonData.length)])
  }
  useEffect(() => {
    getQuote();
  }, [])

  
  useEffect(() => {
    setBgColor(bgColorList[Math.floor(Math.random()*bgColorList.length)])
  }, [quote])

  return (
    <div className="App">
      <h1>Quote Generator</h1>

      <div className="container" style={{backgroundColor: bgColor}}>
        <button onClick={getQuote}>New Quote</button>
        {(()=>
           quote ?  ( <div>
                        <h3 >{quote.text}</h3>
                        <i>- {quote.author}</i>
                    </div> )
          
                 :
                   ( <div style={{marginTop: 10}}>
                      <img src={loader} alt="" />
                    </div> )
        )()}
      </div>
    </div>
  );
}

export default App;
