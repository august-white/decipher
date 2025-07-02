'use client';
import { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { XMLParser } from 'fast-xml-parser';
import Constants from 'expo-constants';
import Word from 'components/Word';
import { PenLine } from 'lucide-react-native';
import Timer from 'components/Timer';

const PlayScreen = ({ route }) => {
    const { slug } = route.params;

    const [text, setText] = useState([]);

    const [cipher, setCipher] = useState(null);

    const [highlightedLetter, setHighlightedLetter] = useState(null);
    const [typeColor, setTypeColor] = useState('black');

    const apiNinjasKey = Constants.expoConfig?.extra?.API_NINJAS_KEY;

    useEffect(() => {
        setCipher(generateCipher());
    }, []);

    useEffect(() => {
        if (!cipher) return;

        let retryCount = 0;
        const MAX_RETRIES = 5;

        const fetchAndSet = async () => {
        let rawText = '';
        if (slug === 'random-fact') {
            rawText = await fetchRandomFact();
        } else if (slug === 'nyt-top-story') {
            rawText = await fetchNYTTopStory();
        } else if (slug === 'famous-quote') {
            rawText = await fetchRandomQuote();
        }

        const textArr = rawText.split(' ').map((word) =>
            word.split('').map((char) => ({
            bottomLetter: encipherChar(char, cipher),
            topLetter: null,
            color: null,
            }))
        );

        if (textArr.some(wordArr => wordArr.length > 8)) {
            if (retryCount < MAX_RETRIES) {
            retryCount++;
            fetchAndSet();
            return;
            }
        }

        setText(textArr);
        };

        fetchAndSet();
    }, [cipher, slug]);

    const encipherChar = (char, cipher) => {
        const lower = char.toLowerCase();
        if (cipher[lower]) {
        return cipher[lower].toUpperCase();
        }
        return char;
    };

    const handleType = (value, bottomLetter) => {
        setText(prev =>
        prev.map(wordArr =>
            wordArr.map(letterObj =>
            letterObj.bottomLetter === bottomLetter
                ? { ...letterObj, topLetter: value, color: typeColor }
                : letterObj
            )
        )
        );
    };

    const fetchRandomFact = async (category = null) => {
        try {
        const url = category
            ? `https://uselessfacts.jsph.pl/api/v2/facts/random?category=${category}`
            : 'https://uselessfacts.jsph.pl/api/v2/facts/random';

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        return data.text;
        } catch (e) {
        console.error('Failed to fetch useless fact:', e);
        return 'Failed to fetch fact.';
        }
    };

    const fetchNYTTopStory = async () => {
        try {
        const response = await fetch('https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml');
        const text = await response.text();
        const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });
        const jsonObj = parser.parse(text);
        const items = jsonObj.rss.channel.item;
        const snippets = Array.isArray(items)
            ? items.map((item) => item.description)
            : [items.description];
        return snippets[Math.floor(Math.random() * snippets.length)];
        } catch (e) {
        console.error('Failed to fetch or parse RSS:', e);
        return 'Failed to fetch NYT story.';
        }
    };

    const fetchRandomQuote = async () => {
        try {
        const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
            headers: { 'X-Api-Key': apiNinjasKey },
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        return data[0]?.quote || 'No quote found.';
        } catch (error) {
        console.error('Failed to fetch quote:', error);
        return 'Failed to fetch quote.';
        }
    };

    const shuffleAlphabet = (letters) => {
        const newAlpha = [...letters];
        for (let i = 0; i < 1000; i++) {
        const idx1 = Math.floor(Math.random() * newAlpha.length);
        const idx2 = Math.floor(Math.random() * newAlpha.length);
        [newAlpha[idx1], newAlpha[idx2]] = [newAlpha[idx2], newAlpha[idx1]];
        }
        return newAlpha;
    };

    const generateCipher = () => {
        const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
        const letters = ALPHABET.split('');
        const shuffled = shuffleAlphabet(letters);
        const map = {};
        letters.forEach((letter, i) => {
        map[letter] = shuffled[i];
        });
        return map;
    };

    const highlightedCount = text
        .flat()
        .filter((obj) => obj.bottomLetter === highlightedLetter).length;

    return (
        <SafeAreaView className="flex-1 items-center justify-center p-4">
        <View className="flex flex-row items-center px-6">
            <Text className="ml-6 text-xl font-bold text-center justify-center w-1/2">Play Screen</Text>
        </View>
        <ScrollView className="w-full mt-8" contentContainerStyle={{ alignItems: 'center' }}>
            <View className="w-full flex-row flex-wrap justify-left pl-4 pr-2">
            {text.map((wordArr, idx) => (
                <Word
                key={idx}
                letters={wordArr}
                highlightedLetter={highlightedLetter}
                setHighlightedLetter={setHighlightedLetter}
                handleType={handleType}
                />
            ))}
            </View>
        </ScrollView>
        <View className="flex flex-row m-4">
            <View className="w-full rounded-t-lg rounded-b-3xl bg-gray-300 p-2 flex flex-row items-center justify-center">
            <Timer />
            <View className="flex flex-row w-2/6 justify-center items-center">
                <PenLine fill={typeColor} stroke={typeColor} />
                <TouchableOpacity
                className="rounded-full h-6 w-6 bg-[#ffff00] mx-2"
                onPress={() => setTypeColor('yellow')}
                />
                <TouchableOpacity
                className="rounded-full h-6 w-6 bg-[#008000] mr-2"
                onPress={() => setTypeColor('green')}
                />
                <TouchableOpacity
                className="rounded-full h-6 w-6 bg-black"
                onPress={() => setTypeColor('black')}
                />
            </View>
            <Text className="w-1/6 font-bold text-center text-2xl">
                {highlightedLetter || '_'} - {highlightedCount}
            </Text>
            </View>
        </View>
        </SafeAreaView>
    );
};

export default PlayScreen;
