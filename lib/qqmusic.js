const { log } = require('./utils')
const qqMusic = require('qq-music-api');

async function search(key) {
    let res = await qqMusic.api('search', { key })
    if (!Array.isArray(res.list) || res.list.length === 0) return null;
    const music = res.list[0]
    // console.log(music)
    const id = music['songmid']
    const album = music['albumname']
    const cover = `https://y.qq.com/music/photo_new/T002R300x300M000${music['albummid']}.jpg`
    const name = music['songname']
    const singer = music['singer'][0]['name']

    // 获取音乐信息
    // res = await qqMusic.api('song', { songmid: id })
    // console.log(res)
    // 获取音乐链接
    try {
        const purl = await qqMusic.api('song/url', { id, mediaId: music['strMediaMid'] })
        if (!purl) return null;
        const duration = 0
        return { source: 'qqmusic', album, name, singer, duration, id, purl, cover }
    } catch (ex) {

    }
}


module.exports = async function (key) {
    log('QQ音乐搜索：', key)
    return await search(key)
}