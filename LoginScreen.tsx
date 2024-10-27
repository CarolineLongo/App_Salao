import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      setLoading(true);
      const storedPassword = await AsyncStorage.getItem(username);
      setLoading(false);

      if (storedPassword && storedPassword === password) {
        navigation.navigate('Home');
      } else {
        Alert.alert('Erro', 'Usuário ou senha inválidos');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro', 'Ocorreu um erro ao fazer login. Tente novamente.');
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Entrar" onPress={handleLogin} />
      )}
      <Button title="Cadastrar-se" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

export default LoginScreen;