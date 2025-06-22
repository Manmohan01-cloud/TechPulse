import React, { createContext, useReducer, useContext } from "react";

export const SavedNewsContext = createContext({ savedNews: [] });

export const SAVED_NEWS_ACTIONS = Object.freeze({
  TOGGLE_SAVE_ARTICLE: 'TOGGLE_SAVE_ARTICLE',
});

const savedNewsReducer = (state, action) => {
  switch (action.type) {
    case SAVED_NEWS_ACTIONS.TOGGLE_SAVE_ARTICLE: {
      const articleToToggle = action.payload;
      const existingArticle = state.find(item => item.id === articleToToggle.id);

      if (existingArticle) {
        return state.filter(item => item.id !== articleToToggle.id);
      } else {
        return [...state, articleToToggle];
      }
    }

    default:
      return state;
  }
};

const SavedNewsProvider = ({ children }) => {
  const [savedNews, dispatch] = useReducer(savedNewsReducer, []);

  return (
    <SavedNewsContext.Provider value={{ savedNews, dispatch }}>
      {children}
    </SavedNewsContext.Provider>
  );
};

export const useSavedNews = () => {
  return useContext(SavedNewsContext);
};

export default SavedNewsProvider;