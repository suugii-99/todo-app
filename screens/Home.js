import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  SafeAreaView
} from 'react-native';

export default function Home({ navigation }) {
  const [todos, setTodos] = useState([
    { id: '1', title: 'Städa', description: 'Städa beskrivning', done: false },
    { id: '2', title: 'Diska', description: 'Diska beskrivning', done: false },
    { id: '3', title: 'Handla', description: 'Köp mat', done: true },
  ]);

  const handleDone = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: true } : todo
    ));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const renderTodo = ({ item }) => (
    <TouchableOpacity
      style={[styles.todoCard, item.done && styles.doneCard]}
      onPress={() =>
        navigation.navigate('Detail', {
          todo: item,
          handleDone,
          handleDelete,
        })
      }
    >
      <Text style={[styles.todoText, item.done && styles.doneText]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Todos</Text>

      <FlatList
        data={todos.filter(todo => !todo.done)}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>Inga uppgifter kvar 🎉</Text>}
      />

      <Text style={styles.sectionTitle}>Genomfört</Text>

      <FlatList
        data={todos.filter(todo => todo.done)}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Add', { setTodos })}
      >
        <Text style={styles.addButtonText}>Lägg till</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    marginTop: 30,
    marginBottom: 10,
    fontWeight: '600',
  },
  todoCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  doneCard: {
    backgroundColor: '#d0f0c0',
  },
  todoText: {
    fontSize: 18,
  },
  doneText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  addButton: {
    marginTop: 30,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  empty: {
    color: '#aaa',
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 20,
  },
});
