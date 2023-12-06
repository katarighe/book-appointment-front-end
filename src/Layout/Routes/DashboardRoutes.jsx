import Home from '../../Pages/Home/Home';
import Details from '../../components/Doctors/Details';

const dashboardRoutes = [{ path: '/', name: 'Home', element: <Home /> },
{ path: '/doctordetails', name: 'Doctor-details', element: <Details /> }
];

export default dashboardRoutes;
