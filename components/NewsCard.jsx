import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import getNewsCardStyles from "../styles/newsCardStyles";
import { Feather } from '@expo/vector-icons';
import { useSavedNews, SAVED_NEWS_ACTIONS } from '../contexts/savedNewsContext';
import { useTheme } from '../contexts/themeContext';
import { useAlert } from '../contexts/AlertContext';
import { useNavigation } from '@react-navigation/native';

const NewsCard = (props) => {
  const { id, imageUrl, headline, summary, source } = props;
  const { theme } = useTheme();
  const styles = getNewsCardStyles(theme);
  const navigation = useNavigation();

  const { savedNews, dispatch } = useSavedNews();
  const { showAppAlert } = useAlert();

  const isSaved = savedNews.some(item => item.id === id);

  const handleToggleSave = (e) => {
    e.stopPropagation();
    dispatch({
        type: SAVED_NEWS_ACTIONS.TOGGLE_SAVE_ARTICLE,
        payload: props
    });
    if (isSaved) {
      showAppAlert({title: 'Unsaved', message: `Article removed from your saved list.`, type: 'info'});
    } else {
      showAppAlert({title: 'Saved!', message: `Article has been saved for later.`, type: 'success'});
    }
  };

  const handlePress = () => {
    navigation.navigate('Home', {
      screen: 'Details',
      params: { article: props },
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.8}>
        <View style={styles.imageContainer}>
            <Image source={imageUrl} style={styles.image} />
        </View>

        <View style={styles.contentContainer}>
            <View style={{ flex: 1 }}>
                <Text style={styles.headline} numberOfLines={2}>{headline}</Text>
                <Text style={styles.summary} numberOfLines={3}>{summary}</Text>
            </View>
            
            <View style={styles.footer}>
                <Text style={styles.sourceText}>{source}</Text>
                <TouchableOpacity style={styles.saveButton} onPress={handleToggleSave}>
                    <Feather
                        name="bookmark"
                        size={20}
                        color={isSaved ? theme.primary : theme.subtleText}
                        fill={isSaved ? theme.primary : 'none'}
                    />
                </TouchableOpacity>
            </View>
        </View>
    </TouchableOpacity>
  );
};

export default NewsCard;