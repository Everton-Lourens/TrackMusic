import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Timeout extends React.Component {
    state = {
        time: 1800, // Define o tempo inicial em segundos
    };

    startTimeout = () => {
        if (this.interval) clearInterval(this.interval); // Limpa qualquer intervalo anterior

        this.setState({ time: startTime });

        this.interval = setInterval(() => {
            this.setState(state => {
                if (state.time <= 0) {
                    clearInterval(this.interval);
                    return { time: 0 };
                }
                return { time: state.time - 1 };
            });
        }, 1000);
    };

    stopTimeout = () => {
        clearInterval(this.interval);
    };

    resetTimeout = () => {
        clearInterval(this.interval);
        this.setState({ time: 60 }); // Reseta o tempo para o valor inicial
    };

    render() {
        const { time } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.timeout}>{time}s</Text>
                <TouchableOpacity onPress={this.startTimeout} style={styles.button}>
                    <Text>Start</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.stopTimeout} style={styles.button}>
                    <Text>Stop</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.resetTimeout} style={styles.button}>
                    <Text>Reset</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeout: {
        fontSize: 48,
        marginBottom: 20,
    },
    button: {
        margin: 10,
        padding: 10,
        backgroundColor: '#DDDDDD',
        borderRadius: 5,
    },
});
