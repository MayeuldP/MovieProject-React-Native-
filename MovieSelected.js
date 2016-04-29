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
  WebView
} from 'react-native';
import Share from 'react-native-share';

var titre_film = "";
var Drawer = require('react-native-drawer');
var Icon = require('react-native-vector-icons/FontAwesome');
var DrawerLayoutAndroid = require('DrawerLayoutAndroid')




  var Cast = React.createClass({
  render: function() {
    if (!this.props.actors) {
      return null;
    }

    return (
      <View>
        <Text style={styles.castTitle}>Actors</Text>
        {this.props.actors.map(actor =>
          <Text key={actor.name} style={styles.castActor}>
            &bull; {actor.name}
          </Text>
        )}
      </View>
    );
  },
});


var MovieSelected = React.createClass({
   getInitialState: function(props) {
    return{
      titre_film: this.props.film,
      film: this.props.film,
      cast: this.props.cast,
      backColor: '#2c3e50',
      logo: "star-o",
      check: false,
       }
  },

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
                        <View style={styles.space} />
                        <Icon.Button name="film" color="#2c3e50" backgroundColor="#F5FCFF" size ={30} marginLeft={10} > Trouver une séance </Icon.Button>
                        <View style={styles.space} />
                        <Icon.Button underlayColor="#F5FCFF"  name={this.state.logo} color={this.state.backColor} backgroundColor="#F5FCFF" size={30}  marginLeft={10} onPress={() => this.stateChange()}>Ajouter aux favoris</Icon.Button>
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
                    film={this.props.film}
                    configureScene={(route) => {
                            transition = Navigator.SceneConfigs.HorizontalSwipeJump
                            transition.gestures = null}}
                    navigator={this.props.navigator}
                    initialRoute={{onRightButton: (() => this._openDrawer())}}
                    navigationBar={
                    <Navigator.NavigationBar style={{backgroundColor: '#246dd5'}}
                        routeMapper={NavigationBarRouteMapper} />
                        }
                        renderScene={() =>this.renderScene(this.props.film)}
                    />
            </DrawerLayoutAndroid>
          );
    },
    
    stateChange: function()
    {
        if (this.state.check === false)
                    this.setState({backColor: '#e74c3c', logo:'star', check:true});
        else
            this.setState({backColor: '#2c3e50', logo:'star-o', check:false});   
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
        var myButton = ( <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook}> Login with Facebook </Icon.Button> );
        return ( 
                <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.row}>
                        
                        <Image
                            source={{uri: movie.posters.thumbnail}}
                            style={styles.thumbnail}/>
                        
                        <View style={styles.container}>
                            <Text style={styles.title} numberOfLines={2}>{movie.title}</Text>
                            <Text style={{color: color, marginRight: 20, marginLeft: 20,}} numberOfLines={1}>Score: {movie.ratings.audience_score}%</Text>
                        <Text style={styles.critic} numberOfLines={1}>Année de sortie : {movie.year}</Text>
                        </View>
                    </View>
                    <View style={styles.separator} />
                
                <Text style={styles.title} numberOfLines={10} marginLeft={10}>Lorem ipsum dolor sit amet, consectetur 
                                    adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
                                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit </Text>
                        <View style={styles.separator} />
                        <Text style={styles.title}>Acteur(s): </Text>
                        <Text numberOfLines={1}> {movie.abridged_cast.map(actor =><Text key={actor.name}>&bull; {actor.name}</Text>)}</Text>
                        <View style={styles.separator} />
                        <Icon.Button name="share-alt" backgroundColor="#3b5998" style={styles.share} onPress={() => this.openFacebook(movie)}> Share this movie </Icon.Button>
                        <View style={styles.space} />
            </ScrollView>
     );},

     openFacebook: function(movie){
         var url =movie.links.alternate;
        Share.open({
            share_text: "Hola mundo",
            share_URL: url,
            title: "Share Link"
        },(e) => {
      console.log(e);});
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
		  container: {
            flex:1,
		  },
          title: {
            flex: 1,
			fontSize: 16,
            marginBottom: 2,
            justifyContent:'center',
           //fontFamily: 'Philosopher',
            marginLeft: 20,
            marginRight: 20,
		  },
          critic: {
          fontSize: 13,
          marginLeft: 20,
          marginRight: 20,
          justifyContent:'center'
		  },
           icon: {
            paddingTop:10,
            width: 15,
            height: 15,
        },
        thumbnail: {
			width: 83,
			height: 121,
            borderRadius: 10,
            marginRight: 10,
		  },
          row: {
              alignItems: 'center',
              backgroundColor:'white',
              flexDirection:'row',
              paddingTop: 80,
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
            padding: 10,
            backgroundColor:'white'
        },
         anchor: {
            width: 10,
            height: 10,
        },
        share:
        {
            justifyContent:'center',
        }
});
        
AppRegistry.registerComponent('MovieSelected', () => MovieSelected);
module.exports = MovieSelected;
