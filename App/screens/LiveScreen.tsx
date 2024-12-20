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

const LiveScreen = () => {
  const datas = [
    {
      id: 1,
      location: 'New York City',
      team1: 'Red Sox',
      team2: 'Yankees',
      score1: 3,
      score2: 0,
      subTitle: '1',
    },
    {
      id: 2,
      location: 'New York City',
      team1: 'Tigers',
      team2: 'Yankees',
      score1: 0,
      score2: 1,
      subTitle: '2',
    },
    {
      id: 3,
      location: 'New York City',
      team1: 'Tigers',
      team2: 'Yankees',
      score1: 0,
      score2: 1,
      subTitle: '2',
    },
  ];

  const renderItem = ({ item }: any) => (
    <View style={styles.Cardss}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
        {/* Image Container */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/baseball.png')}
            style={styles.Ball}
          />
        </View>
        {/* Location Section */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          marginHorizontal: 10
        }}>
          <Image
            source={require('../assets/images/locationMarkIcon.png')}
            style={styles.Location}
          />
          <Text style={styles.LocationText}>{item.location}</Text>
        </View>

        {/* Time Section */}
        <View style={{ alignItems: 'flex-end', paddingHorizontal: 10, alignSelf: 'center' }}>
          <Text style={styles.TodayText}>Today</Text>
          <Text style={styles.TimeText}>03.00 PM</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'center' }}>
        {/* Column for Team Details */}
        <View style={{ flexDirection: 'column',flex:1 }}>
          {/* Team 1 */}
          <View style={styles.SmallIconView}>
            <Image
              source={require('../assets/images/redsocksLogo.png')}
              style={styles.SmallIcon}
            />
            <Text style={styles.Team1Text}>{item.team1}</Text>
            <Text style={styles.Score1Text}>{item.score1}</Text>
          </View>
          {/* Team 2 */}
          <View style={styles.SmallIconView}>
            <Image
              source={require('../assets/images/yankeesLogo.png')}
              style={styles.SmallIcon}
            />
            <Text style={styles.Team2Text}>{item.team2}</Text>
            <Text style={styles.Score2Text}>{item.score2}</Text>
          </View>
        </View>
        {/* Game Details in Row */}
        <View style={styles.GameDetailsContainer}>
          <View style={{ flexDirection: 'column',marginHorizontal:10 }}>
            {/* Triangle of Squares */}
            <View style={styles.TriangleContainer}>
              <View style={styles.square} />
              <View style={styles.square2} />
              <View style={[styles.square3, { backgroundColor: item.id === 2 ? '#99bfdd' : '#bc3f3d' }]} />
            </View>
            <Text style={styles.GameDetailsText}>
              {item.id === 1 ? '2-2, 1 out' : '0-0, 0 out'}
            </Text>
          </View>
        </View>
      </View>
      {/* Camera View */}
      <View style={styles.LiveCameraView}>
        <Image
          source={require('../assets/images/Video_CameraIcon.png')}
          style={styles.LiveCamera}
        />
        <Text style={styles.GoLiveText}>Go Live</Text>
      </View>
    </View>
  );
  return (
    <View style={{ backgroundColor: 'white', flexGrow: 1 }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.LiveView}>
        <Text style={styles.LiveText}>Live</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity>
            <Image
              source={require('../assets/images/search_big.png')}
              style={styles.Search}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../assets/images/notification_bell.png')}
              style={styles.Notification_bell}
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={datas}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
export default LiveScreen;
const styles = StyleSheet.create({
  Search: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    margin: 10,
  },
  Notification_bell: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    margin: 10,
  },
  Cardss: {
    margin: 10,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  imageContainer: {
    backgroundColor: '#005dab',
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40
  },
  Ball: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: 'white',
  },
  Location: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10
  },
  LocationText: {
    color: '#090909',
    fontSize: 13,
    fontWeight: 'bold',
  },
  TodayText: {
    color: '#bc3f3d',
    fontSize: 13,
    fontWeight: 'bold',
  },
  TimeText: {
    color: '#bc3f3d',
    fontSize: 13,
    fontWeight: 'bold',
  },
  SmallIconView: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    justifyContent:'space-between',
  },
  SmallIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  Team1Text: {
    color: '#101010',
    fontWeight: 'bold',
    fontSize: 14,
  },
  Score1Text: {
    color: '#101010',
    fontSize: 16,
    fontWeight: 'bold',
  },
  Team2Text: {
    color: '#101010',
    fontWeight: 'bold',
    fontSize: 14,
  },
  Score2Text: {
    color: '#101010',
    fontSize: 16,
    fontWeight: 'bold',
  },
  GameDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  TriangleContainer: {
    width: 30,
    height: 30,
    marginHorizontal: 10
  },
  square: {
    width: 12,
    height: 12,
    backgroundColor: '#99bfdd',
    position: 'absolute',
    top: 0,
    left: '30%',
    transform: [{ rotate: '45deg' }],
  },
  square2: {
    width: 12,
    height: 12,
    backgroundColor: '#99bfdd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    transform: [{ rotate: '45deg' }],
  },
  square3: {
    width: 12,
    height: 12,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 0,
    right: 0,
    transform: [{ rotate: '45deg' }],
  },
  GameDetailsText: {
    marginTop: 5,
    color: 'black',
    fontSize: 12,
  },
  LiveCameraView: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    paddingVertical: 10, 
    borderRadius: 12,
    justifyContent: 'center',
  },
  LiveCamera: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#71bd86',
  },
  GoLiveText: {
    color: '#34a353',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  LiveView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40
  },
  LiveText: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
