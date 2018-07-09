import React, {Component} from 'react';
import axios from 'axios';
import SearchBar from '../components/search-bar';
import VideoList from './video-list';
import VideoDetails from '../components/video-details';
import Video from '../components/video';

const API_END_POINT = "https://api.themoviedb.org/3/";
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images";
const API_KEY = 'api_key=8132a80d54e7401a2442b7e2303c81d9';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            movieList:{},
            currentMovie:{}
        };
    }
    getMovies(){
        axios
        .get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`)
        .then(function(response){
            console.log(response);
            this.setState(
                {
                    movieList:response.data.results.slice(1,6),
                    currentMovie:response.data.results[0]
                }, function(){
                    this.applyVideoToCurrentMovie()
                }
            );
        }.bind(this))
    }

    applyVideoToCurrentMovie(){
         axios
            .get(`${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=false`)
            .then(function(response) {
               const youtubeKey = response.data.videos.results[0].key;
               let newCurrentMovieState = this.state.currentMovie;
               newCurrentMovieState.videoId = youtubeKey;
               this.setState({currentMovie : newCurrentMovieState});
               console.log(newCurrentMovieState.videoId);
            }
            .bind(this));
    }

    componentWillMount() {
        this.getMovies(); 
     }

    render () {
        const renderVideoList = () => {
            if (this.state.movieList.length >= 5){
                return <VideoList movieList={this.state.movieList}/>
            }
        }
        
        return (
            <div>
                <div className="searchBar">
                    <SearchBar/>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <Video videoId={this.state.currentMovie.videoId}/>
                        <VideoDetails 
                            title={this.state.currentMovie.title}
                            description={this.state.currentMovie.overview}
                         />
                    </div>
                    <div className="col-md-4">
                        {renderVideoList()}
                    </div>
                </div>
            </div>
        )
    }
};

export default App;