import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ParentPage from './pages/ParentPage/ParentPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<ParentPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
