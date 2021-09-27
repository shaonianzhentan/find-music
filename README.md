# find-music

专为HomeAssistant云音乐插件设计，主要是由于版权原因，这也听不了，那也听不了。

所以这个服务可以通过音乐名称查找到对应的音乐链接

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

## License

MIT