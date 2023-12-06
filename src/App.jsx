import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import generalRoutes from './Layout/Routes/GeneralRutes';
import dashboardRoutes from './Layout/Routes/DashboardRoutes';
import DashboardLayout from './Layout/DashboardLayout';
import NotFound from './Pages/404/NotFound';

function App() {
  return (
    <main className='App'>
      <Router>
        <Routes>
          {generalRoutes.map((route, idx) => (
            <Route key={idx} path={route.path} element={route.element} />
          ))}
          {dashboardRoutes.map((route, idx) => (
            <Route
              key={idx}
              path={route.path}
              element={
                <DashboardLayout breadCrumbs={route.breadCrumbs}>
                  {route.element}
                </DashboardLayout>
              }
            />
          ))}

          <Route path='*' element={<NotFound />} />

    
        </Routes>
      </Router>
      
    </main>
  );
}

export default App;
