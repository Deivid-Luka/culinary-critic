import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import LoginPage from './pages/login';
import HomePage from './pages/home';


function App() {
  return (
    <div>
    <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<LoginPage />} />
        </Routes>
    </Router>
          
    </div>
  );
}

export default App;
