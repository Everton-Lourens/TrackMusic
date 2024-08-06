import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './screens';
import { View, Text, Button } from 'react-native';
import { SCREENS } from '../constants';
const Stack = createNativeStackNavigator();


const HomeScreen = ({ navigation }: any) => (
    <View>
        <Text style={{ fontSize: 30, color: 'red' }}>Home Screen</Text>
        <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Details')}
        />
    </View>
);

const DetailsScreen = () => (
    <View>
        <Text style={{ fontSize: 30, color: 'red' }}>Details Screen</Text>
    </View>
);
//////////////////
const StackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={SCREENS.HOME} >
            <Stack.Screen name={SCREENS.HOME} component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
};

export default function Index() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <StackNavigation />
            </NavigationContainer>
        </SafeAreaProvider>
    );
};
//const Index = () => {
//export default Index;