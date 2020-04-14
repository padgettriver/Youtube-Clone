import React from 'react';
import {Grid} from '@material-ui/core';
import SearchBar from './components/SearchBar';
import VideoDetail from './components/VideoDetail';
import VideoList from './components/VideoList';
import './App.css';
import youtube from './api/youtube';

class App extends React.Component {
  state = {
    videos: [],
    selectedVideo: null,
  }
  handleSubmit = async(searchTerm) => {
    const response = await youtube.get('search',{  
      params: {
      part: 'snippet',
      maxresults: 10,
      key: 'AIzaSyBdtebJMFywNgjLCb7TLKPPdJkaHXAI1Kw',
      q: searchTerm
      }
  });
    this.setState({videos: response.data.items, selectedVideo: response.data.items[0]})
  }

  render() {
    const {selectedVideo, videos} =this.state;
    return (
     
      <Grid justify='center' container spacing ={10}>
          <Grid item xs={12}>
              <Grid container spacing={10}>
                <Grid item xs ={12}>
                  <h1>Not Youtube</h1>
                  <SearchBar onFormSubmit={this.handleSubmit}/>
                </Grid>
                <Grid item xs={8}>
                  <VideoDetail video={selectedVideo}/>
                </Grid>
                <Grid item xs={4}>
                    <VideoList videos={videos}/>
                </Grid>
              </Grid>
          </Grid>
      </Grid>
    )
  }
}

export default App;
