import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Timer extends React.Component {
    state = {
        time: 0,
    };

    startTimer = () => {
        this.interval = setInterval(() => {
            this.setState(state => ({
                time: state.time + 1,
            }));
        }, 1000);
    };

    stopTimer = () => {
        clearInterval(this.interval);
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.timer}>{this.state.time}</Text>
                <TouchableOpacity onPress={this.startTimer} style={styles.button}>
                    <Text>Start</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.stopTimer} style={styles.button}>
                    <Text>Stop</Text>
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
    timer: {
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
