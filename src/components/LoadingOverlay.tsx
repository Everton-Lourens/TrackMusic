import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';

const LoadingOverlay = ({ loading }: { loading: boolean }) => {
    const [loadingTextIndex, setLoadingTextIndex] = useState(0);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (loading) {
            timer = setInterval(() => {
                setLoadingTextIndex(prev => (prev + 1) % 11); // Ajuste o número 11 se você adicionar mais símbolos
            }, 1000);
        } else {
            setLoadingTextIndex(0);
        }
        return () => clearInterval(timer);
    }, [loading]);

    const getLoadingText = () => {
        const texts = ['', '♫', '♫♫', '♫♫♫', '♫♫♫♫', '♫♫♫♫♫', '♫♫♫♫♫♫', '♫♫♫♫♫♫♫', '♫♫♫♫♫♫♫♫', '♫♫♫♫♫♫♫♫♫', '♫♫♫♫♫♫♫♫♫♫'];
        return 'Carregando...\n' + texts[loadingTextIndex];
    };

    return (
        <Modal transparent={true} visible={loading} animationType="none">
            <View style={styles.overlay}>
                <Text style={styles.text}>{getLoadingText()}</Text>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default LoadingOverlay;
