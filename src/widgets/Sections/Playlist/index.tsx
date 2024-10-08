import React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

import Container from '../Container';
import { Card } from '../../../components';
import { SCREENS } from '../../../constants';

const Index = ({ songs, playlists, style = {} }: any) => {
	const navigation = useNavigation();

	return (
		playlists &&
		playlists.length > 0 && (
			<Container style={style} title="Sua playlist">
				{playlists.map((playlist: any, key: any) => (
					<Card.Playlist
						key={key}
						style={[key === 0 && { marginLeft: 20 }]}
						imageURL={songs[playlist?.songs[0]]?.artwork}
						title={playlist?.name}
						subtitle={`${playlist?.songs.length} Songs`}
						onPress={() => {
							const playlistIndex = playlists.findIndex((i: any) => i?.name.toLowerCase() === playlist?.name.toLowerCase());
							// @ts-ignore
							navigation.push(SCREENS.PLAYLIST, { playlistIndex });
						}}
					/>
				))}
			</Container>
		)
	);
};

const mapStateToProps = (state: any) => ({ songs: state?.player?.songs, playlists: state?.storage?.playlists });
export default connect(mapStateToProps, null)(Index);

const styles = StyleSheet.create({});
