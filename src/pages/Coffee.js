import React, { Component } from 'react';
import MapView, {Marker, PROVIDER_GOOGLE, Callout} from 'react-native-maps'
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image,
  Dimensions,
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
  
  export default class Coffee extends Component {
    constructor(props){
      super(props);
      this.state = {
        latitude:0,
        longitude:0,
        coffees:[
          {id:1, name:'Dualitas Cofee', desc:'Buffet Restaurant', rating:'4.4', latitude:-6.240667, longitude: 106.845248, image: require('../img/coffees/dualitas.jpg')},
          {id:2, name:'Starbuck Tebet', desc:'Restaurant', rating:'4.4', latitude:-6.241350, longitude: 106.841664, image: require('../img/coffees/starbucks.jpg')},
          {id:3, name:'Kamusuka Coffee', desc:'Middle Eastern Restaurant', rating:'4.4', latitude: -6.223729, longitude: 106.850764, image: require('../img/coffees/kamusuka.jpg')},
          {id:4, name:'The Coffee Bean', desc:'Middle Eastern Restaurant', rating:'4.4', latitude: -6.242789, longitude: 106.847708, image: require('../img/coffees/bean.jpg')},
          {id:5, name:'Journey Coffee', desc:'Restaurant', rating:'4.4', latitude: -6.223750, longitude: 106.852095,image: require('../img/coffees/journey.jpg')}

        ],
        markers:[]
      };
    }
  
    
    findCoordinates = () => {
      navigator.geolocation.getCurrentPosition(
        position => {
          const location = JSON.stringify(position);
          this.setState({ 
            latitude: position.coords.latitude, 
            longitude: position.coords.longitude 
          })
        },
        error => Alert.alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    };
  
    renderCarouselItem = ({item}) =>
      <View style={styles.cardContainer}>
        <Image style={styles.cardImage} source={item.image}/>
        <View>
          <Text style={styles.cardName}>{item.name}</Text>
          <Text style={styles.cardDesc}>{item.desc}</Text>
          <Text style={styles.cardRating}><Text style={{color:'white'}}>Rating: </Text>{item.rating}</Text>
        </View>
      </View>
  
    onCarouselItemChange = (index) => {
      let location = this.state.coffees[index];
  
      this._map.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02
      })
  
      this.state.markers[index].showCallout()
    }
  
    onMarkerPressed = (location, index) => {
      this._map.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02
      });
  
      this._carousel.snapToItem(index);
    }
  
    render() {
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor="black" />
          <MapView
            style={styles.map}
            ref={map => this._map = map}
            provider={PROVIDER_GOOGLE}
            customMapStyle={mapStyle}
            initialRegion={{ 
              latitude: -6.234930,
              longitude: 106.845035,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
          >

            {
              this.state.coffees.map((coffee, index) =>(
                <Marker
                  key={coffee.id}
                  ref={ref => this.state.markers[index] = ref}
                  onPress={() => this.onMarkerPressed(coffee, index)}
                  coordinate={{latitude: coffee.latitude, longitude: coffee.longitude}}
                  
                >
                  <Image
                    source={require('../icon/hejo.png')}
                    style={{width: 40, height: 40}}
                    resizeMode="contain" />
                </Marker>
              ))
            }
          </MapView>

          <View style={styles.topBar}>
            <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.goBack()}>
              <Image style={styles.backImg} source={require('../icon/back.png')} />
            </TouchableOpacity>
            <Text style={styles.topBarTitle}>Coffee</Text>
          </View>

          <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.state.coffees}
            renderItem={this.renderCarouselItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={325}
            containerCustomStyle={styles.carousel}
            onSnapToItem={(index) => this.onCarouselItemChange(index)}
          />

        </View>
      );
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
    carousel: {
      position:'absolute',
      top:70,
      marginTop:30,
    },
    cardContainer:{
      backgroundColor:'rgba(0,0,0,0.5)',
      height: 100,
      width: 325,
      borderRadius:15,
      flexDirection:'row',
    },
    cardImage:{
      height: 100,
      width: 100,
      left: 0,
      borderBottomLeftRadius:15,
      borderTopLeftRadius:15
    },
    cardName:{
      color: 'white',
      fontSize: 20,
      fontWeight:'bold',
      paddingLeft:15,
      paddingTop:10
    },
    cardDesc:{
      color: 'white',
      fontSize: 12,
      paddingLeft:15,
    },
    cardRating:{
      color: 'gold',
      fontSize: 12,
      paddingLeft:15,
      paddingTop:20
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
  });
  
  