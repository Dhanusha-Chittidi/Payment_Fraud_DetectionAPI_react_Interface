import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import{Form} from "./routes/Form";
import {Home} from "./routes/Home";

import {Navbar} from "./routes/Navbar";
function App() {
  return (
    <div className="App" id="app">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/prediction" element={<Form/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
