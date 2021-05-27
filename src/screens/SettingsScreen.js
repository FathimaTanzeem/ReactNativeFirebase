import React, {useEffect, useState, useContext} from 'react';
import {windowHeight} from '../utils/Dimensions';
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {View, Text, StyleSheet, Image, Alert} from 'react-native';

import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import FormInput from '../components/FormInput';

const SettingsScreen = () => {
  const {user} = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState('');
  const [userName, setName] = useState(
    userDetails ? userDetails.name : {userName},
  );
  const [userPlace, setPlace] = useState(
    userDetails ? userDetails.place : {userPlace},
  );

  const getUser = async () => {
    const userData = await firestore().collection('users').doc(user.uid).get();
    console.log(userData._data);
    setUserDetails(userData._data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/profile1.png')} style={styles.logo} />
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.iconStyle}>
            <AntDesign name="mail" size={25} color="#666" />
          </View>
          <Text style={styles.input}>{userDetails.email}</Text>
        </View>

        <FormInput
          labelValue={userDetails.username}
          onChangeText={userName => setName(userName)}
          placeholderText={userDetails.name}
          iconType="user"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <FormInput
          labelValue={userDetails.userplace}
          onChangeText={userPlace => setPlace(userPlace)}
          placeholderText={userDetails.place}
          iconType="check"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View style={styles.inputContainer}>
          <View style={styles.iconStyle}>
            <AntDesign name="heart" size={25} color="#666" />
          </View>
          <Text style={styles.input}>{userDetails.age}</Text>
        </View>

        <FormButton
          buttonTitle="Save Changes"
          onPress={() => {
            try {
              firestore()
                .collection('users')
                .doc(user.uid)
                .update({
                  name: userName,
                  place: userPlace,
                })
                .then(() => {
                  Alert.alert(
                    `User Details : ${userName} and ${userPlace} Updated successfully!`,
                  );
                  console.log(
                    'User updated!',
                    userDetails.name,
                    userDetails.place,
                  );
                });
            } catch (e) {
              Alert.alert('Please update the details!');
              console.log(e);
            }
          }}
        />
      </View>
    </View>
  );
};
export default SettingsScreen;

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
  logo: {
    height: 200,
    width: 200,
    resizeMode: 'cover',
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
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
  },
  imageContainer: {
    height: windowHeight / 3.2,
  },
});
