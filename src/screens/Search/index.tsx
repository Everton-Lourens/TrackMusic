import React, { memo, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { connect } from 'react-redux';

import { Section } from '../../widgets';
import { Icon } from '../../components';
import Constants from 'expo-constants';

const Index = ({ songs }: any) => {
	const { goBack } = useNavigation();
	const [audios, setAudios] = useState([]);
	const [search, setSearch] = useState('');

	const textInputRef = useRef(null);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (textInputRef.current) {
				// @ts-ignore
				textInputRef.current.focus();
			}
		}, 100);

		return () => clearTimeout(timer);
	}, []);

	const handleInput = (val: any) => {
		const value = val.replace('  ', ' ');
		setSearch(value);
		if (value.length > 3) {
			const results = songs.filter((song: any) => {
				let regex = new RegExp(value, 'ig');
				return regex.exec(song?.title) || regex.exec(song?.author);
			});

			setAudios(results);
		} else {
			setAudios([]);
		}
	};

	return (
		<>
			<ImageBackground style={styles.backgroundcontainer} source={{ uri: 'https://img.freepik.com/fotos-gratis/natacao-morta-de-guitarra-eletrica_23-2151376252.jpg' }} blurRadius={20} resizeMode="cover">
			<StatusBar style="light" backgroundColor='black' />
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<SafeAreaView style={styles.container}>
					<View style={styles.header}>
						<View style={styles.input}>
							{/*// @ts-ignore */}
							<Icon name="search" color="#FFF" />
							<TextInput style={styles.textInput} onChangeText={handleInput} value={search} returnKeyType="search" ref={textInputRef} placeholder="Pesquisar..." />
						</View>
						<TouchableOpacity style={styles.btn} onPress={() => goBack()}>
							<Text style={styles.btnTxt}>Cancelar</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.result}>
						{audios.length > 0 ? (
							<Section.MusicList audios={audios} />
						) : (
							<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
								{/*<Text style={{ fontSize: 24, fontWeight: 'bold', color: 'rgba(0, 0, 0, .3)' }}>Pesquise algo...</Text>*/}
								<Text style={{ fontSize: 24, fontWeight: 'bold', color: '#C4C4C4' }}>Pesquise algo...</Text>
							</View>
						)}
					</View>
				</SafeAreaView>
			</TouchableWithoutFeedback>
			</ImageBackground>
		</>
	);
};

const mapStateToProps = (state: any) => ({ songs: state?.player?.songs });
export default connect(mapStateToProps, null)(memo(Index));

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	backgroundcontainer: {
		flex: 1,
		backgroundColor: 'black',
		paddingTop: Constants.statusBarHeight,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 30,
		marginBottom: 15,
		marginHorizontal: 20,
	},
	input: {
		flex: 1,
		flexDirection: 'row',
		paddingVertical: 8,
		paddingHorizontal: 15,
		backgroundColor: '#E6E6E6',
		borderRadius: 6,
	},
	textInput: {
		flex: 1,
		color: 'rgba(0, 0, 0, .5)',
		marginLeft: 10,
	},
	btn: {
		flexBasis: 80,
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnTxt: {
		color: '#C4C4C4',
		fontSize: 15,
		fontWeight: 'bold',
		letterSpacing: 0,
	},
	result: {
		flex: 1,
	},
});
