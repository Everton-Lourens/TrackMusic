import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import LinearGradient from 'react-native-linear-gradient';
import { Linking } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';

import { SCREENS } from '@/src/constants';

const menus = [
	{ name: 'home', title: 'Início', screen: SCREENS.HOME },
	{ name: 'songs', title: 'Músicas', screen: SCREENS.SONGS },
	{ name: 'favourite', title: 'Favoritos', screen: SCREENS.FAVOURITE },
	{ name: 'recent', title: 'Recentes', screen: SCREENS.RECENT },
	{ name: 'playlist', title: 'Playlist', screen: SCREENS.PLAYLISTS },
];

const Index = ({
	// @ts-ignore
	appName,
	active = false,
	current = '',
	onItemPressed = () => { },
	bottomBtn = {
		text: 'Segredo',
		onPress: () => Linking.openURL('https://www.bibliaonline.com.br/acf/ap/3/20'),
	},
	// @ts-ignore
	children,
}) => {
	const { navigate } = useNavigation();
	const screenScale = useRef(new Animated.Value(1)).current;
	const screenLeft = useRef(new Animated.Value(0)).current;
	const screenRadius = useRef(new Animated.Value(0)).current;

	const anim = (anim: any, toValue: any) => {
		return Animated.timing(anim, {
			toValue,
			duration: 300,
			useNativeDriver: true,
		});
	};

	useEffect(() => {
		anim(screenScale, active ? 0.8 : 1).start();
		anim(screenLeft, active ? Dimensions.get('screen').width * 0.6 : 0).start();
		anim(screenRadius, active ? 15 : 0).start();
	}, [active]);

	return (
		<>

			<StatusBar barStyle={active ? 'light-content' : 'dark-content'} backgroundColor={active ? 'black' : 'white'} />

			<LinearGradient style={styles.container} colors={['#C07037', '#C55234']}>
				<View style={styles.menuContainer}>
					<Animatable.View style={styles.header} animation={active ? 'slideInDown' : 'slideOutUp'} duration={2000}>
						<Image style={styles.logo} source={require('@/src/assets/logo.png')} />
						<Text style={styles.appName}>{appName}</Text>
					</Animatable.View>
					<View style={styles.middle}>
						{menus.map((menu: any, key: any) => (
							<Animatable.View key={key} animation={active ? 'zoomInDown' : 'zoomOutDown'} duration={1000 + key * 400}>
								<TouchableOpacity
									style={[styles.item, current.toLowerCase() === menu.name && styles.itemActive]}
									onPress={async () => {
										onItemPressed();
										const x = setTimeout(() => {
											// @ts-ignore
											menu.screen && navigate(menu.screen);
											menu.onPress && menu.onPress();
											clearTimeout(x);
										}, 850);
									}}
								>
									<Text style={[styles.itemTxt, current.toLowerCase() === menu.name && styles.itemTxtActive]}>{menu.title}</Text>
								</TouchableOpacity>
							</Animatable.View>
						))}
					</View>
					<Animatable.View style={styles.bottom} animation={active ? 'slideInUp' : 'slideOutDown'} duration={2000}>
						<Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
							<TouchableOpacity style={styles.bottomBtn} activeOpacity={0.7} onPress={() => Linking.openURL('https://www.instagram.com/everton_lourens/')}>
								<Text style={styles.bottomBtnTxt}>instagram</Text>
							</TouchableOpacity>
						</Animatable.View>
						<TouchableOpacity style={styles.bottomBtn} activeOpacity={0.7} onPress={bottomBtn?.onPress}>
							<Text style={styles.bottomBtnTxt}>{bottomBtn?.text}</Text>
						</TouchableOpacity>
					</Animatable.View>
				</View>

				<View style={styles.screenBackDrop} />
				<Animated.View
					style={[
						StyleSheet.absoluteFill,
						styles.screen,
						{
							transform: [
								{
									scale: screenScale,
								},
								{
									translateX: screenLeft,
								},
							],
							borderRadius: screenRadius,
						},
					]}
				>
					{children}
				</Animated.View>
			</LinearGradient>
		</>
	);
};

const mapStateToProps = (state: any) => ({ appName: state?.app?.appName });
export default connect(mapStateToProps, null)(Index);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	menuContainer: {
		flex: 1,
		justifyContent: 'space-between',
		width: Dimensions.get('screen').width * 0.6 - 35,
		paddingTop: StatusBar.currentHeight, // or: paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
		paddingLeft: 15,
	},
	header: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
	},
	logo: {
		width: 70,
		height: 70,
		marginBottom: 10,
	},
	appName: {
		color: 'rgba(255, 255, 255, .5)',
		fontSize: 20,
		fontWeight: 'bold',
		textTransform: 'uppercase',
		letterSpacing: 2,
	},
	middle: {
		flex: 1,
		justifyContent: 'center',
	},
	item: {
		justifyContent: 'center',
		width: null,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 6,
		marginBottom: 10,
	},
	itemActive: {
		backgroundColor: 'rgba(0, 0, 0, .3)',
	},
	itemTxt: {
		color: 'rgba(255, 255, 255, .45)',
		fontSize: 20,
		textTransform: 'uppercase',
	},
	itemTxtActive: {
		color: 'rgba(255, 255, 255, .8)',
	},
	bottom: {},
	bottomBtn: {
		justifyContent: 'center',
		alignItems: 'center',
		width: null,
		backgroundColor: 'rgba(0, 0, 0, .4)',
		paddingVertical: 10,
		borderRadius: 6,
		marginBottom: 5,
	},
	bottomBtnTxt: {
		color: 'rgba(255, 255, 255, .8)',
		fontSize: 20,
		textTransform: 'uppercase',
	},
	screen: {
		flex: 1,
		position: 'absolute',
		backgroundColor: '#FFF',
		zIndex: 9999,
	},
	screenBackDrop: {
		// @ts-ignore
		...StyleSheet.absoluteFill,
		backgroundColor: 'rgba(0, 0, 0, .15)',
		transform: [
			{
				scale: 0.7,
			},
			{
				translateX: Dimensions.get('screen').width * 0.58,
			},
		],
		borderRadius: 15,
	},
});
