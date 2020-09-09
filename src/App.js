import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from "react-router-dom";
import axios from './util/Api';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Error404 from './pages/Error404';
import ForgotPassword from './pages/ForgotPassword';
// import ResetPasswordForm from './pages/ResetPasswordForm';
import EmailVerification from './pages/EmailVerification';
import MainPages from './mainPages';
import {
    setInitUrl,
    getUser
} from "./actions";
import VerifiedShow from './pages/VerifiedShow';
import Landing from './pages/Landing';
import Subscription from './pages/Subscription';
import PaymentSelect from './pages/PaymentSelect';
import PaypalSuccess from './pages/PaypalSuccess';


const RestrictedRoute = ({ component: Component, token, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                token ?
                    <Component {...props} />
                    : <Redirect
                        to={{
                            pathname: '/landing',
                            state: { from: props.location }
                        }}
                    />}
        />
    );
};

class App extends Component {
    componentWillMount() {
        if (this.props.initURL === '') {
            this.props.setInitUrl(this.props.history.location.pathname);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.token) {
            axios.defaults.headers.common['Authorization'] = "Bearer " + nextProps.token;
        }
        if (nextProps.token && !nextProps.authUser) {
            this.props.getUser();
        }
    }
    render() {
        const { match, location, token, authUser, initURL } = this.props;
        // console.error("~~~~~~~~~~~ this.props.token in store ~~~~~~~~~~~", token);
        // console.error("~~~~~~~~~~~ this.props.authUser in store ~~~~~~~~~~~", authUser);
        if (location.pathname === '/') {
            if (token === null) {
                console.error("++++++++++ TOKEN IS NULL SO REDIRET TO -> /landing +++++++++++");
                return (<Redirect to={'/landing'} />);
            }
            else if (initURL === '' || initURL === '/' || initURL === '/sign-in') {
                console.error("++++++++++ TOKEN EXIST AND INITURL IS EMPLY SO REDIRET TO -> /pr/ +++++++++++");
                return (<Redirect to={'/pr/'} />);
            } 
            else if (initURL !== '' || initURL !== '/' || initURL !== '/sign-in') {
                console.error("++++++++++ TOKEN & INITURL EXIST SO REDIRET TO -> initURL  +++++++++++");
                return (<Redirect to={initURL} />);
            }
        }
        return (
            <Switch>
                <Redirect exact path="/" to="/landing" />
                <RestrictedRoute path='/pr' token={token} component={MainPages} />
                {/* <Route path='/pr' component={MainPages} /> */}

                <Route path='/landing' component={Landing} />
                <Route path='/sign-in' component={SignIn} />
                <Route path='/sign-up' component={SignUp} />

                <Route path='/subscription' component={Subscription} />
                <Route path='/payment' component={PaymentSelect} />
                <Route path='/st-success/:planNo/:priceId' component={PaypalSuccess} />

                {/* email verification process */}
                <Route path='/verification' component={EmailVerification} />
                <Route path='/verify/:token' component={VerifiedShow} />

                {/* password reset process */}
                <Route path='/forgot-password' component={ForgotPassword} />
                {/* <Route path='/password-reset-form/:token' component={ResetPasswordForm} /> */}

                <Route component={Error404} />
            </Switch>
        );
    }
}
const mapStateToProps = ({ auth }) => {
    const { authUser, token, initURL } = auth;
    return { token, authUser, initURL }
};
const mapDispatchToProps = { setInitUrl, getUser };
export default connect(mapStateToProps, mapDispatchToProps)(App);
