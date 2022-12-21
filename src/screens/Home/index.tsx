import React, { useState } from 'react'
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Participant } from '../../components/Participant';
import { styles } from './styles';

export function Home () {

  // O useState entrega um array contendo duas informações,
  // 1º - o estado; 2º uma função que atualiza o estado ;
  const [participants, setParticipants] = useState(['Ali Alhjazihi']);




  function handleParticipantAdd (participant:string) {

    if (participants.includes("Gil Santos")) {
      return Alert.alert("Participante já existe", "Já existe um participante na lista com esse nome" )
    }

    // Conceito de imutabilidade
    setParticipants(prevState => [...prevState, 'Ana']); 
    
  }

  function handleParticipantRemove (participant: string) {

    Alert.alert("Remover",`Deseja remover o participante ${participant}?`, [
      {
        text: 'Sim',
        onPress: () => Alert.alert('Participante excluído!')
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])

    console.log(`Você clicou em remover o participante ${participant}`);
    
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
        />

        <TouchableOpacity style={styles.button} 
          onPress={() => handleParticipantAdd("Adicionou")}>
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