import AddDoctor from '../../Pages/AddDoctor/AddDoctor';
import BookAppointments from '../../Pages/BookAppointment/BookAppointments';
import BookDoctor from '../../Pages/BookDoctor/BookDoctor';
import DoctorDetails from '../../Pages/DoctorDetails/DoctorDetails';
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
      path: '/doctordetails/:id',
      name: ' Doctor Details',
      element: <DoctorDetails />,
    },

    {
      path: '/doctordetails/bookdoctor',
      name: ' Book Doctor ',
      element: <BookDoctor />,
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
    {
      path: '/adddoctors',
      name: 'Add Doctor',
      element: <AddDoctor />,
    },
  ];

  if (userRole === 'user') {
    return allRoutes.filter(
      (route) => route.name !== 'Manage Doctors' && route.name !== 'Manage Doctors',
    );
  }

  return allRoutes;
};

export default dashboardRoutes;
