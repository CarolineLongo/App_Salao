import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [appointment, setAppointment] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      const savedAppointment = await AsyncStorage.getItem('appointment');
      setAppointment(savedAppointment);
    };
    fetchAppointment();
  }, []);

  return (
    <View>
      <Text>Bem-vindo!</Text>
      <Text>{appointment ? `Seu próximo agendamento: ${appointment}` : 'Nenhum agendamento marcado'}</Text>
      <Button title="Agendar" onPress={() => navigation.navigate('Appointment')} />
    </View>
  );
};

export default HomeScreen;
