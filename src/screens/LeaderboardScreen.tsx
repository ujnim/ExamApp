import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LeaderboardScreen: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<{ name: string; score: number }[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const leaderboardData = await AsyncStorage.getItem('leaderboard');
        if (leaderboardData) {
          setLeaderboard(JSON.parse(leaderboardData));
        }
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  const handleBackToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }] as any,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>กระดานผู้นำ</Text>
      <FlatList
        data={leaderboard}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.entry}>
            <Text style={styles.entryText}>{item.name}: {item.score}</Text>
          </View>
        )}
      />
      <Button title="กลับหน้าแรก" onPress={handleBackToHome} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  entry: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  entryText: {
    fontSize: 20,
  },
});

export default LeaderboardScreen;
