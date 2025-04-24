import React, { useState } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Modal
} from 'react-native';
import { ArrowLeft, X } from 'lucide-react-native';
import { useArticles } from '@/hooks/useData';
import { Colors } from '@/constants/Colors';
import FeaturedArticle from '@/components/Articles/FeaturedArticle';
import ArticleCard from '@/components/Articles/ArticleCard';
import { Article } from '@/types';

export default function LearnScreen() {
  const { articles, isLoading } = useArticles();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isArticleModalVisible, setIsArticleModalVisible] = useState(false);
  
  const featuredArticle = articles.length > 0 ? articles[0] : null;
  const otherArticles = articles.length > 0 ? articles.slice(1) : [];
  
  const handleArticlePress = (article: Article) => {
    setSelectedArticle(article);
    setIsArticleModalVisible(true);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Learn</Text>
        </View>
        
        <View style={styles.content}>
          {/* Featured Article */}
          {featuredArticle && (
            <FeaturedArticle
              article={featuredArticle}
              onPress={() => handleArticlePress(featuredArticle)}
            />
          )}
          
          {/* Categories */}
          <View style={styles.categoriesContainer}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesScrollContent}
            >
              <TouchableOpacity style={[styles.categoryButton, styles.activeCategory]}>
                <Text style={[styles.categoryText, styles.activeCategoryText]}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryButton}>
                <Text style={styles.categoryText}>Education</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryButton}>
                <Text style={styles.categoryText}>Nutrition</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryButton}>
                <Text style={styles.categoryText}>Fitness</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryButton}>
                <Text style={styles.categoryText}>Wellness</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          
          {/* Articles List */}
          <View style={styles.articlesContainer}>
            <Text style={styles.sectionTitle}>Latest Articles</Text>
            {otherArticles.map(article => (
              <ArticleCard
                key={article.id}
                article={article}
                onPress={() => handleArticlePress(article)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      
      {/* Article Modal */}
      <Modal
        visible={isArticleModalVisible}
        animationType="slide"
        onRequestClose={() => setIsArticleModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => setIsArticleModalVisible(false)}
              style={styles.backButton}
            >
              <ArrowLeft size={24} color={Colors.gray800} />
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>Article</Text>
            <View style={{ width: 24 }} />
          </View>
          
          <ScrollView style={styles.articleContent}>
            {selectedArticle && (
              <>
                <Text style={styles.articleTitle}>{selectedArticle.title}</Text>
                <View style={styles.articleMeta}>
                  <View style={styles.categoryContainer}>
                    <Text style={styles.categoryLabel}>{selectedArticle.category}</Text>
                  </View>
                  <Text style={styles.readTime}>{selectedArticle.readTime} min read</Text>
                </View>
                <Text style={styles.articleBody}>
                  {selectedArticle.content}
                  {/* Adding more content to make the article longer */}
                  {'\n\n'}
                  Understanding your menstrual cycle is crucial for monitoring your overall health. It can help you identify patterns in your mood, energy levels, and physical symptoms throughout the month.
                  {'\n\n'}
                  The average menstrual cycle lasts about 28 days, but it can range from 21 to 35 days. The first day of your period is considered day one of your cycle.
                  {'\n\n'}
                  During the follicular phase, which begins on day one of your period, your body prepares for ovulation. Estrogen levels rise, causing the lining of your uterus to thicken.
                  {'\n\n'}
                  Ovulation typically occurs around day 14 of a 28-day cycle, when an egg is released from one of your ovaries. This is when you're most fertile.
                  {'\n\n'}
                  During the luteal phase, which follows ovulation, progesterone levels rise. If the egg isn't fertilized, progesterone levels drop, leading to menstruation.
                  {'\n\n'}
                  By tracking your cycle, you can better understand your body's patterns and prepare for symptoms that may arise during different phases.
                </Text>
              </>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray50,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.gray800,
    fontFamily: 'Poppins-Bold',
  },
  content: {
    paddingBottom: 24,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gray800,
    marginBottom: 12,
    fontFamily: 'Poppins-SemiBold',
  },
  categoriesScrollContent: {
    paddingRight: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.gray100,
    marginRight: 8,
  },
  activeCategory: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.gray700,
    fontFamily: 'Poppins-Medium',
  },
  activeCategoryText: {
    color: 'white',
  },
  articlesContainer: {
    paddingHorizontal: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  backButton: {
    padding: 8,
  },
  modalHeaderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.gray800,
    fontFamily: 'Poppins-SemiBold',
  },
  articleContent: {
    padding: 16,
  },
  articleTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.gray900,
    marginBottom: 12,
    fontFamily: 'Poppins-Bold',
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  categoryContainer: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 12,
  },
  categoryLabel: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  readTime: {
    fontSize: 14,
    color: Colors.gray600,
    fontFamily: 'Poppins-Regular',
  },
  articleBody: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.gray700,
    fontFamily: 'Poppins-Regular',
  },
});