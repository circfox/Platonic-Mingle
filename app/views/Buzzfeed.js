import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import LargeCard from '../components/LargeCard';
import api from '../api';
import React from 'react';

export default class News extends React.Component {
  state = {
    trends: []
  };

  componentDidMount() {
    this.handleGetTrend();
  }

  handleGetTrend = () => {
    api
      .getNews()
      .then(res => {
        this.setState({
          trends: res.articles
        });
      })
      .catch(err => console.log(err));
  };

  toggleFav = () => {
    console.log('fav-ed!');
  };

  render() {
    const { trends } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.background}>
          {trends.map(trend => (
            <LargeCard
              key={trend.title}
              id={trend.publishedAt}
              image={trend.urlToImage}
              name={trend.title}
              url={trend.url}
              description={trend.description}
              click={this.toggleFav}
              user={this.props.user}
            />
          ))}
          <View style={{ marginBottom: 60 }} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#e1e1e1'
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#e1e1e1'
  }
});
