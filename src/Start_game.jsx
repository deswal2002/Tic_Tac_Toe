import React, { useState } from 'react'
import './Tic_tac_toe.css'
import { useNavigate } from "react-router-dom";


<style>
  @import url('https://fonts.googleapis.com/css2?family=Dangrek&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
</style>
function Tic_tac_toe() {
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const showAlertWithTimeout = () => {
    navigator.clipboard.writeText(window.location.href)
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 4000); // 4 seconds timeout
  };
  
  let [choose,setchoose] = useState('')
  let your_choose =(num)=>{
    setchoose(num)
    
  }
  let nav =()=>{
    if(choose!==''){
      navigate("/new_game",{state:choose})
    }
  }
  return (
    <>
    {showAlert && (
      <div
        style={{
          backgroundColor: '#192A32',
          color: 'rgba(242, 178, 55, 1)',
          paddingLeft:'2%',
          paddingTop:'5px',
          margin: '10px 0',
          borderRadius: '5px',
          width: '180px',
          height: '30px',
          position:'absolute',
          boxsizing:'border-box',
          marginLeft:'85%',
        }}
      >
        Invite link copied
      </div>
    )}
    <div className='box'>
      <div id='box1' >
        <img src='./public/blue_cross.svg ' id='blue_cross' />
        <img src='./public/yellow_circle.svg' id='yellow_circle' />
        <div id='pick_player'>
          <div id='write'>PICK PLAYER</div>
          <div id='choose'>
            <button id='cross' onClick={()=>your_choose(1)}>X</button>
            <button id='circle' onClick={()=>your_choose(0)}>O</button>
            
          </div>
        </div>
        <button id='new_game' onClick={nav}>NEW GAME ( VS CPU )</button>
        <button id='play_with_human'>NEW GAME ( VS HUMAN ) Coming soon</button>
        <button id='invite_friend' onClick={showAlertWithTimeout}>Invite your friend</button>
      </div>
    </div>
    </>
  )
}

export default Tic_tac_toe