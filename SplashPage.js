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
  ScrollView,
  TextInput,
  Vibration,
  View
} from 'react-native';

var ToolbarAndroid = require('ToolbarAndroid');
var Movie = require('./Movie');
var Icon = require('react-native-vector-icons/MaterialIcons');
var IconF = require('react-native-vector-icons/FontAwesome');


class SplashPage extends Component {
    
    constructor(props)
    {
      console.ignoredYellowBox = ['Warning: ReactNative.Component'];
      super(props);
      this.state = {
          searchString: "",
          language: "Java"
      };  
    }
    
     onSearchTextChanged(event) {
        this.setState({ searchString: event.nativeEvent.text });
    }
    
    render()
    {
        return (
            <Navigator
                renderScene={this.renderScene.bind(this)}
                navigator={this.props.navigator}
                navigationBar={
            <Navigator.NavigationBar style={{backgroundColor: '#246dd5'}}
                routeMapper={NavigationBarRouteMapper} />
          } />
        );
    }
    
    renderScene(route, navigator) {
        return (
            <ScrollView>
            <View>
                <Text numberOfLines={8} style={styles.lorem}>Bienvenue sur l'application ...Lorem ipsum dolor sit amet, consectetur 
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
                in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
                occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim 
                id est laborum</Text>
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
};

 var NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
        return null;
    },
    RightButton(route, navigator, index, navState) {
         return(
            <View style={{justifyContent: 'center',flex:1}}>
                <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
                    onPress={() =>navigator.parentNavigator.push({id: 'Movie'})}>
                    <Text style={{color: 'white', fontWeight:'bold'}}>
                      Movie >
                    </Text>
                </TouchableOpacity>
            </View>
         );
    },
    Title(route, navigator, index, navState) {
        return (
        <View style={{justifyContent:'center', flex:1, marginLeft:35}}>
            <Text style={{color:'white', fontSize:20}}>Movie-Heaven</Text>
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
                fontStyle: 'italic'
            },
           space: {
            height: StyleSheet.hairlineWidth,
            marginVertical: 7,
          },
          lorem: {
              marginTop: 80,
              marginLeft: 20,
              marginRight: 20,
              fontWeight: 'bold',
              fontStyle: 'italic',
          },
		});

AppRegistry.registerComponent('SplashPage', () => SplashPage);
module.exports = SplashPage;
