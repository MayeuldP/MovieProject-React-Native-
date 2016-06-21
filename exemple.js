"use strict";
import React, { Component } from 'react';
import  {
  AppRegistry,
  Image,
  /*****/
  ListView,
  View
} from 'react-native';

var OtherClass = require('./OtherClass');
var Icon = require('react-native-vector-icons/FontAwesome');

class Exemple extends Component {

    constructor(props)
        {
        super(props);
        this.state = {
                string : "toto",
                integer : 0,
                bool : false,
        };  
        }
        
    render()
    {
        return(
            <View>
                <Text style={styles.text}>Hello World !</Text>
                <Image
                      source={{uri: movie.posters.thumbnail}}
                      style={styles.thumbnail}
                      onPress={() => this._changeString()}/>
            </View>
        );
    }
    
    _changeString()
    {
        this.state.string = "titi";
    }
}

    
var styles = StyleSheet.create({
    text: {
            fontSize: 20,
			marginBottom: 8,
	        marginLeft: 20,
            fontFamily:'Bariol'
          },
     thumbnail: {
         	width: 53,
			height: 81,
            borderRadius: 10,
     }
});

AppRegistry.registerComponent('Exemple', () => Exemple);
module.exports = Exemple;