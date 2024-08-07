import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import RNExitApp from 'react-native-exit-app';

const startTime = 30 * 60; // 30 minutes in seconds

export default class Timeout extends React.Component {
    state = {
        time: startTime, // Start time in seconds (30 minutes)
        buttonColorExit: '#E6E6E6',
        buttonColorStart: '#E6E6E6',
        buttonColorStop: '#E6E6E6',
        buttonColorReset: '#E6E6E6',
        visible: true,
    };

    componentDidMount() {
        // Inicialização se necessário
    }

    startTimeoutExitApp = () => {
        // @ts-ignore
        if (this.interval) clearInterval(this.interval); // Clean up any previous interval

        // @ts-ignore
        this.interval = setInterval(() => {
            this.setState((state) => {
                // @ts-ignore
                if (state.time <= 0) {
                    // @ts-ignore
                    clearInterval(this.interval);
                    TrackPlayer.pause();
                    RNExitApp.exitApp(); // exit app
                    return { time: 0 };
                }
                // @ts-ignore
                return { time: state.time - 1 };
            });
        }, 1000);

        this.changeButtonColor('exit');
    };

    startTimeout = () => {
        // @ts-ignore
        if (this.interval) clearInterval(this.interval); // Clean up any previous interval

        // @ts-ignore
        this.interval = setInterval(() => {
            this.setState((state) => {
                // @ts-ignore
                if (state.time <= 0) {
                    // @ts-ignore
                    clearInterval(this.interval);
                    TrackPlayer.pause();
                    return { time: 0 };
                }
                // @ts-ignore
                return { time: state.time - 1 };
            });
        }, 1000);

        this.changeButtonColor('start');
    };

    stopTimeout = () => {
        // @ts-ignore
        clearInterval(this.interval);
        this.changeButtonColor('stop');
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

        setTimeout(() => {
            this.setState({ [`buttonColor${buttonType.charAt(0).toUpperCase() + buttonType.slice(1)}`]: '#E6E6E6' });

            Alert.alert('Configurado com sucesso!');
            this.setState({ visible: false });
        }, 1500);
    };


    render() {
        const { visible } = this.state;
        const { buttonColorExit } = this.state;
        const { buttonColorStart } = this.state;
        const { buttonColorStop } = this.state;
        const { buttonColorReset } = this.state;

        return (visible ?
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={this.startTimeoutExitApp}
                    style={[styles.button, { backgroundColor: buttonColorExit }]}
                >
                    <Text style={styles.text}>Fechar em 30 Minutos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.startTimeout}
                    style={[styles.button, { backgroundColor: buttonColorStart }]}
                >
                    <Text style={styles.text}>Pausar em 30 Minutos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.stopTimeout}
                    style={[styles.button, { backgroundColor: buttonColorStop }]}
                >
                    <Text style={styles.text}>Pausar Cronômetro</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.resetTimeout}
                    style={[styles.button, { backgroundColor: buttonColorReset }]}
                >
                    <Text style={styles.text}>Resetar Cronômetro</Text>
                </TouchableOpacity>
            </View>
            : null
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
