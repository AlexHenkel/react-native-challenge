import React, { PropTypes } from 'react'
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native'
import { connect } from 'react-redux'
import PillButton from '../Components/PillButton'
import Styles from './Styles/HeaderStyles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ToDosActions from '../Redux/ToDosRedux'

class Header extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    addTask: PropTypes.func.isRequired,
    changeFilter: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      selectedFilter: 'All',
      addMode: false,
      newTask: ''
    }
  }

  _onToggleAdd = () => this.setState({ addMode: !this.state.addMode, newTask: '' })

  _handleChangeTask = (newTask) => this.setState({ newTask })
  _handlePressAdd = () => {
    const { newTask, addMode, selectedFilter } = this.state
    this.props.addTask(newTask, selectedFilter)
    this.setState({ addMode: !addMode, newTask: '' })
  }

  _onPressFilterAll = () => {
    this.props.changeFilter('All')
    this.setState({ selectedFilter: 'All' })
  }
  _onPressFilterCompleted = () => {
    this.props.changeFilter('Completed')
    this.setState({ selectedFilter: 'Completed' })
  }
  _onPressFilterPending = () => {
    this.props.changeFilter('Pending')
    this.setState({ selectedFilter: 'Pending' })
  }

  _renderFiltersOrAdd () {
    const { addMode, selectedFilter, newTask } = this.state
    const editable = true
    if (addMode) {
      return (
        <View>
          <View style={Styles.addInput}>
            <TextInput
              style={Styles.addInputText}
              value={newTask}
              editable={editable}
              keyboardType='default'
              returnKeyType='go'
              autoCapitalize='none'
              onChangeText={this._handleChangeTask}
              underlineColorAndroid='transparent'
              onSubmitEditing={this._handlePressAdd}
              placeholder='Type to add new tasks' />
          </View>
          <TouchableWithoutFeedback onPress={this._handlePressAdd}>
            <Icon style={Styles.addSubmit} name='check-circle' />
          </TouchableWithoutFeedback>
        </View>
      )
    } else {
      return (
        <View style={Styles.filters}>
          <PillButton
            text={'All'}
            onPress={this._onPressFilterAll}
            isActive={selectedFilter === 'All'} />
          <PillButton
            text={'Completed'}
            onPress={this._onPressFilterCompleted}
            isActive={selectedFilter === 'Completed'} />
          <PillButton
            text={'Pending'}
            onPress={this._onPressFilterPending}
            isActive={selectedFilter === 'Pending'} />
        </View>
      )
    }
  }

  render () {
    const { addMode } = this.state
    const addIcon = !addMode ? 'add' : 'close'
    return (
      <View style={Styles.navBar}>
        <Text style={[Styles.title, Styles.centered]}>myTODOS</Text>
        <TouchableWithoutFeedback onPress={this._onToggleAdd}>
          <Icon style={Styles.add} name={addIcon} />
        </TouchableWithoutFeedback>

        {this._renderFiltersOrAdd()}
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (task, filterBy) => {
      dispatch(ToDosActions.addTask(task))
    },
    changeFilter: (filterBy) => dispatch(ToDosActions.changeFilter(filterBy))
  }
}

export default connect(null, mapDispatchToProps)(Header)
