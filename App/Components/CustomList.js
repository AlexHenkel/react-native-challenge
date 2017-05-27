import React from 'react'
import {
  ScrollView,
  RefreshControl,
  ListView,
  View
} from 'react-native'
import Swipeout from 'react-native-swipeout'
import CheckBox from 'react-native-check-box'
import Styles from './Styles/CustomListStyles'
import Colors from '../Themes/Colors'

const rawData = [
  {
    title: 'Drink water',
    completed: false
  },
  {
    title: 'Go to the gym',
    completed: true
  },
  {
    title: 'Do homework',
    completed: false
  },
  {
    title: 'Watch TV',
    completed: true
  }
]

export default class CustomList extends React.Component {
  constructor (props) {
    super(props)

    const rowHasChanged = (r1, r2) => r1 !== r2
    const ds = new ListView.DataSource({rowHasChanged})

    this.state = {
      dataSource: ds.cloneWithRows(rawData)
    }
  }

  _onClick (rowData) {
    console.log('checked', rowData)
  }

  _deleteTask (rowData) {
    console.log('delete', rowData)
  }

  _renderRow (rowData) {
    let swipeBtns = [{
      text: 'Delete',
      backgroundColor: 'red',
      underlayColor: Colors.error,
      onPress: () => { this._deleteTask(rowData) }
    }]

    return (
      <Swipeout
        right={swipeBtns}
        autoClose
        backgroundColor='transparent'>
        <View style={Styles.listContainer}>
          <CheckBox
            style={Styles.listCheckbox}
            isChecked={rowData.completed}
            onClick={() => this._onClick(rowData)}
            rightText={rowData.title}
            rightTextStyle={Styles.listText}
          />
        </View>
      </Swipeout>
    )
  }

  render () {
    const { dataSource } = this.state
    const searching = false
    return (
      <ScrollView style={Styles.container}>
        <ListView
          enableEmptySections
          automaticallyAdjustContentInsets={false}
          dataSource={dataSource}
          renderRow={row => this._renderRow(row)}
          refreshControl={
            <RefreshControl
              refreshing={searching}
            />
          }
        />
      </ScrollView>
    )
  }
}
