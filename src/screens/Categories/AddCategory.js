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
export default function AddCategory({navigation}) {
  const [name, onChangeName] = useState("");
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState(null);
  const [isLoading, setLoading] = useState(false);
 useEffect(()=>{
  setImage(null);
  onChangeName("");
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


  const saveCategory = async () => {
    setLoading(true);
    try {
     const response = await fetch('http://sangita.iosx.in:9000/api/category/add',{
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body:  JSON.stringify({
       "category_type" : "main",
       "name": name,
       "status" : true,
       "image" : 'data:image/jpeg;base64,'+base64,
      })
     });
     const json = await response.json();
     navigation.navigate('Categories',{json})
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
        placeholder="Enter Category Name"
        value={name}
      />

      <Button title="Choose Image" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
      )}
<Text></Text>
{isLoading && <Button title="Saving..." />}
{!isLoading && <Button title="Save" style={styles.buttonStyle} onPress={saveCategory}/>}
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
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
