import React, {useEffect, useState, useContext} from 'react';
import {windowHeight} from '../utils/Dimensions';

import {View, Text, StyleSheet, FlatList, Image} from 'react-native';

import axios from 'axios';

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const query = 'Scenery';
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const client_id = 'ObsTJuxl3xF0RXnXuscuhJsmiRdHQBjM2HhUPfU2VSs';
  const fetchUrl = `https://api.unsplash.com/search/photos?page=${page}&per_page=10&client_id=${client_id}&query=${query}`;

  const fetchImages = () => {
    axios
      .get(fetchUrl)
      .then(response => {
        console.log('Data received:', response.data);
        setData([...data, ...response.data.results]);
      })
      .catch(error => {
        console.log(error);
        setHasMore(false);
      });
    setPage(page + 1);
  };
  const renderImages = ({item, index}) => {
    const {urls} = item;
    return (
      <View style={styles.cardContainer}>
        <Image
          key={index}
          style={styles.imageContainer}
          source={{uri: urls.small}}
        />
        <View style={styles.textBox}>
          <Text style={styles.text}>{item.alt_description}</Text>
        </View>
      </View>
    );
  };
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderImages}
          onEndReached={fetchImages}
        />
      </View>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0ffff',
  },
  cardContainer: {
    height: windowHeight / 2.5,
    backgroundColor: '#ffe4e1',
    borderRadius: 10,
    overflow: 'hidden',
    margin: 5,
  },
  textBox: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'AlexBrush-Regular',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  imageContainer: {
    height: windowHeight / 3.2,
  },
});
