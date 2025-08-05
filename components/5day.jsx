import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SunIcon, CloudIcon, CloudRainIcon, CloudSnowIcon } from "phosphor-react-native";
import { BlurView } from "expo-blur";
 
function getweathericon(x){
    switch(x){
        case"Clear":return <SunIcon size={40} style={{marginTop:25}}/>
        case"Clouds":return <CloudIcon size={40} style={{marginTop:25}} />
        case"Rain":return <CloudRainIcon size={40} style={{marginTop:25}}/>
        case"Snow":return <CloudSnowIcon size={40} style={{marginTop:25}}/>
    }
}
export default function FiveDayForecast({item,index}){
    const temp=item.main.temp
    const clouds=item.weather[0].main
    const time=item.dt_txt;
    const arr=time.split(' ')
    const reqdate=arr[0];
    const fltime=arr[1];
    const reqtime=fltime.slice(0,fltime.length-3)
    const days=["Sunday","Monday","Tuesday","Wednesday","Thurday","Friday","Saturday"]
    const date=new Date(reqdate)
    const reqday= index === 0 ?"Today":days[date.getDay()]
    
    return(
    <View vertical={false} style={{
                borderRadius:20,
                overflow:"hidden"
           }} >
        <BlurView
        style={{
            height:100,
            width:"auto",
            borderRadius:20,
            gap:10,
            backgroundColor: 'rgba(221, 221, 221, 0.3)',
            flexDirection:"row",
            justifyContent:"space-between",
            paddingHorizontal:30
        }}
        >
            <Text style={{...styles.Text1}}>{reqday}</Text>
            {getweathericon(clouds)}
            <Text style={{...styles.Text1,}}>{temp}°C</Text>
        </BlurView>
    </View>)
}
const styles=StyleSheet.create({
    Text:{
        fontSize:21,
        fontWeight:500,
        alignSelf:"center",
        color:"white",
        fontWeight:900
    },
    Text1:{
        fontSize:21,
        fontWeight:500,
        alignSelf:"center",
        color:"white",
        fontWeight:700
    }
})
