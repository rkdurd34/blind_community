import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as commonActions from '../store/modules/common'
import {
    Layout as AntdLayout,
    Menu,
} from 'antd'
import AdminLoading from './AdminLoading'
import config from '../conifg/config.json'

const { Header, Sider, Content, Footer } = AntdLayout
const { SubMenu } = Menu

const Layout = ({ history, auth, title, children }) => {
    const dispatch = useDispatch()

    const onToggle = useCallback(({ collapsed }) => {
        dispatch(commonActions.menuCollapsed({ collapsed }))
    }, [ dispatch ])

    const pushHistoryPage = useCallback(({ menu, history }) => {
        dispatch(commonActions.asyncPushHistoryPage({ menu, history }))
    }, [ dispatch ])

    const menuOpened = useCallback(({ open_keys }) => {
        dispatch(commonActions.menuOpened({ open_keys }))
    }, [ dispatch ])

    const popHistoryPage = useCallback(({ menu, history = null }) => {
        dispatch(commonActions.asyncPopHistoryPage({ menu, history }))
    }, [ dispatch ])

    const { view, sales_user } = useSelector(({ common }) => common, shallowEqual)

    const menu = config.menu
        .filter(main_menu => (
            main_menu.main_menu_key === null
            && (main_menu.auth === `*` || main_menu.auth >= sales_user.auth))
        )
        .map(main_menu => ({
            ...main_menu,
            sub_menu: config.menu
                .filter(sub_menu => (
                    sub_menu.main_menu_key !== null
                    && sub_menu.main_menu_key === main_menu.key
                    && (sub_menu.auth === `*` || sub_menu.auth >= sales_user.auth)
                )),
        }))

    useEffect(() => {
        if (history.action === `POP`) {
            const menu = config.menu.filter(menu => menu.path === history.location.pathname)[0]
            popHistoryPage({ menu })
        }
    }, [ history, popHistoryPage ])

    return (
        <AntdLayout>
            <Sider
                collapsible
                collapsed={view.collapsed}
                onCollapse={() => onToggle({ collapsed: view.collapsed })}
                style={{ 
                    // overflowX: `hidden`,
                    // overflowY: `scroll`,
                     height: `100vh` }}
            >
                <div
                    style={{
                        width: `100%`,
                        padding: `0.7rem`,
                        display: !view.collapsed ? `flex` : `none`,
                        flexDirection: `column`,
                        justifyContent: `center`,
                        alignItems: `start`,
                        backgroundColor: `rgba(255,255,255,0.15)`,
                    }}
                >
                    <h1
                        style={{
                            display: sales_user.type === 'employee' ? `block` : `none`,
                            fontWeight: `bold`,
                            color: `rgba(255,255,255,1)`,
                            fontSize: `1rem`,
                            margin: 0,
                        }}
                    >
                        {sales_user.type === 'employee' ? sales_user.company_name : ``}
                    </h1>
                    <h3
                        style={{
                            margin: 0,
                            color: `rgba(255,255,255,1)`,
                            fontSize: `0.9rem`,
                        }}
                    >
                        {sales_user.email}
                    </h3>
                    <h3
                        style={{
                            margin: 0,
                            color: `rgba(255,255,255,1)`,
                            fontSize: `0.8rem`,
                        }}
                    >
                        {`${sales_user.position} | ${sales_user.name}`}
                    </h3>
                    <h3
                        style={{
                            margin: 0,
                            color: `rgba(255,255,255,1)`,
                            fontSize: `0.9rem`,
                        }}
                    >
                        {sales_user.phone}
                    </h3>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={view.selected_keys.toJS()}
                    openKeys={view.open_keys.toJS()}
                    onOpenChange={keys => menuOpened({ open_keys: keys })}
                >
                    {
                        menu.map(menu => menu.sub_menu.length < 1
                            ?
                            <Menu.Item
                                key={menu.key}
                                onClick={() => (
                                    menu.path === null || menu.container === null
                                        ? {}
                                        : pushHistoryPage({ menu, history })
                                )}
                            >
                                {menu.title}
                            </Menu.Item>
                            :
                            <SubMenu
                                key={menu.key}
                                title={menu.title}
                            >
                                {
                                    menu.sub_menu.map(sub_menu => (
                                        <Menu.Item
                                            key={sub_menu.key}
                                            onClick={() => pushHistoryPage({ menu: sub_menu, history })}
                                        >
                                            {sub_menu.title}
                                        </Menu.Item>
                                    ))
                                }
                            </SubMenu>
                        )
                    }
                </Menu>
            </Sider>
            <AntdLayout>
                <Header
                    style={{
                        padding: `0 1rem`,
                        backgroundColor: `rgba(255,255,255,1)`,
                        fontSize: `1.2rem`,
                        fontWeight: `bold`,
                        boxShadow: `0 3px 12px 0 rgb(0 0 0 / 12%)`,
                    }}
                >
                    {title}
                </Header>
                <Content
                    style={{
                        overflow: `hidden`,
                        height: `calc(100vh - (64px + 50px))`,
                        padding: `1rem`,
                    }}
                >
                    <div
                        style={{
                            width: `100%`,
                            height: `100%`,
                            backgroundColor: `rgba(255,255,255,1)`,
                            borderRadius: `0.5rem`,
                            padding: `0.8rem`,
                        }}
                    >
                        { auth === `*` || auth >= sales_user.auth ? children : history.push(`/admin`) }
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                        backgroundColor: `rgba(255,255,255,1)`,
                        width: `100%`,
                        height: `50px`,
                        padding: `14px 30px`,
                    }}
                >
                    SalesManagement ©2021 Created by SimonDev
                </Footer>
            </AntdLayout>
            <AdminLoading loading={view.is_loading} />
        </AntdLayout>
    )
}

Layout.prototype = {
    history: PropTypes.object,
    auth: PropTypes.string || PropTypes.number,
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
}

Layout.defaultProps = {
    history: {},
    auth: `*`,
    title: ``,
    children: [],
}

export default Layout