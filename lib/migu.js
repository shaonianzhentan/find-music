const { log } = require('./utils')
const axios = require('axios')

async function search(key) {
    const res = await axios(
        {
            url: `http://m.music.migu.cn/migu/remoting/scr_search_tag?rows=5&type=2&pgc=1&keyword=${encodeURIComponent(key)}`,
            headers: {
                'Referer': 'http://m.music.migu.cn/'
            }
        })
    const { musics } = res.data
    const music = musics[0]
    // console.log(music)
    const id = music['id']
    const album = music['albumName']
    const cover = music['cover']
    const name = music['songName']
    const singer = music['singerName']
    const duration = music['auditionsLength']
    const purl = music.mp3
    console.log('音乐ID', id)
    console.log('专辑', album)
    console.log('歌名', name)
    console.log('歌手', singer)
    console.log('时长', (duration / 60).toFixed(2))
    console.log('播放链接', purl)
    if (!purl) return null
    return { source: 'migu', album, name, singer, duration, id, purl, cover }
}


module.exports = async function (key) {
    log('咪咕音乐搜索：', key)
    return await search(key)
}