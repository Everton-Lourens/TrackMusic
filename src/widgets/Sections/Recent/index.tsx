import React, { memo, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Container from '../Container';
import { Card } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../../constants';
import { getDefaultPicture } from '../../../store/config';

const Index = ({ recents, songs, style = {} }: any) => {
	const { navigate } = useNavigation();
	const [audios, setAudios] = useState([]);
	const handlePress = (song: any, index: any) => {
		// @ts-ignore
		navigate(SCREENS.PLAYING, {
			forcePlay: true,
			song,
			index,
		});
	};

	useEffect(() => {
		setAudios(recents);
	}, [recents]);

	return (
		audios &&
		audios.length > 0 && (
			<Container style={style} title="Recentes">
				{audios.map((index, key) => (
					<Card.Recent
						key={key}
						style={[key === 0 && { marginLeft: 20 }]}
						imageURL={songs[index]?.artwork || getDefaultPicture()}
						title={songs[index]?.title}
						artist={songs[index]?.artist}
						onPress={() => handlePress(songs[index], index)}
					/>
				))}
			</Container>
		)
	);
};

const mapStateToProps = (state: any) => ({ songs: state?.player?.songs, recents: state?.storage?.recents });
export default connect(mapStateToProps, null)(memo(Index));

const styles = StyleSheet.create({});
