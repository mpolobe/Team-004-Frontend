import React from "react";
import createReactClass from "create-react-class";

import $ from "jquery";

import AppConfig from "../config";

var SplashView, AppEnv;
AppEnv = AppConfig.get(AppConfig.get("environment"));

SplashView = createReactClass({
    viewName: "Splash",

    ajaxRequests: [],

    getInitialState(){
        var View, state;
		View = this;
		
		state={};
		
		return state;
    },

    componentWillMount(){
        var View;
		View = this;
    },

    componentDidMount(){
        var View;
		View = this;
		
		View.props.router.push("/videos");
    },

    componentWillUnmount(){
        var View, i;
		View = this;

		for(i=0; i<View.ajaxRequests.length; i++){
			View.ajaxRequests[parseInt(i)].abort();
		}
    },

    render(){
        return (
			<div>
				<h1>Splash Screen</h1>
			</div>
		);
    }
});

export default SplashView;

