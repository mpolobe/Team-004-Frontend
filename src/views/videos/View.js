import React from "react";
import createReactClass from "create-react-class";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import ReactPlayer from "react-player";
import Divider from "@material-ui/core/Divider";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

import $ from "jquery";
import moment from "moment";

import AppConfig from "../../config";

var ViewVideoView, AppEnv;
AppEnv = AppConfig.get(AppConfig.get("environment"));

ViewVideoView = createReactClass({
    viewName: "AddVideo",

    ajaxRequests: [],

    getInitialState(){
        var View, cachedState, state;
		View = this;
		
		cachedState = JSON.parse(window.sessionStorage.getItem(AppEnv.namespace+"_view_video_view_state"));
			
		state = {
            video: JSON.parse(window.sessionStorage.getItem(AppEnv.namespace+"_player_video")),
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

        if(View.state.video === null){
            View.props.router.push("/");
        }
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

		window.sessionStorage.setItem(AppEnv.namespace+"_view_video_view_state", JSON.stringify(View.state));
    },

    handleFeedbackClose(){
        this.setState({
            feedback: {
				open: false,
				message: ""
			}
		});
    },

    back(e){
        var View;

        View = this;

        View.props.router.goBack();
    },

    download(e){
        var View;

        View = this;

        //download video
    },

    render(){
        return (
			<Grid container className="c-view-video-view">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton color="inherit" onClick={(e) => this.back(e)} >
                            <ArrowBackIcon/>
                        </IconButton>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>{this.state.video.title}</Typography>
                    </Toolbar>
                </AppBar>
                <Grid item xs={12}>
                    <div className="player-wrapper">
                        <ReactPlayer
                            className="react-player"
                            url={this.state.video.url}
                            width="100%"
                            height="100%"
                        />
                    </div>
                    <Paper elevation={1} style={{ padding: "8px 16px"}}>
                        <Typography component="h2">{this.state.video.title}</Typography>
                        <Typography component="h2" variant="subtitle2">By {this.state.video.teacher.name}</Typography>
                        <Typography  component="p" variant="body2" color="textSecondary">{[this.state.video.views + " views", this.state.video.downloads + " downloads", moment(this.state.video.createDate).fromNow()].join(" - ")}</Typography>

                        <Divider style={{ margin:"15px 0" }}/>

                        <Typography variant="overline" display="block" gutterBottom><strong>Country</strong> {this.state.video.country} - <strong>Language</strong> {this.state.video.language} - <strong>Level</strong> {this.state.video.level} - <strong>Subject</strong> {this.state.video.subject}</Typography>
                        <Typography  component="p" variant="body2" color="textSecondary">{this.state.video.description}</Typography>
                        <Button color="primary" startIcon={<CloudDownloadIcon />} onClick={(e) => this.download(e)}>Download Video</Button>
                    </Paper>
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

export default ViewVideoView;

