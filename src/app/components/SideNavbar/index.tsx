import * as React from 'react';
import './index.css';

import { linkNames, routePaths } from 'app/routing/routes';
import { Link } from 'react-router-dom';

const SidebarSection = React.memo((props: { label: string } & React.PropsWithChildren<{}>) => {
    return (
        <ul className="nav nav-sidebar">
            <li className="nav-label">
                <label>{props.label}</label>
            </li>
            {props.children}
        </ul>
    );
});

type NavLinkProps = {
    active: boolean;
    icon?: React.ReactNode;
    name: string;
    to: string;
};

const NavLink = React.memo((props: NavLinkProps) => {
    return (
        <li className="nav-item">
            <Link to={props.to} className={`nav-link ${props.active ? 'active' : ''}`}>
                {props.icon}
                {props.name}
            </Link>
        </li>
    );
});

const AppLogo = React.memo(() => {
    return (
        <div className="sidebar-home">
            <a href="/">
                <img style={{ width: '100%', height: 200 }} src="/images/logo.png" alt="" />
            </a>
        </div>
    );
});

interface Props {
    activeLinkNames?: string[];
}

export const SideNavbar = React.memo((props: Props) => {
    const activeLinks = props.activeLinkNames || [];
    const isLinkActive = (name: string) => activeLinks.indexOf(name) !== -1;
    return (
        <div className="sidebar">
            <AppLogo />
            <div className="sidebar-body">
                <SidebarSection label="Navigation">
                    <NavLink
                        name="Manage"
                        to={routePaths.manage}
                        active={isLinkActive(linkNames.Manage)}
                    />
                    <NavLink
                        name="Other"
                        to={routePaths.other}
                        active={isLinkActive(linkNames.Other)}
                    />
                </SidebarSection>

                <hr />

                <SidebarSection label="Reporting"></SidebarSection>
            </div>
        </div>
    );
});
