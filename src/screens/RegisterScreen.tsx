import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const auth = useContext(AuthContext);
  const navigation = useNavigation();
  const handleRegister = () => {
    auth?.register({ username, password, displayName, role: 'student' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Display Name"
        value={displayName}
        onChangeText={setDisplayName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        {auth?.isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Create Account</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.footer}>
        <Text style={styles.link}>Back to Login</Text>
      </TouchableOpacity>
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
    marginTop: 20,
    alignItems: 'center',
  },
  link:{
    color: '#15803d',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;