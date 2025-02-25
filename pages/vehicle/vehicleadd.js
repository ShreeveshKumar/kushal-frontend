import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, Button, useWindowDimensions } from 'react-native';
import tw from 'twrnc';
import Uploadimageicon from "../../assets/imageupload.png";
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import axios from 'axios';
// import uploadImageFromDevice from '../../components/ImageFirebase/uploadImageFromDevice';
// import getBlobFroUri from '../../components/ImageFirebase/getBlobFroUri';
// import hasMediaLibraryPermissionGranted from '../../components/ImageFirebase/hasMediaLibraryPermissionGranted';
// import manageFileUpload from '../../components/ImageFirebase/manageFileUpload';


const AddVehicleScreen = () => {

  const [imgURI, setImageURI] = React.useState(null);

  const [isUploading, setIsUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [remoteURL, setRemoteURL] = React.useState("");


  const [error, setError] = React.useState(null);
  const { width } = useWindowDimensions();

  const handleLocalImageUpload = async () => {
    const fileURI = await uplodImageFromDevice();

    if (fileURI) {
      setImageURI(fileURI);
    }
  };

  const onStart = () => {
    setIsUploading(true);
  };

  const onProgress = (progress) => {
    setProgress(progress);
  };
  const onComplete = (fileUrl) => {
    setRemoteURL(fileUrl);
    setIsUploading(false);
    setImageURI(null);
  };

  const onFail = (error) => {
    setError(error);
    setIsUploading(false);
  };
  const handleCloudImageUpload = async () => {
    if (!imgURI) return;

    let fileToUpload = null;

    const blob = await getBlobFromUri(imgURI);

    await manageFileUpload(blob, { onStart, onProgress, onComplete, onFail });
  };



  const [dateopen, setdateopen] = useState(false);
  const [date, setDate] = useState(new Date())




  const [vehicles, setVehicles] = useState([]);

  const [newVehicle, setNewVehicle] = useState({
    name: '',
    licenseNumber: '',
    description: '',
    lastServiced: '2025-05-05',
  });




  const handleVehiclesave = async () => {
    try {
      const user = await AsyncStorage.getItem(("user"));
      const userdetail = JSON.parse(user);
      console.log(userdetail.token);

      const response = await axios.post("https://kushal-backend.onrender.com/api/vehicle/addvehicle", newVehicle, {
        headers: {
          'Authorization': `Bearer ${userdetail.token}`
        }
      });
      const result = response.data;
      if (result.status === 200) {
        Toast.show({
          type: 'success',
          text2: 'Vehicle added successfully 👋',
        });
      } else {
        Toast.show({
          type: 'error',
          text2: 'Vehicle not added ',
        });
      }

    } catch (err) {
      console.log(err.message);

    }
  }
  return (
    <SafeAreaView>

      <ScrollView contentContainerStyle={tw`p-5 bg-gray-100`}>
        {/* Form Section */}
        <View style={tw`mb-5 bg-white p-5 rounded-lg shadow-lg`}>
          <Text style={tw`text-xl font-bold mb-3`}>Add Vehicle</Text>

          {/* Image */}
          <View style={tw`flex justify-center align-middle items-center`}>

            <Image
              source={require("../../assets/imageupload.png")}
              style={tw`w-40 h-40 `}
            />
          </View>

          <TextInput
            style={tw`border border-gray-300 rounded-lg p-3 mb-3`}
            placeholder="Vehicle Name"
            value={newVehicle.name}
            onChangeText={(text) => setNewVehicle({ ...newVehicle, name: text })}
          />

          <TextInput
            style={tw`border border-gray-300 rounded-lg p-3 mb-3`}
            placeholder="License Number"
            value={newVehicle.licenseNumber}
            onChangeText={(text) =>
              setNewVehicle({ ...newVehicle, licenseNumber: text })
            }
          />

          <TextInput
            style={tw`border border-gray-300 rounded-lg p-3 mb-3`}
            placeholder="Description"
            value={newVehicle.description}
            onChangeText={(text) =>
              setNewVehicle({ ...newVehicle, description: text })
            }
          />

          <TouchableOpacity onPress={() => setdateopen(true)}>
            <Text>Select Date</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-lg p-3 mb-3`}
              placeholder="Last Serviced (YYYY-MM-DD)"
              value={newVehicle.lastServiced} // Ensure it's always a string
              editable={false} // Prevent direct manual input
            />
          </TouchableOpacity>



          {/* Add Button */}
          <TouchableOpacity
            style={tw`bg-blue-500 p-4 rounded-lg`}
            onPress={handleVehiclesave}
          >
            <Text style={tw`text-white text-center font-bold text-lg`}>
              Add Vehicle
            </Text>
          </TouchableOpacity>
        </View>





        {/* List of Vehicles */}

        {/* <Text>Attach and upload image</Text>
        {Boolean(imgURI) && (
          <View>
            <Image
              source={{ uri: imgURI }}
              resizeMode="contain"
              style={{ width, height: width }}
            />
          </View>
        )}

        {!isUploading && (
          <View style={styles.row}=>
            <AntDesign
              name="addfile"
              size={36}
              color={imgURI ? "green" : "black"}
              onPress={handleLocalImageUpload}
            />

            {Boolean(imgURI) && (
              <Feather
                name="upload-cloud"
                size={36}
                color="black"
                onPress={handleCloudImageUpload}
              />
            )}
          </View>
        )}

        {isUploading && (
          <View style={styles.uploadProgressContainer}>
            <Text> Upload {progress} of 100% </Text>
          </View>
        )}

        {Boolean(remoteURL) && (
          <View style={{ paddingVertical: 20 }}>
            <Text>
              Image has been uploaded at
              <Text style={{ color: "blue" }}> {remoteURL} </Text>
            </Text>
          </View>
        )}
 */}


      </ScrollView>
    </SafeAreaView >

  );
};

export default AddVehicleScreen;
