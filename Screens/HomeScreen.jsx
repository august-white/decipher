import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { XMLParser } from 'fast-xml-parser';
import { Book, ChevronDown, ChevronUp } from 'lucide-react-native';

const HomeScreen = ({ navigation }) => {
	const [playDropdownOpen, setPlayDropdownOpen] = useState(false);

	const options = [
		{ label: 'Random Facts', slug: 'random-fact' },
		{ label: 'New York Times Top Articles', slug: 'nyt-top-story' },
		{ label: 'Famous Quotes', slug: 'famous-quote' },
	  ];

	return (
		<SafeAreaView className="flex-1 items-end">
			<View className="flex flex-row items-center px-6">
				<View className="flex w-1/2 flex-row items-center">
					<TouchableOpacity
						className="rounded-md bg-purple-200 p-3"
						onPress={() => navigation.navigate('Dictionary')}
					>
						<Book />
					</TouchableOpacity>
					<Text className="mx-6 w-1/2 justify-center text-center text-xl font-bold">Home</Text>
				</View>
				{/* play dropdown */}
				<View className="w-1/2">
					<TouchableOpacity
						onPress={() => setPlayDropdownOpen(!playDropdownOpen)}
						className="flex-row items-center justify-between rounded-md bg-purple-200 px-4 py-3"
					>
						<Text className="text-lg font-semibold text-purple-900">Play</Text>
						{playDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
					</TouchableOpacity>
				</View>
			</View>
			{playDropdownOpen && (
				<View className="w-1/2 mt-2 mr-4 rounded-md bg-white shadow">
					{options.map((option) => (
						<TouchableOpacity
							key={option.slug}
							className="border-b border-gray-200 px-4 py-3"
							onPress={() => {
								setPlayDropdownOpen(false);
								navigation.navigate('Play', { slug: option.slug });
							}}
						>
							<Text className="text-gray-800">{option.label}</Text>
						</TouchableOpacity>
					))}
				</View>
			)}
		</SafeAreaView>
	);
};

export default HomeScreen;
