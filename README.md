# find-music

专为HomeAssistant云音乐插件设计，主要是由于版权原因，这也听不了，那也听不了。

所以这个服务可以通过音乐名称查找到对应的音乐链接

[![hacs_badge](https://img.shields.io/badge/Home-Assistant-%23049cdb)](https://www.home-assistant.io/)
![visit](https://visitor-badge.glitch.me/badge?page_id=shaonianzhentan.find-music&left_text=visit)

---

使用pm2启动管理

```bash

# clone项目
git clone https://github.com.cnpmjs.org/shaonianzhentan/find-music

# 进入项目
cd find-music

# 安装依赖
npm i

# 启动
pm2 start index.js --name findmusic

# 重启
pm2 restart findmusic

# 查看日志
pm2 logs findmusic
```

## 如果这个项目对你有帮助，请我喝杯<del style="font-size: 14px;">咖啡</del>奶茶吧😘
|  |支付宝|微信|
|---|---|---|
奶茶= | <img src="https://github.com/shaonianzhentan/ha-docs/raw/master/docs/img/alipay.png" align="left" height="160" width="160" alt="支付宝" title="支付宝">  |  <img src="https://github.com/shaonianzhentan/ha-docs/raw/master/docs/img/wechat.png" align="left" height="160" width="160" alt="微信支付" title="微信">


#### 关注我的微信订阅号，了解更多HomeAssistant相关知识
<img src="https://github.com/shaonianzhentan/ha-docs/raw/master/docs/img/wechat-channel.png" align="left" height="160" alt="HomeAssistant家庭助理" title="HomeAssistant家庭助理"> 