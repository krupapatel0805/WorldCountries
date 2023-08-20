import React, { cloneElement } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from '../Firebase/firebaseConfig';

const CountryDetails = ({ route }) => {
    const { country } = route.params;

// Code for adding selected country to the favourites and adding it to database 
    const addToFavorites = async (country) => {
        try {
            const favoritesRef = collection(db, 'favorites');
            const q = query(favoritesRef, where('name', '==', country.name.common));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                await addDoc(favoritesRef, {
                    name: country.name.common,
                    capital: country.capital,
                    population: country.population,
                    area: country.area,
                    flag: country.flags.png,
                    latlng: country.latlng,
                });
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error adding country to favorites:', error);
            return false;
        }
    };

// Handling errors and succes message for button 
    const handleFavoriteButtonPress = async () => {
        const result = await addToFavorites(country);
        if (result === true) {
            alert('Country added to favorites!');
        } else if (result === false) {
            alert('Country is already in favorites.');
        } else {
            alert('Failed to add country to favorites.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.countryName}>{country.name.common}</Text>
            <Text style={styles.countryDetails}>Capital: {country.capital}</Text>
            <Text style={styles.countryDetails}>Population: {country.population}</Text>
            <Text style={styles.countryDetails}>Area: {country.area} sq km</Text>
            <Image source={{ uri: country.flags.png }} style={styles.flag} />
            {country.latlng && (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: country.latlng[0],
                        longitude: country.latlng[1],
                        latitudeDelta: 10,
                        longitudeDelta: 10,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: country.latlng[0], longitude: country.latlng[1] }}
                        title={country.capital}
                    />
                </MapView>
            )}
            <TouchableOpacity
                style={styles.button}
                onPress={handleFavoriteButtonPress}
            >
                <Text style={styles.buttonText}>Favorite this Country</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    countryName: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    countryDetails: {
        fontSize: 18,
        marginBottom: 10
    },
    flag: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginBottom:10,
        alignSelf: 'center'
    },
    map: {
        flex: 1,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default CountryDetails