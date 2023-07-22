import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';

const data = [
  {
    id: 1,
    icon: require('../assets/images/Lock_Icon.png'),
    title: 'Change Password',
  },
  {
    id: 2,
    icon: require('../assets/images/Pricing_Icon.png'),
    title: 'Fan Pricing',
  },
  {
    id: 3,
    icon: require('../assets/images/ContactSupport_Icon.png'),
    title: 'Contact Support',
  },
  {
    id: 4,
    icon: require('../assets/images/QuestionMark_Icon.png'),
    title: 'Help Center',
  },
  {
    id: 5,
    icon: require('../assets/images/settings_icon.png'),
    title: 'League Settings',
  },
  {id: 6, icon: require('../assets/images/Legal_Icon.png'), title: 'Legal'},
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
  const route = useRoute();
  const gloversPostProfile = useSelector(
    (state: any) => state.glover.gloverDetails.user,
  );
  console.log('Profile==============', gloversPostProfile);

  const updatedData1 = route.params?.updatedData;

  useEffect(() => {
    if (updatedData1) {
      console.log(
        'Updated Data^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^:',
        updatedData1,
      );
    }
  }, [updatedData1]);
  const handlePress = () => {
    navigation.navigate('SignIn');
  };

  const handlePressPencil = () => {
    navigation.navigate('EditProfile');
  };

  const handleAudio = () => {
    navigation.navigate('ProfileAudio');
  };

  return (
    <View style={styles.ReturnView}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.ProfileBellView}>
        <Text style={styles.ProfileText}>Profile</Text>
        <View style={styles.NotificationBellView}>
          <TouchableOpacity onPress={handleAudio}>
            <Image
              source={require('../assets/images/notification_bell.png')}
              style={styles.Notification_bell}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.ProfileIconView}>
        <Image
          source={require('../assets/images/profileIcon.png')}
          style={styles.image}
        />
        <View style={styles.badge}>
          <TouchableOpacity>
            <View style={styles.cameraContainer}>
              <Image
                source={require('../assets/images/Camera_Icon.png')}
                style={styles.cameraIcon}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.NameView}>
          <Text style={styles.Nick}>
            {updatedData1 === undefined
              ? gloversPostProfile?.username
              : updatedData1?.data?.username}
          </Text>
          <TouchableOpacity onPress={handlePressPencil}>
            <Image
              source={require('../assets/images/Pencil_Icon.png')}
              style={styles.Pencils}
            />
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.GmailText}>{gloversPostProfile?.email}</Text>
        </View>

        <View style={styles.StaffView}>
          <Text style={styles.StaffText}>{gloversPostProfile?.roles}</Text>
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
    borderWidth: 1,
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
  StaffView: {
    fontSize: 12,
    marginTop: 10,
    backgroundColor: 'rgba(128,128,128,0.2)',
    borderRadius: 30,
    width: 80,
    height: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  StaffText: {
    color: '#2f77b6',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 2,
  },
  GmailText: {
    fontSize: 19,
    color: 'black',
  },
  NameView: {
    flexDirection: 'row',
    marginTop: 20,
  },
  ProfileIconView: {
    alignItems: 'center',
  },
  NotificationBellView: {
    flexDirection: 'row',
  },
  ProfileText: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
  },
  ProfileBellView: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  ReturnView: {
    backgroundColor: 'white',
  },
  FirstNameText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  LastNameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
