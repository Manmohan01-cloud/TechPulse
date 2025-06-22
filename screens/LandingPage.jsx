import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    FlatList,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import NewsFeed from '../components/NewsFeed';
import { getNewsFeed } from '../services/newsService';
import { useTheme } from '../contexts/themeContext';
import NewsCardPlaceholder from '../components/common/NewsCardPlaceholder';
import { useAlert } from '../contexts/AlertContext';

const LandingPage = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { showAppAlert } = useAlert();

  const [allArticles, setAllArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const categories = useMemo(() => {
    if (allArticles.length === 0) return [];
    const uniqueCategories = [...new Set(allArticles.map(p => p.category))];
    return ['All', ...uniqueCategories];
  }, [allArticles]);

  const fetchNews = useCallback(async () => {
    try {
      const { articles } = await getNewsFeed();
      setAllArticles(articles);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchNews().finally(() => setIsLoading(false));
  }, [fetchNews]);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchNews();
    setIsRefreshing(false);
    showAppAlert({ title: "Feed Updated", message: "The latest stories have been fetched.", type: "success" });
  }, [fetchNews, showAppAlert]);

  useEffect(() => {
    if (selectedCategory === 'All') {
        setFilteredArticles(allArticles);
    } else {
        const results = allArticles.filter(article => article.category === selectedCategory);
        setFilteredArticles(results);
    }
  }, [selectedCategory, allArticles]);

  const renderHeader = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Top Stories</Text>
      </View>
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
        renderItem={({item}) => (
            <TouchableOpacity 
                style={[styles.filterChip, selectedCategory === item && styles.activeFilterChip]}
                onPress={() => setSelectedCategory(item)}
            >
                <Text style={[styles.filterText, selectedCategory === item && styles.activeFilterText]}>{item}</Text>
            </TouchableOpacity>
        )}
      />
    </>
  );
  
  const renderLoadingState = () => (
    <>
      {renderHeader()}
      <NewsCardPlaceholder />
      <NewsCardPlaceholder />
      <NewsCardPlaceholder />
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
        {isLoading && !isRefreshing ? (
          renderLoadingState()
        ) : (
            <NewsFeed
              articles={filteredArticles}
              ListHeaderComponent={renderHeader}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={onRefresh}
                  tintColor={theme.primary}
                />
              }
            />
        )}
    </SafeAreaView>
  );
};

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: colors.card,
  },
  headerTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
  },
  filterContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: colors.card,
  },
  filterChip: {
    backgroundColor: colors.background,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeFilterChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    color: colors.subtleText,
    fontWeight: '600',
    fontSize: 14,
  },
  activeFilterText: {
    color: colors.theme === 'dark' ? colors.background : '#fff',
  },
});

export default LandingPage;