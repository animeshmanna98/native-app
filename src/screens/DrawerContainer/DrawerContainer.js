import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import MenuButton from "../../components/MenuButton/MenuButton";

export default function DrawerContainer(props) {
  const { navigation } = props;
  return (
    <View style={styles.content}>
      <View style={styles.container}>
       
      <MenuButton
          title="ADD CATEGORY"
          source={require("../../../assets/icons/category.png")}
          onPress={() => {
            navigation.navigate("AddCategory");
            navigation.closeDrawer();
          }}
        />

        <MenuButton
          title="CATEGORIES"
          source={require("../../../assets/icons/category.png")}
          onPress={() => {
            navigation.navigate("Categories");
            navigation.closeDrawer();
          }}
        />

    <MenuButton
          title="ADD PRODUCT"
          source={require("../../../assets/icons/home.png")}
          onPress={() => {
            navigation.navigate("AddProduct");
            navigation.closeDrawer();
          }}
        />

       <MenuButton
          title="PRODUCTS"
          source={require("../../../assets/icons/home.png")}
          onPress={() => {
            navigation.navigate("Home");
            navigation.closeDrawer();
          }}
        />

    

        <MenuButton
          title="SEARCH"
          source={require("../../../assets/icons/search.png")}
          onPress={() => {
            navigation.navigate("Search");
            navigation.closeDrawer();
          }}
        />
      </View>
    </View>
  );
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};
