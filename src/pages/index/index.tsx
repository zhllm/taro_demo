import { Component } from 'react'
import { View, Button, Text, ScrollView } from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import './index.scss'

type PageStateProps = {
  store: {
    counterStore: {
      counter: number,
      increment: Function,
      decrement: Function,
      incrementAsync: Function
    }
  }
}

interface Index {
  props: PageStateProps;
}

@inject('store')
@observer
class Index extends Component {


  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: '步骤1', children: [{ name: '步骤1-1' }] },
        { name: '步骤2', children: [{ name: '步骤2-4' }, { name: '步骤2-2' }, { name: '步骤2-3' },] },
        { name: '步骤3', children: [{ name: '步骤3-4' }, { name: '步骤3-1' }, { name: '步骤3-2' }, { name: '步骤3-3' },] },
        { name: '步骤4', children: [{ name: '步骤4-4' }, { name: '步骤4-1' }, { name: '步骤4-2' }, { name: '步骤4-3' },] },
        { name: '步骤5', children: [{ name: '步骤5-4' }, { name: '步骤5-1' }, { name: '步骤5-2' }, { name: '步骤5-3' },] },
      ],
      currenStep: 0,
      current: 0,
    }
  }


  componentWillMount() { }

  componentDidMount() {


  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  increment = () => {
    const { counterStore } = this.props.store
    counterStore.increment()
  }

  decrement = () => {
    const { counterStore } = this.props.store
    counterStore.decrement()
  }

  incrementAsync = () => {
    const { counterStore } = this.props.store
    counterStore.incrementAsync()
  }

  renderCircle = () => {
    return (
      <View className='circle' />
    )
  }

  renderDiamond = () => {
    return null
  }



  render() {
    const { counterStore: { counter } } = this.props.store
    const { data } = this.state;
    const address = 750;
    const peerWidth = 120;
    const totalWidth = peerWidth * data.length
    return (
      <View className='index' style={{ position: 'relative' }}>

        <View
          style={{
            width: peerWidth + peerWidth / 4 * this.state.current,
            height: 8,
            background: 'yellow',
            borderRadius: 8,
            transition: 'width 2s',
          }}
        >

        </View>

        <ScrollView
          scrollX
          // scrollLeft={peerWidth * this.state.currenStep}
          scrollWithAnimation
          style={{ background: 'transparent' }}
        >
          <View
            style={{
              width: totalWidth,
              height: 42,
              position: 'relative',
              background: 'transparent',
            }}
          >
            {
              data.map((child, index) => {
                return (
                  <>
                    <View
                      key={child.name}
                      className='diamond'
                      style={{
                        position: 'absolute',
                        left: (index + 1) * peerWidth,
                        top: 8,
                      }}
                    />
                    <Text
                      key={`${child.name} text`}
                      style={{
                        position: 'absolute',
                        left: (index + 1) * peerWidth,
                        top: 22,
                      }}
                    >
                      {child.name}
                    </Text>
                    <View className='circle'
                      style={{
                        position: 'absolute',
                        left: peerWidth * (index + 1) + (peerWidth / 4) * this.state.current,
                        top: 0,
                        transition: 'left 2s',
                      }}
                    />
                  </>
                )
              })
            }
          </View>
        </ScrollView>

        <View style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: 42, zIndex: 2 }}></View>
        <Button
          style={{ marginTop: 30 }}
          onClick={() => {
            this.setState({
              current: this.state.current + 1,
            })
          }}
        >
          next current
        </Button>
        <Button
          style={{ marginTop: 30 }}
          onClick={() => {
            this.setState({
              currenStep: this.state.currenStep + 1,
            })
          }}
        >
          next step
        </Button>
      </View>
    )
  }
}

export default Index
