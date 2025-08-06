import { StyleSheet, Text, View } from "react-native";
import {  SunIcon, CloudIcon, CloudRainIcon, CloudSnowIcon } from "phosphor-react-native";
import { BlurView } from "expo-blur";
 
function getweathericon(x){
    switch(x){
        case"Clear":return <SunIcon size={40} style={{...styles.text2}}/>
        case"Clouds":return <CloudIcon size={40} style={{...styles.text2}}/>
        case"Rain":return <CloudRainIcon size={40} style={{...styles.text2}}/>
        case"Snow":return <CloudSnowIcon size={40} style={{...styles.text2}}/>
    }
}
export default function Forecast({item}){
    const temp=item.main.temp
    const clouds=item.weather[0].main
    const time=item.dt_txt;
    const arr=time.split(' ')
    const reqdate=arr[0];
    const fltime=arr[1];
    const reqtime=fltime.slice(0,fltime.length-3)
   
    return(<View
    style={{
        borderRadius:15,
        
        
    }}>
        <BlurView
        style={{
            height:"100%",
            width:130,
            borderRadius:15,
            overflow:"hidden",
            gap:10,
            justifyContent:"center",
            alignItems:"center",
            marginRight:5,
            backgroundColor: 'rgba(221, 221, 221, 0.3)'
        }}
        >
      {/* <Text style={{...styles.Text}} >{reqdate}</Text> */}
      <Text style={{...styles.Text}}>{reqtime}</Text>
        {getweathericon(clouds)}
      <Text style={{...styles.Text}}>{temp}°C</Text>
      <Text style={{...styles.Text1}}>{clouds}</Text>
        </BlurView>
    </View>)
}
const styles=StyleSheet.create({
    Text:{
        fontSize:20,
        fontWeight:500,
        alignSelf:"center",
        color:"white"
    },
    Text1:{
        fontSize:20,
        fontWeight:500,
        alignSelf:"center",
        color:"white"
    },
    text2:{
        color:"white",
    }
})
