import { ScrollView, TouchableOpacity, Text, View, Modal, StyleSheet } from 'react-native';
import { GpsFixIcon,  MapPinIcon } from 'phosphor-react-native'
import { getCurrentPositionAsync, requestBackgroundPermissionsAsync, requestForegroundPermissionsAsync } from 'expo-location'
import { useEffect, useState } from 'react';
// import MapView ,{ MapMarker, Marker } from 'react-native-maps'
import { ImageBackground } from 'expo-image';
import { CloudIcon } from 'phosphor-react-native'
import Forecast from '../components/4cast';
import { BlurView } from 'expo-blur';
import FiveDayForecast from '../components/5day';
import MapView ,{Marker} from 'react-native-maps';

export default function HomePage() {
  const API_key = "29fc592d8c7ca006dc32b3d5e55ac2d0"
  const [weatherdata, setweatherdata] = useState(null)
  const [location, setlocation] = useState(null)
  const [currentmaplocaion, setcurrentmaplocation] = useState(null)
  const [forecastdata, setforecastdata] = useState(null)
  const [showmap, setshowmap] = useState(false)

  function getweatherdata(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`
    const forecasturl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`
    fetch(url).then(function (response) {
      response.json().then(function (data) {
        setweatherdata(data);
        
      })
    })
    fetch(forecasturl).then(function (response) {
      response.json().then(function (data) {
        setforecastdata(data)
      })
    });
  }
  useEffect(function(){
    getlocation();
  },[])
  function getlocation() {
    requestForegroundPermissionsAsync().then((Permission) => {
      if (Permission.status == "granted") {
        getCurrentPositionAsync().then((location) => {
          const currloc = {
            latitude: location?.coords.latitude,
            longitude: location?.coords.longitude
          }
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${currloc.latitude}&lon=${currloc.longitude}&appid=${API_key}&units=metric`
          const forecasturl = `https://api.openweathermap.org/data/2.5/forecast?lat=${currloc.latitude}&lon=${currloc.longitude}&appid=${API_key}&units=metric`
          fetch(url).then(function (response) {
            response.json().then(function (data) {
              setweatherdata(data);
            })
          })
          fetch(forecasturl).then(function (response) {
            response.json().then(function (data) {
              setforecastdata(data);
              
            })
          })
          setlocation(currloc)
        })
      } else {
      }
    })
  }
  function handlemappress(event) {
    const coordinates = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude
    }
    setcurrentmaplocation(coordinates)
  }
  function handleconfirm() {
    const lat = currentmaplocaion.latitude
    const lon = currentmaplocaion.longitude
    getweatherdata(lat, lon)
    setshowmap(false)
  }
  function closemap() {
    setshowmap(false)
  }
  function openmap() {
    setshowmap(true)
  }
  const temp = weatherdata?.main?.temp
  const FiveDay=forecastdata?.list?.filter(function (item,index){
    if(index%8==0) {
      return true
    } else {
      return false
    }
  })
  const todayforecast=forecastdata?.list?.filter(function (item,index){
    if(index<8) {
      return true
    } else {
      return false
    }
  })

  return (
    <ImageBackground source={require('../components/bg.jpeg')} style={{
      height: "100%",
      padding: 10
    }}>
      <ScrollView style={{ marginTop:50 ,marginBottom:20}}>
        <BlurView intensity={0}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <BlurView intensity={50}>
              <TouchableOpacity
                style={{
                  height: 40,
                  width: 200,
                  borderWidth: 1,
                  borderColor: "black",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
                onPress={getlocation}>
                <Text style={{ fontSize: 18, fontWeight: 600 }}>
                  Current location:
                </Text>
                <GpsFixIcon size={25} />
              </TouchableOpacity>
            </BlurView>
            <BlurView intensity={50}>
              <TouchableOpacity
                onPress={openmap}
                style={{
                  height: 40,
                  width: 200,
                  borderWidth: 1,
                  borderColor: "black",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}>
                <Text style={{ fontSize: 18, fontWeight: 600 }}>
                  Choose on map:
                </Text>
                <MapPinIcon size={22} />
              </TouchableOpacity>
            </BlurView>
          </View>

          <ScrollView>
            <Text style={{ ...styles.Text1 }}>{weatherdata?.name}</Text>
            <Text style={{ ...styles.Text2 }}>{temp}°C</Text>
            <Text style={{ ...styles.Text1 }}>
              <CloudIcon size={60} style={{ color: "white" }} />
            </Text>
            <Text style={{ ...styles.Text2 }}>Clouds</Text>
            <Text style={{ ...styles.Text5 }}>TODAY'S FORECAST</Text>
            <ScrollView horizontal={true} style={{ flexDirection: "row", height: 280 }}>
              {todayforecast?.map(function (item) {
                return <Forecast key={item.dt} item={item} />
              })}
            </ScrollView>

            <Text style={{ ...styles.Text5 }}>AIR CONDITIONS</Text>
            <ScrollView style={{ borderRadius: 20 }}>
              <BlurView style={{ flexDirection: "row" }}>
                <View style={{ padding: 10, alignItems: "center", width: "50%", marginBottom: 10 }}>
                  <View>
                    <Text style={{ ...styles.Text3 }}>Feels like</Text>
                    <Text style={{ ...styles.Text4 }}>{weatherdata?.main?.feels_like}</Text>
                    <Text style={{ ...styles.Text3 }}>Humidity</Text>
                    <Text style={{ ...styles.Text4 }}>{weatherdata?.main?.humidity}</Text>
                    <Text style={{ ...styles.Text3 }}>Ground level</Text>
                    <Text style={{ ...styles.Text4 }}>{weatherdata?.main?.grnd_level} hPa</Text>
                    <Text style={{ ...styles.Text3 }}>Visiblity</Text>
                    <Text style={{ ...styles.Text4 }}>{weatherdata?.visibility} Km</Text>
                  </View>
                </View>
                <View style={{ padding: 10, alignItems: "center", width: "50%", marginBottom: 10 }}>
                  <View>
                    <Text style={{ ...styles.Text3 }}>Pressure</Text>
                    <Text style={{ ...styles.Text4 }}>{weatherdata?.main?.pressure}</Text>
                    <Text style={{ ...styles.Text3 }}>Wind</Text>
                    <Text style={{ ...styles.Text4 }}>{weatherdata?.wind?.speed} m/sec</Text>
                    <Text style={{ ...styles.Text3 }}>Sea level</Text>
                    <Text style={{ ...styles.Text4 }}>{weatherdata?.main?.sea_level} hPa</Text>
                    <Text style={{ ...styles.Text3 }}>Description</Text>
                    <Text style={{ ...styles.Text6 }}>{weatherdata?.weather[0]?.description}</Text>
                  </View>
                </View>
              </BlurView>
            </ScrollView>

            <Text style={{ ...styles.Text5 }}>5-DAYS FORECAST</Text>
            <View style={{ gap:5 }}>
              {FiveDay?.map(function (item,index) {
                return <FiveDayForecast key={index} item={item} index={index}/>
              })}
            </View>
          </ScrollView>
        </BlurView>

        <View>
          <Modal visible={showmap} transparent={true}>
            <View style={{ margin: "auto", width: "95%", boxShadow: "0px 0px 20px 5px black" }}>
              <MapView style={{ height: 400 }} onPress={handlemappress} zoomEnabled={true}>
                {currentmaplocaion && <Marker coordinate={{
                  latitude: currentmaplocaion.latitude,
                  longitude: currentmaplocaion.longitude,
                }} />}
              </MapView>
              
              <TouchableOpacity
                style={{
                  height: 40,
                  backgroundColor: "skyblue",
                  borderWidth: 1,
                  borderColor: "black",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row"
                }} 
                onPress={handleconfirm}>
                <Text style={{ fontSize: 18, fontWeight: 600 }}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  Text1: { fontSize: 45, marginTop: 10, alignSelf: "center", color: "white", fontWeight: 700 },
  Text2: { fontSize: 35, marginTop: 10, alignSelf: "center", color: "white", fontWeight: 700 },
  Text3: { marginTop: 10, fontSize: 10, alignSelf: "center", color: "grey", fontWeight: 700 },
  Text4: { fontSize: 19, alignSelf: "center", color: "white", fontWeight: 700 },
  Text5: { marginTop: 20, fontSize: 17, color: "lightgrey", fontWeight: 800, marginBottom: 20 },
  Text6: { marginTop: 2, fontSize: 18, color: "lightgrey", fontWeight: 800, marginBottom: 20 }
})