const { log } = require('./utils')
const axios = require('axios')

async function getUrl(id) {
    const url = `https://antiserver.kuwo.cn/anti.s?type=convert_url&format=mp3&response=url&rid=${id}`
    console.log(url)
    const res = await axios.get(url)
    return res.data
}

async function search(key) {
    const keywords = encodeURIComponent(key)
    const url = `https://www.kuwo.cn/api/www/search/searchMusicBykeyWord?key=${keywords}&pn=1&rn=10`
    console.log(url)

    const resToken = await axios.get('https://www.kuwo.cn/')
    const Cookie = resToken.headers['set-cookie'][0]
    const res = await axios({
        url,
        headers: {
            Referer: `https://www.kuwo.cn/search/list?key=${keywords}`,
            csrf: Cookie.split(';')[0].replace('kw_token=', ''),
            Cookie
        }
    })
    const { data } = res.data
    const music = data.list[0]
    console.log(music)
    const id = music['rid']
    const album = music['album']
    const cover = music['pic']
    const name = music['name']
    const singer = music['artist']
    const duration = music['duration']
    const purl = await getUrl(id)
    console.log('音乐ID', id)
    console.log('专辑', album)
    console.log('歌名', name)
    console.log('歌手', singer)
    console.log('时长', (duration / 60).toFixed(2))
    console.log('播放链接', purl)
    if (!purl) return null
    return { source: 'kuwo', album, name, singer, duration, id, purl, cover }
}


module.exports = async function (key) {
    log('酷我音乐搜索：', key)
    return await search(key)
}

