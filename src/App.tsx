import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlanningPage from './pages/PlanningPage/PlanningPage.tsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlanningPage />} />
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
