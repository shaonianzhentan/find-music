const Router = require('koa-router')
const router = new Router()

const getAudioUrl = require('../lib/xmly')
const qqmusic = require('../lib/qqmusic')
const migu = require('../lib/migu')
const kugou = require('../lib/kugou')
const kuwo = require('../lib/kuwo')

/**
 * @swagger
 * /api/xmly:
 *   get:
 *     summary: 获取音频资源
 *     description: 获取喜马拉雅VIP音频链接，需要先新建xmly.cookie的文件，必须要VIP账号
 *     tags:
 *       - API
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         description: 音频ID
 *         type: integer
 *     responses:
 *       200:
 *         description: 成功获取
 */
router.get('/xmly', async (ctx) => {
    const { id } = ctx.query
    const body = await getAudioUrl(id)
    ctx.body = body
})

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: 搜索音乐资源
 *     description: 根据关键词搜索对应的音频资源（QQ音乐、咪咕、酷狗、酷我）
 *     tags:
 *       - API
 *     parameters:
 *       - name: key
 *         in: query
 *         required: true
 *         description: 歌名
 *         type: string
 *     responses:
 *       200:
 *         description: 成功获取
 */
router.get('/search', async (ctx) => {
    const { key } = ctx.query
    let data = await qqmusic(key)
    if (data) {
        return ctx.body = { code: 0, data, msg: '在QQ音乐中找到' }        
    }

    data = await migu(key)
    if (data) {
        return ctx.body = { code: 0, data, msg: '在咪咕音乐中找到' }        
    }

    data = await kugou(key)
    if (data) {
        return ctx.body = { code: 0, data, msg: '在酷狗音乐中找到' }
    }

    data = await kuwo(key)
    if (data) {
        return ctx.body = { code: 0, data, msg: '在酷我音乐中找到' }
    }
    
    ctx.body = { code: 1, msg: '找不到音乐' }
})

module.exports = router