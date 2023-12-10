import BookAppointments from '../../Pages/BookAppointment/BookAppointments';
import Home from '../../Pages/Home/Home';
import ManageDoctors from '../../Pages/ManageDocors/ManageDoctors';
import MyAppointments from '../../Pages/MyAppointment/MyAppointments';

const dashboardRoutes = (userRole) => {
  const allRoutes = [
    { path: '/', name: 'Home', element: <Home /> },
    {
      path: '/bookappointments',
      name: 'Book Appointment',
      element: <BookAppointments />,
    },
    {
      path: '/myappointments',
      name: 'My Appointments',
      element: <MyAppointments />,
    },
    {
      path: '/managedoctors',
      name: 'Manage Doctors',
      element: <ManageDoctors />,
    },
  ];

  if (userRole === 'user') {
    return allRoutes.filter(
      (route) =>
        route.name !== 'Manage Doctors' && route.name !== 'Manage Doctors',
    );
  }

  return allRoutes;
};

export default dashboardRoutes;
