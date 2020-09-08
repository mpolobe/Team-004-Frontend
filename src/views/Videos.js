import React from "react";
import createReactClass from "create-react-class";
import Grid from "@material-ui/core/Grid";

import $ from "jquery";

import AppConfig from "../config";

var VideosView, AppEnv;
AppEnv = AppConfig.get(AppConfig.get("environment"));

VideosView = createReactClass({
    viewName: "Videos",

    ajaxRequests: [],

    getInitialState(){
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
    },

    componentWillMount(){
        var View;
		View = this;
    },

    componentDidMount(){
        var View = this;
    },

    componentWillUnmount(){
        var View, i;
		View = this;

		for(i=0; i<View.ajaxRequests.length; i++){
			View.ajaxRequests[parseInt(i)].abort();
		}

		window.sessionStorage.setItem(AppEnv.namespace+"_videos_view_state", JSON.stringify(View.state));
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
			<Grid container className="c-videos-view">
				<Grid item xs={12}>
					<h1>Videos list</h1>
				</Grid>
			</Grid>
		);
    }
});

export default VideosView;

