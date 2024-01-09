import Start_game from './Start_game'
import Tip_time from './Tip_time';
import Play_game from './Play_game'
import {BrowserRouter,
  Routes,
  Route,} from "react-router-dom";
function App() {
  return (
    <>
    <Tip_time />
    <BrowserRouter>
    <Routes>
      <Route path='/' element={ <Start_game />}/>
      <Route path='/new_game' element={<Play_game />}/>
    </Routes>
    </BrowserRouter>
    </>
      
  )
}

export default App
