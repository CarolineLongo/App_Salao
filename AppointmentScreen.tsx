import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

const AppointmentScreen: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleConfirm = async () => {
    const formattedDate = format(date, 'yyyy-MM-dd HH:mm');
    await AsyncStorage.setItem('appointment', formattedDate);
    Alert.alert('Sucesso', `Agendamento marcado para ${formattedDate}`);
  };

  return (
    <View>
      <Text>Escolha uma data e hora para o agendamento</Text>
      <Button title="Selecionar Data" onPress={() => setShowPicker(true)} />
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display="default"
          onChange={(_, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}
      <Button title="Confirmar Agendamento" onPress={handleConfirm} />
    </View>
  );
};

export default AppointmentScreen;