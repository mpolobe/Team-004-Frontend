import React from "react";
import createReactClass from "create-react-class";

import $ from "jquery";

import AppConfig from "../config";

var SplashView, AppEnv;
AppEnv = AppConfig.get(AppConfig.get("environment"));

SplashView = createReactClass({
    viewName: "Splash",

    ajaxRequests: [],

    getInitialState: function(){
        try{
            var View, state;
            View = this;
            
			state={};
			
			return state;
        }catch(error){
            console.error(error);
            console.error(error.stack);
        }
    },

    componentWillMount: function(){
        try{
            var View;
            View = this;
        }catch(error){
            console.error(error);
            console.error(error.stack);
        }
    },

    componentDidMount: function(){
        try{
            var View;
            View = this;
			
			View.props.router.push('/videos');
			console.log("going to videos");
		}catch(error){
            console.error(error);
            console.error(error.stack);
        }
    },

    componentWillUnmount: function(){
        try{
            var View, i;
            View = this;

            for(i=0; i<View.ajaxRequests.length; i++){
                View.ajaxRequests[i].abort();
            }
        }catch(error){
            console.error(error);
            console.error(error.stack);
        }
    },

    render: function(){
        try {
            return (
                <div>
					<h1>Splash Screen</h1>
				</div>
            );
        }catch(error){
            console.error(error);
            console.error(error.stack);
        }
    }
});

export default SplashView;

