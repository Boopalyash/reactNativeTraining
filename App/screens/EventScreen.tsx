import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useLazyGloversEventGetQuery} from '../redux/service/GloversService';
import {useSelector} from 'react-redux';
import moment from 'moment';

const renderItem = ({item}: any) => {
  const createdAt = moment(item?.created_at);
  const formattedDay = createdAt.format('ddd');
  const formattedDate = createdAt.format('DD');

  return (
    <View style={styles.RenderView}>
      <View style={styles.DayTimeOverallView}>
        <View style={styles.DayTimeView}>
          <Text style={styles.DayText}>{formattedDay}</Text>
          <Text style={styles.DateText}>{formattedDate}</Text>
        </View>

        <View style={styles.TitleView}>
          <Text style={styles.TitleText}>{item?.game_status}</Text>
          <View style={styles.TimeDeleteView}>
            <Text style={styles.TimeText}>
              {item?.playing_team_score}-{item?.opponent_team_score}
            </Text>
            <TouchableOpacity>
              <Image
                source={require('../assets/images/delete-circle.png')}
                style={styles.Delete}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.SmallIconView}>
        <Image
          source={require('../assets/images/yankeesLogo.png')}
          style={styles.SmallIcon}
        />
        <Text style={styles.Team1Text}>
          {item?.playing_team_detail?.team_name}
        </Text>
        <Text style={styles.VsText}>Vs.</Text>
        <Image
          source={require('../assets/images/redsocksLogo.png')}
          style={styles.SmallIcon}
        />
        <Text style={styles.Team2Text}>
          {item?.opponent_team_detail?.team_name}
        </Text>
      </View>
    </View>
  );
};

const EventScreen = ({navigation}: any) => {
  const [gloverEvent] = useLazyGloversEventGetQuery();

  const gloversGetEvent = useSelector(
    (state: any) => state.glover.gloverDetailsGetEvent,
  );

  useEffect(() => {
    async function _dashboardEvent() {
      await gloverEvent(true);
    }
    _dashboardEvent();
  }, []);

  return (
    <View style={styles.ReturnContainer}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.EventsView}>
        <Text style={styles.EventsText}>Events</Text>
        <View style={styles.SearchBellView}>
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
      <View style={styles.MarchView}>
        <Text style={styles.MarchText}>July 2023</Text>
      </View>
      <FlatList
        data={gloversGetEvent?.data}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.ContentContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.ItemSeperator} />}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login');
        }}
        style={styles.RoundAddPosition}>
        <Image
          source={require('../assets/images/round_add.png')}
          style={styles.RoundAdd}
        />
      </TouchableOpacity>
    </View>
  );
};
export default EventScreen;
const styles = StyleSheet.create({
  ReturnContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  EventsView: {
    flexDirection: 'row',
    marginTop: 50,
  },
  EventsText: {
    color: 'black',
    fontSize: 25,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  SearchBellView: {
    flexDirection: 'row',
    paddingHorizontal: 200,
  },
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
  MarchView: {
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  MarchText: {
    fontSize: 18,
    marginLeft: 20,
    fontWeight: '600',
  },
  DayTimeOverallView: {
    flexDirection: 'row',
  },
  DayTimeView: {
    marginTop: 10,
    backgroundColor: '#F5F5F5',
    padding: 5,
    borderRadius: 5,
  },
  DayText: {
    color: 'black',
  },
  DateText: {
    color: 'black',
    marginLeft: 5,
  },
  TitleView: {
    flexDirection: 'row',
    margin: 5,
  },
  TitleText: {
    color: '#ff4a4a',
    fontWeight: 'bold',
    marginLeft: 20,
  },
  TimeDeleteView: {
    flexDirection: 'row',
  },
  TimeText: {
    color: '#0862ae',
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 100,
  },
  Delete: {
    width: 24,
    height: 24,
    tintColor: 'red',
  },
  SmallIconView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  SmallIcon: {
    width: 15,
    height: 15,
    marginLeft: 40,
  },
  Team1Text: {
    color: 'black',
    fontWeight: '500',
    fontSize: 13,
    marginLeft: 10,
  },
  VsText: {
    color: 'red',
    fontSize: 14,
    marginLeft: 30,
    fontWeight: 'bold',
  },
  Team2Text: {
    color: 'black',
    fontWeight: '500',
    fontSize: 13,
    marginLeft: 10,
  },
  ContentContainer: {
    padding: 10,
  },
  RoundAdd: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  RoundAddPosition: {
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
  // RenderView
  RenderView: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  ItemSeperator: {
    borderBottomWidth: 0.3,
    borderBottomColor: 'black',
    height: 10,
    width: 300,
    marginLeft: 55,
  },
});

// ListFooterComponent={() => (
//   <View
//     style={{
//       borderBottomWidth: 0.2,
//       borderBottomColor: 'black',
//       height: 15,
//       width: 300,
//       marginLeft: 55,
//     }}
//   />
// )}
