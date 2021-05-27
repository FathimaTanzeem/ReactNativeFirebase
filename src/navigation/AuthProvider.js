import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
export const AuthContext = createContext({});
import {Alert} from 'react-native';
import {AddUserData} from '../api/UserData';

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [uid, setUid] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        uid,
        setUid,
        login: async (email, password) => {
          try {
            if (email == '' || password == '') {
              Alert.alert('Please enter the credentials!');
            } else {
              await auth().signInWithEmailAndPassword(email, password);
              console.log('Logged in successfully!');
            }
          } catch (e) {
            Alert.alert('Wrong Credentials', e.message);
            console.log(e.message);
          }
        },
        register: async (email, password, userName, userDob, userPlace) => {
          try {
            if (
              email == '' ||
              password == '' ||
              userName == '' ||
              userDob == '' ||
              userPlace == ''
            ) {
              Alert.alert('Please enter all the details!');
            } else {
              const res = await auth().createUserWithEmailAndPassword(
                email,
                password,
              );
              console.log('res: ', res);
              console.log(res.user.uid);
              AddUserData(res.user.uid, {
                email: email,
                name: userName,
                age: userDob,
                place: userPlace,
              });
            }
          } catch (e) {
            Alert.alert('Error signin up', e.message);
            console.log(e.message);
          }
        },

        logout: async () => {
          try {
            await auth().signOut();
            console.log('Logged out successfully!');
          } catch (e) {
            console.error(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
