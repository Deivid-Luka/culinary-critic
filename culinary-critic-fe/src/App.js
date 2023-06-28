import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login/login';
import Wrapper from "./components/wrapper";
import 'react-toastify/dist/ReactToastify.css';
import AddRestaurantPage from './pages/AddRestaurant/addrestaurant';
import Dashboard from './pages/Dashboard/dashboard';
import RegistrationForm from './pages/UserRegistration/userRegistrationForm';

import { setAuthToken } from "./services/mainAxios";
import func from "./services/functions";
import { AppContextProvider } from "./AppContext";
import Forbidden403 from "./pages/Forbidden403/forbidden403";
import AuthorizedRoutes from "./components/AuthorizedRoute/authorizedRoute";

function App() {
  setAuthToken(func.getCookie("cc-token"));

  return (
    <div>
      <AppContextProvider>
        <Router>
          <Wrapper>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forbidden" element={<Forbidden403 />} />

              <Route element={<AuthorizedRoutes />}>
                <Route
                  path="/addrestaurant"
                  element={<AddRestaurantPage />}
                />
              </Route>

              {/* Additional routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/signup" element={<RegistrationForm />} />
              {/* <Route path="/" element={<HomePage />} /> */}
              {/* <Route path="*" element={<h1>Not Found</h1>} /> */}
            </Routes>
          </Wrapper>
        </Router>
      </AppContextProvider>
    </div>
  );
}

export default App;
