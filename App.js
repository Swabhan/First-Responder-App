import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Button
        title="User"
        onPress={() => navigation.navigate('User')}
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

const styles = StyleSheet.create({
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
