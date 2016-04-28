/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  Alert,
  Navigator,
  View
} from 'react-native';

//var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 25;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;
var SplashPage = require('./SplashPage');
var Movie = require('./Movie');
var MovieSelected = require('./MovieSelected');

class MovieProject extends Component {
  render() {
	return (
       <Navigator
            initialRoute={{
                id: 'SplashPage',
            }}
            //navigator={this.props.navigator}
            renderScene={this.renderScene.bind(this)}
            configureScene={(route) => {
                if (route.sceneConfig) {
                    return route.sceneConfig;
                }
              return Navigator.SceneConfigs.FadeAndroid;
            }}
        />
	);
  }
 
  renderScene(route, navigator)
  {
     var routeId = route.id;
     var routename = route.name;
      if (routeId === 'SplashPage')
      {
         return ( <SplashPage
                        navigator={navigator} />
          );
      }
      
      if (routeId === 'Movie')
      {
          return (<Movie
                        navigator={navigator}
                        film={route.film}/>
          );
      }
      
      if (routeId === 'MovieSelected')
      {
          return (<MovieSelected
                        navigator={navigator}
                        film={route.film}/>
          );
      }
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }
 
}

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
		});

AppRegistry.registerComponent('MovieProject', () => MovieProject);
