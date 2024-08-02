import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

//import Icon from '../Icon';
import * as Modal from '../../widgets/Modals';
import { millisToMin } from '../../helpers';

const MusicList = ({ style = {}, imageURL, title = 'Song Title', artist = `Author Name`, duration = '03:22', onPlayPress = () => { }, moreOptions = [] }: any) => {
	const [moreOptionsModal, setMoreOptionsModal] = useState(false);

	return (
		<>
			<TouchableOpacity style={[styles.container, style]} onPress={onPlayPress} onLongPress={() => setMoreOptionsModal(true)} activeOpacity={0.8}>
				<View style={styles.left}>
					<Image
						style={{
							width: 70,
							height: 70,
							position: 'absolute',
							bottom: -3,
							opacity: 0.5,
							alignSelf: 'center',
						}}
						source={{ uri: imageURL }}
						resizeMode="cover"
						borderRadius={6}
						blurRadius={100}
					/>
					<Image style={styles.coverArt} source={{ uri: imageURL }} resizeMode="cover" borderRadius={6} />
				</View>
				<View style={styles.middle}>
					<View>
						<Text style={styles.title} numberOfLines={2}>
							{title}
						</Text>
						{artist && <Text style={styles.artist}>{artist}</Text>}
						{!artist && <Text style={styles.duration}>{millisToMin(duration)}</Text>}
					</View>
					{artist && <Text style={styles.duration}>{millisToMin(duration)}</Text>}
				</View>

			</TouchableOpacity>

			<Modal.MoreOptions visible={moreOptionsModal} onClose={setMoreOptionsModal} title={title} moreOptions={moreOptions} />
		</>
	);
};

export default MusicList;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 20,
	},
	left: {},
	middle: {
		flex: 1,
		height: 80,
		marginLeft: 10,
		marginRight: 20,
		justifyContent: 'space-between',
	},
	right: {},
	coverArt: {
		width: 80,
		height: 80,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		letterSpacing: 1,
		color: 'white',
	},
	artist: {
		color: '#888',
	},
	duration: {
		color: '#A4A4A4', // '#A4A4A4',
	},
	playBtn: {
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		justifyContent: 'center',
		borderRadius: 35,
	},
});
