import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../Firebase/firebaseConfig';

const FavouriteList = () => {
    const [favoriteCountries, setFavoriteCountries] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        fetchFavoriteCountriesData();
    }, []);

// Fetching data for favourites from the database 
    const fetchFavoriteCountriesData = async () => {
        const countries = await fetchFavoriteCountries();
        setFavoriteCountries(countries);
    };

    const fetchFavoriteCountries = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'favorites'));
            const favoriteCountries = querySnapshot.docs.map((doc) => doc.data());
            return favoriteCountries;
        } catch (error) {
            console.error('Error fetching favorite countries:', error);
        }finally {
            setIsFetching(false);
        }
    };

// UI for displaying the list of favourite countries 
    const renderCountryItem = ({ item }) => (
        <View style={styles.listContainer}>
            <View style={styles.countryListDetail}>
                <Text style={styles.countryName}>{item.name}</Text>
                <Text style={styles.capital}>Capital: {item.capital}</Text>
                <Text>Population: {item.population}</Text>
            </View>
            <Image source={{ uri: item.flag }} style={styles.flag} />
        </View>
    );

    return (
        <View style={styles.container}>
            {isFetching ? (
                <ActivityIndicator animating={true} size="large" />
            ) : favoriteCountries.length === 0 ? (
                <Text style={{ fontSize: 20, textAlign: 'center' }}>No favorite countries added yet.</Text>
            ) : (
                <FlatList
                    data={favoriteCountries}
                    renderItem={renderCountryItem}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        padding: 20,
    },   
    countryName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    capital: {
        fontSize: 16,
    },
    flag: {
        width: 100,
        height: 60,
    },
});

export default FavouriteList;