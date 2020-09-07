import React from "react";
import createReactClass from "create-react-class";
import Grid from '@material-ui/core/Grid';

import $ from "jquery";

import AppConfig from "../config";

var VideosView, AppEnv;
AppEnv = AppConfig.get(AppConfig.get("environment"));

VideosView = createReactClass({
    viewName: "Videos",

    ajaxRequests: [],

    getInitialState: function(){
        try{
            var View, cachedState, state;
            View = this;
            
			cachedState = JSON.parse(window.sessionStorage.getItem(AppEnv.namespace+"_videos_view_state"));
                
			state = {
				feedback: {
					open: false,
					message: "Hello"
				}
			};

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
            var View = this;
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

            window.sessionStorage.setItem(AppEnv.namespace+"_videos_view_state", JSON.stringify(View.state));
            console.log("Writting state into cache.");
        }catch(error){
            console.error(error);
            console.error(error.stack);
        }
    },

    handleFeedbackClose: function(){
        try{
            this.setState({
                feedback: {
                    open: false,
                    message: null
                }
            });
        }catch(error){
            console.error(error);
            console.error(error.stack);
        }
    },

    render: function(){
        try {
            return (
                <Grid container className="c-videos-view">
					<Grid item xs={12}>
						<h1>Videos list</h1>
					</Grid>
				</Grid>
            );
        }catch(error){
            console.error(error);
            console.error(error.stack);
        }
    }
});

export default VideosView;

