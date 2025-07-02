// Timer.tsx
import { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Play, Pause, RotateCcw } from 'lucide-react-native';

const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const Timer = () => {
    const [seconds, setSeconds] = useState(0);
    const [running, setRunning] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (running) {
        intervalRef.current = setInterval(() => {
            setSeconds((s) => s + 1);
        }, 1000);
        } else if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        }
        return () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        };
    }, [running]);

    useEffect(() => {
        setRunning(true)
    }, [])

    const handleRestart = () => {
        setSeconds(0);
        setRunning(false);
        if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        }
    };

    return (
        <View className="w-1/2 flex flex-row items-center justify-center">
            <Text className="text-2xl font-bold text-center w-1/3 h-full">{formatTime(seconds)}</Text>
            <TouchableOpacity
                onPress={() => setRunning((r) => !r)}
                className="p-2 rounded-lg bg-gray-200 mx-1 w-10 h-10"
            >
                {running ? <Pause fill={'black'}/> : <Play fill={'black'} />}
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleRestart}
                className="p-2 rounded-lg bg-gray-200 mx-1 w-10 h-10"
            >
                <RotateCcw strokeWidth={3}/>
            </TouchableOpacity>
        </View>
    );
};

export default Timer;
