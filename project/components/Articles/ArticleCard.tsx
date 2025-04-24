import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Article } from '@/types';
import { Clock } from 'lucide-react-native';

interface ArticleCardProps {
  article: Article;
  onPress: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.card}
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
        <View style={styles.footer}>
          <View style={styles.readTime}>
            <Clock size={12} color="white" />
            <Text style={styles.readTimeText}>{article.readTime} min read</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  categoryContainer: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  category: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  readTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readTimeText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 4,
  },
});

export default ArticleCard;