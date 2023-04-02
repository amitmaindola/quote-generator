import { useEffect, useState } from 'react';
import './App.css'
import loader from './loader.gif'

function App() {
  const [quote, setQuote] = useState(null)
  const [bgColor, setBgColor] = useState("#FFF")


  async function getQuote() {
    setQuote(null)
    const response = await fetch('https://type.fit/api/quotes');
    const data = await response.text();
    const jsonData = await JSON.parse(data);
    setQuote(jsonData[Math.floor(Math.random()*jsonData.length)])
  }
  useEffect(() => {
    getQuote();
  }, [])

  const bgColorList = ["#FFF", "#99F", "#9F9", "#F99", "#EAA", "#FFA", "#AFF", "#FAF"];
  
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
