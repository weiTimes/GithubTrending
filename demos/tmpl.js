<TabNavigator>
    <TabNavigator.Item
        selected={this.state.selectedTab === 'tb_popular'} // 是否被选中
        selectedTitleStyle={{ color: 'red' }} // 选中时的标题颜色
        title="最热" // 标题
        renderIcon={() => <Image style={styles.tabicon} source={require('../res/images/ic_polular.png')} />} // 图片
        renderSelectedIcon={() => <Image style={[styles.tabicon, styles.ontabicon]} source={require('../res/images/ic_polular.png')} />} // 选中时的图标，选中时给图标着为红色
        badgeText="1"
        onPress={() => this.setState({ selectedTab: 'tb_popular' })}>
        <View style={styles.page1}></View>
    </TabNavigator.Item>
    <TabNavigator.Item
        selected={this.state.selectedTab === 'tb_trending'}
        selectedTitleStyle={{ color: 'red' }}
        title="趋势"
        renderIcon={() => <Image style={styles.tabicon} source={require('../res/images/ic_trending.png')} />}
        renderSelectedIcon={() => <Image style={[styles.tabicon, styles.ontabicon]} source={require('../res/images/ic_trending.png')} />}
        onPress={() => this.setState({ selectedTab: 'tb_trending' })}>
        <View style={styles.page2}></View>
    </TabNavigator.Item>
    <TabNavigator.Item
        selected={this.state.selectedTab === 'tb_favorite'} // 是否被选中
        selectedTitleStyle={{ color: 'red' }} // 选中时的标题颜色
        title="收藏" // 标题
        renderIcon={() => <Image style={styles.tabicon} source={require('../res/images/ic_polular.png')} />} // 图片
        renderSelectedIcon={() => <Image style={[styles.tabicon, styles.ontabicon]} source={require('../res/images/ic_polular.png')} />} // 选中时的图标，选中时给图标着为红色
        badgeText="1"
        onPress={() => this.setState({ selectedTab: 'tb_favorite' })}>
        <View style={styles.page1}></View>
    </TabNavigator.Item>
    <TabNavigator.Item
        selected={this.state.selectedTab === 'bg_my'}
        selectedTitleStyle={{ color: 'red' }}
        title="我的"
        renderIcon={() => <Image style={styles.tabicon} source={require('../res/images/ic_trending.png')} />}
        renderSelectedIcon={() => <Image style={[styles.tabicon, styles.ontabicon]} source={require('../res/images/ic_trending.png')} />}
        onPress={() => this.setState({ selectedTab: 'bg_my' })}>
        <View style={styles.page2}></View>
    </TabNavigator.Item>
</TabNavigator>