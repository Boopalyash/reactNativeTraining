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

const data = [
  {
    id: '1',
    title: 'Next',
    time: '12.14 PM',
    team1: 'Chennai Chal',
    team2: 'Vj Game 1',
    day: 'Mon',
    date: '29',
  },
  {
    id: '2',
    title: 'Next',
    time: '10:00 AM',
    team1: 'Chennai Chal',
    team2: 'Vj Game 1',
    day: 'Wed',
    date: '31',
  },
  {
    id: '3',
    title: 'Next',
    time: '11:00 AM',
    team1: 'Chennai Chal',
    team2: 'Vj Game 1',
    day: 'Sat',
    date: '02',
  },
  {
    id: '4',
    title: 'Next',
    time: '1:00 AM',
    team1: 'Chennai Chal',
    team2: 'Vj Game 1',
    day: 'Tue',
    date: '06',
  },
  {
    id: '5',
    title: 'Next',
    time: '5:00 AM',
    team1: 'Chennai Chal',
    team2: 'san Tigers',
    day: 'Mon',
    date: '12',
  },
  {
    id: '6',
    title: 'Next',
    time: '7:00 AM',
    team1: 'Chennai Chal',
    team2: 'Yankees',
    day: 'Fri',
    date: '16',
  },
  {
    id: '7',
    title: 'Next',
    time: '10:00 AM',
    team1: 'Chennai Chal',
    team2: 'Yankees',
    day: 'Mon',
    date: '19',
  },
  {
    id: '8',
    title: 'Next',
    time: '12:00 AM',
    team1: 'Chennai Chal',
    team2: 'Vj Game 1',
    day: 'Sun',
    date: '24',
  },
  {
    id: '9',
    title: 'Next',
    time: '5:00 AM',
    team1: 'Chennai Chal',
    team2: 'san Tigers',
    day: 'Thu',
    date: '07',
  },
  {
    id: '10',
    title: 'Next',
    time: '7:00 AM',
    team1: 'Chennai Chal',
    team2: 'Yankees',
    day: 'Sat',
    date: '09',
  },
  {
    id: '11',
    title: 'Next',
    time: '10:00 AM',
    team1: 'Chennai Chal',
    team2: 'Yankees',
    day: 'Mon',
    date: '11',
  },
  {
    id: '12',
    title: 'Next',
    time: '12:00 AM',
    team1: 'Chennai Chal',
    team2: 'Vj Game 1',
    day: 'Fri',
    date: '18',
  },
];

const renderItem = ({item}: any) => (
  <View style={{marginVertical: 10, paddingHorizontal: 20}}>
    <View style={{flexDirection: 'row'}}>
      <View style={{marginTop: 10, backgroundColor: '#F5F5F5', padding: 5}}>
        <Text style={{color: 'black'}}>{item.day}</Text>
        <Text style={{color: 'black', marginLeft: 5}}>{item.date}</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Text style={{color: '#005dab'}}>{item.title}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'black', fontSize: 12, paddingHorizontal: 100}}>
            {item.time}
          </Text>
          <TouchableOpacity>
            <Image
              source={require('../Assets/Images/delete-circle.png')}
              style={[styles.Delete, {tintColor: 'red'}]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>

    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image
        source={require('../Assets/Images/yankeesLogo.png')}
        style={styles.SmallIcon}
      />
      <Text
        style={{
          color: 'black',
          fontWeight: '500',
          fontSize: 15,
          marginLeft: 10,
        }}>
        {item.team1}
      </Text>
      <Text
        style={{
          color: 'red',
          fontSize: 14,
          marginLeft: 30,
          fontWeight: 'bold',
        }}>
        Vs.
      </Text>
      <Image
        source={require('../Assets/Images/redsocksLogo.png')}
        style={styles.SmallIcon}
      />
      <Text
        style={{
          color: 'black',
          fontWeight: '500',
          fontSize: 15,
          marginLeft: 10,
        }}>
        {item.team2}
      </Text>
    </View>
  </View>
);
const EventScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={{flexDirection: 'row', marginTop: 40}}>
        <Text
          style={{
            color: 'black',
            fontSize: 25,
            marginLeft: 20,
            fontWeight: 'bold',
          }}>
          Events
        </Text>
        <View style={{flexDirection: 'row', paddingHorizontal: 200}}>
          <TouchableOpacity>
            <Image
              source={require('../Assets/Images/search_big.png')}
              style={styles.Search}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../Assets/Images/notification_bell.png')}
              style={styles.Notification_bell}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{backgroundColor: '#F5F5F5', padding: 10}}>
        <Text style={{fontSize: 18, marginLeft: 20, fontWeight: '600'}}>
          March 2023
        </Text>
      </View>
      <FlatList 
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{padding: 10}}
        ItemSeparatorComponent={() => (
          <View
            style={{
              borderBottomWidth: 0.2,
              borderBottomColor: 'black',
              height: 15,
              width: 300,
              marginLeft: 55,
            }}
          />
        )}
        ListFooterComponent={() => (
          <View
            style={{
              borderBottomWidth: 0.2,
              borderBottomColor: 'black',
              height: 15,
              width: 300,
              marginLeft: 55,
            }}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
      <View style={{position: 'absolute', bottom: 10, right: 20}}>
        <Image
          source={require('../Assets/Images/round_add.png')}
          style={styles.RoundAdd}
        />
      </View>
    </View>
  );
};
export default EventScreen;
const styles = StyleSheet.create({
  Search: {
    width: 18,
    height: 18,
    margin: 10,
  },
  Notification_bell: {
    width: 15,
    height: 18,
    margin: 10,
  },
  Delete: {
    width: 24,
    height: 24,
  },
  SmallIcon: {
    width: 15,
    height: 15,
    marginLeft: 40,
  },
  RoundAdd: {
    width: 50,
    height: 50,
    marginLeft: 350,
    marginBottom: 10,
  },
});
