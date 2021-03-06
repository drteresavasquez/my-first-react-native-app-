import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from 'react-native';

class Cell extends React.Component{
  render(){
    return(
        <View style={styles.cell}>
          <Image 
            style={styles.imageView} 
            source={{uri: this.props.cellItem.image[3]['#text']}}/>
          <View style={styles.contentView}>
            <Text style={[styles.whiteText, styles.boldText]}>{this.props.cellItem.name}</Text>
            <Text style={styles.whiteText}>{this.props.cellItem.artist.name}</Text>
          </View>
          <View style={styles.accessoryView}>
          <Text style={[styles.textCenter, styles.whiteText]}>></Text>
          </View>
        </View>
    )
  }
}

export default class App extends React.Component {
  fetchTopTracks(){
    const apiKey = "80b1866e815a8d2ddf83757bd97fdc76"
    const url = `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${apiKey}&format=json`

    return fetch(url)
    .then(response => response.json())
  }

  constructor(props){
    super(props)

    this.state = { tracks:[] }

    //fetch api data
    this.fetchTopTracks()
    .then(json => { this.setState({tracks: json.tracks.track}) 
    })
  }
  render() {

    const tableData = Array(50).fill('Hello, World!')


    return ( <View style = {styles.container}>
      <FlatList 
        data={this.state.tracks}
        renderItem={({item}) => (
          <Cell cellItem={item}/>
        )}
        keyExtractor={(_, index) => index}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    backgroundColor: '#000'
  },
  cell: {
    flexDirection: 'row',
    height: 75,
    marginBottom: 5,
  },
  imageView:{
    width: 75,
    height: 75,
    borderRadius: 10,
    marginRight: 10,
  },
  contentView:{
    flex: 1,
  },
  accessoryView:{
    width: 40,
    justifyContent: 'center'
  },  
  textCenter: {
    textAlign: 'center'
  },
  whiteText:{
    color: 'white',
  },
  boldText:{
    fontWeight: 'bold'
  }
});