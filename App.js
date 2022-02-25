import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,TouchableOpacity,Image} from 'react-native';
import React,{useEffect,useState} from 'react'

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="Display" component={DisplayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


//Screen with the button to navigate to the image Screen
const HomeScreen = (props) =>{

  const [data,setData] = useState([]);
  const [loading,setLoading]=useState(true);
  const url = "https://dog.ceo/api/breeds/image/random";

  useEffect(()=>{
    fetch(url)
    .then((resp)=>{
      if(resp.status >= 200 && resp.status<=299){
        return resp.json();
      }
      else{
        setLoading(true);
      }
    })
    .then((response)=>{
      setData(response);
      setLoading(false);
    })
    .catch(()=>{
      console.log('There was an error caught while loading the API');
    })
  },[]);

  console.log(data)

  return(
    <View style={styles.containerHome}>
      <TouchableOpacity style={styles.button} onPress={()=>props.navigation.navigate('Display',{data})}>
        <Text>See API Images</Text>
      </TouchableOpacity>
    </View>
  )
}


//Screen displaying the Image
const DisplayScreen = (props) =>{
  console.log(props.route.params)
  return(
    <View style={styles.containerDisplay}>
      <Image source={{uri:props.route.params.data.message}} style={styles.Image}/>
    </View>
  )
}


//Styling for the screens
const styles = StyleSheet.create({
  containerHome: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerDisplay:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Image:{
    width:200,
    height:200
  },
  button:{
    backgroundColor:'#008080',
    padding:10,
    margin:10,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal:20,
  }
});
