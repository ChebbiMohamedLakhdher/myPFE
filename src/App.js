import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route index element={<Admin/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App