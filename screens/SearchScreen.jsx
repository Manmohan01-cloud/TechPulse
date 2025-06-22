import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import NewsFeed from '../components/NewsFeed';
import { getNewsFeed } from '../services/newsService';
import { useTheme } from '../contexts/themeContext';
import getSearchScreenStyles from '../styles/searchScreenStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useAlert } from '../contexts/AlertContext';

const SEARCH_HISTORY_KEY = '@TechNewsApp:searchHistory';

const SearchScreen = () => {
    const { theme } = useTheme();
    const styles = getSearchScreenStyles(theme);
    const { showAppAlert } = useAlert();
    const [allArticles, setAllArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(true);

    useEffect(() => {
        const fetchNewsData = async () => {
            try {
                const { articles } = await getNewsFeed();
                setAllArticles(articles);
            } catch (error) {
                console.error("Failed to fetch articles:", error);
            }
        };
        fetchNewsData();
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadHistory();
        }, [])
    );

    const loadHistory = async () => {
        try {
            const history = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);
            if (history !== null) {
                setSearchHistory(JSON.parse(history));
            }
        } catch (e) {
            console.error("Failed to load search history.", e);
        }
    };
    
    useEffect(() => {
        const performSearch = async () => {
            const trimmedQuery = searchQuery.trim();
            if (!trimmedQuery) {
                setFilteredArticles([]);
                setShowHistory(true); 
                return;
            }

            setShowHistory(false); 
            setIsLoading(true);

            const lowerCaseQuery = trimmedQuery.toLowerCase();
            const results = allArticles.filter(article => {
                const content = `${article.headline} ${article.summary}`.toLowerCase();
                const words = content.split(/\s+/);
                return words.some(word => word.startsWith(lowerCaseQuery));
            });
            
            setFilteredArticles(results);
            setIsLoading(false);
        };
        
        const handler = setTimeout(() => {
            performSearch();
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery, allArticles]);
    
    const handleSearchSubmit = async () => {
        const trimmedQuery = searchQuery.trim();
        if(!trimmedQuery) return;
        
        const lowerCaseQuery = trimmedQuery.toLowerCase();
        const newHistory = [trimmedQuery, ...searchHistory.filter(item => item.toLowerCase() !== lowerCaseQuery)].slice(0, 10);
        setSearchHistory(newHistory);
        await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
    }

    const handleRemoveHistoryItem = async (itemToRemove) => {
        const newHistory = searchHistory.filter(item => item !== itemToRemove);
        setSearchHistory(newHistory);
        await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
    };

    const handleClearHistory = () => {
        showAppAlert({
            type: 'confirm',
            title: "Clear History",
            message: "Are you sure you want to delete all recent searches?",
            onConfirm: async () => {
                setSearchHistory([]);
                await AsyncStorage.removeItem(SEARCH_HISTORY_KEY);
            }
        });
    };

    const renderHistory = () => (
        <View style={styles.historyContainer}>
            <View style={styles.historyHeader}>
                <Text style={styles.historyTitle}>Recent Searches</Text>
                {searchHistory.length > 0 && (
                    <TouchableOpacity onPress={handleClearHistory}>
                        <Text style={styles.clearButton}>Clear All</Text>
                    </TouchableOpacity>
                )}
            </View>
            <FlatList
                data={searchHistory}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                    <View style={styles.historyItem}>
                        <TouchableOpacity style={styles.historyTextContainer} onPress={() => setSearchQuery(item)}>
                            <Feather name="clock" size={16} color={theme.subtleText} style={styles.historyIcon}/>
                            <Text style={styles.historyText}>{item}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleRemoveHistoryItem(item)}>
                            <Feather name="x" size={20} color={theme.subtleText} />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );

    const renderContent = () => {
        if (showHistory) {
            return renderHistory();
        }

        if (isLoading) {
             return <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 20 }}/>;
        }

        if (filteredArticles.length > 0) {
            return <NewsFeed articles={filteredArticles} />;
        }

        if (searchQuery.trim().length > 0) {
            return (
                <View style={styles.emptyContainer}>
                    <Feather name="frown" size={60} color="#ccc" />
                    <Text style={styles.emptyText}>No results found for "{searchQuery}"</Text>
                </View>
            );
        }

        return renderHistory();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.searchBar}>
                    <Feather name="search" size={20} color={theme.subtleText} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search news, topics..."
                        placeholderTextColor={theme.subtleText}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onFocus={() => setShowHistory(true)}
                        onSubmitEditing={handleSearchSubmit}
                        returnKeyType="search"
                    />
                </View>
            </View>
            {renderContent()}
        </SafeAreaView>
    );
};

export default SearchScreen;