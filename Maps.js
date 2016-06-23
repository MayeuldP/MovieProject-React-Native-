import  {PropTypes } from 'react';
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
  NativeModules,
  requireNativeComponent,
  Text,
  Linking,
  Navigator,
  ScrollView,
  View,
  Dimensions,
  ToastAndroid,
  WebView
} from "react-native";
import Share from 'react-native-share';
import MapView from 'react-native-maps';

var {FBLogin, FBLoginManager} = require('react-native-facebook-login');
/*const {
  GraphRequest,
  GraphRequestManager,
}*/
var Spinner = require('react-native-spinkit');
var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LONGITUDE_DELTA = 0.0922 * (width / height);
const LATITUDE_DELTA = 0.0922;

var id = 0;

class Maps extends Component {

  constructor(props) {
    super(props);
    this._user = null;
    this.state = {
      user: null,
       region: {
        latitude: 43.604461,
        longitude: 1.444031,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      loaded: false,
      type: 'Circle',
      color: "#45619d",
      mapType:"standard",
      size: 100,
    };
  }
  
  componentDidMount() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          //console.warn(position);
          var region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO,
          };
          this.setState({region});
        },
        (error) => console.log(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );

      this.watchID = navigator.geolocation.watchPosition((position) => {
        var region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO,
        };
        this.setState({region});
        this.setState({loaded: true});
        ToastAndroid.show('Geolocation done !', ToastAndroid.SHORT);
      });
  }
  
  render () {

      return(
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
                   }/>);
  }

  
  renderScene() {
    var _this = this;
    var latitude = 'undefined';
    var longitude = 'undefined';
    var markers = [
      {
        latitude: 43.6,
        longitude: 1.433333,
        title: 'Foo Place',
        subtitle: '1234 Foo Drive'
      }
    ];
    if (!this.state.loaded) {
            return (<View style={styles.loading}>
                <Spinner style={styles.spinner} size={this.state.size}
                type={this.state.type} color={this.state.color}/>
                <Text style={{fontStyle: 'italic'}}>Loading geo-localisation</Text>
            </View>);
        }
    else
      return (
         <View style={styles.container}>
            <MapView
              style={styles.map}
              region={this.state.region}
              annotations={markers}
              mapType={this.state.mapType}
            >
                <MapView.Marker
                    coordinate={this.state.region}
                    onSelect={(e) => console.log('onSelect', e)}
                    onDrag={(e) => console.log('onDrag', e)}
                    onDragStart={(e) => console.log('onDragStart', e)}
                    onDragEnd={(e) => console.log('onDragEnd', e)}
                    onPress={(e) => console.log('onPress', e)}
                    draggable
                 >
                  <MapView.Callout
                    style={styles.callout}
                    onPress={(e) => console.log("Callout::onPress", e.nativeEvent)}
                    >
                    <View>
                          <Text>Your position</Text>
                    </View>
                  </MapView.Callout>
              </MapView.Marker>
              <MapView.Circle
                center={{ latitude: 43.604461, longitude: 1.444031 }}
                radius={1500}
                fillColor="rgba(255,0,0,0.3)"
                strokeWidth={0.5}
              />
            </MapView>
            <TouchableOpacity onPress={() => this.changeMapType()} style={[styles.bubble, styles.button]}>
            <Text>MapType</Text>
          </TouchableOpacity>
         </View>
      );} 
      
      changeMapType()
      {
        switch (this.state.mapType)
        {
          case "standard":
              this.setState({mapType: "satellite"});
              break;
          case "satellite":
              this.setState({mapType: "standard"});
              break;            
        }
    }
  };

 var NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
        return (
        <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
            onPress={() => navigator.parentNavigator.pop()}>
                <Text style={{color: 'white', margin: 10, fontSize: 18,fontFamily:'Bariol'}}>
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
        return null;
    }
};

var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
   map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
   icon: {
            width: 15,
            height: 15,
        },
   loading:{
      flex: 1,
		  //flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#F5FCFF',
   },
    spinner: {
       marginBottom: 50
   },
    bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
   button: {
    width: 90,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
});

        
AppRegistry.registerComponent('Maps', () => Maps);
module.exports = Maps;