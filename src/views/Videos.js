import React from "react";
import createReactClass from "create-react-class";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fab from "@material-ui/core/Fab";
import Snackbar from "@material-ui/core/Snackbar";
import Infinite from "react-infinite";

import $ from "jquery";
import moment from "moment";

import AppConfig from "../config";
import ArrowBackIcon from "@material-ui/core/SvgIcon/SvgIcon";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

var VideosView, AppEnv, ListElement;
AppEnv = AppConfig.get(AppConfig.get("environment"));

ListElement = createReactClass({
	getInitialState(){
		var view, state;

		view = this;

		state = {
		};

		return state;
	},

	getInsights(video){
		var view, insights;

		view = this;
		insights = [];
		insights.push(video.views + " views");
		//insights.push(video.comments + " comments");
		insights.push(video.downloads + " downloads");
		insights.push(moment(video.createDate).fromNow());

		return insights.join(" - ");
	},

    viewVideo(e, video){
        var view;

        view = this;

        window.sessionStorage.setItem(AppEnv.namespace+"_player_video", JSON.stringify(video));
        view.props.parentView.props.router.push("/videos/"+video.id);
	},

    render() {
		return (
			<ListItem onClick={(e) => this.viewVideo(e, this.props.video)}>
				<Card style={{width:"100%"}}>
					<CardMedia
						image={this.props.video.thumbnail}
						title={this.props.video.title}
                        style={{height:"320px"}}
					/>
					<CardContent>
						<Typography component="h2">{this.props.video.title}</Typography>
						<Typography component="h2" variant="subtitle2">By {this.props.video.teacher.name}</Typography>
						<Typography  component="p" variant="body2" color="textSecondary">{this.getInsights(this.props.video)}</Typography>
					</CardContent>
				</Card>
			</ListItem>
        );
	}
});

VideosView = createReactClass({
    viewName: "Videos",

    ajaxRequests: [],

    getInitialState(){
        var View, cachedState, state;
		View = this;
		
		cachedState = JSON.parse(window.sessionStorage.getItem(AppEnv.namespace+"_videos_view_state"));
			
		state = {
		    isConnected: window.localStorage.getItem(AppEnv.namespace+"_user_id") !== null,
		    isTeacher: window.localStorage.getItem(AppEnv.namespace+"_user_role") === "teacher",
            list: {
                isLoading: false,
                infiniteLoadBeginEdgeOffset: 200,
                nextUrl: null,
                items: [],
                elements: [],
            },
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
    },

    componentWillUnmount(){
        var View, i;
		View = this;

		for(i=0; i<View.ajaxRequests.length; i++){
			View.ajaxRequests[parseInt(i)].abort();
		}

        View.state.list.elements = [];
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

    loadVideos(e){
        var View, listState;

        View = this;
        listState = this.state.list;

        listState.isLoading = true;
        this.setState({
            list: listState
        });

        //should be ajax request
        setTimeout(function(){
            var items, i;

            items = [
                {
                    id: listState.items.length+1,
                    title: "Repeated Addition",
                    subject: "Mathematics",
                    level: "Grade 2",
                    country: "ZA",
                    description: "This video is part of the Bambanani series which is aimed at illustrating how teachers are teaching inclusively in South African classrooms. It focusses on teaching the topic of Repeated Addition (Mathematics) in Grade 2.",
                    language: "en",
                    createDate: "2019-03-14",
                    views: 235,
                    downloads: 30,
                    //comments: 10,
                    teacher: {
                        name: "Bambanani"
                    },
                    thumbnail: "https://www.dw.com/image/17517158_303.jpg",
                    url: "https://www.youtube.com/watch?v=xXJer2AD5Xk"
                },
                {
                    id: listState.items.length+2,
                    title: "Repeated Addition",
                    subject: "Mathematics",
                    level: "Grade 2",
                    country: "ZA",
                    description: "This video is part of the Bambanani series which is aimed at illustrating how teachers are teaching inclusively in South African classrooms. It focusses on teaching the topic of Repeated Addition (Mathematics) in Grade 2.",
                    language: "en",
                    createDate: "2019-03-14",
                    views: 235,
                    downloads: 30,
                    //comments: 10,
                    teacher: {
                        name: "Bambanani"
                    },
                    thumbnail: "https://i.ytimg.com/vi/5ya2ip1-mfc/maxresdefault.jpg",
                    url: "https://www.youtube.com/watch?v=xXJer2AD5Xk"
                }
            ];

            listState.isLoading = false;

            listState.items.concat(items);

            for (i = 0; i < items.length; i++) {
                listState.elements.push(<ListElement key={items[parseInt(i)].id} video={items[parseInt(i)]} parentView={View}/>);
            }

            View.setState({
                list: listState
            });
        }, 3000);
    },

    addVideo(e){
        var View;

        View = this;

        View.props.router.push("/add-video");
    },

    logout(e){
        var View;

        View = this;

        window.localStorage.removeItem(AppEnv.namespace+"_user_id");
        window.localStorage.removeItem(AppEnv.namespace+"_user_token");
        window.localStorage.removeItem(AppEnv.namespace+"_user_role");

        View.props.router.push("/");
    },

    render(){
        return (
            <Grid container className="c-videos-view">
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>AfriTeach</Typography>
                        <div style={{ position: "relative", backgroundColor: "rgba(255, 255, 255, 0.15)" }}>
                            <div style={{ height: "100%", position: "absolute", pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                style={{ width: "100%", color: "inherit", paddingLeft: "32px" }}
                                placeholder="Search..."
                            />
                        </div>
                        {!this.state.isConnected &&
                            <Button color="inherit" href="#/login">Login</Button>
                        }
                        {this.state.isConnected &&
                            <Button color="inherit" onClick={(e) => this.logout(e)}>Logout</Button>
                        }
                    </Toolbar>
                </AppBar>
				<Grid item xs={12}>
                    <List>
                        <Infinite
                            elementHeight={441+72}
                            useWindowAsScrollContainer={true}
                            infiniteLoadBeginEdgeOffset={this.state.list.infiniteLoadBeginEdgeOffset}
                            onInfiniteLoad={(e) => this.loadVideos(e)}
                            loadingSpinnerDelegate={
                                <CircularProgress
                                    size={0.5}
                                />
                            }
                            isInfiniteLoading={this.state.list.isLoading}
                        >
                            {this.state.list.elements}
                        </Infinite>
                    </List>
                    {this.state.isTeacher &&
                        <Fab size="medium" color="secondary" onClick={(e) => this.addVideo(e)} style={{ position: "fixed", bottom: 0, right: 0, margin: "16px"}}>
                            <AddIcon />
                        </Fab>
                    }
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

export default VideosView;

