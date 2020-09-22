import React from "react";
import createReactClass from "create-react-class";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";

import $ from "jquery";

import AppConfig from "../config";

var LoginView, AppEnv;
AppEnv = AppConfig.get(AppConfig.get("environment"));

LoginView = createReactClass({
    viewName: "Login",

    ajaxRequests: [],

    getInitialState(){
        var View, cachedState, state;
		View = this;
		
		cachedState = JSON.parse(window.sessionStorage.getItem(AppEnv.namespace+"_login_view_state"));
			
		state = {
			feedback: {
				open: false,
				message: ""
			}
		};

		return state;
    },

    componentWillMount(){
        var View;
		View = this;
    },

    componentDidMount(){
        var View = this;
		var userId;

		userId = localStorage.getItem(AppEnv.namespace+"_user_id");
		if(userId !== null){
			View.props.router.push("/videos");
		}
    },

    componentWillUnmount(){
        var View, i;
		View = this;

		for(i=0; i<View.ajaxRequests.length; i++){
			View.ajaxRequests[parseInt(i)].abort();
		}

		window.sessionStorage.setItem(AppEnv.namespace+"_login_view_state", JSON.stringify(View.state));
    },

    handleFeedbackClose(){
        this.setState({
			feedback: {
				open: false,
				message: null
			}
		});
    },

    render(){
        return (
			<Grid container className="c-login-view">
				<Grid item xs={12}>
					<h1>Splash Screen</h1>
				</Grid>
				<Snackbar
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
					open={this.state.feedback.open}
					message={this.state.feedback.message}
					autoHideDuration={3000}
					onClose={this.handleFeedbackClose} />
			</Grid>
		);
    }
});

export default LoginView;

