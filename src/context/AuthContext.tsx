import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import api from '../config/api';
import { Alert } from 'react-native';

interface AuthContextType {
    isLoading: boolean;
    userToken: string | null;
    login: (username: string, password: string) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState<string | null>(null);
    const login = async (username: string, password: string) => {
        setIsLoading(true);
        try{
            const {data} = await api.post('/auth/sign-in', { username, password });
            setUserToken(data.token);
            await SecureStore.setItemAsync('access_token', data.token);
        } 
        catch (e: any){
            Alert.alert('Login Failed', e.response?.data || 'Something went wrong');
        } 
        finally{
            setIsLoading(false);
        }
    };
    const register = async (formData: any) => {
        setIsLoading(true);
        try{
            const {data} = await api.post('/auth/sign-up', formData);
            setUserToken(data.token);
            await SecureStore.setItemAsync('access_token', data.token);
        } 
        catch (e: any){
            Alert.alert('Registration Failed', e.response?.data || 'Something went wrong');
        } 
        finally{
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        setUserToken(null);
        await SecureStore.deleteItemAsync('access_token');
        setIsLoading(false);
    };

    const isLoggedIn = async () => {
        try{
            setIsLoading(true);
            let userToken = await SecureStore.getItemAsync('access_token');
            setUserToken(userToken);
            setIsLoading(false);
        } 
        catch (e){
            console.log(`isLogged in error ${e}`);
        }
    };
    useEffect(() => {isLoggedIn();}, []);
    return (
        <AuthContext.Provider value={{ login, logout, register, isLoading, userToken }}>
            {children}
        </AuthContext.Provider>
    );
};