import logo from './logo.svg';
import cookie from 'react-cookies';
import './App.css';
import React,{useState} from 'react'
const downloadTxtFile = (n) => {
  const file = new Blob([n], {type:"text/plain"});
  const f=URL.createObjectURL(file);
  return f;
}
function App() {
  const [num, setNum]=useState(0);
  const button_style={height:"60px", width:"50px", fontSize:40};
  const process=e=>{
    let val=e.target.value;
    setNum(Number(val))
  }
  const change=operator=>{
    if(operator==="plus"){
      setNum(num+1)
    }
    else{
      setNum(num-1)
    }
  }

  return (
    <div className="App">
      <center>
        <label className="display">{num}</label>
        <br />
      <button style={button_style} onClick={()=>{change("plus")}}>+</button>
      <input value={num} onChange={process} className='n'/>
      <button onClick={()=>change("minus")}style={button_style}>-</button>
      <br />
      <button onClick={()=>localStorage.setItem("latestNum", num)}>Save as LocalStorage</button>
      <button onClick={()=>{cookie.save("latestCook", num)}}>Bake a Cookie</button>
      <button><a href={downloadTxtFile(num)} download={`${num}tracked.tracker`}>Save as .tracker</a></button>
      <br />
      <div className="things">
      <label style={{marginLeft:150}}>Load tracker file:</label><input onChange={(e)=>{
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = (e) => { 
          const text = (e.target.result);
          setNum(Number(text));
        };
        reader.readAsText(e.target.files[0])
      }} className="filer"type="file" />
      </div>
      <button onClick={()=>{
      if(localStorage.getItem('latestNum')){
        setNum(localStorage.getItem('latestNum'));
      }
    else{
      setNum(0);
    }}
        }>Load latest num in localStorage</button>
        <button onClick={()=>{
          if(cookie.load("latestCook")){
            setNum(cookie.load("latestCook"))
          }
          else{
            setNum(0);
          }
        }}>Eat A cookie</button>
      </center>
    </div>
  );}

export default App;