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
  Dimensions,
  View,
  Linking,
  WebView
} from 'react-native';

var Icon = require('react-native-vector-icons/FontAwesome');
var Icon2 = require('react-native-vector-icons/Octicons');
var DrawerLayoutAndroid = require('DrawerLayoutAndroid')
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import FacebookTabBar from './FacebookTabBar';
var {height, width} = Dimensions.get('window');

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
                        <Icon.Button name="film" color="#2c3e50" backgroundColor="#F5FCFF" size ={30} marginLeft={10} onPress={() => this.props.navigator.popToTop()}> Accueil </Icon.Button>
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
            <View style={styles.tab}>
            <ScrollableTabView  renderTabBar={() => <FacebookTabBar />}>
                <ScrollView tabLabel="android-share-alt" style={styles.tabView}>
                        <Social/>
                </ScrollView>
                <ScrollView tabLabel="university" style={styles.tabView}>
                        <Info/>
                </ScrollView>
                <ScrollView tabLabel="ios-information" style={styles.tabView}>
                        <IReact/>
                </ScrollView>
            </ScrollableTabView>
            </View>
      );
  },
  
   _openDrawer:function() {    
        this.refs['drawer'].openDrawer();
    }, 
});

var Social = React.createClass({
      render: function()
      {
        return(
            <View style={styles.container}>
            <View style={styles.row}>
                <Icon.Button name="twitter" color="#2c3e50" backgroundColor="#dcf4ff" size ={30} onPress={() => Linking.openURL("https://twitter.com/Mayeul31")}> My Twitter (@Mayeul31) </Icon.Button>   
                <View style={styles.space} />
                <Icon.Button  name="github" color="#2c3e50" backgroundColor="#dcf4ff" size ={30} onPress={() => Linking.openURL("https://github.com/MayeuldP")}> My Github (/MayeuldP) </Icon.Button>   
                <View style={styles.space} />
                <Icon.Button  name="linkedin" color="#2c3e50" backgroundColor="#dcf4ff" size ={30} onPress={() => Linking.openURL("https://fr.linkedin.com/in/mayeul-du-pradel-99108a8a")}> My Linkedin</Icon.Button>   
                <View style={styles.space} />
                <Icon2.Button  name="broadcast" color="#2c3e50" backgroundColor="#dcf4ff" size ={30} onPress={() => Linking.openURL("http://mayeuldupradel.me/")}> My Website </Icon2.Button>   
                <View style={{height: StyleSheet.hairlineWidth, marginVertical: 30,}}/>
            </View>
            <View>
                <Text style={{textAlign: 'center', color:'#2c3e50'}}>Mayeul du Pradel - Mai 2016</Text>
            </View>
          </View>
        );   
      }
});

var Info = React.createClass({
      render: function()
      {
        return(
                <View style={styles.container}>
                    <Text>Hey :) My name is Mayeul du Pradel. I'm 20, and i'm an IT student in the
                          European Institute of Information Technology (EPITECH) in France. I'm a third year's 
                          student. I'm mainly learning programming, and have already studied C, C++, Java, Python,
                          C#, HTML/CSS, SQL... I'm currently trainee in a French software firm where I learn 
                          React-Native, a cross-platform's solution for mobile developpement. </Text>
                     <View style={styles.space} />
                     <View style={styles.info}>
                        <Icon.Button underlayColor="#F5FCFF" name="graduation-cap" color="#2c3e50" backgroundColor="#dcf4ff" 
                        size ={30} style={styles.share} onPress={() => Linking.openURL("http://www.epitech.eu/")}>Epitech</Icon.Button>
                        <View style={styles.space} />
                        <Icon.Button underlayColor="#F5FCFF" name ="code" color="#2c3e50" backgroundColor="#dcf4ff" 
                        size ={30} style={styles.share} onPress={() => Linking.openURL("https://facebook.github.io/react-native/")}>React-Native</Icon.Button>
                        <View style={styles.space} />
                     </View>
                        <Text style={{marginLeft:40}}>mail : mayeul.durieu-du-pradel@epitech.eu</Text>                     
                </View>
        );   
      }
});
var IReact = React.createClass({
      render: function()
      {
        return(
            //<View style={styles.tab}>
                 <Text style={{marginLeft:10, marginTop: width/2,  fontStyle: 'italic'}}>This app's was develop using React-Native. You will find on my github all component that I used
                                               , and the nodes_modules that I installed. And of course the complete code.</Text>                     
            //</View>
        );   
      }
});

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
    tab:{
        paddingTop: 60,
        flex:1,
        backgroundColor:"white",
        paddingLeft:10,
        paddingRight:10, 
    },
     space: {
            height: StyleSheet.hairlineWidth,
            marginVertical: 10,
          },
          blank: {
            height: StyleSheet.hairlineWidth,
            marginVertical: 12,
          },
        container: {
            flex:1,
            backgroundColor:'white',
            paddingTop: 20
		  },
        icon: {
            paddingTop:10,
            width: 15,
            height: 15,
        },
        row: {
              backgroundColor:'white',
              paddingLeft: 40,
          },
       bio: {
              paddingLeft: 20,
              paddingRight: 20
       },
       share:
        {
            justifyContent:'center',
        },
        info:{
             paddingLeft: 50,
             paddingRight: 50
        }
});

AppRegistry.registerComponent('Credits', () => Credits);
module.exports = Credits;