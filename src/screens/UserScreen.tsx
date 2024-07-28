import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

type UserScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Name'>;

const UserScreen: React.FC = () => {
  const navigation = useNavigation<UserScreenNavigationProp>();
  const [name, setName] = useState('');

  const handleStartQuiz = () => {
    if (name.trim()) {
      navigation.navigate('Quiz', { name });
    } else {
      alert('กรุณากรอกชื่อ');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>กรอกชื่อผู้ทำคำถาม</Text>
      <TextInput
        style={styles.input}
        placeholder="ชื่อ"
        value={name}
        onChangeText={setName}
      />
      <View style={styles.buttonContainer}>
        <Button title="เริ่มทำคำถาม" onPress={handleStartQuiz} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '80%',
  },
  buttonContainer: {
    width: '80%',
  },
});

export default UserScreen;
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}

