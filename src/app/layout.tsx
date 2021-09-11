import * as React from 'react';

import { Tag, Button, Intent, Icon, IconSize } from '@blueprintjs/core';
import { SideNavbar } from './components/SideNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { actions as AuthActions, selectUserInfo } from './pages/Login/slice';

const AppHeader = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);
    return (
        <div className="header">
            <div className="header-left">
                <a className="burger-menu link-no-underline">
                    <Icon icon="menu" size={IconSize.LARGE} />
                </a>
            </div>
            <div className="header-right">
                {userInfo !== null ? (
                    <Tag
                        style={{ marginRight: 10 }}
                        large={false}
                        minimal={true}
                        intent={Intent.SUCCESS}
                    >
                        Logged in as: <strong>{userInfo.name}</strong>
                    </Tag>
                ) : null}
                <Button
                    outlined={true}
                    intent={Intent.DANGER}
                    text="Logout"
                    rightIcon="log-out"
                    onClick={e => dispatch(AuthActions.logoutInit(null))}
                />
            </div>
        </div>
    );
};

interface PageTileProps {
    text: string;
    extraTitle?: React.ReactNode;
}

export const PageTitle = React.memo((props: PageTileProps) => {
    return (
        <div className="content-title">
            <span className="title-text">{props.text}</span>
            {props.extraTitle}
            <hr />
        </div>
    );
});

export const PageContent = React.memo((props: React.PropsWithChildren<{}>) => {
    return <div className="content-body">{props.children}</div>;
});

interface AppLayoutProps {
    sidebarActiveLinkNames?: string[];
}

export const AppLayout = React.memo((props: React.PropsWithChildren<AppLayoutProps>) => {
    return (
        <React.Fragment>
            <SideNavbar activeLinkNames={props.sidebarActiveLinkNames} />
            <div className="content">
                <AppHeader />
                {props.children}
            </div>
        </React.Fragment>
    );
});
