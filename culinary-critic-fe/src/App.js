import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import LoginPage from './pages/login';
import HomePage from './pages/home';
import AddRestaurantPage from './pages/addrestaurant';
import Dashboard from './pages/dashboard';


function App() {
  return (
    <div>
    <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/addrestaurant" element={<AddRestaurantPage />} />
          <Route exact path="/dashboard" element={<Dashboard />} />

        </Routes>
    </Router>
          
    </div>
  );
}

export default App;
