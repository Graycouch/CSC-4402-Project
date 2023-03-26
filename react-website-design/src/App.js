import { useGlobalState } from './globalValues';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/LoginPage/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/RegisterPage/Register';

function App() {
  const [isLoggedIn] = useGlobalState("isLoggedIn");
  const [isRegistering] = useGlobalState("isRegistering");

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

export default App;
