import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlanningPage from './pages/PlanningPage';
import NotFound from './pages/Notfound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlanningPage />} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
