import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type Option = {
  label: string;
  slug: string;
};

type RootStackParamList = {
  Play: { slug: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Play'>;

const options: Option[] = [
  { label: 'Random Facts', slug: 'random-fact' },
  { label: 'New York Times Top Articles', slug: 'nyt-top-story' },
  { label: 'Famous Quotes', slug: 'famous-quote' },
];

const PlayDropdown: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  return (
    <View className="mb-6">
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        className="flex-row items-center justify-between rounded-md bg-purple-100 px-4 py-3">
        <Text className="text-lg font-semibold text-purple-900">Go to Play</Text>
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </TouchableOpacity>

      {open && (
        <View className="mt-2 rounded-md bg-white shadow">
          {options.map((option) => (
            <TouchableOpacity
              key={option.slug}
              className="border-b border-gray-200 px-4 py-3"
              onPress={() => {
                setOpen(false);
                navigation.navigate('Play', { slug: option.slug });
              }}>
              <Text className="text-gray-800">{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default PlayDropdown;
