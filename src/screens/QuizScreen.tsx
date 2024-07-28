import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import questionsData from '../../assets/questions.json';

type QuizScreenNavigationProp = RouteProp<RootStackParamList, 'Quiz'>;

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getRandomQuestions = (questions: any[], number: number) => {
  const shuffled = shuffleArray([...questions]);
  return shuffled.slice(0, number);
};

const QuizScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<QuizScreenNavigationProp>();
  const { name } = route.params;

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

  useEffect(() => {
    const randomQuestions = getRandomQuestions(questionsData, 20);
    setQuestions(randomQuestions);
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      const shuffled = shuffleArray([...questions[currentQuestionIndex].answers]);
      setShuffledAnswers(shuffled);
    }
  }, [questions, currentQuestionIndex]);

  const handleAnswerPress = (answer: string) => {
    if (questions.length === 0) return;

    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    if (answer === correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigation.navigate('Result', { name, score });
    }
  };

  if (questions.length === 0) {
    return <Text>Loading questions...</Text>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{currentQuestion.question}</Text>
      {shuffledAnswers.map((answer, index) => (
        <TouchableOpacity
          key={index}
          style={styles.answerButton}
          onPress={() => handleAnswerPress(answer)}
        >
          <Text style={styles.answerText}>{answer}</Text>
        </TouchableOpacity>
      ))}
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
  question: {
    fontSize: 24,
    marginBottom: 20,
  },
  answerButton: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 14,
    width: '90%',
    borderWidth: 2,
    borderColor: '#e3e3e3',
  },
  answerText: {
    color: '#000',
    fontSize: 18,
  },
});

export default QuizScreen;
