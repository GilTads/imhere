import React, { useState } from 'react'
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Participant } from '../../components/Participant';
import { styles } from './styles';

export function Home () {

  // O useState entrega um array contendo duas informações,
  // 1º - o estado; 2º uma função que atualiza o estado ;
  const [participants, setParticipants] = useState<string[]>([]); // Estado que controla a lista
  const [participantName, setParticipantName] = useState(''); // Estado que controla o input text



  function handleParticipantAdd () {

    if (participants.includes(participantName)) {
      return Alert.alert("Participante já existe", "Já existe um participante na lista com esse nome" )
    }

    // Conceito de imutabilidade
    // prevState = pega o valor atual do array e adiciona o novo valor a ele através da desestruturação
    setParticipants(prevState => [...prevState, participantName]); 
    setParticipantName('');
    
  }

  function handleParticipantRemove (name: string) {

    Alert.alert("Remover",`Deseja remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])

    console.log(`Você clicou em remover o participante ${name}`);
    
  }


  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>SWU</Text>
      <Text style={styles.eventDate}>Sábado, 10 de dezembro de 2022</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setParticipantName} 
          value={participantName}
        />

        <TouchableOpacity style={styles.button} 
          onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant 
            key={item} 
            name={item} 
            onRemove={() => handleParticipantRemove(item)} 
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participaentes à sua lista de presença
          </Text>
        )}
      />

      
    </View>
  );
}