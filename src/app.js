import React from "react";
import createReactClass from "create-react-class";
import ReactDom from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from "react-router";
import PropTypes from "prop-types";

import $ from "jquery";

import AppConfig from "./config";

import SplashView from "./views/Splash";
import LoginView from "./views/Login";
import VideosView from "./views/Videos";

var App, AppEnv;

AppEnv = AppConfig.get(AppConfig.get("environment"));

App = createReactClass({
    ajaxRequests: [],

    contextTypes: {
        router: PropTypes.object.isRequired
    },

    getInitialState(){
        try{
            return {};
        }catch(error){
            console.error(error);
            console.error(error.stack);
        }
    },

    componentWillMount(){
        try{
			var View;
            View = this;
            
			View.context.router.push("/splash");
			console.log("going to splash");
        }catch(error){
            console.error(error);
            console.error(error.stack);
        }
    },

    componentDidMount(){
        try{
            var View, userId;
            View = this;
        }catch(error){
            console.error(error);
            console.error(error.stack);
        }
    },

    componentWillUnmount(){
        try{
            var View, i;
            View = this;

            for(i=0; i<View.ajaxRequests.length; i++){
                View.ajaxRequests[parseInt(i)].abort();
            }
        }catch(error){
            console.error(error);
            console.error(error.stack);
        }
    },

    render(){
        try {
            var app;
            app = this;
            return React.cloneElement(this.props.children, {
                app: app
            });
        }catch(error){
            console.error(error);
            console.error(error.stack);
        }
    }
});

ReactDom.render(
    (
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={SplashView}/>
                <Route path="splash" component={SplashView}/>
                <Route path="login" component={LoginView}/>
                <Route path="videos" component={VideosView}/>
            </Route>
        </Router>
    ), document.getElementById("app")
);
