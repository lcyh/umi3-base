import routes from './routes';

export default [
  {
    path: '/login',
    component: './Login',
    exact: true,
  },
  {
    path: '/403',
    exact: true,
    component: './403',
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: routes,
  },
  {
    component: './404',
  },
];
