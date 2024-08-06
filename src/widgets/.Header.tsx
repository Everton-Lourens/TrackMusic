import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { SCREENS } from '../constants';

const LeftChildren = () => <Image source={require('../assets/icons/hamburger.png')} resizeMode="contain" />;

const MiddleChildren = ({ text }) => (
	<Text
		style={{
			fontSize: 20,
			color: '#A4A4A4',
		}}
	>
		{text}
	</Text>
);

const RightChildren = () => <Image	style={[styles.headerBtn, { tintColor: 'gray' }]} source={require('../assets/icons/search.png')} resizeMode="contain" />;

const Header = ({ style = { marginTop: 10, marginHorizontal: 10 }, options = {} }) => {
	const { navigate } = useNavigation();
const config = {
		left: {
			style: {},
			show: true,
			children: <LeftChildren />,
			onPress: () => {},
			// @ts-ignore
			...options?.left,
		},
		middle: {
			style: {},
			show: false,
			text: null,
			children: <MiddleChildren text="Título" />,
			// @ts-ignore
			...options?.middle,
		},
		right: {
			style: {},
			show: true,
			children: <RightChildren />,
			// @ts-ignore
			onPress: () => navigate(SCREENS.SEARCH),
			// @ts-ignore
			...options?.right,
		},
	};

	return (
		<View style={style}>
			<View style={styles.header}>
				<View style={[styles.left, config?.left?.style]}>
					{config?.left?.show && (
						<TouchableOpacity style={styles.btn} onPress={config?.left?.onPress}>
							{config?.left?.children}
						</TouchableOpacity>
					)}
				</View>

				<View style={[styles.middle, config?.middle?.style]}>
					{config?.middle?.show && <>{config?.middle?.text !== null ? <MiddleChildren text={config?.middle?.text} /> : config?.middle?.children}</>}
				</View>

				<View style={[styles.right, config?.right?.style]}>
					{config?.right?.show && (
						<TouchableOpacity style={styles.btn} onPress={config?.right?.onPress}>
							{config?.right?.children}
						</TouchableOpacity>
					)}
				</View>
			</View>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	left: {
		flexBasis: 60,
	},
	middle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	right: {
		flexBasis: 60,
	},
	btn: {
		padding: 10,
	},

	headerBtn: {
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		alignSelf: 'flex-end',
		//justifyContent: 'center',
		//alignItems: 'center',
		//paddingLeft: 4,
		borderRadius: 35,
		//borderWidth: 1.5,
		//marginHorizontal: 5,
		//marginVertical: 50, // position
	},
});
