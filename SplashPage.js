"use strict";
import React, { Component } from 'react';
import  {
  AppRegistry,
  Image,
  ListView,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Text,
  Navigator,
  DrawerLayoutAndroid,
  ScrollView,
  TextInput,
  Vibration,
  View
} from 'react-native';
import Share from 'react-native-share';

var ToolbarAndroid = require('ToolbarAndroid');
var Movie = require('./Movie');
var Icon = require('react-native-vector-icons/FontAwesome');
const check_bo = false;

class SplashPage extends Component {
    
    constructor(props)
    {
      console.ignoredYellowBox = ['Warning: ReactNative.Component' , 'Warning: ReactNative.createElement'];
      super(props);
      this.state = {
          searchString: "",
          language: "Java",
          logo: "star-o",
          backColor: '#2c3e50'
      };  
    }
    
     onSearchTextChanged(event) {
        this.setState({ searchString: event.nativeEvent.text });
    }
    
    render()
    {
         var navigationView = (
            <ScrollView backgroundColor="#F5FCFF">
                <View style={{height: 200, width: 300, backgroundColor: '#2c3e50'}}>
                 <View style={{flexDirection: 'row'}}>
                 <Text style={{color:'#F5FCFF', marginTop: 70, marginLeft: 20, fontSize: 30, fontFamily:'Bariol'}}>MovieNow</Text>
                    <Image
                        source={require('./img/logo-flat.png')}
                        style={{width: 100, height: 100, marginTop: 40, marginLeft: 40}}
                        resizeMode ='stretch'>
                    </Image>
                   </View>
                    <View style={styles.space} />
                    <Text color="#e74c3c" style={{fontSize: 10, color:'#F5FCFF', marginTop: 20, marginLeft: 110, fontFamily : 'Bariol'}}>MovieNow ©Mayeul du Pradel - 2016</Text>
                </View>
                <View style={styles.space} />
                <View style={{flex: 1}}>
                        <Icon.Button underlayColor="#F5FCFF" name="film" color="#2c3e50" backgroundColor="#F5FCFF" size ={30} marginLeft={10}  onPress={() => this.load_BO()}><Text style={styles.drawer}>Box-Office</Text></Icon.Button>
                        <View style={styles.space} />
                        <Icon.Button underlayColor="#F5FCFF" name="search" color="#2c3e50" backgroundColor="#F5FCFF" size ={30} marginLeft={10} onPress={() => this.props.navigator.push({id : "Upcomming"})}><Text style={styles.drawer}>Upcoming Movies</Text></Icon.Button>
                        <View style={styles.space} />
                        <Icon.Button underlayColor="#F5FCFF"name="map-marker"color="#2c3e50"backgroundColor="#F5FCFF"size={30}marginLeft={10}onPress={()=>this.props.navigator.push({id : "Maps"})} /*onPress={() => this.stateChange()}*/><Text style={styles.drawer}>Where are you ?</Text></Icon.Button>
                        <View style={styles.space} />
                        <Icon.Button underlayColor="#F5FCFF" name="hand-peace-o" color="#2c3e50" backgroundColor="#F5FCFF" size ={30} marginLeft={10} onPress={() => this.props.navigator.push({id : "Credits"})}><Text style={styles.drawer}>Credits</Text></Icon.Button>
                        <View style={styles.separator} />
                        <Icon.Button underlayColor="#F5FCFF" name="share-alt" color="#2c3e50" backgroundColor="#F5FCFF" size ={30} marginLeft={10} onPress={() => this.shareApp()}><Text style={styles.drawer}> Share this app !</Text></Icon.Button>
               </View>
            </ScrollView>
        );
        return (
             <DrawerLayoutAndroid
                    drawerWidth={300}
                    ref={'drawer'}
                    navigator={Navigator.SceneConfigs.HorizontalSwipeJump}
                    drawerPosition={DrawerLayoutAndroid.positions.Left}
                    renderNavigationView={() => navigationView}>
                        <Navigator
                            /*configureScene={(route) => {
                                transition = Navigator.SceneConfigs.HorizontalSwipeJump
                                transition.gestures = null}}*/
                            navigator={this.props.navigator}
                            initialRoute={{onLeftButton: (() => this._openDrawer())}}
                            navigationBar={
                        <Navigator.NavigationBar style={{backgroundColor: '#246dd5'}}
                            routeMapper={NavigationBarRouteMapper}/>
                            }
                            renderScene={this.renderScene.bind(this)} />
                </DrawerLayoutAndroid>
        );
    }
     
