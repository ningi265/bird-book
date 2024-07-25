import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import birds from '../data/birdData'; // Ensure this data file exists
import SearchBar from '../components/SearchBar';
import PhotoSearch from '../components/PhotoSearch';

const carouselImages = [
  require('../assets/images/bird1.jpg'),
  require('../assets/images/bird2.jpg'),
  require('../assets/images/bird3.jpg'),
  require('../assets/images/bird4.jpg'),
];

const categories = ['All', 'Sparrows', 'Robins', 'Eagles', 'Parrots', 'Owls', 'Hummingbirds'];

const BirdListScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [imageLabels, setImageLabels] = useState([]);
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width } = Dimensions.get('window');
  const ITEM_WIDTH = width * 0.98; // Adjust the width as needed
  const ITEM_MARGIN = 10; // Adjust spacing if needed

  useEffect(() => {
    const interval = setInterval(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({
          offset: scrollX._value + ITEM_WIDTH,
          animated: true,
        });
      }
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [scrollX, ITEM_WIDTH]);

  const renderCarouselItem = ({ item }) => (
    <View style={[styles.carouselItem, { width: ITEM_WIDTH }]}>
      <Image source={item} style={styles.carouselImage} />
    </View>
  );

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const renderGridCard = ({ item }) => (
    <View style={styles.gridCard}>
      <Image source={item.image} style={styles.gridCardImage} />
      <Text style={styles.gridCardTitle}>{item.name}</Text>
      <Text style={styles.gridCardDescription}>{item.description}</Text>
    </View>
  );

  const filteredBirds = birds.filter((bird) => 
    (searchQuery ? bird.name.toLowerCase().includes(searchQuery.toLowerCase()) : true) &&
    (imageLabels.length ? imageLabels.some(label => bird.name.toLowerCase().includes(label)) : true) &&
    (selectedCategory === 'All' || bird.category === selectedCategory)
  );

  const handleSearch = (labels) => {
    setImageLabels(labels);
    setSearchQuery('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <PhotoSearch onSearch={handleSearch} />
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.menuItem, selectedCategory === item && styles.selectedMenuItem]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text style={styles.menuText}>{item}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          style={styles.menuBar}
        />
      </View>
      <FlatList
        ListHeaderComponent={selectedCategory === 'All' && (
          <FlatList
            horizontal
            data={carouselImages.concat(carouselImages)} // Duplicate images for infinite scroll
            renderItem={renderCarouselItem}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}
            ref={flatListRef}
            pagingEnabled
            snapToAlignment="center"
            snapToInterval={ITEM_WIDTH + 2 * ITEM_MARGIN} // Adjust spacing for the carousel
            onScroll={onScroll}
            ListHeaderComponent={<View style={{ width: ITEM_MARGIN }} />} // Left spacing
            ListFooterComponent={<View style={{ width: ITEM_MARGIN }} />} // Right spacing
          />
        )}
        data={filteredBirds}
        keyExtractor={(item) => item.name}
        renderItem={renderGridCard}
        numColumns={2}
        columnWrapperStyle={styles.grid}
        style={styles.gridContainer}
        contentContainerStyle={{ paddingTop: 150 }} // Adjust padding to avoid overlap
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fixedHeader: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    backgroundColor: '#fff',
  },
  menuBar: {
    flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  menuItem: {
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  selectedMenuItem: {
    backgroundColor: '#007BFF',
  },
  menuText: {
    color: '#333',
    fontSize: 16,
  },
  carousel: {
    height: 200,
    marginVertical: 10,
    padding: 10,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  carouselItem: {
    marginHorizontal: 10,
  },
  gridContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  grid: {
    justifyContent: 'space-between',
  },
  gridCard: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  gridCardImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  gridCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  gridCardDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default BirdListScreen;
