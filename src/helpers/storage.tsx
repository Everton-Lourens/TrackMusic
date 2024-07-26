import AsyncStorage from '@react-native-async-storage/async-storage';

export const store = async (key: any, value: any, isJSON = false) => {
	try {
		await AsyncStorage.setItem(`@${key}`, !isJSON ? value : JSON.stringify(value));
	} catch (e: any) {
		console.log(`[AsyncStorage Error][store]: ${e?.message}`);
	}
};

export const get = async (key: any, isJSON = false) => {
	try {
		const value = await AsyncStorage.getItem(`@${key}`);
		return value != null ? (!isJSON ? value : JSON.parse(value)) : null;
	} catch (e: any) {
		console.log(`[AsyncStorage Error][get]: ${e?.message}`);
	}
};

export const remove = async (key: any) => {
	try {
		await AsyncStorage.removeItem(`@${key}`);
	} catch (e: any) {
		console.log(`[AsyncStorage Error][remove]: ${e?.message}`);
	}
};

export const clear = async (key: any) => {
	try {
		await AsyncStorage.clear();
	} catch (e: any) {
		console.log(`[AsyncStorage Error][clear]: ${e?.message}`);
	}
};
