import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSavedNews } from '../contexts/savedNewsContext';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../contexts/themeContext';
import NewsCard from '../components/NewsCard';

const SavedNewsScreen = ({ navigation }) => {
  const { savedNews } = useSavedNews();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  if (savedNews.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Feather name="bookmark" size={80} color="#ccc" />
        <Text style={styles.emptyTitle}>No Saved Articles</Text>
        <Text style={styles.emptySubtitle}>Tap the bookmark icon on any article to save it here.</Text>
        <TouchableOpacity 
            style={styles.browseButton} 
            onPress={() => navigation.navigate('Home')}
        >
            <Text style={styles.browseButtonText}>Browse News</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved Articles</Text>
      </View>
      <FlatList
        data={savedNews}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <NewsCard {...item} />}
      />
    </SafeAreaView>
  );
};

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
   header: {
    padding: 20,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.card,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.text,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    color: colors.text,
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.subtleText,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  browseButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  browseButtonText: {
    color: colors.theme === 'dark' ? colors.background : '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SavedNewsScreen;