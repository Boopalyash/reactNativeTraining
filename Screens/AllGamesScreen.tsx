import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import SegmentedControlTab from 'react-native-segmented-control-tab';

const data = {
  monday: {
    title: 'Today',
    data: [
      {
        id: '1',
        location: 'San Francisco,CA,USA',
        date: 'April 13',
        time: '10.00 AM',
        team1: 'Yankees',
        team2: 'Viji game',
        score1: '0',
        score2: '0',
        outs: '0,0 out',
        subTitle: 'Today',
      },
      {
        id: '2',
        location: 'San Francisco,CA,USA',
        date: 'April 13',
        time: '10.00 AM',
        team1: 'Yankees',
        team2: 'Viji game',
        score1: '0',
        score2: '0',
        outs: '0,0 out',
        subTitle: 'Today',
      },
    ],
  },
  tuesday: {
    titles: 'Upcoming',
    data: [
      {
        id: '3',
        location: 'San Francisco,CA,USA',
        date: 'April 13',
        time: '10.00 AM',
        team1: 'Yankees',
        team2: 'Viji game',
        score1: '0',
        score2: '0',
        outs: '0,0 out',
        subTitle: 'Upcoming',
      },
      {
        id: '4',
        location: 'San Francisco,CA,USA',
        date: 'April 13',
        time: '10.00 AM',
        team1: 'Yankees',
        team2: 'Viji game',
        score1: '0',
        score2: '0',
        outs: '0,0 out',
        subTitle: 'Upcoming',
      },
      {
        id: '5',
        location: 'San Francisco,CA,USA',
        date: 'April 13',
        time: '10.00 AM',
        team1: 'Yankees',
        team2: 'Viji game',
        score1: '0',
        score2: '0',
        outs: '0,0 out',
        subTitle: 'Upcoming',
      },
    ],
  },
};

const DATA = {
  today: {
    titles: 'Fall 2022',
    data: [
      {id: '1', teams: 'Yankees', record: '0-1'},
      {id: '2', teams: 'Test Yankees', record: '0-1'},
    ],
  },
  tomorrow: {
    titles: 'Winter 2022-2023',
    data: [
      {id: '3', teams: 'Red Sox', record: '3-0'},
      {id: '4', teams: 'Test Red Sox', record: '1-0'},
      {id: '5', teams: 'Red Sox', record: '5-0'},
      {id: '6', teams: 'Test Red Sox', record: '1-3'},
      {id: '7', teams: 'Red Sox', record: '1-0'},
      {id: '8', teams: 'Test Red Sox', record: '1-0'},
    ],
  },
};

