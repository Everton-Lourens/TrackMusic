import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Container from '../Container';
import * as Card from '../../../components/Cards';
import { SCREENS } from '../../../constants';

const Index = ({ style = {} }) => {
	const navigation = useNavigation<any>();

	return (
		<Container style={style} title="For you">
			<Card.Explore
				style={{ marginLeft: 20 }}
				title="Músicas"
				subtitle="Lista de músicas"
				onPress={() => navigation.navigate(SCREENS.SONGS)}
			/>

			<Card.Explore
				style={{ marginLeft: 20 }}
				title="Playlists"
				subtitle="Lista de playlists"
				onPress={() => navigation.navigate(SCREENS.PLAYLISTS)}
			/>

			<Card.Explore
				style={{ marginRight: 20 }}
				onClick={false}
			/>
		</Container>
	);
};

export default Index;

const styles = StyleSheet.create({});
