import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import RNExitApp from 'react-native-exit-app';
import millisToMin from '../helpers/millisToMin';

var startTime = 30 * 60; // 30 minutes in seconds
var storageTime: any = 0;

export default class Timeout extends React.Component {
    state = {
        time: startTime, // Start time in seconds (30 minutes)
        buttonColorExit: '#E6E6E6',
        buttonColorStart: '#E6E6E6',
        buttonColorStop: '#E6E6E6',
        buttonColorReset: '#E6E6E6',
        visible: true,
        buttonShowTimeoutOn: true,
    };

    startTimeoutExitApp = () => {
        // @ts-ignore
        if (this.interval) clearInterval(this.interval); // Clean up any previous interval

        this.setState({ time: startTime });
        // @ts-ignore
        this.interval = setInterval(() => {
            this.setState((state) => {
                // @ts-ignore
                if (state.time <= 0) {
                    // @ts-ignore
                    clearInterval(this.interval);
                    try {
                        TrackPlayer.pause();
                        storageTime = 0;
                        this.setState({ buttonShowTimeoutOn: true });
                        RNExitApp.exitApp(); // exit app
                    } catch (e) { }
                    return { time: 0 };
                }
                storageTime = this.state?.time - 1
                // @ts-ignore
                return { time: state.time - 1 };
            });
        }, 1000);
        this.setState({ buttonShowTimeoutOn: false });
    };

    componentDidMount() {
        // Initialize the timeout
        if (storageTime >= 1) {
            startTime = storageTime;
            this.setState({ buttonShowTimeoutOn: true });
            this.startTimeoutExitApp();
        }
    }

    startTimeout = () => {
        // @ts-ignore
        if (this.interval) clearInterval(this.interval); // Clean up any previous interval

        this.setState({ time: startTime });
        // @ts-ignore
        this.interval = setInterval(() => {
            this.setState((state) => {
                // @ts-ignore
                if (state.time <= 0) {
                    // @ts-ignore
                    clearInterval(this.interval);
                    try {
                        TrackPlayer.pause();
                        storageTime = 0;
                        this.setState({ buttonShowTimeoutOn: true });
                    } catch (e) { }
                    return { time: 0 };
                }
                storageTime = this.state?.time - 1
                // @ts-ignore
                return { time: state.time - 1 };
            });
        }, 1000);
        this.setState({ buttonShowTimeoutOn: false });
    };


    stopTimeout = () => {
        // @ts-ignore
        clearInterval(this.interval);
        this.setState({ buttonShowTimeoutOn: true });
        //Alert.alert('Cronômetro desativado!');
    };

    resetTimeout = () => {
        // @ts-ignore
        clearInterval(this.interval);
        this.setState({ time: startTime });
        this.changeButtonColor('reset');
    };

    changeButtonColor = (buttonType: any) => {
        const colorMap: any = {
            exit: 'green',
            start: 'green',
            stop: 'yellow',
            reset: 'red',
        };

        const color = colorMap[buttonType] || '#E6E6E6'; // Fallback para cor padrão se o tipo de botão não estiver no mapa

        this.setState({ [`buttonColor${buttonType.charAt(0).toUpperCase() + buttonType.slice(1)}`]: color });

        Alert.alert('Configurado com sucesso!');
        setTimeout(() => {
            this.setState({ [`buttonColor${buttonType.charAt(0).toUpperCase() + buttonType.slice(1)}`]: '#E6E6E6' });

            this.setState({ visible: false });
        }, 1000);
    };


    render() {
        const { buttonShowTimeoutOn } = this.state;
        return (buttonShowTimeoutOn ?
            <TouchableOpacity onPress={this.startTimeoutExitApp} activeOpacity={0.4}>
                <Image source={require('../assets/icons/timeout-off.png')} />
            </TouchableOpacity>
            :
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={this.stopTimeout} activeOpacity={0.4}>
                {storageTime > 0 ? <Text>{millisToMin(storageTime * 1000)}</Text> : null}
                <Image source={require('../assets/icons/timeout-on.png')} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFF',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        zIndex: 9999,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        borderRadius: 5,
    },
    text: {
        color: 'rgba(0, 0, 0, .5)',
        fontSize: 16,
        letterSpacing: 1,
        //textAlign: 'center',
    },
});
