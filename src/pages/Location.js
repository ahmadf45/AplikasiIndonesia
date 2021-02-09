import React, { Component } from 'react';
import MapView, {Marker, PROVIDER_GOOGLE, Callout} from 'react-native-maps'
import {
  StyleSheet, TouchableOpacity, Image, Text,
  View,
  StatusBar
} from "react-native";
import Carousel from 'react-native-snap-carousel';

navigator.geolocation = require('@react-native-community/geolocation');

mapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#181818"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1b1b1b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8a8a8a"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#373737"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3c3c3c"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3d3d3d"
        }
      ]
    }
  ]

  

export default class Location extends Component{
    constructor(props){
        super(props);
        this.state = {
          latitude:this.props.route.params.latitude,
          longitude:this.props.route.params.longitude
        };
      }
    
    render(){
        return(
            <View style={styles.container}>
                <StatusBar backgroundColor="black" />
                <MapView
                    style={styles.map}
                    ref={map => this._map = map}
                    provider={PROVIDER_GOOGLE}
                    customMapStyle={mapStyle}
                    initialRegion={{ 
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5,
                    }}
                >
                    <Marker
                        coordinate={{latitude:this.state.latitude,longitude:this.state.longitude}}
                        /> 
                </MapView>
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.goBack()}>
                    <Image style={styles.backImg} source={require('../icon/back.png')} />
                    </TouchableOpacity>
                    <Text style={styles.topBarTitle}>Location</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject
      },
      map: {
        ...StyleSheet.absoluteFillObject
      },
      marker:{
        height:5,
        width:5
      },
      topBar:{
        position:'absolute',
        top:0,
        height: 70,
        width: '100%',
        backgroundColor:'black',
        flexDirection:'row',
        justifyContent:'space-between'
        
      },
      backButton:{
        marginTop:15,
        marginLeft:10,
        height:40,
        width:40,
        backgroundColor:'black',
        borderRadius:50,
        borderColor:'white',
      },
      backImg:{
        height:25,
        width:25,
        alignItems:'center',
        marginTop:6,
        marginLeft:5
      },
      topBarTitle:{
        color:'white',
        fontSize:25,
        alignSelf:'center',
        justifyContent:'center',
        paddingRight:20,
        fontWeight:'bold'
      }
})