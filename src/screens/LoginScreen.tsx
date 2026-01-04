import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const auth = useContext(AuthContext);
  const navigation = useNavigation<any>();

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Mike's VLab</Text>
      <Text style={styles.subtitle}>Sign in to your account</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => auth?.login(username, password)}
      >
        {auth?.isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title:{
    fontSize: 32,
    fontWeight: 'bold',
    color: '#15803d',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle:{
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  input:{
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button:{
    backgroundColor: '#00bf33',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText:{
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  link:{
    color: '#15803d',
    fontWeight: 'bold',
  },
});

export default LoginScreen;