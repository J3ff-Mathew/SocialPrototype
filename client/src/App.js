import logo from './logo.svg';
import './App.css';
import Registration from './components/Registration';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddPosts from './components/AddPosts'
import Home from './components/Home';

function App() {
  return (
    <div >
      {/* <Registration /> */}
      <Router>
        <Routes>
          <Route path='/regis' exact element={<Registration />} />
          <Route path='/' exact element={<Login />} />
          <Route path='/dash' exact element={<Dashboard />} >
            <Route path='addpost' exact element={<AddPosts />} />
            <Route path='' exact element={< Home />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
