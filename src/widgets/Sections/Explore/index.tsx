import React from 'react';
import { StyleSheet } from 'react-native';

import Container from '../Container';
import * as Card from '../../../components/Cards';
import { SCREENS } from '@/src/constants';
import { useNavigation } from 'expo-router';
const Index = ({ style = {} }) => {
	const { navigate } = useNavigation();

	return (
		<Container style={style} title="For you">
			<Card.Explore
				style={{ marginLeft: 20 }}
				title="Suas Músicas"
				subtitle="Lista de músicas"
				// @ts-ignore
				onPress={() => navigate(SCREENS.SONGS)}
			/>
			<Card.Explore />
			<Card.Explore />
		</Container>
	);
};

export default Index;

const styles = StyleSheet.create({});
