import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlanningPage from './pages/PlanningPage/PlanningPage.tsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.tsx';
import EmployeesPage from './pages/EmployeesPage/EmployeesPage.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/" element={<PlanningPage />} />
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
