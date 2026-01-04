import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import Pendulum from '../components/Pendulum';
import api from '../config/api';

const GRAVITY = 9.81;
const LAB_NAME = "physics";
const PhysicsScreen = () => {
  const [length, setLength] = useState(0.5);
  const [period, setPeriod] = useState(0);
  const [isOpened, setIsOpened] = useState(false);
  useEffect(() => {
    if(length > 0){
      const T = 2*Math.PI*Math.sqrt(length/GRAVITY);
      setPeriod(T);
    }
  }, [length]);
  useEffect(() => {
    const fetchStatus = async () => {
      try{
        const {data} = await api.get(`/checker/${LAB_NAME}`);
        setIsOpened(data.status);
      } 
      catch (error){
        console.log("Error fetching status", error);
      }
    };
    fetchStatus();
  }, []);
  const handleToggleStatus = async () => {
    try{
      const {data} = await api.post(`/checker/${LAB_NAME}`);
      setIsOpened(data.status);
    } 
    catch(error){
      Alert.alert("Error", "Could not update status");
    }
  };

  return(
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>The Pendulum</Text>
        <TouchableOpacity 
          onPress={handleToggleStatus}
          style={[styles.checkbox, isOpened && styles.checkboxChecked]}
        >
          {isOpened && <Ionicons name="checkmark" size={18} color="white" />}
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>String Length: {length.toFixed(2)} m</Text>
        <Slider
          style={{width: '100%', height: 40}}
          minimumValue={0.1}
          maximumValue={1.0}
          step={0.01}
          value={length}
          onValueChange={setLength}
          minimumTrackTintColor="#00bf33"
          maximumTrackTintColor="#000000"
          thumbTintColor="#00bf33"
        />
        <Text style={styles.formula}>T = 2π * √(L / g)</Text>
        <Text style={styles.result}>
          Period: <Text style={styles.resultValue}>{period.toFixed(2)} s</Text>
        </Text>
      </View>
      <View style={styles.simulationArea}>
        <Pendulum length={length} period={period} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container:{
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title:{
    fontSize: 28,
    fontWeight: 'bold',
    color: '#15803d',
  },
  checkbox:{
    width: 32,
    height: 32,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#9ca3af',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e5e7eb',
  },
  checkboxChecked:{
    backgroundColor: '#16a34a',
    borderColor: '#16a34a',
  },
  card:{
    padding: 20,
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 20,
    elevation: 2,
  },
  label:{
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  formula:{
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#4b5563',
    marginTop: 10,
  },
  result:{
    fontSize: 20,
    textAlign: 'center',
    marginTop: 5,
  },
  resultValue:{
    color: '#15803d',
    fontWeight: 'bold',
  },
  simulationArea:{
    height: 400,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
});

export default PhysicsScreen;
