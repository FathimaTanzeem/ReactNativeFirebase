import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {windowHeight} from '../utils/Dimensions';


import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({navigation}) => {
  return (
    <Onboarding
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.navigate('Login')}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image 
          style={styles.imageContainer}
           source={require('../assets/onboarding1.png')} />,
          title: 'Welcome',
          subtitle: ''
        },
        {
          backgroundColor: '#fff',
          image: <Image 
          style={styles.imageContainer}
          source={require('../assets/logo3.png')} />,
          title: 'SignUp and enjoy the View!',
          subtitle: '',
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    height: 400,
    width: 400
  },
});
