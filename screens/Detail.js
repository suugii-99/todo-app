import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function Detail({ route, navigation }) {
  const { todo, handleDone, handleDelete } = route.params;

  const confirmDelete = () => {
    Alert.alert('Radera uppgift', 'Är du säker?', [
      { text: 'Avbryt', style: 'cancel' },
      {
        text: 'Radera',
        style: 'destructive',
        onPress: () => {
          handleDelete(todo.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{todo.title}</Text>
      <Text style={styles.description}>{todo.description}</Text>

      {!todo.done && (
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => {
            handleDone(todo.id);
            navigation.goBack();
          }}
        >
          <Text style={styles.buttonText}>Klar</Text>
        </TouchableOpacity>
      )}

      <View style={styles.footer}>
        <Text style={styles.dateText}>Datum: {new Date().toLocaleDateString()}</Text>
        <TouchableOpacity onPress={confirmDelete}>
          <Text style={styles.delete}>🗑 Radera</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 18,
    color: '#444',
    marginBottom: 30,
  },
  doneButton: {
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#888',
  },
  delete: {
    fontSize: 16,
    color: '#ff4d4d',
  },
});
