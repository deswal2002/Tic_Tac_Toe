import React,{useState,useEffect} from 'react'
import './Tic_tac_toe.css'
function Tip_time() {
  let [id,setid] =useState()
  let [advice,setadvice] =useState()
  const fetchData = async () => {
    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      const result = await response.json();
      setid(result.slip.id)
      setadvice(result.slip.advice)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, []); 
  
  return (
    <div id='tip'>
      <div id='id1'>Quote #{id}</div>
      <div id='adv_box'>
        <div id='adv1'>"{advice}"</div>
        <img src="./public/tip_circle.svg" id='last' />
        <img src="./public/Group 3 (2).svg" id='last1' />
      </div>
    </div>
  )
}

export default Tip_time