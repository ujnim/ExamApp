import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type ResultScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Result'>;
type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;

const ResultScreen: React.FC = () => {
  const navigation = useNavigation<ResultScreenNavigationProp>();
  const route = useRoute<ResultScreenRouteProp>();
  const { name, score } = route.params;

  const handleGoToLeaderboard = async () => {
    try {
      const leaderboard = await AsyncStorage.getItem('leaderboard');
      const currentLeaderboard = leaderboard ? JSON.parse(leaderboard) : [];

      const existingEntryIndex = currentLeaderboard.findIndex((entry: { name: string }) => entry.name === name);

      if (existingEntryIndex !== -1) {
        currentLeaderboard[existingEntryIndex].score = score;
      } else {
        currentLeaderboard.push({ name, score });
      }

      const updatedLeaderboard = currentLeaderboard.sort((a : any, b : any ) => b.score - a.score);
      await AsyncStorage.setItem('leaderboard', JSON.stringify(updatedLeaderboard));
      
      navigation.reset({
        index: 0,
        routes: [{ name: 'Leaderboard' }],
      });
    } catch (error) {
      console.error('Error saving leaderboard data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>สรุปคะแนน</Text>
      <Text style={styles.scoreText}>ชื่อ: {name}</Text>
      <Text style={styles.scoreText}>คะแนน: {score}</Text>
      <Button title="ดูตารางคะแนน" onPress={handleGoToLeaderboard} />
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 24,
    marginBottom: 10,
  },
});

export default ResultScreen;
