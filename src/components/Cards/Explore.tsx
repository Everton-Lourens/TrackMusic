import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Explore = ({ style = {}, imageURL, nameImg = 'default.png', onClick = true, title = 'Explore', subtitle = `Explore`, onPress = () => { } }: any) => {

	const getImage = (name: string) => {
		switch (name) {
			case 'music.png':
				return require('../../assets/explore/music.png');
			case 'playlist.png':
				return require('../../assets/explore/playlist.png');
			default:
				return require('../../assets/explore/default.png');
		}
	};

	return (
		<View style={[styles.container, style]}>
			<ImageBackground
				style={styles.card}
				imageStyle={styles.imageStyle}
				source={imageURL ? { uri: imageURL } : getImage(nameImg)}
				resizeMode="cover">

				{onClick ?
					(<LinearGradient
						style={styles.overlay}
						colors={['rgba(0, 0, 0, 1)', 'transparent']}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
					/>)
					: (<LinearGradient
						style={styles.overlay}
						colors={['gray', 'transparent']}
						start={{ x: 0, y: 1 }}
						end={{ x: 3, y: 0 }}
					/>)
				}

				<View>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.subtitle}>{subtitle}</Text>
				</View>
				<TouchableOpacity style={styles.btn} onPress={onPress}>
					<Image style={[styles.headerBtn, { width: 40, height: 40 }]} source={require('../../assets/icons/play.png')} resizeMode="contain" />
				</TouchableOpacity>
			</ImageBackground>
		</View >
	);
};

export default Explore;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: 280,
		height: 158,
		marginHorizontal: 10,
	},
	card: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		borderRadius: 8,
		paddingBottom: 10,
		paddingHorizontal: 15,
		backgroundColor: '#FFF',
	},
	overlay: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		width: null,
		height: 158,
		borderRadius: 8,
	},
	imageStyle: {
		borderRadius: 8,
	},
	title: {
		color: '#FFF',
		fontSize: 24,
		fontWeight: 'bold',
		fontFamily: 'Roboto',
	},
	subtitle: {
		color: '#FFF',
	},
	btn: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 40,
		height: 40,
	},
	headerBtn: {
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
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
