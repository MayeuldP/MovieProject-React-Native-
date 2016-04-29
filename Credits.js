import React, {
  AppRegistry,
  Component,
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
  Linking,
  WebView
} from 'react-native';

var Icon = require('react-native-vector-icons/FontAwesome');
var Icon2 = require('react-native-vector-icons/Octicons');
var DrawerLayoutAndroid = require('DrawerLayoutAndroid')


var Credits = React.createClass({
    
  render: function()
  {
         var navigationView = (
            <ScrollView backgroundColor="#F5FCFF">
                <View style={{height: 200, width: 300, backgroundColor: '#2c3e50'}}>
                 <View style={{flexDirection: 'row'}}>
                 <Text color="#e74c3c" style={{color:'#F5FCFF', marginTop: 80, marginLeft: 20, fontSize:20}}>Movie Project</Text>
                 <Image
                    source={require('./img/logo-flat.png')}
                    style={{width: 100, height: 100, marginTop: 40, marginLeft: 40}}
                    resizeMode ='stretch'>
                    </Image>
                    </View>
                    <View style={styles.space} />
                    <Text color="#e74c3c" style={{fontSize: 10, color:'#F5FCFF', marginTop: 20, marginLeft: 110}}>Movie Project ©Mayeul du Pradel - 2016</Text>
                </View>
                <View style={styles.space} />
                <View style={{flex: 1}}>
                        <Icon.Button name="chrome" color="#2c3e50" backgroundColor="#F5FCFF" size ={30} marginLeft={10} onPress={() => this.props.navigator.popToTop()}> Accueil </Icon.Button>
                        <View style={styles.separator} />
                        <View style={styles.blank} />
                        <Icon.Button name="hand-peace-o" color="#2c3e50" backgroundColor="#F5FCFF" size ={30} marginLeft={10} onPress={() => this.props.navigator.push({id : "Credits"})}> Crédits </Icon.Button>
                        <View style={styles.space} />
                        <Icon.Button name="share-alt" color="#2c3e50" backgroundColor="#F5FCFF" size ={30} marginLeft={10}> Partager </Icon.Button>
               </View>
            </ScrollView>
        );
        return(
            <DrawerLayoutAndroid
                drawerWidth={300}
                ref={'drawer'}
                navigator={Navigator.SceneConfigs.HorizontalSwipeJump}
                drawerPosition={DrawerLayoutAndroid.positions.Right}
                renderNavigationView={() => navigationView}>
                <Navigator
                   configureScene={(route) => {
                            transition = Navigator.SceneConfigs.HorizontalSwipeJump
                            transition.gestures = null}}
                    navigator={this.props.navigator}
                    initialRoute={{onRightButton: (() => this._openDrawer())}}
                    navigationBar={
                    <Navigator.NavigationBar style={{backgroundColor: '#246dd5'}}
                        routeMapper={NavigationBarRouteMapper} />
                        }
                        renderScene={() =>this.renderScene()}
                    />
            </DrawerLayoutAndroid>
          );  
  },
  
  renderScene: function()
  {
      return (
          <View style={styles.container}>
            <View style={styles.row}>
                <Icon.Button name="twitter" color="#2c3e50" backgroundColor="#dcf4ff" size ={30} onPress={() => Linking.openURL("https://twitter.com/Mayeul31")}> My Twitter (@Mayeul31) </Icon.Button>   
                <View style={styles.space} />
                <Icon.Button  name="github" color="#2c3e50" backgroundColor="#dcf4ff" size ={30} onPress={() => Linking.openURL("https://github.com/MayeuldP")}> My Github (/MayeuldP) </Icon.Button>   
                <View style={styles.space} />
                <Icon.Button  name="linkedin" color="#2c3e50" backgroundColor="#dcf4ff" size ={30} onPress={() => Linking.openURL("https://fr.linkedin.com/in/mayeul-du-pradel-99108a8a")}> My Linkedin</Icon.Button>   
                <View style={styles.space} />
                <Icon2.Button  name="broadcast" color="#2c3e50" backgroundColor="#dcf4ff" size ={30} onPress={() => Linking.openURL("http://mayeuldupradel.me/")}> My Website </Icon2.Button>   
                <View style={{height: StyleSheet.hairlineWidth, marginVertical: 50,}}/>
            </View>
            <View>
                <Text style={{textAlign: 'center', color:'#2c3e50'}}>Mayeul du Pradel - Mai 2016</Text>
            </View>
          </View>
      );
  },
  
   _openDrawer:function() {    
        this.refs['drawer'].openDrawer();
    },
    
    
})

var NavigationBarRouteMapper = {
        LeftButton(route, navigator, index, navState) {
            return (
            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
                onPress={() => navigator.parentNavigator.pop()}>
                    <Text style={{color: 'white', margin: 10, fontSize: 15,fontWeight: 'bold', }}>
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
            return(
                    <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
                    <Icon.Button name="bars" color="white" backgroundColor="#246dd5" onPress={route.onRightButton}/>
                    </TouchableOpacity>);
        },
        Title(route, navigator, index, navState) {
            return null;
        }
    };
    
var styles = StyleSheet.create({
     space: {
            height: StyleSheet.hairlineWidth,
            marginVertical: 15,
          },
          blank: {
            height: StyleSheet.hairlineWidth,
            marginVertical: 12,
          },
        container: {
            flex:1,
            backgroundColor:'white',
		  },
        icon: {
            paddingTop:10,
            width: 15,
            height: 15,
        },
        row: {
              //alignItems: 'center',
              backgroundColor:'white',
              paddingTop: 90,
              paddingLeft: 40,
          },
});

AppRegistry.registerComponent('Credits', () => Credits);
module.exports = Credits;