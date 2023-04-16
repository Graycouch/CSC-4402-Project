import { getSessionState } from './globalValues';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/LoginPage/Login'
import Register from './pages/RegisterPage/Register';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
  const isLoggedIn = getSessionState('isLoggedIn');
  const isRegistering = getSessionState('isRegistering');
  
  return (
    <div>
      {isLoggedIn ? (
        <Navbar />
      ) : isRegistering ? (
        <Register />
      ) : (
        <Login />
      )}
    </div>
  );
}
