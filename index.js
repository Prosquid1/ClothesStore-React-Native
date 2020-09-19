import React, {
    useCallback,
    useMemo,
    useState,
    useRef,
    useEffect
} from 'react';

import { NativeEventEmitter } from 'react-native';
import HomeBridge from './bridges';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

const RNHome = () => {
    const eventEmitter = new NativeEventEmitter(HomeBridge);

    const fetchData = useCallback(() => HomeBridge.fetchData(), [
        HomeBridge
      ]);

    
    useEffect(() => {
        eventEmitter.addListener('onSuccess', value => {
            console.log(`Data changed ${value[0].name}`);
        });
        eventEmitter.addListener('onError', errorMessage => {
            console.log(errorMessage);
        });
        fetchData()
    }, [eventEmitter, fetchData]);

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>
                Test Data for RN Home
        </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    textStyle: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
});

// Module name
AppRegistry.registerComponent('RNHome', () => RNHome);