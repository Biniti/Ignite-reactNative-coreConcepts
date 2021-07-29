import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
} from 'react-native';

import {Button} from '../components/Button';
import {SkillCard} from '../components/SkillCard';

interface SkillData {
  id: string
  name: string
}


export default function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState <SkillData[]> ([]);
  const [greeting, setGreeting] = useState('');

  const data = {
    id: String(new Date().getTime()),
    name: newSkill,
  }

  const handleAddNewSkill = () => {
    setMySkills(oldState => [...oldState, data]);
    setNewSkill('')
  };

  const handleDeleteSKill = (id: string) =>{
      setMySkills(oldSkills => oldSkills.filter((oldSkill) =>{
          return oldSkill.id !== id
      }))
  }

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreeting('Good morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good night');
    }
  }, [greeting]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Vinicius</Text>

      <Text style={styles.greeting}>{greeting}</Text>

      <TextInput
        style={styles.input}
        placeholder='New skill'
        placeholderTextColor="#555555"
        value={newSkill !== '' ? newSkill : ''}
        onChangeText={setNewSkill}
      />

      <Button onPress={handleAddNewSkill} title="Add" activeOpacity={0.7}/>

      <Text style={[styles.title, {marginVertical: 20}]}>My Skills</Text>

      <FlatList
        data={mySkills}
        keyExtractor={skill => skill.id}
        renderItem={({item}) => <SkillCard skill={item.name} onPress={() => handleDeleteSKill(item.id)}/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#121E25',
    color: '#ffffff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },
  greeting: {
    color: '#ffffff',
  },
});
