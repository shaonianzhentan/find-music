const { search, song_url } = require('NeteaseCloudMusicApi')

search({
    keywords: '笑纳 花僮'
}).then(async ({ body }) => {
    const { result: { songs } } = body
    const music = songs[0]
    const id = music['id']
    const album = music['album']['name']
    const cover = music['album']['artist'].img1v1Url
    const name = music['name']
    const singer = music['artists'][0]['name']
    const duration = music['duration']
    const { body: { data } } = await song_url({ id })
    
    const purl = data[0].url
    console.log('音乐ID', id)
    console.log('专辑', album)
    console.log('歌名', name)
    console.log('歌手', singer)
    console.log('时长', (duration / 60).toFixed(2))
    console.log('播放链接', purl)
    if (!purl) return null
    return { source: 'kuwo', album, name, singer, duration, id, purl, cover }
})