import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Played = ({ style = {}, imageURL, title = 'Song Title', artist = ``, onPress = () => { } }: any) => (
	<TouchableOpacity style={[styles.container, style]} onPress={onPress}>
		<View>
			<Image
				style={{
					width: 130,
					height: 130,
					borderRadius: 10,
					position: 'absolute',
					bottom: -6,
					opacity: 0.5,
					alignSelf: 'center',
				}}
				source={{ uri: imageURL }}
				resizeMode="cover"
				borderRadius={10}
				blurRadius={100}
			/>
			<Image style={styles.coverArt} source={{ uri: imageURL }} resizeMode="cover" borderRadius={10} />
		</View>
		<View style={styles.content}>
			<Text style={styles.title} numberOfLines={1}>
				{title?.substring(0, 14) + (title?.length > 14 ? '..' : '')}
			</Text>
			<Text style={styles.artist} numberOfLines={1}>
				{artist?.substring(0, 14) + (artist?.length > 14 ? '..' : '')}
			</Text>
		</View>
	</TouchableOpacity>
);

export default Played;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 10,
	},
	coverArt: {
		width: 150,
		height: 150,
	},
	content: {
		width: 140,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
	},
	title: {
		color: 'white', // color: '#555555',
		fontSize: 12,
		fontWeight: 'bold',
		letterSpacing: 1,
	},
	artist: {
		color: 'white', // color: '#555555',
		fontSize: 10,
	},
});
