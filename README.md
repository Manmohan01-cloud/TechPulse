# TechPulse 📱

TechPulse is a modern, cross-platform mobile news application built with React Native and Expo. It provides the latest news in the tech world, offering a clean, user-friendly interface with features like user authentication, article saving, search, and a dark mode.

## ✨ Features

* **User Authentication**: Secure login and sign-up functionality.
* **Dynamic News Feed**: Fetches and displays the latest tech news from the Mediastack API.
* **Category Filtering**: Easily filter news articles by categories like AI, Software, Hardware, and more.
* **Article Search**: A dedicated search screen to find articles by keywords with search history support.
* **Detailed Article View**: A rich screen to read full articles, with a "Reader Mode" for an enhanced, clutter-free experience.
* **Save for Later**: Bookmark articles to read them later in a dedicated "Saved" section.
* **Profile Management**: Users can view and edit their profile, including their name and profile picture.
* **Light & Dark Mode**: A sleek theme-switching option for comfortable reading in any lighting condition.
* **Smooth UX**: Features like pull-to-refresh and shimmer placeholders provide a polished user experience.
* **Custom Alerts**: In-app alert system for notifications and confirmations.

### Demo Video
(https://youtu.be/MMxmg7gv2H8?feature=shared)

## 👥 Contributors

This project was a collaborative effort by the following members:

* **[MANMOHAN ROUTRAY]** - [24MDSC09]
* **[SHAMRITA PATRA]** - [24MDSD08]
* **[MADHUSMITA CHAND]** - [24MDSC85]
* **[K KRISHNA RAO DORA]** - [24MDSD11]

## 🛠 Tech Stack

The application is built using a modern stack of technologies:

* **Core**: React Native, Expo SDK
* **Navigation**: React Navigation (Bottom Tabs, Native Stack)
* **State Management**: React Context API (for Auth, Theme, Saved News, and Alerts)
* **HTTP Client**: Axios for making API requests
* **Local Storage**: AsyncStorage for session management and theme persistence
* **Icons**: `@expo/vector-icons`
* **UI Components**: Custom-built components for a consistent look and feel.

## 📁 Project Structure

The project follows a standard feature-based directory structure to keep the code organized and maintainable.

```
/
├── assets/             # Images and other static assets
├── components/         # Reusable UI components (e.g., NewsCard, ShimmerPlaceholder)
│   └── common/
├── constants/          # App-wide constants (API keys, endpoints)
├── contexts/           # React Context providers for global state management
├── screens/            # Top-level screens for the application
│   └── navigation/     # Navigators for specific screen groups
├── services/           # API-related logic (e.g., authService, newsService)
├── styles/             # Reusable styling modules
├── utils/              # Utility functions (e.g., axios client setup)
├── App.js              # Main application component
├── app.json            # Expo configuration file
└── package.json        # Project dependencies and scripts
```

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (LTS version recommended)
* NPM
* Expo Go app on your mobile device (for testing)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Manmohan01-cloud/TechPulse
    cd TechPulse
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up API Keys:**
    This app uses the **Mediastack API** to fetch news. You'll need to get a free API key from their website.
    * Open the constants file: `constants/appContants.js`.
    * Replace the placeholder value for `NEWS_API_KEY` with your own key.

    ```javascript
    // in constants/appContants.js
    export const NEWS_API_KEY = "YOUR_MEDIASTACK_API_KEY"; //Mediastack key
    ```

4.  **Run the application:**
    ```sh
    npm start
    ```
    This will start the Metro bundler. You can then scan the QR code with the Expo Go app on your iOS or Android device to run the app.

5.** 🐛 Troubleshooting**

If you encounter issues with package versions or dependencies after installation, you can run the following command to automatically fix them and ensure all packages are compatible with your Expo SDK version:

```sh
npx expo install --fix
```
    