function SectionHeader({title}: any) {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const renderItem = ({item}: any) => {
  return (
    <View
      style={[
        styles.Cards,
        item.subTitle === 'Upcoming' && styles.upcomingCard,
      ]}>
      <View style={styles.rowContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../Assets/Images/baseball.png')}
            style={styles.Ball}
          />
        </View>
        <Image
          source={require('../Assets/Images/locationMarkIcon.png')}
          style={styles.Location}
        />
        <View>
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        <View>
          <Text style={styles.dateText}>{item.date}</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>

      <View style={styles.SmallIconView}>
        <Image
          source={require('../Assets/Images/yankeesLogo.png')}
          style={styles.SmallIcon}
        />
        <Text style={styles.Team1Text}>{item.team1}</Text>
        <Text style={styles.Score1Text}>{item.score1}</Text>
        <View>
          <View style={styles.containers}>
            <View
              style={[styles.square, {transform: [{rotate: '45deg'}]}]}></View>
            <View>
              <View
                style={[
                  styles.square1,
                  {transform: [{rotate: '45deg'}]},
                ]}></View>
            </View>
            <View
              style={[styles.square, {transform: [{rotate: '45deg'}]}]}></View>
          </View>
          <Text style={styles.OutText}>0,0 out</Text>
        </View>
      </View>

      <View style={styles.SmallIconView}>
        <Image
          source={require('../Assets/Images/redsocksLogo.png')}
          style={styles.SmallIcon}
        />
        <Text style={styles.Team2Text}>{item.team2}</Text>
        <Text style={styles.Score2Text}>{item.score2}</Text>
      </View>

      {item.subTitle === 'Today' && (
        <View style={styles.DocumentView}>
          <Image
            source={require('../Assets/Images/documentIcon.png')}
            style={styles.Document}
          />
          <Text style={styles.StartScoringText}>Start Scoring</Text>
        </View>
      )}
    </View>
  );
};

const renderItem1 = ({item}: any) => (
  <View style={styles.Card}>
    <View style={styles.rowContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../Assets/Images/baseball.png')}
          style={styles.Ball1}
        />
      </View>
      <Image
        source={require('../Assets/Images/red_profile.png')}
        style={styles.RedProfile}
      />
      <Text style={styles.CoachText}>Coach</Text>
    </View>

    <View style={styles.SmallIconView}>
      <Image
        source={require('../Assets/Images/yankeesLogo.png')}
        style={styles.SmallIcon}
      />
      <Text style={styles.TeamsText}>{item.teams}</Text>
    </View>

    <View style={styles.RecordView}>
      <Text style={styles.RecordText}>{item.record}</Text>
    </View>

    {['1', '3'].includes(item.id) && (
      <View style={styles.UrView}>
        <TouchableOpacity>
          <Text style={styles.UrText}>UR</Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
);

const AllGamesScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const renderAllGamesScreen = () => {
    return (
      <View>
        <FlatList
          data={[
            {key: 'monday', title: data.monday.title, data: data.monday.data},
            {
              key: 'tuesday',
              title: data.tuesday.titles,
              data: data.tuesday.data,
            },
          ]}
          renderItem={({item}) => (
            <>
              <SectionHeader title={item.title} />
              <FlatList
                data={item.data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </>
          )}
          keyExtractor={item => item.key}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  const renderMyTeamsScreen = () => {
    return (
      <View>
        <FlatList
          style={styles.FlatListView}
          data={[
            {key: 'today', title: DATA.today.titles, data: DATA.today.data},
            {
              key: 'tomorrow',
              title: DATA.tomorrow.titles,
              data: DATA.tomorrow.data,
            },
          ]}
          renderItem={({item}) => (
            <>
              <SectionHeader title={item.title} />
              <FlatList
                data={item.data}
                renderItem={renderItem1}
                keyExtractor={item => item.id}
                numColumns={2}
              />
            </>
          )}
          keyExtractor={item => item.key}
          showsVerticalScrollIndicator={false}
        />
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
              source={require('../Assets/Images/notification_bell.png')}
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
      {selectedIndex === 0 ? renderAllGamesScreen() : renderMyTeamsScreen()}
      <View style={styles.RoundAddView}>
        <Image
          source={require('../Assets/Images/round_add.png')}
          style={styles.RoundAdd}
        />
      </View>
    </View>
  );
};
export default AllGamesScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
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
    width: 12,
    height: 15,
    marginTop: 10,
    marginLeft: 15,
  },
  Document: {
    width: 15,
    height: 18,
  },
  tabContainer: {
    height: 40,
    width: 240,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 0.8,
    borderRadius: 20,
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
  containers: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 60,
  },
  square: {
    width: 12,
    height: 12,
    backgroundColor: '#99bfdd',
    marginTop: 12,
    transform: [{rotate: '45deg'}],
  },
  square1: {
    width: 12,
    height: 12,
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
    marginLeft: 350,
    marginBottom: 10,
  },
  Cards: {
    width: 360,
    height: 200,
    borderWidth: 0.3,
    borderColor: 'black',
    alignSelf: 'center',
    borderRadius: 12,
    marginTop: 12,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 25,
    margin: 5,
    color: 'black',
  },
  upcomingCard: {
    height: 170,
  },
  locationText: {
    color: '#090909',
    fontSize: 13,
    marginTop: 10,
    marginRight: 60,
    fontWeight: 'bold',
    paddingHorizontal: 10,
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
    marginTop: 10,
    fontWeight: 'bold',
    right: 10,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  timeText: {
    color: '#bc3f3d',
    fontSize: 13,
    fontWeight: 'bold',
    right: 10,
  },
  DocumentView: {
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#F5F5F5',
    padding: 12,
    width: 359,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  StartScoringText: {
    color: '#f6b704',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  SmallIconView: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-around',
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
    marginRight: 35,
    color: '#101010',
    fontSize: 16,
    fontWeight: 'bold',
  },
  Score2Text: {
    marginRight: 160,
    color: '#101010',
    fontSize: 16,
    fontWeight: 'bold',
  },
  OutText: {
    marginTop: 5,
    color: 'black',
    marginRight: 50,
  },
  CoachText: {
    marginTop: 10,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  TeamsText: {
    marginLeft: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  RecordView: {
    marginTop: 20,
    alignSelf: 'center',
  },
  RecordText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  UrView: {
    marginLeft: 140,
    marginBottom: 20,
  },
  UrText: {
    color: 'blue',
    textDecorationLine: 'underline',
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
  FlatListView: {
    marginBottom: 150,
  },
});
