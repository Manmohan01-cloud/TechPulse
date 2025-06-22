import { StyleSheet } from "react-native";

const getSearchScreenStyles = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingTop: 15,
        paddingHorizontal: 15,
        paddingBottom: 10,
        backgroundColor: colors.card,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background,
        borderRadius: 10,
        height: 45,
        paddingHorizontal: 12,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: colors.text,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: colors.subtleText,
        textAlign: 'center',
        marginTop: 10,
    },
    historyContainer: {
        flex: 1,
    },
    historyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 5,
    },
    historyTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text,
    },
    clearButton: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: '600'
    },
    historyItem: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    historyTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    historyIcon: {
        marginRight: 12,
    },
    historyText: {
        fontSize: 15,
        color: colors.subtleText,
    }
});

export default getSearchScreenStyles;