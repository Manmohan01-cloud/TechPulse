import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/themeContext';
import { useNavigation } from '@react-navigation/native';

const RelatedArticleCard = ({ item }) => {
    const { theme } = useTheme();
    const styles = getStyles(theme);
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.push('Details', { article: item });
    };

    const imageSource = item.imageUrl || null;

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.8}>
            <Image source={imageSource} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.headline} numberOfLines={3}>{item.headline}</Text>
                <Text style={styles.source}>{item.source}</Text>
            </View>
        </TouchableOpacity>
    );
};

const getStyles = (colors) => StyleSheet.create({
    container: {
        backgroundColor: colors.card,
        borderRadius: 10,
        width: 160,
        marginRight: 15,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 100,
        resizeMode: 'cover',
        backgroundColor: colors.background,
    },
    content: {
        padding: 10,
        flex: 1,
        justifyContent: 'space-between',
    },
    headline: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.text,
        flexGrow: 1,
    },
    source: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.primary,
        marginTop: 5,
    },
});

export default RelatedArticleCard;