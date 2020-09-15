import React from "react";
import createReactClass from "create-react-class";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Infinite from "react-infinite";

import $ from "jquery";
import moment from "moment";

import AppConfig from "../config";

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
		insights.push(video.comments + " comments");
		insights.push(video.downloads + " downloads");
		insights.push(moment(video.createDate).fromNow());

		return insights.join(" - ");
	},

    viewVideo(e, video){
        var view;

        view = this;

        view.props.parentView.props.router.push("#/videos/"+video.id);
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
						<Typography component="h2" variant="subtitle2">{this.props.video.teacher.name}</Typography>
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
            list: {
                isLoading: false,
                infiniteLoadBeginEdgeOffset: 200,
                nextUrl: null,
                items: [],
                elements: [],
            },
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
                    comments: 10,
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
                    comments: 10,
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

    render(){
        return (
			<Grid container className="c-videos-view">
                <AppBar position="static">
                    <Toolbar>
                        <Grid container>
                            <Grid item xs={7}>
                                <Typography variant="h6">AfriTeach</Typography>
                            </Grid>
                            <Grid item xs={5} style={{ position: "relative", backgroundColor: "rgba(255, 255, 255, 0.15)" }}>
                                <div style={{ height: "100%", position: "absolute", pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center",
                                }}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    style={{ width: "100%", color: "inherit", paddingLeft: "32px" }}
                                    placeholder="Search..."
                                />
                            </Grid>
                        </Grid>
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
				</Grid>
			</Grid>
		);
    }
});

export default VideosView;

