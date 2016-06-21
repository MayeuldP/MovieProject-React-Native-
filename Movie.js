import React from "react";
import {
  AppRegistry,
  Image,
  Component,
  ListView,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
  AnimatedScrollView,
  StyleSheet,
  Text,
  Navigator,
  ToastAndroid,
  ControlPanel,
  ToolbarAndroid,
  InteractionManager,
  RecyclerViewBackedScrollView,
  View
} from "react-native";

var REQUEST_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/opening.json?apikey=7waqfqbprs7pajbz28mqf6vz'//'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
var REQUEST_URL2 = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?apikey=7waqfqbprs7pajbz28mqf6vz'//'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
var titre_film = "";
var check = 0;
var MovieSelected = require('./MovieSelected');
var Icon = require('react-native-vector-icons/Ionicons');
var Spinner = require('react-native-spinkit');
var ReactNative = require('react-native');


var Movie = ReactNative.createClass({
    
  getInitialState: function(props) {
    console.ignoredYellowBox = ['Warning: ReactNative.Component', 'Warning: ReactNative.createElement'];
    if (this.props.film)
        titre_film = this.props.film;
    return {
      dataSource: new ListView.DataSource({
		  rowHasChanged: (row1, row2) => row1 !== row2,}),
	  loaded: false,
      film: this.props.film,
      index: 0,
      type: 'Wave',
      size: 100,
      color: "#45619d",
      };
  },
   
    render: function()
    {
         if (!this.state.loaded) {
            return (<View style={styles.container}>
                <Spinner style={styles.spinner} size={this.state.size}
                type={this.state.type} color={this.state.color}/>
            </View>);
        }
        else
        return (
            <Navigator
                 renderScene={()=>this.renderScene(this)}
                configureScene={(route) => {
                                        transition = Navigator.SceneConfigs.HorizontalSwipeJump
                                        transition.gestures = null}}                 
                 film={this.props.film}
                 gestures= {false}
                 navigator={this.props.navigator}
                   navigationBar={
            <Navigator.NavigationBar style={{backgroundColor: '#246dd5'}}
                routeMapper={NavigationBarRouteMapper} />
                   }/>
           );
    },
    
    
renderScene: function(route, navigator)
{
  if (!this.state.loaded === false)
    return(
          <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderMovie}
                style={styles.listView}
                renderScrollComponent={props => <RecyclerViewBackedScrollView {...props}/>}/> 
    );
  else
    return (
            <View><Text>Loading...</Text></View>
    );
},
  
 _chargeMovie: function(movie)
    {
        this.props.navigator.push({id: 'MovieSelected',
                                   film: movie,
                                    });
    },
    
renderMovie: function(movie) {
    if (titre_film !== "")
    {
        if (titre_film.substr(0, 2).toLowerCase() === movie.title.substr(0, 2).toLowerCase())     
        {
            check = 1;
            return (
            <TouchableOpacity onPress={() => this._chargeMovie(movie)}
                                underlayColor='#dddddd'>
                <View style={styles.container}>
                    <Image
                        source={{uri: movie.posters.original}}
                        style={styles.thumbnail}/>
                
                    <View style={styles.rightContainer}>
                        <Text style={styles.title}>{(movie.title).length > 30 ? 
                            (((movie.title).substring(0,30-3)) + '...') : 
                            movie.title}</Text>
                        <Text style={styles.year}>{movie.year}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            );
        }
        else
            return null;
   }
   else
     return (
            <TouchableOpacity onPress={() => this._chargeMovie(movie)}>
                <View style={styles.container}>
                    <Image
                        source={{uri: movie.posters.thumbnail}}
                        style={styles.thumbnail}/>

                    <View style={styles.rightContainer}>
                        <Text style={styles.title}>{(movie.title).length > 30 ? 
                            (((movie.title).substring(0,30-3)) + '...') : 
                            movie.title}</Text>
                        <Text style={styles.year}>{movie.year}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            );   
    },
    
   
 componentDidMount: function() {
    this.fetchData();
    //this.fetchData2();
  },
  
   fetchData: function() {
        fetch(REQUEST_URL2)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
            loaded: true    
            });
        })
        .done();}, 
});

 var NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
        return (
        <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
            onPress={() => navigator.parentNavigator.replace({id :"SplashPage"})}>
                <Text style={{color: 'white', margin: 10, fontSize: 20, fontFamily:'Bariol' }}>
                <Image
                    style={styles.icon}
                    source={require('./img/arrows.png')}
                />
                        {'  Home'}
                </Text>
        </TouchableOpacity>
        );
    },
    RightButton(route, navigator, index, navState) {
        return null;
    },
    Title(route, navigator, index, navState) {
        return (
        <View style={{justifyContent:'center', flex:1, marginLeft:65}}>
            <Text style={{color:'white', fontSize:20, fontFamily:'Bariol'}}>Box-Office</Text>
         </View>
        );
    }
};

var styles = StyleSheet.create({
		  container: {
			flex: 1,
		    flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#F5FCFF',
		  },
		  rightContainer: {
			flex: 1,
		  },
		  thumbnail: {
			width: 53,
			height: 81,
            borderRadius: 10,
		  },
		  title: {
			fontSize: 20,
			marginBottom: 8,
	        marginLeft: 20,
            fontFamily:'Bariol'
          },
		  year: {
			marginLeft: 20,
            fontFamily:'Bariol'
      	  },
		  listView: {
			  marginTop: 55,
			  backgroundColor: '#F5FCFF',
		  },
		  toolbar: {
			  height: 56,
			  backgroundColor: '#e9eaed',
		  },
           nestedText: {
            marginLeft: 12,
            marginTop: 20,
            backgroundColor: 'transparent',
            color: 'white',
            margin: 10
        },
        icon: {
            paddingTop:10,
            width: 15,
            height: 15,
        },
        comment: {
            height: 100
        },
          spinner: {
            marginBottom: 50
        },
		});

AppRegistry.registerComponent('Movie', () => Movie);
module.exports = Movie;
