import React from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import UploadImage from './pages/Upload';
import List from './pages/List';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='uploadimg'
            element={ <UploadImage/> }
          />
          <Route path='viewdocs'
            element={ <List/> }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
