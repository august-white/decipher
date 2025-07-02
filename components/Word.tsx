import React from 'react';
import { View } from 'react-native';
import Letter from './Letter';

type LetterObj = {
  bottomLetter: string;
  topLetter: string | null;
  color: string | null;
};

type WordProps = {
  letters: LetterObj[];
  highlightedLetter: string | null;
  setHighlightedLetter: (letter: string | null) => void;
  handleType: (value: string, bottomLetter: string) => void;
};

const Word = ({
  letters,
  highlightedLetter,
  setHighlightedLetter,
  handleType,
}: WordProps) => {
  return (
    <View className="rounded-md bg-gray-200 m-1 mr-8 flex-row">
      {letters.map((letterObj, letterIdx) => (
        <Letter
          key={letterIdx}
          bottomLetter={letterObj.bottomLetter}
          topLetter={letterObj.topLetter}
          color={letterObj.color}
          highlightedLetter={highlightedLetter}
          setHighlightedLetter={setHighlightedLetter}
          handleType={handleType}
        />
      ))}
    </View>
  );
};

export default Word;