     _openDrawer() {    
        this.refs['drawer'].openDrawer();
    }
    
     shareApp(){
         var url = "https://github.com/MayeuldP/MovieProject";
         Share.open({
             share_text: "Hola mundo",
             share_URL: url,
             title: "Share Link"},
             (e) => {console.log(e);});
     }
    
    renderScene(route, navigator) {
        return (
            <ScrollView>
            <View>
                <Text numberOfLines={9} style={styles.lorem}>
                Welcome on the MovieNow'app. On this app, you can basically look for actual
                movie currently in theater. You can also consult the upcoming'movies. For
                any movies, there is his rotten-tomatoes'score, his release years (normally
                actually), his synopsis, the castings, and a share button. 
                You will find on the credits all the informations about the author of this
                applications. Please if you like it, share it to your friends :) 
                </Text>
            </View>
            <View style={styles.flowRight}>
                <TextInput
                    style={styles.searchInput}
                    value={this.state.searchString}
                    onChange={this.onSearchTextChanged.bind(this)}
                    placeholder='Search a movie...'
                    placeholderTextColor='#246dd5'/>
                <TouchableHighlight
                    style={styles.button}
                    underlayColor='#99d9f4'
                    onPress={this.gotoNext.bind(this)}>
                        <Text style={styles.buttonText}>Go</Text>
                </TouchableHighlight>
             </View>
             <View style={styles.space} />
             <Image
                style={styles.icon}
                source={require('./img/rtlogo.png')}
            />
           </ScrollView>
        );
    }

    gotoNext() {
       Vibration.vibrate();
       this.props.navigator.push({
                                  title: "Test",
                                  id:'Movie',
                                  film: this.state.searchString,
                                });
    }
    
    load_BO()
    {
        if (check_bo === false)
        {
            this.props.navigator.push({id : "Movie"});
            check_bo = true;
        }
        else
        {
            this.props.navigator.replace({id : "Movie"});
        }
    }
};

 var NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
        return ( <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
                    <Icon.Button name="bars" color="white" backgroundColor="#246dd5" onPress={route.onLeftButton}/>
                    </TouchableOpacity>);
    },
    RightButton(route, navigator, index, navState) {
         return null;
    },
    Title(route, navigator, index, navState) {
        return (
        <View style={{justifyContent:'center', flex:1, marginLeft:55}}>
            <Text style={{color:'white', fontSize:20, fontFamily : 'Bariol'}}>Movie-Now</Text>
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
          icon: {
            marginLeft: 20,
            marginTop: 20,
            
          },
		  title: {
			fontSize: 20,
			marginBottom: 8,
			textAlign: 'center',
		  },
		  year: {
			textAlign: 'center',
		  },
		  listView: {
			  paddingTop: 20,
			  backgroundColor: '#F5FCFF',
		  },
		  toolbar: {
			  height: 56,
			  backgroundColor: '#e9eaed',
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
                fontSize: 18,
                color: 'white',
                alignSelf: 'center'
            },
            flowRight: {
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'stretch',
                justifyContent: 'center',
                paddingTop:50,
                paddingRight: 50,
                paddingLeft: 50
            },
            searchInput: {
                height: 36,
                padding: 4,
                marginRight: 5,
                flex: 4,
                fontSize: 18,
                borderWidth: 1,
                borderColor: '#48BBEC',
                borderRadius: 8,
                color: '#48BBEC',
                fontFamily:'Bariol'
                //fontStyle: 'italic'
            },
           space: {
            height: StyleSheet.hairlineWidth,
            marginVertical: 7,
          },
          lorem: {
              marginTop: 120,
              textAlign:'center',
              marginLeft: 10,
              marginRight: 10,
              fontFamily : 'Bariol',
              fontSize : 15
          },
           separator: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            height: StyleSheet.hairlineWidth,
            marginVertical: 10,
          },
          drawer: {
              fontFamily : 'Bariol',
              fontSize : 20, 
              color : '#2c3e50'
          },
		});

AppRegistry.registerComponent('SplashPage', () => SplashPage);
module.exports = SplashPage;
