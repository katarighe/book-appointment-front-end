// generalRoutes.js

import Signin from '../../Pages/Auth/Signin';
import Signup from '../../Pages/Auth/Signup';

const generalRoutes = [
  { path: '/signup', element: <Signup /> },
  { path: '/signin', element: <Signin /> },
];

export default generalRoutes;
