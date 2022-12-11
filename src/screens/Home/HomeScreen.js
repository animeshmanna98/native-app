import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getCategoryName } from "../../data/MockDataAPI";
import Loader from "../../components/Loader";

export default function HomeScreen({navigation,route}) {

  const [products,SetProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const loadData = async () => {
    try {
     const response = await fetch('http://sangita.iosx.in:9000/api/product',{
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: {
       "keyword": ""
      }
     });
     const json = await response.json();
     SetProducts(json.data);
   } catch (error) {
     console.error(error);
   } finally {
    setLoading(false);
   }
  }
  
  useEffect(()=>{
  loadData();
  },[route?.params?.json]);

  const onPressRecipe = async(item) => {
    try {
      const response = await fetch('http://sangita.iosx.in:9000/api/product/delete',{
       method: 'post',
       headers: {'Content-Type':'application/json'},
       body: JSON.stringify({
        "id": item._id
        })
      });
      const json = await response.json();
     const filterData = products.filter((it,i)=>it._id !== item._id);
      SetProducts(filterData);
    } catch (error) {
      //console.error(error);
    } finally {
     
    }
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.image }} />
        <Text style={styles.title}>{item.name}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      {isLoading &&  <Loader/>}
      {!isLoading && <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={products} renderItem={renderRecipes} keyExtractor={(item) => `${item._id}`} /> }
    </View>
  );
}
