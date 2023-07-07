import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import AllCountries from './components/allCountries/AllCountries';
import CountryInfo from './components/countryInfo/CountryInfo';
function App() {
  return (
    <>
      <header className='header'>
        <div className='container'>
        <h5><Link to={"/"}>Where in the world</Link></h5>
        </div>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<AllCountries />}/>
          <Route path='/country/:countryName' element={<CountryInfo/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
