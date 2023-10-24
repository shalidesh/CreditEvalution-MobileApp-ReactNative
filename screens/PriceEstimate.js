import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {

    BACKEND_URL='https://credit-valuation-cdb-dac519ec1046.herokuapp.com/predict'


  const [yom, setYom] = useState('');
  const [mileage, setMileage] = useState('');
  const [stroke, setStroke] = useState('');
  const [lightType, setLightType] = useState('');
  const [label, setLabel] = useState('');

  const getResult = async () => {
    setLabel('Predicting...');
    
    // Initialize the JSON object
    const data = {
      yom: yom,
      mileage: parseInt(mileage, 10),
      stroke: stroke,
      light:lightType
    };
  
    // Make a POST request to your backend
    fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {

        console.log(data);
        setLabel(data['prediction']);
      // Handle the response data here
    })
    .catch(error => {
      console.log('Error:', error);
      setLabel('Failed to predicting.');
    });
  };
  

  const handleSubmit = () => {
    console.log(yom);
    console.log(mileage);
    console.log(stroke);
    console.log(lightType);
    // Handle form submission here
    getResult()
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>YOM</Text>
      <TextInput
        style={styles.input}
        onChangeText={setYom}
        value={yom}
        keyboardType="numeric"
        placeholder="Enter YOM"
      />
      <Text style={styles.label}>Mileage</Text>
      <TextInput
        style={styles.input}
        onChangeText={setMileage}
        value={mileage}
        placeholder="Enter Mileage"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Stroke</Text>
      <View style={styles.input}>
        <Picker selectedValue={stroke} onValueChange={(itemValue) => setStroke(itemValue)}>
          <Picker.Item label="Select Stroke" value="" />
          <Picker.Item label="2 stroke" value="2 stroke" />
          <Picker.Item label="4 stroke" value="4 stroke" />
        </Picker>
      </View>
      <Text style={styles.label}>Light Type</Text>
      <View style={styles.input}>
        <Picker selectedValue={lightType} onValueChange={(itemValue) => setLightType(itemValue)}>
          <Picker.Item label="Select Light Type" value="" />
          <Picker.Item label="Single Light" value="Single Light" />
          <Picker.Item label="Double Light" value="Double Light" />
        </Picker>
      </View>
      <Button title="Submit" onPress={handleSubmit} />

      <Text>{label}</Text>
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:60,
    
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 2,
  },
  
});
