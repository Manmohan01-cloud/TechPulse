import React from 'react';
import { View, StyleSheet } from 'react-native';
import ShimmerPlaceholder from './ShimmerPlaceholder';

const NewsCardPlaceholder = () => {
    return (
        <View style={styles.container}>
            <ShimmerPlaceholder style={styles.image} />
            <View style={styles.content}>
                <ShimmerPlaceholder style={[styles.line, { width: '80%' }]} />
                <ShimmerPlaceholder style={[styles.line, { width: '60%' }]} />
                <View style={{marginTop: 10}}>
                    <ShimmerPlaceholder style={[styles.line, styles.smallLine, { width: '95%' }]} />
                    <ShimmerPlaceholder style={[styles.line, styles.smallLine, { width: '90%' }]} />
                    <ShimmerPlaceholder style={[styles.line, styles.smallLine, { width: '70%' }]} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: '#eee',
        flexDirection: 'row',
        overflow: 'hidden',
        height: 140,
    },
    image: {
        width: 100,
        height: '100%',
    },
    content: {
        padding: 12,
        flex: 1,
    },
    line: {
        height: 18,
        borderRadius: 4,
        marginBottom: 8,
    },
    smallLine: {
        height: 12,
        marginBottom: 6
    }
});

export default NewsCardPlaceholder;