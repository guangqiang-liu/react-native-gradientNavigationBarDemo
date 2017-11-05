/**
 * GradientNavigationBarDemo
 * 作者Git：https://github.com/guangqiang-liu
 * 技术交流群：620792950
 * 作者QQ：1126756952
 * Created by guangqiang on 2017/11/5
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  Dimensions,
  TextInput
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

const { width } = Dimensions.get('window')

export default class App extends Component<{}> {

  constructor(props) {
    super(props)
    this.navBar = null
    this.renderRow = this.renderRow.bind(this)
    this.renderHeader = this.renderHeader.bind(this)
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  renderRow(rowData, sectionId, rowId) {
    return (
      <View
        style={{height: 100, justifyContent: 'center', borderWidth: 1, borderColor: 'red'}}
        key={rowId}>
        <Text style={{marginHorizontal: 10}}>{`这时第：${rowId}行`}</Text>
      </View>
    )
  }

  renderHeader() {
    return (
      <View>
        <Image style={{height: 200, width: width}} source={{uri: 'http://ovyjkveav.bkt.clouddn.com/17-10-19/15885901.jpg'}} resizeMode={'cover'}/>
      </View>
    )
  }

  _onScroll(event) {
    let y = event.nativeEvent.contentOffset.y
    let opacityPercent = y / 64
    if (y < 64) {
      this.navBar.setNativeProps({
        style: {opacity: opacityPercent}
      })
    } else {
      this.navBar.setNativeProps({
        style: {opacity: 1}
      })
    }
  }

  render() {
    let dataSource = this.state.dataSource.cloneWithRows([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    return (
      <View style={styles.container}>
        <ListView
          onScroll={this._onScroll.bind(this)}
          bounces={false}
          dataSource={dataSource}
          renderRow={this.renderRow}
          renderHeader={this.renderHeader}/>
        <View style={[styles.navBar, {backgroundColor: 'transparent'}]}>
          <View style={styles.navContent}>
            <Icon name={'calendar'} size={20} color={'white'}/>
            <View style={styles.searchBar}>
              <TextInput
                style={{fontSize: 13, height: 40}}
                placeholder={'请输入搜索内容'}
                underlineColorAndroid='transparent'/>
            </View>
            <Icon name={'bug'} size={20} color={'white'}/>
          </View>
        </View>
        <View
          ref={ref => this.navBar = ref}
          style={[styles.navBar, {opacity: 0}]}>
          <View style={styles.navContent}>
            <Icon name={'calendar'} size={20} color={'white'}/>
            <View style={styles.searchBar}>
              <TextInput
                style={{fontSize: 13, height: 40}}
                placeholder={'请输入搜索内容'}
                underlineColorAndroid='transparent'/>
            </View>
            <Icon name={'bug'} size={20} color={'white'}/>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  navBar: {
    height: 64,
    width: width,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FA0016',
  },
  navContent: {
    marginTop: 20,
    height: 44,
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  searchBar: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    flex: 1,
    height: 25,
    backgroundColor: 'white',
    marginHorizontal: 15
  }
})