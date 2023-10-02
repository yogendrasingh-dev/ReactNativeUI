import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import {Colors, Images, Fonts} from '@res';
import {Header, Button, Spinner} from '@component';

const CreateRequirements = props => {
  const [text, setText] = useState('');
  const [requirements, setRequirements] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    console.log(requirements);
  }, [text]);

  const handleAdd = () => {
    if (text) {
      if (editIndex !== -1) {
        // Edit existing requirement
        const updatedRequirements = [...requirements];
        updatedRequirements[editIndex] = text;
        setRequirements(updatedRequirements);
        setEditIndex(-1);
      } else {
        // Add new requirement
        setRequirements([...requirements, text]);
      }
      setText('');
    }
  };

  const handleEdit = index => {
    const requirementToEdit = requirements[index];
    setText(requirementToEdit);
    setEditIndex(index);
  };

  const handleDelete = index => {
    const updatedRequirements = [...requirements];
    updatedRequirements.splice(index, 1);
    setRequirements(updatedRequirements);
  };

  const renderItem = ({item, index}) => (
    <View style={styles.task}>
      <Text style={styles.itemList}>{item}</Text>
      <View style={styles.taskButtons}>
        <TouchableOpacity onPress={() => handleEdit(index)}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(index)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1, width: '100%'}}>
      <Header title={'Create Vacancies'} />
      <Text style={{marginLeft: 30, marginVertical: 10}}>Requirements</Text>
      <ScrollView style={{flex: 1, width: '90%', alignSelf: 'center'}}>
        <TextInput
          placeholder="Add your requirements here..."
          style={{
            height: 44,
            borderWidth: 1,
            width: '100%',
            borderColor: 'black',
            borderRadius: 100,
            paddingHorizontal: 24,
            alignItems: 'center',
            shadowRadius: 0,
            shadowOpacity: 0,
            elevation: 0,
          }}
          value={text}
          onChangeText={text => setText(text)}
        />
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <TouchableOpacity
            style={{
              minHeight: 35,
              width: '45%',
              backgroundColor: 'white',
              borderWidth: 2,
              borderColor: Colors.primary,
              marginVertical: 6,
              borderRadius: 32,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handleAdd}>
            <Text>{editIndex !== -1 ? 'Update' : 'Add'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              minHeight: 35,
              width: '45%',
              backgroundColor: 'white',
              borderWidth: 2,
              borderColor: Colors.primary,
              marginVertical: 6,
              borderRadius: 32,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Upload</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={requirements}
          scrollEnabled={false}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
      <Button
        text="Post Job Vacancy"
        // disabled={!isFormValid}
        container={{
          marginTop: 20,
          marginBottom: 20,
          width: '90%',
          alignSelf: 'center',
        }}
      />
    </SafeAreaView>
  );
};

export default CreateRequirements;

const styles = StyleSheet.create({
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    fontSize: 18,
  },
  itemList: {
    fontSize: 19,
  },
  taskButtons: {
    flexDirection: 'row',
  },
  editButton: {
    marginRight: 10,
    color: 'green',
    fontWeight: 'bold',
    fontSize: 18,
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
