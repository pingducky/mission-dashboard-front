import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ParentPage from './pages/ParentPage/ParentPage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<ParentPage/>}/>
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
