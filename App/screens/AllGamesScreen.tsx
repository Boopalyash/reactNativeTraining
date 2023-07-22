import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {useSelector} from 'react-redux';
import {
  useLazyGloversDashBoardGetMyTeamsQuery,
  useLazyGloversDashBoardGetQuery,
} from '../redux/service/GloversService';

function SectionHeader({title}: any) {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const renderItem = ({item}: any) => {
  const formattedDate = new Date(item?.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = new Date(item?.date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  });

  return (
    <View style={styles.Cards}>
      <View style={styles.rowContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/baseball.png')}
            style={styles.Ball}
          />
        </View>
        <Image
          source={require('../assets/images/locationMarkIcon.png')}
          style={styles.Location}
        />
        <View style={{width: 220}}>
          <Text style={styles.locationText}>{item?.location}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{formattedDate}</Text>
          <Text style={styles.timeText}>{formattedTime}</Text>
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
        <Text style={styles.Score1Text}>{item.playing_team_score}</Text>
        <View>
          <View style={styles.SquareContainers}>
            <View style={styles.square}></View>
            <View style={styles.square1}></View>
            <View style={styles.square}></View>
          </View>
          <Text style={styles.OutText}>0,0 out</Text>
        </View>
      </View>

      <View style={styles.SmallIconView1}>
        <Image
          source={require('../assets/images/redsocksLogo.png')}
          style={styles.SmallIcon1}
        />
        <Text style={styles.Team2Text}>
          {item?.opponent_team_detail?.team_name}
        </Text>
        <Text style={styles.Score2Text}>{item?.opponent_team_score}</Text>
      </View>

      <View style={styles.DocumentView}>
        <Image
          source={require('../assets/images/documentIcon.png')}
          style={styles.Document}
        />
        <Text style={styles.StartScoringText}>{item?.game_status}</Text>
      </View>
    </View>
  );
};

const renderItem1 = ({item}: any) => (
  <View style={styles.Card}>
    <View style={styles.rowContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/baseball.png')}
          style={styles.Ball1}
        />
      </View>
      <Image
        source={require('../assets/images/red_profile.png')}
        style={styles.RedProfile}
      />
      <Text style={styles.CoachText}>{item?.roles}</Text>
    </View>
    <View style={styles.SmallIconViewTeam}>
      <Image
        source={require('../assets/images/yankeesLogo.png')}
        style={styles.SmallIcon}
      />
      <Text style={styles.TeamsText1}>{item?.team_name}</Text>
    </View>

    <View style={styles.RecordView}>
      <Text style={styles.TextWin}>
        {item?.win || 0} - {item?.loss || 0}
      </Text>
    </View>
  </View>
);

const AllGamesScreen = ({navigation}: any) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [getdashboardList] = useLazyGloversDashBoardGetQuery();
  const [getdashboardListMyTeams] = useLazyGloversDashBoardGetMyTeamsQuery();

  const handleImageClick = () => {
    navigation.navigate('CreateTeam');
  };

  const gloversGetDashboard = useSelector(
    (state: any) => state.glover.gloverDetailsGet,
  );

  const gloversGetMyTeams = useSelector(
    (state: any) => state.glover.gloverDetailsGetMyTeams,
  );

  useEffect(() => {
    async function _dashboardList() {
      await getdashboardList(true);
    }
    _dashboardList();
  }, []);

  useEffect(() => {
    async function _dashboardMyTeam() {
      await getdashboardListMyTeams(true);
    }
    _dashboardMyTeam();
  }, []);

  const renderAllGamesScreen = () => {
    return (
      <View>
        <FlatList
          data={gloversGetDashboard?.data}
          renderItem={renderItem}
          keyExtractor={item => item?._id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<SectionHeader title="Today" />}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    );
  };

  const renderMyTeamsScreen = () => {
    const flatListData = gloversGetMyTeams?.data || [];

    const groupedData: any = flatListData.reduce((acc, item) => {
      if (!acc[item.season_name]) {
        acc[item.season_name] = [];
      }
      acc[item.season_name].push(item);
      return acc;
    }, {});

    return (
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.container}>
          {Object.entries(groupedData).map(([title, data]) => (
            <View key={title}>
              <Text style={styles.titleText}>{title}</Text>
              <FlatList
                data={data}
                renderItem={renderItem1}
                keyExtractor={item => item._id}
                numColumns={2}
                scrollEnabled={false}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.Container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.HomeView}>
        <Text style={styles.HomeText}>Home</Text>
        <View style={styles.rowContainer}>
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
      <SegmentedControlTab
        values={['All Games', 'My Teams']}
        selectedIndex={selectedIndex}
        onTabPress={index => setSelectedIndex(index)}
        tabsContainerStyle={styles.tabContainer}
        tabStyle={styles.tabStyle}
        activeTabStyle={styles.activeTabStyle}
        tabTextStyle={styles.tabTextStyle}
        activeTabTextStyle={styles.activeTabTextStyle}
      />
      {selectedIndex === 0 ? (
        renderAllGamesScreen()
      ) : (
        <>
          {renderMyTeamsScreen()}
          <TouchableOpacity
            style={styles.RoundAddView}
            onPress={() => handleImageClick()}>
            <Image
              source={require('../assets/images/round_add.png')}
              style={styles.RoundAdd}
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
export default AllGamesScreen;

const styles = StyleSheet.create({
  Container: {
    flexGrow: 1,
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingBottom: 300,
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
  imageContainer: {
    backgroundColor: '#005dab',
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  Ball: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },
  Location: {
    width: 11,
    height: 15,
    marginTop: 20,
    marginLeft: 15,
  },
  locationText: {
    color: '#090909',
    fontSize: 11,
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  Document: {
    width: 15,
    height: 18,
  },
  tabContainer: {
    height: 45,
    width: 250,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 0.8,
    borderRadius: 30,
    overflow: 'hidden',
    borderColor: '#005dab',
  },
  tabStyle: {
    borderWidth: 0,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderEndWidth: 0,
  },
  activeTabStyle: {
    backgroundColor: '#005dab',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  tabTextStyle: {
    color: '#005dab',
    fontWeight: 'normal',
  },
  activeTabTextStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  SmallIcon: {
    width: 15,
    height: 15,
    marginLeft: 40,
  },
  SmallIcon1: {
    width: 15,
    height: 15,
    marginLeft: 40,
  },
  SquareContainers: {
    flexDirection: 'row',
  },
  square: {
    width: 13,
    height: 13,
    backgroundColor: '#99bfdd',
    marginTop: 12,
    transform: [{rotate: '45deg'}],
  },
  square1: {
    width: 13,
    height: 13,
    backgroundColor: '#99bfdd',
    transform: [{rotate: '45deg'}],
  },
  Card: {
    width: 170,
    height: 160,
    borderRadius: 10,
    borderWidth: 0.3,
    borderColor: 'black',
    marginLeft: 25,
    marginBottom: 12,
  },
  Ball1: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },
  RedProfile: {
    width: 20,
    height: 20,
    marginTop: 10,
    marginLeft: 10,
  },
  RoundAdd: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  Cards: {
    borderWidth: 0.3,
    borderColor: 'black',
    alignSelf: 'center',
    borderRadius: 12,
    marginTop: 12,
  },
  title: {
    fontSize: 18,
    color: 'black',
    marginLeft: 25,
    fontWeight: 'bold',
    margin: 10,
  },
  dateText: {
    color: '#bc3f3d',
    fontSize: 13,
    right: 20,
  },
  dateContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  timeText: {
    color: '#bc3f3d',
    fontSize: 13,
    right: 20,
  },
  DocumentView: {
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#F5F5F5',
    padding: 10,
    width: 358,
    marginBottom: 0.5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  StartScoringText: {
    color: '#f6b704',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 5,
  },
  SmallIconView: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  SmallIconView1: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  SmallIconViewTeam: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-evenly',
  },
  Team1Text: {
    color: '#101010',
    fontWeight: 'bold',
  },
  Team2Text: {
    color: '#101010',
    fontWeight: 'bold',
    marginRight: 20,
  },
  Score1Text: {
    color: '#101010',
    fontSize: 16,
    fontWeight: 'bold',
  },
  Score2Text: {
    marginRight: 120,
    color: '#101010',
    fontSize: 16,
    fontWeight: 'bold',
  },
  OutText: {
    marginTop: 5,
    color: 'black',
    marginRight: 40,
    fontSize: 12,
  },
  CoachText: {
    marginTop: 10,
    marginLeft: 10,
    fontWeight: 500,
  },
  TeamsText: {
    marginLeft: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  TeamsText1: {
    color: 'black',
    fontWeight: 'bold',
    width: 100,
  },
  RecordView: {
    marginTop: 20,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  HomeView: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  HomeText: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
  },
  RoundAddView: {
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
  TextWin: {
    fontSize: 20,
    fontWeight: '600',
  },
  titleText: {
    fontSize: 16,
    marginLeft: 18,
    marginBottom: 10,
  },
});
