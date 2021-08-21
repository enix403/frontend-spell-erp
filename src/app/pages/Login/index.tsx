import * as React from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';

import { useDispatch, useSelector } from 'react-redux';
import { minWidth } from 'styles/media';
import { actions as LoginActions, selectAuthState } from './slice';
import { Switch, Button, Intent, InputGroup, FormGroup } from '@blueprintjs/core';

/*
export default compose(
  injectReducer({ key: "books", reducer: booksReducer }),
  injectSaga({ key: "books", saga: booksSaga })
)(BooksManager);
*/

export const LoginPage = () => {
    const dispatch = useDispatch();
    const { message, authStatus } = useSelector(selectAuthState);

    const disableLoginBtn = authStatus == 'logging';
    const authFailed = authStatus == 'failed';

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [keepLoggedIn, setKeepLoggedIn] = React.useState(false);

    const handleSubmit = () => {
        dispatch(
            LoginActions.loginInit({
                username,
                password,
            }),
        );
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <FormContainer>
                <FormPanel>
                    <div style={{ margin: '0 0 25px' }}>
                        <FormHeader>Login</FormHeader>
                    </div>

                    <p style={{ color: '#f83c4f', fontWeight: 500 }}>{message}</p>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        <FormGroup
                            label="Username"
                            intent={authFailed ? Intent.DANGER : Intent.NONE}
                        >
                            <InputGroup
                                value={username}
                                onChange={(e: any) => setUsername(e.target.value)}
                                placeholder="Enter Username"
                                intent={authFailed ? Intent.DANGER : Intent.NONE}
                            />
                        </FormGroup>
                        <FormGroup
                            label="Password"
                            intent={authFailed ? Intent.DANGER : Intent.NONE}
                        >
                            <InputGroup
                                type="password"
                                value={password}
                                onChange={(e: any) => setPassword(e.target.value)}
                                placeholder="Enter Password"
                                intent={authFailed ? Intent.DANGER : Intent.NONE}
                            />
                        </FormGroup>

                        <Switch
                            label="Keep Me Logged In"
                            alignIndicator="right"
                            checked={keepLoggedIn}
                            onChange={(e: any) => {
                                setKeepLoggedIn(e.target.checked);
                            }}
                        />

                        <Button
                            outlined={true}
                            fill={true}
                            intent={authFailed ? Intent.DANGER : Intent.PRIMARY}
                            loading={disableLoginBtn}
                            disabled={disableLoginBtn}
                            // onClick={e => handleSubmit()}
                            type="submit"
                            text="Login"
                        />
                    </form>
                </FormPanel>
            </FormContainer>
        </React.Fragment>
    );
};

const FormContainer = styled.div`
    z-index: 15;
    position: relative;
    background: #ffffff;
    width: 100vw;
    margin: 100px auto 10px;
    ${minWidth.small`
        width: 450px;
    `}
`;

const FormPanel = styled.div`
    padding: 60px calc(5% + 60px) 60px 60px;
    box-sizing: border-box;

    :before {
        content: '';

        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.8);
        width: 100%;
        height: 100%;

        display: block;
        opacity: 0;
        visibility: hidden;
        -webkit-transition: 0.3s ease;
        transition: 0.3s ease;
    }
`;

const FormHeader = styled.h1`
    padding: 4px 0;
    color: #4285f4;
    font-size: 24px;
    font-weight: 700;
`;
