import axios from 'axios';
import { NEWS_API_BASE_URL, NEWS_API_KEY, apiEndpoints, TECH_CATEGORIES } from '../constants/appContants';

const newsApiClient = axios.create({
  baseURL: NEWS_API_BASE_URL,
});

const getArticleCategory = (headline) => {
    if (!headline) return 'General Tech';
    const lowerHeadline = headline.toLowerCase();
    for (const category in TECH_CATEGORIES) {
        if (TECH_CATEGORIES[category].some(keyword => lowerHeadline.includes(keyword.toLowerCase()))) {
            return category;
        }
    }
    return 'General Tech';
};

const mapApiArticleToAppArticle = (apiArticle, index) => {
    const placeholderImage = require('../assets/news/gemini_ai.png');
    
    return {
        id: `${apiArticle.source}_${apiArticle.published_at}_${index}`,
        headline: apiArticle.title,
        summary: apiArticle.description,
        fullText: apiArticle.description,
        source: apiArticle.source,
        author: apiArticle.author || 'Unknown Author',
        publishedDate: apiArticle.published_at,
        imageUrl: apiArticle.image ? { uri: apiArticle.image } : placeholderImage,
        category: getArticleCategory(apiArticle.title),
        tags: [apiArticle.source],
        articleUrl: apiArticle.url,
    };
}

export const getNewsFeed = async () => {
    try {
        const response = await newsApiClient.get(apiEndpoints.NEWS, {
            params: {
                access_key: NEWS_API_KEY,
                categories: 'technology',
                languages: 'en',
                limit: 100,
                sort: 'published_desc',
            }
        });

        if (response.data && response.data.data) {
            const allKeywords = Object.values(TECH_CATEGORIES).flat().map(k => k.toLowerCase());
            
            const relevantArticles = response.data.data.filter(article => {
                const lowerTitle = (article.title || '').toLowerCase();
                const lowerDescription = (article.description || '').toLowerCase();
                return allKeywords.some(keyword => lowerTitle.includes(keyword) || lowerDescription.includes(keyword));
            });

            const articles = relevantArticles
                .filter(article => article.title && article.image && article.description)
                .map(mapApiArticleToAppArticle);

            return { articles };
        }
        return { articles: [] };
    } catch (error) {
        if (error.response && error.response.data) {
            console.error("Error fetching from Mediastack:", error.response.data);
        } else {
            console.error("Failed to fetch live news from Mediastack:", error.message);
        }
        return { articles: [] };
    }
};