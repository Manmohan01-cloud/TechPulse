import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Share,
    Alert,
    Animated,
} from 'react-native';
import { useTheme } from '../contexts/themeContext';
import { useSavedNews, SAVED_NEWS_ACTIONS } from '../contexts/savedNewsContext';
import { Feather } from '@expo/vector-icons';
import { getNewsFeed } from '../services/newsService';
import RelatedArticleCard from '../components/RelatedArticleCard';

const HEADER_MAX_HEIGHT = 250;
const MIN_FONT_SIZE = 14;
const MAX_FONT_SIZE = 28;
const DEFAULT_FONT_SIZE = 17;

const NewsDetailScreen = ({ route, navigation }) => {
    const { theme } = useTheme();
    const scrollAnim = useRef(new Animated.Value(0)).current;

    const [isReaderMode, setIsReaderMode] = useState(false);
    const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
    
    const [relatedArticles, setRelatedArticles] = useState([]);
    const { savedNews, dispatch: savedNewsDispatch } = useSavedNews();
    const isSaved = savedNews.some(item => item.id === (route.params?.article?.id || -1));

    if (!route.params || !route.params.article) {
        return (
            <View style={getStyles(theme).errorContainer}>
                <Text style={getStyles(theme).errorText}>Article not found.</Text>
            </View>
        );
    }
    const { article } = route.params;

    useEffect(() => {
        const fetchRecommendations = async () => {
            if (!article.category) return;
            const { articles: allArticles } = await getNewsFeed();
            const related = allArticles
                .filter(p => p.category === article.category && p.id !== article.id)
                .slice(0, 5);
            setRelatedArticles(related);
        };
        fetchRecommendations();
    }, [article.id, article.category]);

    const handleToggleSave = () => {
        savedNewsDispatch({ type: SAVED_NEWS_ACTIONS.TOGGLE_SAVE_ARTICLE, payload: article });
    };

    const handleShare = async () => {
        try {
            await Share.share({ message: `${article.headline} | Read more on TechNews App` });
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    const increaseFontSize = () => setFontSize(prev => Math.min(prev + 2, MAX_FONT_SIZE));
    const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 2, MIN_FONT_SIZE));

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => setIsReaderMode(!isReaderMode)} style={{ marginRight: 15 }}>
                       <Feather name="align-left" size={24} color={isReaderMode ? theme.primary : theme.text} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleShare} style={{ marginRight: 15 }}>
                       <Feather name="share" size={24} color={theme.text} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleToggleSave} style={{ marginRight: 10 }}>
                        <Feather
                            name="bookmark"
                            size={24}
                            color={isSaved ? theme.primary : theme.text}
                            fill={isSaved ? theme.primary : 'none'}
                        />
                    </TouchableOpacity>
                </View>
            ),
            title: article.source,
        });
    }, [navigation, isSaved, theme, article, isReaderMode]);
    
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const imageTranslate = scrollAnim.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT],
        outputRange: [0, -HEADER_MAX_HEIGHT / 2],
        extrapolate: 'clamp',
    });

    const imageScale = scrollAnim.interpolate({
        inputRange: [-HEADER_MAX_HEIGHT, 0, HEADER_MAX_HEIGHT],
        outputRange: [2, 1, 1],
        extrapolate: 'clamp',
    });
    
    const styles = getStyles(theme, fontSize);
    return (
        <SafeAreaView style={styles.container}>
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollAnim } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingBottom: isReaderMode ? 80 : 0 }}
            >
                {!isReaderMode && (
                    <View style={styles.headerContainer}>
                        <Animated.Image 
                            source={article.imageUrl} 
                            style={[ styles.mainImage, { transform: [{ translateY: imageTranslate }, { scale: imageScale }] } ]} 
                        />
                    </View>
                )}
                <View style={styles.contentContainer}>
                    <Text style={styles.category}>{article.category?.toUpperCase()}</Text>
                    <Text style={styles.headline}>{article.headline}</Text>
                    <View style={styles.metaContainer}>
                        <Text style={styles.metaText}>By {article.author}</Text>
                        <Text style={styles.metaText}>{formatDate(article.publishedDate)}</Text>
                    </View>
                    <Text style={styles.fullText}>{article.fullText}</Text>
                </View>
                
                {!isReaderMode && relatedArticles.length > 0 && (
                    <View style={styles.recommendationSection}>
                        <Text style={styles.recommendationTitle}>Related Stories</Text>
                        <FlatList
                            data={relatedArticles}
                            keyExtractor={(item) => item.id.toString()}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => <RelatedArticleCard item={item} />}
                            contentContainerStyle={{ paddingLeft: 20, paddingRight: 5 }}
                        />
                    </View>
                )}
            </Animated.ScrollView>
    
            {}
            {isReaderMode && (
                <View style={styles.readerModeFooter}>
                    <TouchableOpacity style={styles.fontControlButton} onPress={decreaseFontSize}>
                        <Text style={styles.fontControlText}>A-</Text>
                    </TouchableOpacity>
                    <View style={styles.fontSizeIndicator}>
                        <Text style={styles.fontSizeIndicatorText}>{fontSize}</Text>
                    </View>
                    <TouchableOpacity style={styles.fontControlButton} onPress={increaseFontSize}>
                        <Text style={styles.fontControlText}>A+</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

const getStyles = (colors, fontSize = DEFAULT_FONT_SIZE) => StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
    errorText: { fontSize: 18, color: colors.text },
    headerContainer: {
        height: HEADER_MAX_HEIGHT,
        overflow: 'hidden',
        alignItems: 'center',
    },
    mainImage: { 
        width: '100%', 
        height: HEADER_MAX_HEIGHT,
    },
    contentContainer: { 
        padding: 20, 
        backgroundColor: colors.background 
    },
    category: { fontSize: 12, fontWeight: 'bold', color: colors.primary, textTransform: 'uppercase', marginBottom: 8 },
    headline: { fontSize: 24, fontWeight: 'bold', color: colors.text, marginBottom: 10, lineHeight: 32 },
    metaContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: 15 },
    metaText: { fontSize: 14, color: colors.subtleText },
    fullText: { 
        fontSize: fontSize,
        color: colors.text, 
        lineHeight: fontSize * 1.6
    },
    recommendationSection: { paddingTop: 20, paddingBottom: 20 },
    recommendationTitle: { fontSize: 18, fontWeight: 'bold', color: colors.text, marginLeft: 20, marginBottom: 15 },

    readerModeFooter: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        height: 50,
        backgroundColor: colors.card,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    fontControlButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fontControlText: {
        fontSize: 18,
        color: colors.text,
        fontWeight: 'bold',
    },
    fontSizeIndicator: {
        paddingHorizontal: 15,
        height: '60%',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: colors.border,
    },
    fontSizeIndicatorText: {
        fontSize: 16,
        color: colors.primary,
        fontWeight: 'bold',
    },
});

export default NewsDetailScreen;