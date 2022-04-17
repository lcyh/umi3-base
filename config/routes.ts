export default [
  {
    path: '/',
    redirect: '/welcome',
    exact: true,
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/superset',
    name: 'SQLLab',
    icon: 'crown',
    routes: [
      {
        path: '/superset/sqllab',
        name: 'SQLEditor',
        icon: 'smile',
        component: './SqlLab',
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    component: './404',
  },
];
