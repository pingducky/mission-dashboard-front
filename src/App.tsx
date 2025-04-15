import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ParentPage from './pages/ParentPage/ParentPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './context/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="*"
            element={
              <ProtectedRoute>
                <ParentPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
