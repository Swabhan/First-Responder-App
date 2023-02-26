import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as Location from 'expo-location';
import { TextInput } from 'react-native-gesture-handler';

//Home
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Button
        title="User"
        onPress={() => navigation.navigate('User')}
        style={styles.button}
      />
    </View>
  );
}


//----------
//User
//----------
UserScreen = ({ navigation }) => {
  return (
      <View style={styles.container}>
        <Button title="Send Location To First Responders" onPress={getInfo} />
        <Button 
          title="Report Disaster"
          onPress={() => navigation.navigate('Report')}
        />

        <Button 
          title="Call Emergency Services"
          onPress={() => navigation.navigate('Call')}
        />

        <Button 
          title="Emergency Contacts"
          onPress={() => navigation.navigate('Contact')}
        />
      </View>

      
  );
}

const ReportScreen = ({ navigation }) => {
  return(
    <View style={styles.container}>
        <Text style={styles.title}>Report</Text>
    </View>
  );
      
}

CallScreen = () => {
  return (
      <View style={styles.container}>
      <Text style={styles.title}>Call Emergency Services</Text>

      <Button 
          title="Call"
          onPress={() => Linking.openURL(`tel:$5178998137`)}
    
        />
      
      </View>
  );
}

ContactScreen = () => {
  return (
      <View style={styles.container}>
      <Text style={styles.title}>Emergency Contacts</Text>
      </View>
  );
}


//----------
//Navigation
//----------
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="User" component={UserScreen}/>
        <Stack.Screen name="Report" component={ReportScreen}/>
        <Stack.Screen name="Call" component={CallScreen}/>
        <Stack.Screen name="Contact" component={ContactScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//-------------
//Geo-location
//-------------
getInfo = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.log('Permission to access location was denied');
    return;
  }

  //Position
  let location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;
  console.log('Location');
  console.log(latitude, longitude);

  //Time
  const date = new Date().getDate();
  const month = new Date().getMonth() +1;
  const hours = new Date().getHours(); //Current Hours
  const min = new Date().getMinutes(); //Current Minutes
  const sec = new Date().getSeconds(); //Current Seconds
  const time = hours + ':' +min + ':' + sec;
  console.log('Date');
  console.log(date)
  console.log('Month');
  console.log(month);
  console.log('Timestamp');
  console.log(time);
}

//-------------
//Stylesheet
//-------------
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'yellow',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;
