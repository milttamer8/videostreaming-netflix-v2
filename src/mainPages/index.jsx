import React from 'react';
import Header from '../components/Header';
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { getCartList, } from "../actions";
import Home from './Home';
import MyList from './MyList';
import Watch from './Watch';
import MainPage404 from './ManPage404';
import MemberFooter from '../components/MemberFooter';
import './style.css';
import Latest from './Latest';
import Movies from './Movies';
import SearchResult from './SearchResult';
import MyAccount from './Settings/MyAccount';
import ChangePassword from './Settings/ChangePassword';

class MainPages extends React.Component {
    _isMounted = false;
    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            this.props.getCartList();
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log(" NEXT PROPS => ", nextProps);
        if (nextProps.authUser) {
            const { email_verified_at, plan_id } = nextProps.authUser;
            if (email_verified_at === null) this.props.history.push('/verification');
            if (plan_id === null) this.props.history.push('/subscription');
        }
    }
    render() {
        const { match, location } = this.props;
        console.log("___ match ___", match);
        console.log("___ location ___", location);
        return (
            <React.Fragment>
                <div className="netflix-sans-font-loaded">
                    <div dir="ltr" className="">
                        <div>
                            <div className="bd kidsPage" lang="en-EN" data-uia="container-kids">
                                <Header />
                                <Switch>
                                    <Route exact path={`${match.url}`} component={Home} />
                                    <Route path={`${match.url}/movies`} component={Movies} />
                                    <Route path={`${match.url}/latest`} component={Latest} />
                                    <Route path={`${match.url}/my-list`} component={MyList} />
                                    <Route path={`${match.url}/watch/:videoId`} component={Watch} />
                                    {/* <Redirect exact path={`${match.url}/search`} to={`${match.url}/movies`} /> */}
                                    {/* <Route path={`${match.url}/search/:searchKey`} component={SearchResult} /> */}
                                    <Route path={`${match.url}/search`} component={SearchResult} />
                                    

                                    {/* Here is account settings */}
                                    <Route path={`${match.url}/my-account`} component={MyAccount} />
                                    <Route path={`${match.url}/change-password`} component={ChangePassword} />

                                    <Route component={MainPage404} />
                                </Switch>
                                <MemberFooter />
                            </div >
                        </div >
                    </div >
                </div >
            </React.Fragment>

        );
    }
}
const mapStateToProps = ({ auth }) => {
    const { authUser } = auth;
    return { authUser };
};
const mapDispatchToProps = { getCartList };
export default connect(mapStateToProps, mapDispatchToProps)(MainPages);