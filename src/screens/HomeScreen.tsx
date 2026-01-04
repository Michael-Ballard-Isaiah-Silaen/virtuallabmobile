import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const HomeScreen = () => {
  const auth = useContext(AuthContext);
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to VLab Mobile</Text>
      <Text style={styles.text}>
        This is the mobile companion for Mike's Virtual Lab. Navigate to the "Physics" tab to use the Pendulum simulation.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => auth?.logout()}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#15803d',
    marginBottom: 10,
  },
  text:{
    textAlign: 'center',
    color: '#4b5563',
    marginBottom: 20,
  },
  button:{
    backgroundColor: '#dc2626',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText:{
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;