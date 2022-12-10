import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
        }
    }
    handleLogOut = () => {
        this.props.processLogout()
        window.location.href = '/login'
    }

    render() {

        console.log(this.props);
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                {/* nút logout */}
                <div className="btn btn-logout" onClick={this.handleLogOut}>
                    <i  className="fas fa-sign-out-alt"></i>
                </div>
            </div>
        );
    }
  
    componentDidUpdate(prevProps){
        if(true) {
            console.log(this.props)
        }
     }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
