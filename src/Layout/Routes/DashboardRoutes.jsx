import AddDoctor from '../../Pages/AddDoctor/AddDoctor';
import BookAppointments from '../../Pages/BookAppointment/BookAppointments';
import BookDoctor from '../../Pages/BookDoctor/BookDoctor';
import DeleteDoctors from '../../Pages/DeleteDoctors/DeleteDoctors';
import DoctorDetails from '../../Pages/DoctorDetails/DoctorDetails';
import Home from '../../Pages/Home/Home';
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
      path: '/deletedoctors',
      name: 'Delete Doctors',
      element: <DeleteDoctors />,
    },
    {
      path: '/adddoctors',
      name: 'Add Doctors',
      element: <AddDoctor />,
    },
  ];

  if (userRole === 'user') {
    return allRoutes.filter(
      (route) =>
        route.name !== 'Add Doctors' && route.name !== 'Delete Doctors',
    );
  }

  return allRoutes;
};

export default dashboardRoutes;
