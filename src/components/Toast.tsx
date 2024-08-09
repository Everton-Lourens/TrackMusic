import React, { useState } from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity } from 'react-native';

export const Toast = ({ visible, message, duration = 2000, onHide, colorGray = false }: any) => {
    const [opacity] = useState(new Animated.Value(0));

    if (visible) {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setTimeout(() => {
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start(onHide);
            }, duration);
        });
    }

    return (
        visible && (
            <Animated.View style={[{ backgroundColor: colorGray ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)' }, styles.toastContainer, { opacity }]}>
                <Text style={styles.toastText}>{message}</Text>
            </Animated.View>
        )
    );
};


const ExempleToUseApp = () => {
    const [toastVisible, setToastVisible] = useState(false);
    const [messageToast, setMessageToast] = useState('');

    const showToast = (activated = false, time = 0) => {
        setToastVisible(true);
        setTimeout(() => {
            setToastVisible(false)
            setMessageToast('');
        }, 2300); // duration + animation time
        const message = activated
            ? `Cronômetro Ativado${time === 0 ? '!' : ` com ${time} minutos`}`
            : 'Cronômetro Desativado!';
        setMessageToast(message);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => showToast(true, 5)}>
                <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 50, textAlign: 'center' }}>Show Toast</Text>
            </TouchableOpacity>
            <Toast
                visible={toastVisible}
                message={'Cronômetro Ativado com 5 minutos'}
                onHide={() => setToastVisible(false)}
                colorGray={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    toastContainer: {
        position: 'absolute',
        bottom: 50,
        left: 20,
        right: 20,
        borderRadius: 10,
        padding: 10,
        zIndex: 1000,
    },
    toastText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
