import React, { memo, useEffect, useRef, useState } from 'react';
import { StyleSheet, Image, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ImageBackground, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';

import { Section } from '../../widgets';
//import { Icon } from '../../components';

const Index = ({ songs }: any) => {
	const { goBack } = useNavigation();
	const [audios, setAudios] = useState([]);
	const [search, setSearch] = useState('');
	const [urlImg, setUrlImg] = useState('https://img.freepik.com/premium-photo/headphones-music-background-generative-ai_1160-3253.jpg');

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
		if (value.length > 2) { // if (value.length > 3) {
			const results = songs.filter((song: any) => {
				let regex = new RegExp(value, 'ig');
				return regex.exec(song?.title) || regex.exec(song?.artist);
			});

			setAudios(results);
		} else {
			setAudios([]);
		}
	};

	return (
		<>
			<ImageBackground style={styles.backgroundcontainer} source={{ uri: urlImg }} blurRadius={20} resizeMode="cover">
				<StatusBar barStyle="light-content" backgroundColor='black' />
				<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
					<SafeAreaView style={styles.container}>
						<View style={styles.header}>
							<View style={styles.input}>
								{/*// @ts-ignore */}
								<Image style={[styles.headerBtn, { tintColor: 'gray' }]} source={require('../../assets/icons/search.png')} />
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
		bottom: '3%',
	},
	backgroundcontainer: {
		flex: 1,
		backgroundColor: 'black',
		paddingTop: StatusBar.currentHeight, // or: paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
		paddingVertical: '1%',
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
		left: '12%',
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
	headerBtn: {
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		alignSelf: 'flex-end',
		borderRadius: 35,
	},
});
