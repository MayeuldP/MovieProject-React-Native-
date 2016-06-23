import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  controlPanel,
  drawerStyles,
  Text,
  Navigator,
  ScrollView,
  View,
  Dimensions,
  WebView
} from 'react-native';
import Share from 'react-native-share';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import FacebookTabBar from './FacebookTabBar';

var titre_film = "";
var Icon = require('react-native-vector-icons/FontAwesome');
var DrawerLayoutAndroid = require('DrawerLayoutAndroid')
var WINDOW_WIDTH = Dimensions.get('window').width;
var Lightbox = require('react-native-lightbox');
const  check_upcoming = false;
var POSTER = 'http://www.omdbapi.com/?t=';
var POSTER2 = '&y=&plot=short&r=json';
var poster = "";


var MovieSelected = React.createClass({
   getInitialState: function(props) {
    return{
      titre_film: this.props.film,
      film: this.props.film,
      cast: this.props.cast,
      backColor: '#2c3e50',
      source : "",
      logo: "star-o",
      check: false,
      posters:'',
       }
  },
  
    render: function()
    {
        return(
                <Navigator
                    film={this.props.film}
                    navigator={this.props.navigator}
                    //initialRoute={{onRightButton: (() => this._openDrawer())}}
                    navigationBar={
                    <Navigator.NavigationBar style={{backgroundColor: '#246dd5'}}
                        routeMapper={NavigationBarRouteMapper} />
                        }
                        renderScene={() =>this.renderScene(this.props.film)}
                    />
          );
    },
    
   componentDidMount: function(movie) {
        this.fetchPoster(this.state.film);
  },
  
    check_upcoming: function()
    {
       switch (check_upcoming)
       {
           case false:
              this.props.navigator.push({id : 'Upcomming'});
              check_upcoming = true;
              break;
           case true:
              this.props.navigator.replace({id : 'Upcomming'});
              break;
       }
    },
    
        fetchPoster: function(movie)
        {
            fetch(POSTER+movie.title+POSTER2)
                .then((response) => response.json())
                .then((responseData) => {
                       poster = responseData.Poster;
                        this.setState({check : true});
                })
                .done();      
        }, 
    
     _openDrawer:function() {    
        this.refs['drawer'].openDrawer();
    },
  
    renderScene: function(movie)
    {
        var color = `rgb(
           ${Math.round(255-(movie.ratings.audience_score/100)*255)},
           ${Math.round((movie.ratings.audience_score/100)*255)},
           0 
        )`;
        if (this.state.check === true)
        return ( 
                <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.row}>
                            <Image
                                    source={{uri: poster}}//movie.posters.thumbnail}}
                                    style={styles.thumbnail}
                                    resizeMode ='stretch'/>
                        <View style={styles.container}>
                            <Text style={styles.title} numberOfLines={2}>{movie.title}</Text>
                            <Text style={{color: color, marginRight: 20, marginLeft: 20,}} numberOfLines={1}>Score: {movie.ratings.audience_score}%</Text>
                        <Text style={styles.critic} numberOfLines={1}>Releases Dates : {movie.release_dates.theater}</Text>
                        </View>
                    </View>
                    <View style={styles.separator} />
                               <ScrollView>
                                    <Text style={styles.synopsis} marginLeft={10}>{movie.synopsis}</Text>
                               </ScrollView>

                        <View style={styles.separator} />
                        <Text style={styles.synopsis}>Acteur(s): </Text>
                        <Text numberOfLines={1}> {movie.abridged_cast.map(actor =><Text key={actor.name} style={{fontFamily:'Bariol'}}>&bull; {actor.name}</Text>)}</Text>
                        <View style={styles.separator} />
                        <Icon.Button name="share-alt" backgroundColor="#3b5998" style={styles.share} onPress={() => this.openFacebook(movie)}><Text style={{fontFamily:'Bariol', fontSize: 18, color: 'white'}}>Share this movie</Text></Icon.Button>
                        <View style={styles.space} />
                    </ScrollView>
            );},

     openFacebook: function(movie){

        Share.open({
            share_text: "Hola mundo",
            share_URL:  movie.links.alternate,
            title: "Share Link"
        },(e) => {
      console.log(e);});
     },
});

var NavigationBarRouteMapper = {
        LeftButton(route, navigator, index, navState) {
            return (
            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
                onPress={() => navigator.parentNavigator.pop()}>
                    <Text style={{color: 'white', margin: 10, fontSize: 18, fontFamily: 'Bariol'}}>
                    <Image
                        style={styles.icon}
                        source={require('./img/arrows.png')}
                    />
                            {'  Back'}
                    </Text>
            </TouchableOpacity>
            );
        },
        RightButton(route, navigator, index, navState) {
            return(null);
        },
        Title(route, navigator, index, navState) {
            return null;
        }
    };

var styles = StyleSheet.create({
		  container: {
            flex:1,
		  },
          title: {
			fontSize: 28,
            marginBottom: 2,
            justifyContent:'center',
            marginLeft: 20,
            marginRight: 20,
            fontFamily:'Bariol'
		  },
          synopsis:{
			fontSize: 18,
            marginBottom: 2,
            justifyContent:'center',
            marginLeft: 20,
            marginRight: 20,
            fontFamily:'Bariol'
          },
          critic: {
          fontSize: 15,
          marginLeft: 20,
          marginRight: 20,
          justifyContent:'center',
          fontFamily:'Bariol'
		  },
           icon: {
            paddingTop:10,
            width: 15,
            height: 15,
        },
        thumbnail: {
			width: 113,
			height: 151,
            borderRadius: 4,
            marginRight: 10,
         },
          row: {
              alignItems: 'center',
              backgroundColor:'white',
              flexDirection:'row',
              paddingTop: 60,
          },
         separator: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            height: StyleSheet.hairlineWidth,
            marginVertical: 10,
          },
           space: {
            height: StyleSheet.hairlineWidth,
            marginVertical: 7,
          },
          blank: {
            height: StyleSheet.hairlineWidth,
            marginVertical: 12,
          },
          contentContainer: {
            flex:1,            
            padding: 10,
            backgroundColor:'white'
        },
        share:
        {
            justifyContent:'center',
        },
          col: {
            flex: 1,
        },
        horizontalScrollView: {
            height: 10,
        },
});
        
AppRegistry.registerComponent('MovieSelected', () => MovieSelected);
module.exports = MovieSelected;
