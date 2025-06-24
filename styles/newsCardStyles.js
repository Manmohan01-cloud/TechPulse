import { StyleSheet } from "react-native";

const getNewsCardStyles = (colors) => StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    height: 140,
  },
  imageContainer: {
    width: 110,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: "cover",
  },
  contentContainer: {
    padding: 12,
    flex: 1,
  },
  textContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  headline: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 6,
  },
  summary: {
    fontSize: 13,
    color: colors.subtleText,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  sourceText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.primary,
  },
  saveButton: {
    padding: 6,
  },
});

export default getNewsCardStyles;