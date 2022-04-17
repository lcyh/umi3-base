/*
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * @Author: changluo
 * @Description: 获取权限
 */
// src/access.ts
export default function (initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser = {} } = initialState;
  return {
    canReadFoo: true,
    canAdmin: currentUser && currentUser.access === 'admin',
    canDeleteFoo: (curRoute: any) => {
      if (curRoute) {
        return currentUser?.hasRoutes?.includes(curRoute.name) || false;
      }
      return false;
    },
    canCustomFoo: (cusParams: any) => {
      if (cusParams) {
        return cusParams.owerId === currentUser?.userid;
      }
      return false;
    },
  };
}
