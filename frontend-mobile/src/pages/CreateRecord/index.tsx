import React, { useEffect, useState } from 'react';

import { TextInput, StyleSheet, View, Text, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesome5 as Icon } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

import Header from '../../components/Header';
import PlatformCard from './PlatformCard';
import { GamePlatform, Game } from './types';

import api from '../../services/api';

const CreateRecord = () => {

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [platform, setPlatform] = useState<GamePlatform>();
  const [selectedGame, setSelectedGame] = useState('');
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);

  const mapSelectValues = (games: Game[]) => {
    return games.map(game => (
      {
        ...game,
        label: game.title,
        value: game.id,
      }
    ))
  }

  const handleChangePlatform = (selectedPlatform: GamePlatform) => {
    setPlatform(selectedPlatform);
    const gamesByPlatform = games.filter(
      game => game.platform === selectedPlatform
    );
    setFilteredGames(gamesByPlatform);
  }

  const handleSubmit = () => {
    api.post('/records', {
      name,
      age,
      gameId: selectedGame,
    }).then(response => {
      setName('');
      setAge('');
      setSelectedGame('');
      setPlatform(undefined);
    })
    .catch(err => {
      Alert.alert('Erro ao cadastrar os dados', err.message);
    })
  }

  useEffect(() => {
    api.get('/games')
      .then(response => {
        const selectValues = mapSelectValues(response.data);
        setGames(selectValues);
      })
      .catch(err => {
        Alert.alert('Erro ao listar os jogos', err.message);
      });

  }, [])

  return (
    <>
      <Header />
      <View style={styles.container}>
        <TextInput 
          placeholder="Nome"
          style={styles.inputText} 
          placeholderTextColor="#9E9E9E"
          onChangeText={text => setName(text)}
          value={name}
        /> 
        <TextInput 
          keyboardType="numeric"
          placeholder="Idade"
          style={styles.inputText} 
          placeholderTextColor="#9E9E9E"
          maxLength={3}
          onChangeText={text => setAge(text)}
          value={age}
        />
        <View style={styles.platformContainer}>
          <PlatformCard 
            platform="PC" 
            icon="laptop" 
            onChange={handleChangePlatform} 
            activePlatform={platform}
          />
          <PlatformCard 
            platform="XBOX"
            icon="xbox" 
            onChange={handleChangePlatform} 
            activePlatform={platform}
          />
          <PlatformCard 
            platform="PLAYSTATION"
            icon="playstation" 
            onChange={handleChangePlatform} 
            activePlatform={platform}
          />
        </View>
        <RNPickerSelect 
          placeholder={{ label: 'Selecione o Game', value: null }}
          items={filteredGames}
          onValueChange={(value) => {setSelectedGame(value)}}
          value={selectedGame}
          style={pickerStyles}
          useNativeAndroidPickerStyle={false}
          Icon={() => {
            return <Icon name="chevron-down" color="#9E9E9E" size={25} />
          }}
        />
        <View style={styles.footer}>
          <RectButton style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              SALVAR
            </Text>
          </RectButton>
        </View>
      </View>
     
    </>
  );
};

export default CreateRecord;

const pickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    color: '#ED7947',
    paddingRight: 30,
    fontFamily: "Play_700Bold",
    height: 50
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    color: '#ED7947',
    paddingRight: 30,
    fontFamily: "Play_700Bold",
    height: 50
  },
  placeholder: {
    color: '#9E9E9E',
    fontSize: 16,
    fontFamily: "Play_700Bold",
  },
  iconContainer: {
    top: 10,
    right: 12,
  }
});

const styles = StyleSheet.create({
  container: {
    marginTop: '15%',
    paddingRight: '5%',
    paddingLeft: '5%',
    paddingBottom: 50
  },
  inputText: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 10,
    color: '#ED7947',
    fontFamily: "Play_700Bold",
    fontSize: 16,
    paddingLeft: 20,
    marginBottom: 21
  },
  platformContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    marginTop: '15%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#00D4FF',
    flexDirection: 'row',
    borderRadius: 10,
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontFamily: "Play_700Bold",
    fontWeight: 'bold',
    fontSize: 18,
    color: '#0B1F34',
  },
})