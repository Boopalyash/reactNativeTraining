import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Card} from 'react-native-elements';

const data = [
  {
    id: 1,
    icon: require('../Assets/Images/Lock_Icon.png'),
    title: 'Change Password',
  },
  {
    id: 2,
    icon: require('../Assets/Images/Pricing_Icon.png'),
    title: 'Fan Pricing',
  },
  {
    id: 3,
    icon: require('../Assets/Images/ContactSupport_Icon.png'),
    title: 'Contact Support',
  },
  {
    id: 4,
    icon: require('../Assets/Images/QuestionMark_Icon.png'),
    title: 'Help Center',
  },
  {
    id: 5,
    icon: require('../Assets/Images/settings_icon.png'),
    title: 'League Settings',
  },
  {id: 6, icon: require('../Assets/Images/Legal_Icon.png'), title: 'Legal'},
];
const ListItem = ({item}: any) => {
  return (
    <View>
      <TouchableOpacity
        style={{marginTop: 10, marginBottom: 10, flexDirection: 'row'}}>
        <Image source={item.icon} style={styles.Pencil} />
        <Text
          style={{
            marginLeft: 20,
            fontSize: 16,
            fontWeight: '500',
            color: 'black',
            marginTop: 3,
          }}>
          {item.title}
        </Text>
      </TouchableOpacity>
      {item.id !== 6 && <View style={styles.lineStyle} />}
    </View>
  );
};

const ProfileScreen = ({navigation}: any) => {
  const handlePress = () => {
    navigation.navigate('Home');
  };
  return (
    <View style={{backgroundColor: 'white'}}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View
        style={{
          flexDirection: 'row',
          marginTop: 40,
          justifyContent: 'space-between',
          paddingHorizontal: 30,
        }}>
        <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>
          Profile
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity>
            <Image
              source={require('../Assets/Images/notification_bell.png')}
              style={styles.Notification_bell}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../Assets/Images/profileIcon.png')}
          style={styles.image}
        />
        <View style={styles.badge}>
          <TouchableOpacity>
            <View style={styles.cameraContainer}>
              <Image
                source={require('../Assets/Images/Camera_Icon.png')}
                style={styles.cameraIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text style={styles.Nick}>Nick Williams</Text>
          <TouchableOpacity>
            <Image
              source={require('../Assets/Images/Pencil_Icon.png')}
              style={styles.Pencils}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{fontSize: 19, color: 'black'}}>
            nickwilliams@gmail.com
          </Text>
        </View>
        <View
          style={{
            fontSize: 12,
            marginTop: 10,
            backgroundColor: 'rgba(128,128,128,0.2)',
            borderRadius: 30,
            width: 80,
            height: 20,
            fontWeight: 'bold',
            marginBottom: 15,
          }}>
          <Text
            style={{
              color: '#2f77b6',
              textAlign: 'center',
              textAlignVertical: 'center',
              marginTop: 2,
            }}>
            Staff
          </Text>
        </View>
      </View>
      <View style={styles.ProfileCard}>
        <FlatList
          data={data}
          keyExtractor={item => item.title}
          renderItem={({item}) => <ListItem item={item} />}
        />
      </View>

      <TouchableOpacity style={styles.SignOutButton} onPress={handlePress}>
        <Text style={styles.SignOutText}>SIGN OUT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  Notification_bell: {
    width: 15,
    height: 18,
    margin: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 50,
    alignSelf: 'center',
    top: 10,
  },
  badge: {
    position: 'absolute',
    right: 160,
    top: 70,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  Pencil: {
    width: 22,
    height: 24,
    marginLeft: 10,
  },
  Pencils: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  ProfileCard: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  lineStyle: {
    borderWidth: 0.3,
    borderColor: '#e3e3e3',
    margin: 10,
  },
  cameraContainer: {
    borderRadius: 30,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    width: 20,
    height: 20,
  },
  SignOutButton: {
    alignSelf: 'center',
    textAlign: 'center',
    borderRadius: 30,
    backgroundColor: '#035dab',
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 150,
  },
  SignOutText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  Nick: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 30,
  },
});
