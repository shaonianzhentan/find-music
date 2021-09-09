const { log } = require('./utils')
const axios = require('axios')

async function getUrl(songId) {
    const obj = {
        "req_0": {
            "module": "vkey.GetVkeyServer",
            "method": "CgiGetVkey",
            "param": {
                filename: [`M500${songId}${songId}.mp3`],
                "guid": "10000",
                "songmid": [songId],
                "songtype": [0],
                "uin": "0",
                "loginflag": 1,
                "platform": "20"
            }
        },
        "comm": { "uin": 0, "format": "json", "ct": 20, "cv": 0 }
    }
    const url = `https://u.y.qq.com/cgi-bin/musicu.fcg?loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=${encodeURIComponent(JSON.stringify(obj))}`
    // console.log(url)
    const res = await axios.get(url)
    const { data } = res.data.req_0
    let { purl } = data.midurlinfo[0]
    if (purl) {
        purl = `${data.sip[0]}${purl}`
    }
    return purl
}

async function search(key) {
    const url = `https://c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=60997426243444153&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=20&w=${encodeURIComponent(key)}&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0`
    // console.log(url)
    const res = await axios.get(url)
    const { data } = res.data
    const music = data.song.list[0]
    // console.log(music)
    const id = music['mid']
    const album = music['album']['name']
    const cover = "https://bizaladdin-image.baidu.com/0/pic/dae9424d1e0b92e65403cc7de34c1181.jpg"
    const name = music['name']
    const singer = music['singer'][0]['name']
    const duration = music['interval']
    const purl = await getUrl(id)
    console.log('音乐ID', id)
    console.log('专辑', album)
    console.log('歌名', name)
    console.log('歌手', singer)
    console.log('时长', (duration / 60).toFixed(2))
    console.log('播放链接', purl)
    if (!purl) return null
    return { source: 'qqmusic', album, name, singer, duration, id, purl, cover }
}


module.exports = async function (key) {
    log('QQ音乐搜索：', key)
    return await search(key)
}