import '../styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../features/home/Home';
import ByIngredient from '../features/byIngredient/ByIngredient';
import RandomPage from '../features/random/RandomPage';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ingredient/:ingredient' element={<ByIngredient />} />
          <Route path='/aleatorio' element={<RandomPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
