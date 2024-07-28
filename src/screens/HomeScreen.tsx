import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exam App</Text>
      <TouchableOpacity
        style={styles.startExam}
        onPress={() => navigation.navigate('Name')}>
        <Text style={styles.startText}>เริ่มการทดสอบ</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.Leaderboard}
        onPress={() => navigation.navigate('Leaderboard')}>
        <Text style={styles.LeaderboardText}>ดูตารางคะแนน</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  startExam: {
    width: '50%',
    backgroundColor: '#73BBA3',
    marginVertical: 10,
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
  },
  startText: {
    color: '#fff',
    fontSize: 18,
  },
  Leaderboard: {
    width: '50%',
    backgroundColor: '#eee',
    borderColor: '#aaa',
    borderWidth: 1,
    marginVertical: 10,
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
  },
  LeaderboardText: {
    fontSize: 18,
  },
});

export default HomeScreen;
