import './App.css';
import { Route, Routes } from 'react-router-dom';
// Pages
import Currencies from './pages/Currencies'
import Main from './pages/Main'
import Price from './pages/Price'
import NavBar from './components/NavBar';

function App()
{
  return (
    <div className="App">
      {/* render NavBar that uses NavLinks to use routing context and avoid reloading pages */}
      <NavBar />
      <h1>Crypto App</h1>
      {/* contains paths for routing context */}
      <Routes>
        {/* Route expects path and element to render at that path */}
        <Route
          path="/"
          element={<Main />} />
        <Route
          path="/currencies"
          element={<Currencies />} />
        <Route
          // path parameter via :symbol
          path="/price/:symbol"
          element={<Price />} />
        {/* <Route
          // path parameter via :symbol
          path="/price/:symbol/:num"
          element={<h1>Hello World</h1>} /> */}
      </Routes>
    </div>
  );
}

export default App;
