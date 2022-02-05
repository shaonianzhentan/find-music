const { log } = require('./utils')
const { search, song_url } = require('NeteaseCloudMusicApi')

module.exports = async function (key) {
    log('网易云音乐搜索：', key)
    const { body: { result: { songs } } } = await search({
        keywords: key
    })
    const music = songs[0]
    const id = music['id']
    const album = music['album']['name']
    const cover = music['album']['artist'].img1v1Url
    const name = music['name']
    const singer = music['artists'][0]['name']
    const duration = music['duration']
    const { body: { data } } = await song_url({ id })
    if (data.length == 0) return null
    const purl = data[0].url
    if(!purl) return null
    console.log('音乐ID', id)
    console.log('专辑', album)
    console.log('歌名', name)
    console.log('歌手', singer)
    console.log('时长', (duration / 60).toFixed(2))
    console.log('播放链接', purl)
    return { source: 'netease', album, name, singer, duration, id, purl, cover }
}

