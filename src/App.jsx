import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import generalRoutes from './Layout/Routes/GeneralRutes';
import dashboardRoutes from './Layout/Routes/DashboardRoutes';
import DashboardLayout from './Layout/DashboardLayout';
import NotFound from './Pages/404/NotFound';
import { useAuthHook } from './Hooks/authHook';
import { selectUserData } from './Redux/Features/userAuthSlice';

function App() {
  const { authUser } = useSelector(selectUserData);

  const userRole = Object.keys(authUser).length !== 0 ? authUser.image.record.role : '';

  const { getSessionTime, logoutUser, SESSION_TIMEOUT } = useAuthHook();

  useEffect(() => {
    const checkSession = () => {
      const loggedInTime = getSessionTime();

      if (loggedInTime) {
        const currentTime = Date.now();
        const elapsedTime = currentTime - parseInt(loggedInTime, 10);

        if (elapsedTime > SESSION_TIMEOUT) {
          logoutUser();
        } else {
          // Schedule the next session check
          setTimeout(checkSession, SESSION_TIMEOUT);
        }
      }
    };

    // Start the initial session check
    checkSession();

    // Clean up the timer when the component unmounts
    return () => clearTimeout(checkSession);
  }, []);
  return (
    <main className="App">
      <Router>
        <Routes>
          {generalRoutes.map((route, idx) => (
            <Route key={idx} path={route.path} element={route.element} />
          ))}
          {dashboardRoutes(userRole).map((route, idx) => (
            <Route
              key={idx}
              path={route.path}
              element={<DashboardLayout>{route.element}</DashboardLayout>}
            />
          ))}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
