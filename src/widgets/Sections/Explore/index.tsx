import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Container from '../Container';
import * as Card from '@/src/components/Cards';
import { SCREENS } from '@/src/constants';

const Index = ({ style = {} }) => {
	const navigation = useNavigation<any>();

	return (
		<Container style={style} title="For you">
			<Card.Explore
				style={{ marginLeft: 20 }}
				title="Suas Músicas"
				subtitle="Lista de músicas"
				onPress={() => navigation.navigate(SCREENS.SONGS)}
			/>

			<Card.Explore />

			<Card.Explore
				style={{ marginRight: 20 }}
			/>
		</Container>
	);
};

export default Index;

const styles = StyleSheet.create({});
