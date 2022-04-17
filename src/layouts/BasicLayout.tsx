/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 *
 * @see You can view component api by: https://github.com/ant-design/ant-design-pro-layout
 */
import type {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import React, { useState } from 'react';
import { history, Link, useIntl, useAccess, useModel } from 'umi';
import { Spin } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import RightContent from '@/components/RightContent';
// import logo from '@/assets/logo.png';
import defaultSettings from '../../config/defaultSettings';
import { LayoutContext } from './context';
import styles from './index.less';

export type BasicLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>;
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
} & ProLayoutProps;

export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: Record<string, MenuDataItem>;
};

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map((item) => {
    return {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
  });

const defaultFooterDom = (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} 蚂蚁集团体验技术部出品`}
    links={[
      {
        key: 'Ant Design Pro',
        title: 'Ant Design Pro',
        href: 'https://pro.ant.design',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/ant-design/ant-design-pro',
        blankTarget: true,
      },
      {
        key: 'Ant Design',
        title: 'Ant Design',
        href: 'https://ant.design',
        blankTarget: true,
      },
    ]}
  />
);

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const {
    children,
    location = {
      pathname: '/',
    },
  } = props;
  const handleMenuCollapse = (): void => {};
  const [loading] = useState(false);
  const { initialState } = useModel('@@initialState');
  const access = useAccess();
  const stores = { initialState, access };
  // console.log('stores', stores);
  const { formatMessage } = useIntl();

  return (
    <LayoutContext.Provider value={{ ...stores }}>
      <div className={styles['basic-layout-wrapper']}>
        <Spin size="large" spinning={loading} className={styles['spin-loading']}>
          <ProLayout
            className={styles['basic-layout-content']}
            {...defaultSettings}
            // logo={logo}
            formatMessage={formatMessage}
            {...props}
            waterMarkProps={{
              content: initialState?.currentUser?.name,
            }}
            onCollapse={handleMenuCollapse}
            onMenuHeaderClick={() => history.push('/')}
            menuItemRender={(menuItemProps, defaultDom) => {
              if (
                menuItemProps.isUrl ||
                !menuItemProps.path ||
                location.pathname === menuItemProps.path
              ) {
                return defaultDom;
              }
              return <Link to={menuItemProps.path}>{defaultDom}</Link>;
            }}
            breadcrumbRender={(routers = []) => [
              {
                path: '/',
                breadcrumbName: formatMessage({ id: 'menu.home' }),
              },
              ...routers,
            ]}
            itemRender={(route, params, routes, paths) => {
              const first = routes.indexOf(route) === 0;
              return first ? (
                <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
              ) : (
                <span>{route.breadcrumbName}</span>
              );
            }}
            footerRender={() => defaultFooterDom}
            menuDataRender={menuDataRender}
            rightContentRender={() => <RightContent />}
            disableMobile={false}
          >
            {children}
          </ProLayout>
        </Spin>
      </div>
    </LayoutContext.Provider>
  );
};

export default BasicLayout;
