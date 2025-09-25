import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';

import Detalle from './componentes/detalle'
import Favoritos from './componentes/favoritos'
import Home from './componentes/home'
import Informativa from './componentes/informativa'
import Original_mapa from './componentes/originalmapa'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>

            <nav className="c-menu">
          <Link to="/">Home</Link>
          <Link to="/informativa">Informativa</Link>
          <Link to="/originalmapa">Mapa</Link>
          <Link to="/favoritos">Favoritos</Link>
        </nav>

      <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/informativa" element={<Informativa /> } />
          <Route path="/originalmapa" element={<Original_mapa /> } />
          <Route path="/favoritos" element={<Favoritos /> } />
          <Route path="/detalle/:depto/:municipio" element={<Detalle /> } />
      </Routes>
    </Router>
    </>
  )
}

export default App
