import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { XMLParser } from 'fast-xml-parser';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import PlayDropdown from 'components/PlayDropdown';
import Letter from 'components/Letter'

const HomeScreen = ({ navigation }) => {
    const [NYTarticles, setNYTArticles] = useState([]);
    const [NYTTopStoriesShown, setNYTTopStoriesShown] = useState(false);
    const [uselessFact, setUselessFact] = useState('');
    const [uselessFactShown, setUselessFactShown] = useState(false);

    useEffect(() => {
        fetchNYTRSS();
        fetchUselessFact();
    }, []);

    const fetchNYTRSS = async () => {
        try {
            const response = await fetch('https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml');
            const text = await response.text();
            const parser = new XMLParser({
                ignoreAttributes: false,
                attributeNamePrefix: '@_',
            });
            const jsonObj = parser.parse(text);
            const items = jsonObj.rss.channel.item;

            const snippets = items.map(item => ({
                title: item.title,
                snippet: item.description,
                link: item.link,
            }));

            setNYTArticles(snippets);
        } catch (e) {
            console.error('Failed to fetch or parse RSS:', e);
        }
    };

    const fetchUselessFact = async (category = null) => {
        try {
            const url = category
                ? `https://uselessfacts.jsph.pl/api/v2/facts/random?category=${category}`
                : 'https://uselessfacts.jsph.pl/api/v2/facts/random';

            const response = await fetch(url);
            const data = await response.json();
            setUselessFact(data.text);
        } catch (e) {
            console.error('Failed to fetch useless fact:', e);
        }
    };


    return (
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-4 py-6">
          <View className="mb-6 flex-row items-center justify-between">
            <Text className="text-2xl font-bold">Home</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Dictionary')}
              className="rounded-md bg-purple-500 px-4 py-2">
              <Text className="font-semibold text-white">Go to Dictionary</Text>
            </TouchableOpacity>
          </View>

          {/* NYT Section */}
          <View className="mb-2 flex-row items-center">
            <Text className="mr-4 text-lg font-semibold">NYT Top Stories</Text>
            <TouchableOpacity
              onPress={() => setNYTTopStoriesShown(!NYTTopStoriesShown)}
              className="rounded-md bg-gray-300 p-2">
              {NYTTopStoriesShown ? <ChevronUp /> : <ChevronDown />}
            </TouchableOpacity>
          </View>

          {NYTTopStoriesShown && (
            <View className="mb-4 max-h-72">
              {NYTarticles.map((article, index) => (
                <View key={index} className="mb-4 rounded-md bg-gray-100 p-4">
                  <Text className="mb-1 text-base font-bold">{article.title}</Text>
                  <Text className="text-sm text-gray-700">{article.snippet}</Text>
                </View>
              ))}
            </View>
          )}
          <PlayDropdown />
        </View>
      </SafeAreaView>
    );
};

export default HomeScreen;
