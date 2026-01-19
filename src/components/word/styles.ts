import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  
  listItemContainer: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    margin: 4,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
  },
  listItemText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },

  
  headerContainer: {
    marginBottom: 24,
  },
  headerWord: {
    fontSize: 40,
    fontWeight: '700',
    marginBottom: 8,
  },
  headerPhonetic: {
    fontSize: 20,
    fontWeight: '500',
  },

  
  definitionContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  definitionNumber: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
    marginTop: 2,
  },
  definitionContent: {
    flex: 1,
  },
  definitionText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  definitionExample: {
    fontSize: 15,
    lineHeight: 22,
    fontStyle: 'italic',
    marginBottom: 8,
    paddingLeft: 12,
    borderLeftWidth: 3,
  },

  
  tagContainer: {
    marginTop: 8,
  },
  tagLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  tagText: {
    fontSize: 14,
    lineHeight: 20,
  },

  
  phoneticContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  phoneticText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  phoneticButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  
  meaningContainer: {
    marginBottom: 32,
  },
  meaningBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 16,
  },
  meaningPartOfSpeech: {
    fontSize: 14,
    fontWeight: '600',
  },
});
