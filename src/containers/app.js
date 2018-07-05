import React, {Component} from 'react';
import axios from 'axios';
import SearchBar from '../components/search-bar';
import VideoList from './video-list';

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

    componentWillMount() {
        axios
        .get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`)
        .then(function(response){
            console.log(response);
            this.setState({movieList:response.data.results.slice(1,6)});
            this.setState({currentMovie:response.data.results[0]})
        }.bind(this))
    }

    render () {
        return (
            <div>
                <SearchBar/>
                <VideoList/>
            </div>
        )
    }
};

export default App;