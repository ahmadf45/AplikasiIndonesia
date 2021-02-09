import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, StatusBar, Image, Dimensions, ImageBackground} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';

export default class HomeScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
          links:[
            {id:1, name:'Restaurant', event:'Restaurant' , color:'#0278ae', image: require('../icon/restaurant.png')},
            {id:2, name:'Coffee', event:'Coffee', color:'#03c59a', image: require('../icon/coffee.png')},
            {id:3, name:'Hotel', event:'Hotel', color:'#f9b5c6', image: require('../icon/hotel.png')},
            {id:4, name:'Shopping', event:'Shopping', color:'#9823ff', image: require('../icon/shopping.png')}
          ],
          places:[
            {id:1, name:'Raja Ampat', image: require('../img/places/rajaampat.jpg'), latitude:-0.229556, longitude:130.517009 },
            {id:2, name:'Pulau Komodo', image: require('../img/places/pulaukomodo.jpg'), latitude:-8.575628, longitude: 119.439663},
            {id:3, name:'Trio Gili', image: require('../img/places/gili.jpg'), latitude:-8.344705, longitude: 116.038650},
            {id:4, name:'Danau Sentani', image: require('../img/places/sentani.jpg'), latitude:-2.604863, longitude: 140.516287},
            {id:5, name:'Bali', image: require('../img/places/bali.jpg'), latitude:-8.264289, longitude: 115.087107},
            {id:6, name:'Laut Bunaken', image: require('../img/places/bunaken.jpg'), latitude:1.675543, longitude: 124.755642},
            {id:7, name:'Jayawijaya', image: require('../img/places/jayawijaya.jpg'), latitude:-4.077105, longitude: 137.184459},
            {id:8, name:'Candi Borobudur', image: require('../img/places/borobudur.jpg'), latitude:-7.607491, longitude: 110.203748},
            {id:9, name:'Anambas', image: require('../img/places/anambas.jpg'), latitude:3.117967, longitude: 105.653160},
            {id:10, name:'Dieng Plateau', image: require('../img/places/dieng.jpg'), latitude:-7.214850, longitude: 109.899389},
          ]
        };
      }

    
    renderCarouselItem=({item}) =>
        <TouchableOpacity
            style={{
                backgroundColor: item.color,
                height:160,
                width:100,
                borderRadius:50,
                marginTop:10,
                alignItems:'center'}}
            onPress={() => this.props.navigation.navigate(item.event)}
        >   
            <Image style={styles.cardImg} source={item.image}/>
            <Text style={styles.cardTitle}>{item.name}</Text>
        </TouchableOpacity>

    renderCarouselPlaces=({item}) =>
        <View style={styles.place}>
            <ImageBackground source={item.image} style={styles.placeImg} imageStyle={{ borderRadius: 10 }}>
                <TouchableOpacity style={styles.placeButton}>
                    <Text style={{alignSelf:'center', color:'white', fontSize:15, paddingLeft:20, paddingRight:20}}>{item.name}</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View>
                <StatusBar backgroundColor="black" />
                
                <View style={styles.topBar}>
                    <Text style={styles.topBarTitle}>Find my location</Text>
                    <TouchableOpacity 
                        style={styles.topBarButton}
                        onPress={() =>
                            this.props.navigation.navigate('MyLocation')
                        }>
                        <Image style={styles.topBarImg} source={require('../icon/marker.png')} />
                    </TouchableOpacity>
                    
                </View>
                
                <View style={styles.midBar}>
                    <Carousel
                        data={this.state.links}
                        renderItem={this.renderCarouselItem}
                        sliderWidth={Dimensions.get('window').width}
                        itemWidth={110}
                        itemHeight={160}
                        containerCustomStyle={styles.carousel}
                        activeSlideAlignment={'start'}
                    />
                    
                </View>

                <View style={styles.botBar}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{color:'white', fontSize:16}}>
                            Featured Places
                        </Text>
                        <TouchableOpacity 
                        style={styles.showAll}
                        onPress={() => this.props.navigation.navigate('Places')}
                        >
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Text style={{color:'#aeaeae', fontSize:15}}>
                                SHOW ALL
                            </Text>
                            <Image style={styles.backImg} source={require('../icon/go.png')} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* <Carousel
                        data={this.state.places}
                        renderItem={this.renderCarouselPlaces}
                        sliderWidth={Dimensions.get('window').width}
                        itemWidth={200}
                        itemHeight={300}
                        containerCustomStyle={styles.carouselPlaces}
                        activeSlideAlignment={'start'}/> */}
                    <View style={{flexDirection:'row'}}>
                        <ScrollView horizontal={true}>
                            {
                                this.state.places.map((place) => (
                                    <View style={styles.place} key={place.id}>
                                        <ImageBackground source={place.image} style={styles.placeImg} imageStyle={{ borderRadius: 10 }}>
                                            <TouchableOpacity 
                                                style={styles.placeButton} 
                                                onPress={() => 
                                                    this.props.navigation.navigate('Location', {latitude:place.latitude, longitude:place.longitude})
                                                    }
                                            >
                                                <Text style={{alignSelf:'center', color:'white', fontSize:15, paddingLeft:20, paddingRight:20}}>{place.name}</Text>
                                            </TouchableOpacity>
                                        </ImageBackground>
                                    </View>
                                ))
                            }
                        </ScrollView>
                    </View>
                </View>  
            </View>
        )
    }
}
const styles = StyleSheet.create({
   
    topBar:{
        height: '15%',
        width: '100%',
        backgroundColor:'black',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        paddingRight:10
      },
      topBarButton:{
        marginTop:5,
        marginLeft:5,
        height:40,
        width:40,
        backgroundColor:'black',
        borderRadius:50,

      },
      topBarImg:{
        height:25,
        width:25,
        alignItems:'center',
        marginTop:6,
        marginLeft:8
      },
      topBarTitle:{
        color:'white',
        fontSize:20,
        alignSelf:'center',
        justifyContent:'center',
        paddingLeft:20,
      },
      midBar:{
        height: '30%',
        backgroundColor:'black',
        alignItems:'center',
      },
      backImg:{
        alignItems:'center',
        marginTop:1,
        marginLeft:5,
        borderColor:'white'
      },
      carousel: {
        marginLeft:50,
      },
    card:{
        backgroundColor:'grey',
        height:160,
        width:100,
        borderRadius:50,
        marginTop:10,
        alignItems:'center',
        marginBottom:20
        },
    cardImg:{
        height:70,
        width:70,
        marginTop:15,
        marginBottom:15,
    },  
    cardTitle:{
        alignSelf:'center',
        color:'white',
        fontSize:15
    },
      botBar:{
        height: '55%',
        backgroundColor:'black',
        paddingLeft:25,

        paddingTop:20
      },
      showAll:{
          backgroundColor:'rgba(0,0,0,0)',
          height:27,
          width:110
      },
      place:{
          backgroundColor:'white',
          marginTop:20,
          borderRadius:10,
          justifyContent:'center',
          marginRight:30
      },
      placeImg:{
          width:200, 
          height:300, 
          
          
        },
    placeButton:{
        alignSelf:'center',
        position:'absolute',
        bottom:5,
        height:30,
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius:15,
        justifyContent:'center'
    }
})