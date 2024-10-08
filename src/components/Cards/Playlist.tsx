import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Playlist = ({ style = {}, overlayStyle = {}, imageURL, title = 'Title', subtitle = `Subtitle`, onPress = () => {} }: any) => (
	<ImageBackground
		style={[styles.coverArt, style]}
		imageStyle={{
			borderRadius: 10,
		}}
		source={{ uri: imageURL }}
		resizeMode="cover"
	>

		<LinearGradient
					style={styles.overlay}
					colors={['rgba(0, 0, 0, 1)', 'transparent']}
					start={{ x: 0, y: 1 }}
					end={{ x: 0, y: 0 }}
				/>
		
		<TouchableOpacity style={[styles.overlay, overlayStyle]} onPress={onPress}>
			<View style={styles.content}>
				<Text style={styles.title} numberOfLines={1}>
					{title}
				</Text>
				<Text style={styles.subtitle} numberOfLines={1}>
					{subtitle}
				</Text>
			</View>
		</TouchableOpacity>
	</ImageBackground>
);

export default Playlist;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	coverArt: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 120,
		height: 115,
		marginRight: 10,
	},
	overlay: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		width: null,
		height: 200,
		borderRadius: 10,
	},
	content: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
		paddingHorizontal: 15,
	},
	title: {
		color: '#FFF',
		fontSize: 20,
		fontWeight: '900',
		letterSpacing: 1,
		alignSelf: 'center',
	},
	subtitle: {
		color: '#FFF',
	},
});
