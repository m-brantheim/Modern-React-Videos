import axios from 'axios'

const KEY = 'AIzaSyD55Rm7uYwdeDztVLoi6xQA8TNqCai7mlU'

export default axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY
    }
})

