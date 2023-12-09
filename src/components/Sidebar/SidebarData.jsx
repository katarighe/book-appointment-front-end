export const SidebarData = [
  {
    id: 'tab1',

    title: 'Home',
    url: '/',
  },

  {
    id: 'tab2',

    title: 'Book Appointments',
    url: '/bookappointments',
    s: {
      id: 'tab3',

      title: 'My Appointments',
      url: '/myappointments',
      hidden: true,
    },
  },

  {
    id: 'tab4',
    title: 'Manage Doctors',
    url: '/managedoctors',
  },
];
