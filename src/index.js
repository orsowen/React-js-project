import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Welcome from './Welcome';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Routes, Route} from 'react-router-dom';
export default  function Index(){
  return (
    <BrowserRouter basename='/'>
    <Routes>
      <Route path='/app' element={<App/>} />
      <Route path='/' element={<Welcome/>} />
    </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index/>);


reportWebVitals();
