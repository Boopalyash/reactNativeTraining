import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useLazyGloversEventGetQuery} from '../redux/service/GloversService';
import {useSelector} from 'react-redux';
import moment from 'moment';

const {width} = Dimensions.get('window'); // Get device width for responsive sizing

const renderItem = ({item}: any) => {
  const createdAt = moment(item?.created_at);
  const formattedDay = createdAt.format('ddd');
  const formattedDate = createdAt.format('DD');

  return (
    <View style={styles.renderView}>
      <View style={styles.dayTimeOverallView}>
        <View style={styles.dayTimeView}>
          <Text style={styles.dayText}>{formattedDay}</Text>
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>

        <View style={styles.titleView}>
          <Text style={styles.titleText}>{item?.game_status}</Text>
          <View style={styles.timeDeleteView}>
            <Text style={styles.timeText}>
              {item?.playing_team_score}-{item?.opponent_team_score}
            </Text>
            <TouchableOpacity>
              <Image
                source={require('../assets/images/delete-circle.png')}
                style={styles.delete}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.smallIconView}>
        <Image
          source={require('../assets/images/yankeesLogo.png')}
          style={styles.smallIcon}
        />
        <Text style={styles.teamText}>{item?.playing_team_detail?.team_name}</Text>
        <Text style={styles.vsText}>Vs.</Text>
        <Image
          source={require('../assets/images/redsocksLogo.png')}
          style={styles.smallIcon}
        />
        <Text style={styles.teamText}>{item?.opponent_team_detail?.team_name}</Text>
      </View>
    </View>
  );
};

const EventScreen = ({navigation}: any) => {
  const [gloverEvent] = useLazyGloversEventGetQuery();
  const gloversGetEvent = useSelector((state: any) => state.glover.gloverDetailsGetEvent);

  useEffect(() => {
    async function _dashboardEvent() {
      await gloverEvent(true);
    }
    _dashboardEvent();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Events</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <Image
              source={require('../assets/images/search_big.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../assets/images/notification_bell.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>July 2023</Text>
      </View>
      <FlatList
        data={gloversGetEvent?.data}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CreateTeam');
        }}
        style={styles.addButton}>
        <Image
          source={require('../assets/images/round_add.png')}
          style={styles.addIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexGrow:1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // padding: 15,
    paddingVertical:40,
    paddingHorizontal:20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    width: 20,
    height: 20,
    margin: 10,
    resizeMode: 'contain',
  },
  subHeader: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 10,
    alignItems: 'center',
  },
  subHeaderText: {
    fontSize: 16,
    fontWeight: '600',
  },
  renderView: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  dayTimeOverallView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayTimeView: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 15,
  },
  dayText: {
    color: 'black',
  },
  dateText: {
    color: 'black',
    fontWeight: 'bold',
  },
  titleView: {
    flex: 1,
  },
  titleText: {
    color: '#ff4a4a',
    fontWeight: 'bold',
  },
  timeDeleteView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  timeText: {
    color: '#0862ae',
    fontSize: 16,
    fontWeight: '500',
  },
  delete: {
    width: 20,
    height: 20,
    resizeMode:'contain',
    tintColor: 'red',
  },
  smallIconView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
  smallIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  teamText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 14,
  },
  vsText: {
    color: 'red',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: '#ddd',
    marginHorizontal: width * 0.1,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addIcon: {
    width: 50,
    height: 50,
    resizeMode:'contain'
  },
});
