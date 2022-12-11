import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Platform,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default function AddProduct({navigation}) {
  const [name, onChangeName] = useState("");
  const [price, onChangePrice] = useState("");
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState(null);
  const [value, setValue] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [categories,SetCategories] = useState([]);
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
     let push = [];
     json.data.map((it,i)=>{
        push.push({'label':it.slug,"value":it._id})
     })
     SetCategories(push);
   } catch (error) {
     console.error(error);
   } finally {
   }
  }

  const data = categories;

  


 useEffect(()=>{
  setImage(null);
  onChangeName("");
  loadData();
 },[])


  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
        base64:true,
      });

      if (!result.canceled) {
      
        setImage(result.uri);
        setBase64(result.base64);
        saveToFile();
      } else
        Alert.alert("Delete", "Are you sure you want to delte the image", [
          { text: "Yes", onPress: () => setImage(null) },
          { text: "No" },
        ]);
    } catch (error) {
      console.log("error reading an image");
    }
  };


  const saveProuct = async () => {
    setLoading(true);
    try {
     const response = await fetch('http://sangita.iosx.in:9000/api/product/add',{
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body:  JSON.stringify({
       "name": name,
       "price" : price,
       "category" :value,
       "image" : 'data:image/jpeg;base64,'+base64,
      })
     });
     const json = await response.json();
     navigation.navigate('Home',{json})
   } catch (error) {
     console.error(error);
   } finally {
    setLoading(false);
   }
  }

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        placeholder="Enter Product Name"
        value={name}
      />

      <TextInput
        style={styles.input}
        onChangeText={onChangePrice}
        placeholder="Enter Product Price"
        value={price}
      />

<Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Category"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
        />

      <Button title="Choose Image" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
      )}
<Text></Text>
{isLoading && <Button title="Saving..." />}
{!isLoading && <Button title="Save" style={styles.buttonStyle} onPress={saveProuct}/> }
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
      },
      icon: {
        marginRight: 5,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
  buttonStyle: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#DDDDDD",
    padding: 5,
  },
  textStyle: {
    padding: 10,
    color: "black",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  text: {
    flex: 1,
  },
});
