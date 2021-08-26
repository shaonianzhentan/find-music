const { log } = require('./utils')
const axios = require('axios')

async function getUrl(hash) {
    const url = `https://wwwapi.kugou.com/yy/index.php?r=play/getdata&callback=&hash=${hash}&dfid=dfid&mid=mid&platid=4`
    console.log(url)
    const res = await axios.get(url)
    const { play_url } = res.data.data
    return play_url
}

async function search(key) {
    const url = `https://songsearch.kugou.com/song_search_v2?keyword=${encodeURIComponent(key)}&page=1`
    console.log(url)
    const res = await axios.get(url)
    const { data } = res.data
    const music = data.lists[0]
    // console.log(music)
    const id = music['FileHash']
    const album = music['AlbumName']
    const cover = ""
    const name = music['SongName']
    const singer = music['SingerName']
    const duration = music['Duration']
    const purl = await getUrl(id)
    console.log('音乐ID', id)
    console.log('专辑', album)
    console.log('歌名', name)
    console.log('歌手', singer)
    console.log('时长', (duration / 60).toFixed(2))
    console.log('播放链接', purl)
    if (!purl) return null
    return { source: 'kugou', album, name, singer, duration, id, purl, cover }
}


module.exports = async function (key) {
    log('酷狗音乐搜索：', key)
    return await search(key)
}

