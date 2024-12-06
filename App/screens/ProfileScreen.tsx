import {useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('window');

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
      <TouchableOpacity style={styles.listItemContainer}>
        <Image source={item.icon} style={styles.listIcon} />
        <Text style={styles.listTitle}>{item.title}</Text>
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

  const updatedData1 = route.params?.updatedData;

  useEffect(() => {
    if (updatedData1) {
      console.log('Updated Data:', updatedData1);
    }
  }, [updatedData1]);

  const handlePress = () => navigation.navigate('SignIn');
  const handlePressPencil = () => navigation.navigate('EditProfile');
  const handleAudio = () => navigation.navigate('ProfileAudio');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
        <TouchableOpacity onPress={handleAudio}>
          <Image
            source={require('../assets/images/notification_bell.png')}
            style={styles.notificationBell}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/images/profileIcon.png')}
          style={styles.profileImage}
        />
        <View style={styles.badge}>
          <TouchableOpacity>
            <Image
              source={require('../assets/images/Camera_Icon.png')}
              style={styles.cameraIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.usernameText}>
            {updatedData1 === undefined
              ? gloversPostProfile?.username
              : updatedData1?.data?.username}
          </Text>
          <TouchableOpacity onPress={handlePressPencil}>
            <Image
              source={require('../assets/images/Pencil_Icon.png')}
              style={styles.pencilIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.emailText}>{gloversPostProfile?.email}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>{gloversPostProfile?.roles}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <FlatList
          data={data}
          keyExtractor={item => item.title}
          renderItem={({item}) => <ListItem item={item} />}
        />
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handlePress}>
        <Text style={styles.signOutText}>SIGN OUT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal:20,
    paddingVertical:40
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  notificationBell: {
    width: 20,
    height: 20,
    resizeMode:'contain'
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.125,
  },
  badge: {
    position: 'absolute',
    right: width * 0.35,
    top: width * 0.2,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  cameraIcon: {
    width: 20,
    height: 20,
    resizeMode:'contain'
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  usernameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  pencilIcon: {
    width: 24,
    height: 24,
    resizeMode:'contain',
    marginLeft: 10,
  },
  emailText: {
    fontSize: 16,
    color: 'black',
    marginTop: 5,
  },
  roleBadge: {
    backgroundColor: 'rgba(128,128,128,0.2)',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 10,
  },
  roleText: {
    color: '#2f77b6',
    fontSize: 12,
  },
  card: {
    backgroundColor: '#F5F5F5',
    marginHorizontal: width * 0.05,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  listIcon: {
    width: 24,
    height: 24,
    resizeMode:'contain',
    marginLeft: 10,
  },
  listTitle: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  lineStyle: {
    height: 1,
    backgroundColor: '#e3e3e3',
    marginHorizontal: 10,
  },
  signOutButton: {
    alignSelf: 'center',
    backgroundColor: '#035dab',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 30,
  },
  signOutText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
