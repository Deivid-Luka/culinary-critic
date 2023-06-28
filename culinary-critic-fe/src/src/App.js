import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import LoginPage from './pages/Login/login';
import HomePage from './pages/Home/home';
import Wrapper from "./components/wrapper";
import 'react-toastify/dist/ReactToastify.css';
import AddRestaurantPage from './pages/AddRestaurant/addrestaurant';
import Dashboard from './pages/Dashboard/dashboard';
import {setAuthToken} from "./services/mainAxios";
import func from "./services/functions";
import {AppContextProvider} from "./AppContext";
import AuthorizedRoute from "./components/AuthorizedRoute/authorizedRoute";
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
                        <Route element={<AuthorizedRoutes />} >
                            <Route exact path="/addrestaurant" element={<AddRestaurantPage />} />
                            <Route exact path="/" element={<Dashboard />} />
                        </Route>

                        <Route exact path="/login" element={<LoginPage />} />
                        <Route exact path="/forbidden" element={<Forbidden403 />} />
                    </Routes>
                </Wrapper>
            </Router>
        </AppContextProvider>
    </div>
  );
}

export default App;
