import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Article } from '@/types';
import { Clock } from 'lucide-react-native';

interface FeaturedArticleProps {
  article: Article;
  onPress: () => void;
}

const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ article, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image 
        source={{ uri: article.imageUrl }}
        style={styles.image}
      />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{article.category}</Text>
        </View>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.summary} numberOfLines={2}>{article.summary}</Text>
        <View style={styles.footer}>
          <View style={styles.readTime}>
            <Clock size={14} color="white" />
            <Text style={styles.readTimeText}>{article.readTime} min read</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    height: 280,
    marginHorizontal: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    padding: 20,
    flex: 1,
    justifyContent: 'flex-end',
  },
  categoryContainer: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  category: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  summary: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    marginBottom: 12,
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readTimeText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 6,
  },
});

export default FeaturedArticle;