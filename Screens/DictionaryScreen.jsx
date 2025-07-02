import { View, Text, TouchableOpacity } from 'react-native';

const DictionaryScreen = ({navigation}) => {

    return (
        <View className='flex-1 items-center justify-center p-2'>
            <Text>Dictionary</Text>
            <Text>Find all of the tolls you need to complete the cryptograms here!</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Home")} className='mt-6 bg-purple-500 px-4 py-2 rounded-md'>
                <Text className='text-white font-bold'>Home</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DictionaryScreen;
