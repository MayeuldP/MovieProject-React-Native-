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
  Dimensions,
  ToastAndroid,
  ControlPanel,
  ToolbarAndroid,
  InteractionManager,
  RecyclerViewBackedScrollView,
  View
} from "react-native";

var REQUEST_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json?apikey=7waqfqbprs7pajbz28mqf6vz';
var REQUEST_URL2 = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/opening.json?apikey=7waqfqbprs7pajbz28mqf6vz';
var titre_film = "";
var check = 0;
var MovieSelected = require('./MovieSelected');
var Icon = require('react-native-vector-icons/Ionicons');
var Spinner = require('react-native-spinkit');
var ReactNative = require('react-native');
var ItemCheckbox = require('react-native-item-checkbox');
var {height, width} = Dimensions.get('window');


var Upcomming = ReactNative.createClass({
    
  getInitialState: function(props) {
    console.ignoredYellowBox = ['Warning: ReactNative.Component', 'Warning: ReactNative.createElement'];
    if (this.props.film)
        titre_film = this.props.film;
    return {
      dataSource: new ListView.DataSource({
		  rowHasChanged: (row1, row2) => row1 !== row2,}),
      dataSource2: new ListView.DataSource({
		  rowHasChanged: (row1, row2) => row1 !== row2,}),
	  loaded: false,
      film: this.props.film,
      index: 0,
      type: 'Wave',
      size: 100,
      color: "#45619d",
      op : false,
      up : false,
      checked : false,
      icon : "circle-o",
      icon2: "circle-o",
      title: "Coming soon"
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
                 initialRoute={{title:this.state.title}}
                 navigator={this.props.navigator}
                   navigationBar={
            <Navigator.NavigationBar style={{backgroundColor: '#246dd5'}}
                routeMapper={NavigationBarRouteMapper} />
                   }/>
           );
    },
    
    
renderScene: function(route, navigator)
{
    var d = new Date();
    n = d.getMonth();
    var month = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    var actual_month = month[n+1];
    if (!this.state.loaded === false)
    {
        if (!this.state.checked === false)
            {
            if (this.state.icon === "check-circle-o")    
            {
                    return(
                        <ListView
                            dataSource={this.state.dataSource2}
                            renderRow={this.renderMovie}
                            style={styles.listView}
                            renderScrollComponent={props => <RecyclerViewBackedScrollView {...props}/>}/> 
                        );
            }
            else
            {
                    return (
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this.renderMovie}
                            style={styles.listView}
                            renderScrollComponent={props => <RecyclerViewBackedScrollView {...props}/>}/> 
                    );
                }
        }
    else
        return (
                <View
                    style={{backgroundColor :"#ecf0f1", flex:1}}>
                        <Image
                            style={{width:150, height:150, marginLeft: 100, marginTop: 90}}
                            source={require('./img/coming.png')}>
                        </Image>
                       <View style={styles.space}/>
                        <View
                            style={{marginLeft: 30, marginRight:30, marginTop:25}}>
                            <ItemCheckbox 
                                color="black"
                                checked={this.state.op}
                                onCheck={() => this.check_op()}
                                icon_open={this.state.icon}//"circle-o"
                                icon_check={this.state.icon}//"check-circle-o"
                                iconSize="normal" //"small", "normal", "large"
                                size={100}
                                text="Openning this week"
                                />
                            <View style={styles.space} />
                            <ItemCheckbox
                                color="black"
                                checked={this.state.up}
                                onCheck={() => this.check_up()}
                                icon_open={this.state.icon2}//"circle-o"
                                icon_check={this.state.icon2}//"check-circle-o"
                                iconSize="normal" //"small", "normal", "large"
                                size={100}
                                text={"Upcoming in " + actual_month}
                                />
                            <View style={styles.space}/>
                            <TouchableHighlight
                                style={styles.button}
                                underlayColor='#99d9f4'
                                onPress={() => this.setState({checked:true})}>
                                    <Text style={styles.buttonText}>Confirm</Text>
                            </TouchableHighlight>
                        </View>
                </View>
        );}
},

check_op: function()
{
    this.setState({op:true, up:false, icon: "check-circle-o", icon2:"circle-o"});
},

check_up: function()
{
    this.setState({up:true, op: false, icon: "circle-o", icon2:"check-circle-o"});
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
    this._fetchData();
  },
  
   fetchData: function() {
        fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
            loaded: true    
            });
        })
        .done();}, 
        
   _fetchData: function() {
        fetch(REQUEST_URL2)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
            dataSource2: this.state.dataSource2.cloneWithRows(responseData.movies),
            loaded: true    
            });
        })
        .done();} 
});

 var NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
        return (
        <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
            onPress={() => navigator.parentNavigator.replace({id : 'SplashPage'})}>
                <Text style={{color: 'white', margin: 10, fontSize: 18,fontFamily:'Bariol' }}>
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
               <Text style={{color:'white', fontSize:23, fontFamily:'Bariol'}}>{route.title}</Text>
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
           space: {
            height: StyleSheet.hairlineWidth,
            marginVertical: 15,
          },
          button: {
               height: 36,
               flex: 1,
               flexDirection: 'row',
               backgroundColor: '#48BBEC',
               borderColor: '#48BBEC',
               borderWidth: 1,
               borderRadius: 8,
               marginBottom: 10,
               alignSelf: 'stretch',
               alignItems:'center',
               justifyContent: 'center',
          },
          buttonText: {
              fontFamily:'Bariol',
              fontSize: 20,
          },
            
		  title: {
			fontSize: 20,
			marginBottom: 8,
	        marginLeft: 20,
            fontFamily :'Bariol'
          },
		  year: {
			marginLeft: 20,
            fontFamily:'Bariol'
      	  },
		  listView: {
			  marginTop: 50,
			  backgroundColor: '#F5FCFF',
		  },
		  toolbar: {
			  height: 56,
			  backgroundColor: '#e9eaed',
		  },
        icon: {
            width: 15,
            height: 15,
        },
        image:{
            width: 25,
            height: 25,         
        },
          spinner: {
            marginBottom: 50
        },
		});

AppRegistry.registerComponent('Upcomming', () => Upcomming);
module.exports = Upcomming;