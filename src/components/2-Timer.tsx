import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { Storage } from '../helpers';

export default class Timer extends React.Component {
    state = {
        time: 0,
        timeoutId: null,
    };

    startTimer = async () => {
        this.interval = setInterval(() => {
            this.setState(state => ({
                time: state.time + 1,
            }));
        }, 1000);

        // Chame applyTimeout para configurar o timeout
        await this.applyTimeout({ time: this.state.time });
    };

    stopTimer = async () => {
        clearInterval(this.interval);

        // Limpe o timeout se necessário
        await this.applyTimeout({ time: 0 });
    };

    applyTimeout = async ({ time = 0 }) => {
        const timeout = await Storage.get('timeout', true);
        if (time > 0 && timeout?.atived === 'false') {
            console.log('timeout', time);
            const id = setTimeout(async () => {
                const timeoutValue = await Storage.get('timeout', true);
                console.log('STORAGE @@@@@@@@@@@');
                console.log(JSON.stringify(timeoutValue, null, 2));
                if (timeoutValue?.atived === 'true') {
                    console.log('PAUSE @@@@@@@@@@@');
                    await TrackPlayer.pause();
                }
            }, time * 60 * 1000);
            await Storage.store('timeout', { timeoutId: id, atived: 'true' }, true);
        } else {
            clearTimeout(timeout?.timeoutId);
            await Storage.store('timeout', { timeoutId: null, atived: 'false' }, true);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.timer}>{this.state.time}</Text>
                <TouchableOpacity style={styles.button} onPress={this.startTimer}>
                    <Text>Start</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={this.stopTimer}>
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
        padding: 10,
        backgroundColor: '#ddd',
        margin: 5,
    },
});
