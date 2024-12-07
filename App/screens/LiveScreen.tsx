// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   StatusBar,
//   FlatList,
//   TouchableOpacity,
// } from 'react-native';

// const LiveScreen = () => {
//   const datas = [
//     {
//       id: 1,
//       location: 'New York City',
//       team1: 'Red Sox',
//       team2: 'Yankees',
//       score1: 3,
//       score2: 0,
//       subTitle: '1',
//     },
//     {
//       id: 2,
//       location: 'New York City',
//       team1: 'Tigers',
//       team2: 'Yankees',
//       score1: 0,
//       score2: 1,
//       subTitle: '2',
//     },
//     {
//       id: 3,
//       location: 'New York City',
//       team1: 'Tigers',
//       team2: 'Yankees',
//       score1: 0,
//       score2: 1,
//       subTitle: '2',
//     },
//   ];

//   const renderItem = ({item}: any) => (
//     <View style={styles.Cardss}>
//       <View>
//         <View style={{flexDirection: 'row'}}>
//           <View style={styles.imageContainer}>
//             <Image
//               source={require('../assets/images/baseball.png')}
//               style={styles.Ball}
//             />
//           </View>
//           <Image
//             source={require('../assets/images/locationMarkIcon.png')}
//             style={styles.Location}
//           />
//           <Text style={styles.LocationText}>{item.location}</Text>
//           <View>
//             <Text style={styles.TodayText}>Today</Text>
//             <Text style={styles.TimeText}>03.00 PM</Text>
//           </View>
//         </View>

//         <View style={styles.SmallIconView}>
//           <Image
//             source={require('../assets/images/redsocksLogo.png')}
//             style={styles.SmallIcon}
//           />
//           <Text style={styles.Team1Text}>{item.team1}</Text>
//           <Text style={styles.Score1Text}>{item.score1}</Text>

//           <View>
//             <View style={styles.containerss}>
//               <View
//                 style={[
//                   styles.square,
//                   {transform: [{rotate: '45deg'}]},
//                 ]}></View>
//               <View>
//                 <View
//                   style={[
//                     styles.square2,
//                     {transform: [{rotate: '45deg'}]},
//                   ]}></View>
//               </View>
//               <View
//                 style={[
//                   styles.square3,
//                   {
//                     transform: [{rotate: '45deg'}],
//                     backgroundColor: item.id === 2 ? '#99bfdd' : '#bc3f3d',
//                   },
//                 ]}></View>
//             </View>
//             <Text style={{marginTop: 5, color: 'black', marginRight: 50}}>
//               {item.id === 1 ? '2-2,1 out' : '0-0,0 out'}
//             </Text>
//           </View>
//         </View>

//         <View style={styles.SmallIconView}>
//           <Image
//             source={require('../assets/images/yankeesLogo.png')}
//             style={styles.SmallIcon}
//           />
//           <Text style={styles.Team2Text}>{item.team2}</Text>
//           <Text style={styles.Score2Text}>{item.score2}</Text>
//         </View>
//       </View>

//       <View style={styles.LiveCameraView}>
//         <Image
//           source={require('../assets/images/Video_CameraIcon.png')}
//           style={styles.LiveCamera}
//         />
//         <Text style={styles.GoLiveText}>Go Live</Text>
//       </View>
//     </View>
//   );

//   return (
//     <View style={{flex: 1, backgroundColor: 'white'}}>
//       <StatusBar backgroundColor="white" barStyle="dark-content" />
//       <View style={styles.LiveView}>
//         <Text style={styles.LiveText}>Live</Text>
//         <View style={{flexDirection: 'row'}}>
//           <TouchableOpacity>
//             <Image
//               source={require('../assets/images/search_big.png')}
//               style={styles.Search}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Image
//               source={require('../assets/images/notification_bell.png')}
//               style={styles.Notification_bell}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <FlatList
//         data={datas}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//       />
//     </View>
//   );
// };
// export default LiveScreen;
// const styles = StyleSheet.create({
//   Search: {
//     width: 18,
//     height: 18,
//     margin: 10,
//   },
//   Notification_bell: {
//     width: 15,
//     height: 18,
//     margin: 10,
//   },
//   Cardss: {
//     width: 360,
//     height: 200,
//     borderWidth: 0.3,
//     borderColor: 'black',
//     alignSelf: 'center',
//     borderRadius: 12,
//     marginTop: 12,
//   },
//   imageContainer: {
//     backgroundColor: '#005dab',
//     borderBottomRightRadius: 30,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 50,
//     height: 50,
//   },
//   Ball: {
//     width: 30,
//     height: 30,
//     tintColor: 'white',
//   },
//   Location: {
//     width: 15,
//     height: 20,
//     marginTop: 10,
//     marginLeft: 15,
//   },
//   containerss: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     marginRight: 60,
//   },
//   square: {
//     width: 12,
//     height: 12,
//     backgroundColor: '#99bfdd',
//     marginTop: 12,
//   },
//   square2: {
//     width: 12,
//     height: 12,
//     backgroundColor: '#99bfdd',
//   },
//   square3: {
//     width: 12,
//     height: 12,
//     backgroundColor: 'red',
//     marginTop: 12,
//   },
//   SmallIcon: {
//     width: 15,
//     height: 15,
//     marginLeft: 40,
//   },
//   LiveCamera: {
//     width: 25,
//     height: 10,
//     tintColor: '#71bd86',
//   },
//   LocationText: {
//     color: '#090909',
//     fontSize: 13,
//     marginTop: 10,
//     marginRight: 100,
//     fontWeight: 'bold',
//     paddingHorizontal: 10,
//   },
//   TodayText: {
//     color: '#bc3f3d',
//     fontSize: 13,
//     marginTop: 10,
//     fontWeight: 'bold',
//     marginLeft: 20,
//   },
//   TimeText: {
//     color: '#bc3f3d',
//     fontSize: 13,
//     marginTop: 10,
//     fontWeight: 'bold',
//   },
//   SmallIconView: {
//     flexDirection: 'row',
//     marginTop: 10,
//     justifyContent: 'space-around',
//   },
//   Team1Text: {
//     color: '#101010',
//     fontWeight: 'bold',
//   },
//   Score1Text: {
//     marginRight: 10,
//     color: '#101010',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   Team2Text: {
//     color: '#101010',
//     fontWeight: 'bold',
//     marginRight: 20,
//   },
//   Score2Text: {
//     marginRight: 150,
//     color: '#101010',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   LiveCameraView: {
//     flexDirection: 'row',
//     marginTop: 15,
//     alignSelf: 'center',
//     backgroundColor: '#F5F5F5',
//     padding: 14,
//     width: 359,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   GoLiveText: {
//     color: '#34a353',
//     fontWeight: 'bold',
//     marginLeft: 5,
//   },
//   LiveView: {
//     flexDirection: 'row',
//     marginTop: 40,
//     justifyContent: 'space-between',
//     paddingHorizontal: 30,
//   },
//   LiveText: {
//     color: 'black',
//     fontSize: 25,
//     fontWeight: 'bold',
//   },
// });



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
    // marginTop: 15,
    // alignSelf: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 10, // Adjusted for a consistent look
    paddingHorizontal: 20, // Reduced for a better fit
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LiveCamera: {
    width: 24,
    height: 24,
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
