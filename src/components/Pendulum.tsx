import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming, Easing, cancelAnimation} from 'react-native-reanimated';

interface PendulumProps {
    length: number; 
    period: number; 
}

const PIXELS_PER_METER = 300; 

const Pendulum: React.FC<PendulumProps> = ({ length, period }) => {
    const rotation = useSharedValue(30);
    const visualLength = length * PIXELS_PER_METER;
    useEffect(() => {
        cancelAnimation(rotation);
        if (period > 0) {
            const halfCycleDuration = (period*1000)/2;
            rotation.value = withRepeat(
            withSequence(
                withTiming(-30, { duration: halfCycleDuration, easing: Easing.inOut(Easing.cubic) }),
                withTiming(30, { duration: halfCycleDuration, easing: Easing.inOut(Easing.cubic) })
            ), -1, true);
        }
    }, [period]);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${rotation.value}deg` }],
        };
    });

    return (
        <View style={styles.container}>
            <View style={styles.ceiling} />
            <Animated.View style={[styles.pendulumArm, animatedStyle]}>
            <View style={[styles.string, { height: visualLength }]} />
            <View style={styles.bob} />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 20,
        height: 400,
    },
    ceiling: {
        width: 100,
        height: 8,
        backgroundColor: '#374151',
        borderRadius: 4,
        zIndex: 10,
    },
    pendulumArm: {
        alignItems: 'center',
        transformOrigin: 'top center',
        marginTop: -4,
    },
    string: {
        width: 2,
        backgroundColor: '#333',
    },
    bob: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#00bf33',
        marginTop: -2,
    },
});

export default Pendulum;