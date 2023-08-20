import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';


const WorldCountiresList = ({navigation}) => {
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    fetchCountriesData();
  }, []);

//   Navigating to the Country Details screen 
  const navigateToCountryDetails = (country) => {
    navigation.navigate('CountryDetails', { country });
  };
  
//   Fetching data for countries from API 
  const fetchCountriesData = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/independent?status=true');
      const data = await response.json();
      setCountriesData(data);
    } catch (error) {
      console.error(error);
    }
  };

// Displaying the list on screen and UI 
  const renderCountryItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToCountryDetails(item)}>
      <View style={styles.countryItem}>
        <Text style={styles.countryName}>{item.name.common}</Text>
        <Text style={styles.capital}>Capital: {item.capital}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={countriesData}
        renderItem={renderCountryItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  countryItem: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    padding: 10,
    paddingLeft: 10
  },
  countryName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  capital: {
    fontSize: 16,
  },
});

export default WorldCountiresList;