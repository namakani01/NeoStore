import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../assests/styles/Metrics';

const ProductList = props => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const categoryIds = [1, 2, 3, 4];

  const fetchProducts = async () => {
    const allProducts = [];

    for (const categoryId of categoryIds) {
      try {
        const response = await axios.get(
          `http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id=${categoryId}`,
        );
        allProducts.push(...response.data.data);
      } catch (error) {
        console.error(
          `Error fetching products for category ${categoryId}:`,
          error,
        );
      }
    }

    setProducts(allProducts);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  console.log('ff', filteredProducts);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2E6BC6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={{height: '100%'}}>
        <View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <FlatList
          data={filteredProducts}
          numColumns={2}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.productItem}
              onPress={() =>
                props.navigation.navigate('ProductDetails', {id: item.id})
              }>
              <Image
                style={styles.productImage}
                source={{uri: item.product_images}}
              />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.productName}>
                {item.name}
              </Text>
              <StarRatingDisplay
                style={styles.rating}
                rating={item.rating}
                color="#FAAC58"
                starSize={19.5}
              />

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: verticalScale(5),
                  justifyContent: 'center',
                }}>
                <Text style={styles.productPrice}>{`₹${item.cost}`}</Text>

                <Text style={styles.cutoffPrice}>{`₹${item.cost}`}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    height: verticalScale(40),
    borderColor: 'grey',
    borderWidth: 1,
    margin: horizontalScale(14),
    borderRadius: moderateScale(6),
    paddingHorizontal: horizontalScale(15),
    marginBottom: verticalScale(10),
    fontWeight: '700',
  },
  productItem: {
    borderWidth: 1,
    height: verticalScale(205),
    flex: 1,
    margin: verticalScale(12),
    borderRadius: moderateScale(12),
    backgroundColor: 'white',
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    // marginBottom : 20
  },
  productImage: {
    marginTop: verticalScale(13),
    height: verticalScale(90),
    width: '100%',
    resizeMode: 'contain',
  },
  productName: {
    marginTop: verticalScale(10),
    fontSize: moderateScale(14.5),
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
  },
  rating: {
    marginVertical: verticalScale(6.5),
    alignSelf: 'center',
  },
  productPrice: {
    fontSize: moderateScale(15),
    color: '#2E6BC6',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cutoffPrice: {
    marginLeft: horizontalScale(15),
    fontSize: moderateScale(15),
    textDecorationLine: 'line-through',
  },
});

export default ProductList;
