import React, { useState, useEffect } from 'react'
import './Tic_tac_toe.css'
import { useLocation, useNavigate } from "react-router-dom"
import blue_cross from './assets/blue_cross.svg'
import yellow_cross from './assets/yellow_circle.svg'
import reset_page from './assets/pajamas_retry.svg'
<style>
    @import url('https://fonts.googleapis.com/css2?family=Dangrek&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
</style>
function Play_game() {
    let [wltq, setwltq] = useState([0, 0, 0, 0])
    let [tei, settei] = useState(localStorage.getItem('tei'))
    let [win, setwin] = useState(localStorage.getItem('win'))
    let [loss, setloss] = useState(localStorage.getItem('loss'))
    const navigate = useNavigate();
    let [open_reset, setopen_reset] = useState(0)

    let nav = () => {
        navigate("/")
        localStorage.setItem('win', 0)
        localStorage.setItem('loss', 0)
        localStorage.setItem('tei', 0)
    }
    let reset = () => {
        setopen_reset(0)
        const your_choice = [...cross_circle]
        const newArray = [...cells];
        for (let i = 0; i < 9; i++) {
            your_choice[i] = ''
            newArray[i] = 0
        }
        const change_is_here = [...wltq]
        for (let i = 0; i < 4; i++) {
            change_is_here[i] = 0
        }
        setwltq(change_is_here)
        setcross_circle(your_choice)
        setCells(newArray)

    }
    let quit = () => {
        setopen_reset(1);
        const change_is_here = [...wltq]
        change_is_here[0] = 1
        setwltq(change_is_here)
    }
    const location = useLocation();
    const data = location.state;
    let enemy
    let your_choice = ['', '', '', '', '', '', '', '', ''];
    let newArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let n = 0;
    let [turn, setturn] = useState(['', ''])
    const [cross_circle, setcross_circle] = useState(['', '', '', '', '', '', '', '', ''])
    const [cells, setCells] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const winner = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    let win_n=0;
    useEffect(() => {
        const which_turn = [...turn]
        if (data === 1) {
            which_turn[0] = 'x'
            which_turn[1] = '0'
            setturn(which_turn)
        } else {
            which_turn[0] = '0'
            which_turn[1] = 'x'
            setturn(which_turn)
        }
    }, [])
    let choice_winner = (your_choice) => {
        for (let i = 0; i < 8; i++) {
            const [a, b, c] = winner[i]
            if (your_choice[a] && your_choice[b] === your_choice[c] && your_choice[a] === your_choice[b]) {
                if (your_choice[a] === turn[0]) {
                    const change_is_here = [...wltq]
                    change_is_here[2] = 1
                    setwltq(change_is_here)
                    setopen_reset(1)
                    setwin(++win)
                    localStorage.setItem('win', win)
                    win_n=1
                    break
                } else {
                    const change_is_here = [...wltq]
                    change_is_here[3] = 1
                    setwltq(change_is_here)
                    setopen_reset(1)
                    setloss(++loss)
                    localStorage.setItem('loss', loss)
                    break
                }
                break
            }

        }
    }
    let play = (num) => {
        let nyum = 0;
        for (var i = 0; i < 9; i++) {
            if (cells[i] === 0) {
                ++nyum;
            }
        }
        if (cross_circle[num] !== '') {
            return;
        } else if (nyum === 1) {
            const your_choice = [...cross_circle]
            your_choice[num] = turn[0];
            setcross_circle(your_choice)
            const newArray = [...cells];
            newArray[num] = 1;
            setCells(newArray);
            choice_winner(your_choice)
            const change_is_here = [...wltq]
            change_is_here[1] = 1
            setwltq(change_is_here)
            setopen_reset(1)
            settei(++tei)
            localStorage.setItem('tei', tei)
        } else {
            your_choice=[...cross_circle]
            your_choice[num]=turn[0]
            newArray = [...cells];
            newArray[num] = 1;
            choice_winner(your_choice)
            if(win_n!==1){
                win_n=0
                cpu_turn()
            }
        }
    }
    let cpu_turn = () => {
        for (let i = 0; i < 8; i++) {
            const [a, b, c] = winner[i]
            if (your_choice[a] === turn[0] && your_choice[b] === turn[0] && your_choice[c] === '') {
                your_choice[c] = turn[1];
                setcross_circle(your_choice)
                newArray[c] = 1;
                setCells(newArray);
                n = 1
                choice_winner(your_choice)
                break
            } else if (your_choice[a] === turn[0] && your_choice[c] === turn[0] && your_choice[b] === '') {
                your_choice[b] = turn[1];
                setcross_circle(your_choice)
                newArray[b] = 1;
                setCells(newArray);
                n = 1
                choice_winner(your_choice)
                break
            } else if (your_choice[c] === turn[0] && your_choice[b] === turn[0] && your_choice[a] === '') {
                your_choice[a] = turn[1];
                setcross_circle(your_choice)
                newArray[a] = 1;
                setCells(newArray);
                n = 1
                choice_winner(your_choice)
                break
            }
        }
        if (n === 0) {
            n = 0;
            do {
                enemy = Math.floor(Math.random() * 10)
            } while (newArray[enemy] === 1 || enemy === 9)
            your_choice[enemy] = turn[1];
            setcross_circle(your_choice)
            newArray[enemy] = 1;
            setCells(newArray);
            choice_winner(your_choice)
        }
    }
    return (
        <>
            <div className='box'>
                <div id='box2' >
                    <img src={blue_cross} id='blue_cross_game' />
                    <img src={yellow_cross} id='yellow_circle_game' />
                    <div id='turn'>
                        <div id='play_chose'>{data === 1 ? 'X' : 'O'}</div>
                        <div id='turn_chose'>TURN</div>
                    </div>
                    <div id='rectangle'>
                        <input type='image' src={reset_page} id="retry" onClick={quit} />
                    </div>
                    <div id='box_small'>
                        <div id='di'>
                            <div className='dv'>
                                <img id='play' style={{ display: (cells[0]) !== 1 ? 'none' : 'flex' }} src={cross_circle[0] === 'x' ? blue_cross : yellow_cross} />
                                <button className='black_box' onClick={() => play(0)}></button>
                            </div>
                            <div className='dv'>
                                <img id='play' style={{ display: (cells[1]) !== 1 ? 'none' : 'flex' }} src={cross_circle[1] === 'x' ? blue_cross  : yellow_cross} />
                                <button className='black_box' onClick={() => play(1)}></button>
                            </div>
                            <div className='dv'>
                                <img id='play' style={{ display: (cells[2]) !== 1 ? 'none' : 'flex' }} src={cross_circle[2] === 'x' ? blue_cross  : yellow_cross} />
                                <button className='black_box' onClick={() => play(2)}></button>
                            </div>
                            <div className='dv'>
                                <img id='play' style={{ display: (cells[3]) !== 1 ? 'none' : 'flex' }} src={cross_circle[3] === 'x' ? blue_cross  : yellow_cross} />
                                <button className='black_box' onClick={() => play(3)}></button>
                            </div>
                            <div className='dv'>
                                <img id='play' style={{ display: (cells[4]) !== 1 ? 'none' : 'flex' }} src={cross_circle[4] === 'x' ? blue_cross  : yellow_cross} />
                                <    button className='black_box' onClick={() => play(4)}></button>
                            </div>
                            <div className='dv'>
                                <img id='play' style={{ display: (cells[5]) !== 1 ? 'none' : 'flex' }} src={cross_circle[5] === 'x' ? blue_cross  : yellow_cross} />
                                <button className='black_box' onClick={() => play(5)}></button>
                            </div>
                            <div className='dv'>
                                <img id='play' style={{ display: (cells[6]) !== 1 ? 'none' : 'flex' }} src={cross_circle[6] === 'x' ? blue_cross  : yellow_cross} />
                                <button className='black_box' onClick={() => play(6)}></button>
                            </div>
                            <div className='dv'>
                                <img id='play' style={{ display: (cells[7]) !== 1 ? 'none' : 'flex' }} src={cross_circle[7] === 'x' ? blue_cross  : yellow_cross} />
                                <button className='black_box' onClick={() => play(7)}></button>
                            </div>
                            <div className='dv'>
                                <img id='play' style={{ display: (cells[8]) !== 1 ? 'none' : 'flex' }} src={cross_circle[8] === 'x' ? blue_cross  : yellow_cross} />
                                <button className='black_box' onClick={() => play(8)}></button>
                            </div>
                        </div>
                        <div className='black_box1'>
                            <div id='you'>X (YOU)</div>
                            <input type='text' value={win} id='you1' onChange={e => setFirstName(e.target.value)} />
                        </div>
                        <div className='black_box2'>
                            <div id='tie'>TIES</div>
                            <input id='tie1' value={tei} onChange={e => setFirstName(e.target.value)} />
                        </div>
                        <div className='black_box3'>
                            <div id='cpu'>O (CPU)</div>
                            <input type='text' value={loss} id='cpu1' onChange={e => setFirstName(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className='box_final' style={{ display: open_reset === 1 ? 'flex' : 'none' }}>
                    <div id='judgment'>
                        <div id='tie2' style={{ display: wltq[2] === 1 ? 'flex' : 'none' }}>YOU WON!</div>
                        <div id='tie2' style={{ display: wltq[3] === 1 ? 'flex' : 'none' }}>CPU WON!</div>
                        <div id='win_loss1' style={{ display: wltq[2] === 1 ? 'flex' : 'none', color: turn[0] === 'x' ? '#31C4BE' : '#F2B237' }} >{turn[0] === 'x' ? 'X' : 'O'} TAKES THE ROUND</div>
                        <div id='win_loss' style={{ display: wltq[3] === 1 ? 'flex' : 'none', color: turn[0] === 'x' ? '#F2B237' : '#31C4BE' }} >{turn[1] === 'x' ? 'X' : 'O'} TAKES THE ROUND</div>
                        <div id='tie2' style={{ display: wltq[1] === 1 ? 'flex' : 'none' }}>TIE!</div>
                        <div id='quit1' style={{ display: wltq[1] === 1 ? 'flex' : 'none' }}>Tie! please try again</div>
                        <div id='quit1' style={{ display: wltq[0] === 1 ? 'flex' : 'none' }}>Do you want to quit ?</div>
                        <button id='quit' onClick={nav}>QUIT</button>
                        <button id='next_round' onClick={reset}>NEXT ROUND</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Play_game