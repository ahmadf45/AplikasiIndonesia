import React, {Component} from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, Image, StatusBar } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

export default class Places extends Component{
    constructor(props){
        super(props);
        this.state = {
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
                {id:10, name:'Dieng Plateau', image: require('../img/places/dieng.jpg'), latitude:-7.214850, longitude: 109.899389}
              ]
        };
      }
    render(){
      return(
        <View style={{backgroundColor:'black'}}>
            <StatusBar backgroundColor="black" />
            <View style={styles.topBar}>
                <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.goBack()}>
                    <Image style={styles.backImg} source={require('../icon/back.png')} />
                </TouchableOpacity>
                <Text style={styles.topBarTitle}>Featured Places</Text>
            </View>
            <FlatGrid
                itemDimension={130}
                data={this.state.places}
                style={styles.gridView}
                // staticDimension={300}
                // fixed
                spacing={10}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <ImageBackground source={item.image} style={styles.placeImg} imageStyle={{ borderRadius: 10 }}>
                            <TouchableOpacity 
                              style={styles.placeButton}
                              onPress={() => 
                                this.props.navigation.navigate('Location', {latitude:item.latitude, longitude:item.longitude})
                                }>
                                <Text style={{alignSelf:'center', color:'white', fontSize:15, paddingLeft:20, paddingRight:20}}>{item.name}</Text>
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                )}
            />
        </View>
      )
    }
}
const styles = StyleSheet.create({
  topBar:{
      height: 50,
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
    },
    gridView: {
      backgroundColor:'black',
      marginBottom:50
      },
      itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        
        height: 300,
      },
      itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
      },
      itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
      },
      placeImg:{
        width:180, 
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
