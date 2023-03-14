import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, useColorScheme} from 'react-native';
import {DEVICE_WIDTH} from '../constants/Platform';
import NavigationHeader from './NavigationHeader';
import QrCode from './QRCode';

interface Props {
  uri: string;
  onBackPress: () => void;
}

function QRView({uri, onBackPress}: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <NavigationHeader title="Scan the code" onBackPress={onBackPress} />
      <QrCode
        uri={uri}
        size={DEVICE_WIDTH * 0.9}
        theme={isDarkMode ? 'dark' : 'light'}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 50,
    width: DEVICE_WIDTH,
  },
});

export default QRView;
