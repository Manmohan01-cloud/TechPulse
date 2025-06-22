import React from 'react';
import { FlatList } from 'react-native';
import NewsCard from './NewsCard';

const NewsFeed = ({ articles, refreshControl, ListHeaderComponent }) => {
    return (
        <FlatList
            data={articles}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <NewsCard {...item} />
            )}
            refreshControl={refreshControl}
            ListHeaderComponent={ListHeaderComponent}
        />
    );
};

export default NewsFeed;