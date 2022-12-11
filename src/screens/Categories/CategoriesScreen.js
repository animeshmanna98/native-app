import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./styles";
import { getNumberOfRecipes } from "../../data/MockDataAPI";
import MenuImage from "../../components/MenuImage/MenuImage";
import Loader from "../../components/Loader";

export default function CategoriesScreen({navigation, route}) {
  const [isLoading, setLoading] = useState(true);
  const [categories,SetCategories] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: "center",
        flex: 1,
      },
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
     const response = await fetch('http://sangita.iosx.in:9000/api/category',{
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: {
       "keyword": ""
      }
     });
     const json = await response.json();
     SetCategories(json.data);
   } catch (error) {
     console.error(error);
   } finally {
    setLoading(false);
   }
  }
  
  useEffect(()=>{
  loadData();
  //console.log(route.params.json);
  },[route?.params?.json]);

  const onPressCategory = async(item) => {
    try {
      const response = await fetch('http://sangita.iosx.in:9000/api/category/delete',{
       method: 'post',
       headers: {'Content-Type':'application/json'},
       body: JSON.stringify({
        "id": item._id
        })
      });
      const json = await response.json();
      console.log(json)
      const filterData = categories.filter((it,i)=>it._id !== item._id);
      SetCategories(filterData);
    } catch (error) {
      //console.error(error);
    } finally {
     
    }
  };

  const renderCategory = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressCategory(item)}>
      <View style={styles.categoriesItemContainer}>
        <Image style={styles.categoriesPhoto} source={{ uri: item.image }} />
        <Text style={styles.categoriesName}>{item.slug}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
       {isLoading &&  <Loader/>}
       {!isLoading && <FlatList data={categories} renderItem={renderCategory} keyExtractor={(item) => `${item._id}`} /> }
    </View>
  );
}
