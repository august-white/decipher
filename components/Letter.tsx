'use client';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

type LetterProps = {
  bottomLetter: string;
  topLetter: string | null;
  color: string | null;
  highlightedLetter: string | null;
  setHighlightedLetter: (letter: string | null) => void;
  handleType: (value: string, bottomLetter: string) => void;
};

const Letter = ({
    bottomLetter,
    topLetter,
    color,
    highlightedLetter,
    setHighlightedLetter,
    handleType,
}: LetterProps) => {
    const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const isHighlighted =
        highlightedLetter &&
        bottomLetter.toUpperCase() === highlightedLetter.toUpperCase();

    if (ALPHABET.includes(bottomLetter.toUpperCase())) {
        return (
        <TouchableOpacity
            onPress={() => {
                setHighlightedLetter(isHighlighted ? null : bottomLetter);
            }}
            className={`px-2 py-1 w-10 items-center justify-center text-center ${
            isHighlighted ? 'bg-purple-300 rounded-md' : ''
            }`}
        >
            <TextInput
                value={topLetter || ''}
                onChangeText={(value) => handleType(value, bottomLetter)}
                className="text-md font-bold px-2 pt-3"
                style={{
                    color: color || 'black',
                }}
                maxLength={1}
            />
            <View className="my-1 h-px w-full bg-black" />
            <TouchableOpacity
                onPress={() => {
                    setHighlightedLetter(isHighlighted ? null : bottomLetter);
                }}
            >
                <Text className="text-md text-black px-2 pb-3">{bottomLetter}</Text>
            </TouchableOpacity>
        </TouchableOpacity>
        );
    } else {
        return (
        <View
            className={`m-1 w-10 rounded-md bg-gray-200 p-3 text-center ${
            isHighlighted ? 'bg-yellow-300' : ''
            }`}
        >
            <Text className="text-md text-black">{bottomLetter}</Text>
        </View>
        );
    }
};

export default Letter;
