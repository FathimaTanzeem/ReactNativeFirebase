import firestore from '@react-native-firebase/firestore';

export const AddUserData = (userid, data) => {
  firestore()
    .collection('users')
    .doc(userid)
    .set(data)
    .then(() => {
      console.log('User added!', data);
    });
};
