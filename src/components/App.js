import React from 'react'
import SearchBar from './SearchBar'
import youtube from '../apis/youtube'
import VideoList from './VideoList'
import VideoDetail from './VideoDetail'

class App extends React.Component {
    state = { videos: [], selectedVideo: null }

    componentDidMount() {
        this.onTermSubmit('fast cars')
    }

    onTermSubmit = async term => {
        const cachedResult = JSON.parse(localStorage.getItem(term))
        let items = []
        if (cachedResult) {
            items = cachedResult
        } else {
            const response = await youtube.get('/search', {
                params: {
                    q: term
                }
            })
            items = response.data.items
            localStorage.setItem(term, JSON.stringify(items))
        }
        
        this.setState({
            videos: items,
            selectedVideo: items.length > 0 ? items[0] : null
        })
    }

    onVideoSelect = video => {
        this.setState({ selectedVideo: video })
    }

    render() {
        return (
        <div className="ui container">
            <SearchBar onFormSubmit={this.onTermSubmit} />
            <div className="ui grid">
                <div className="ui row">
                    <div className="eleven wide column">
                        <VideoDetail video={this.state.selectedVideo} />
                    </div>
                    <div className="five wide column">
                        <VideoList
                            videos={this.state.videos}
                            onVideoSelect={this.onVideoSelect}
                        />
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default App