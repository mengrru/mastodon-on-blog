# mastodon-on-blog

把你的长毛象消息放在你的博客上！

## 快速开始

将本项目克隆到你的博客目录中，在需要加入该插件的地方插入代码：

```
<iframe src="<root_path>/mastodon-on-blog/index.html" height=100 width=200></iframe>
```

保存后刷新页面，就能看到插件显示了。

## 配置

打开 `mastodon-on-blog/index.html`，看到：

```
MastodonOnBlog({
    instance: 'o3o.ca',
    userId: 541,
    loadingText: '加载中(´·ω·｀)',
    loadFailText: '加载失败(╯°Д°）╯︵ /(.□ . \\)',
    token: '',
    rootDOM: 'my-mastodon-widget',
    emojiDataPath: './test/emoji.json',
    testStatusesData: './test/statuses.json'
})
```

将 `instance` 改为你所在的长毛象实例，将 `userId` 改为你的数字 id，在 `token` 处填写你的[访问令牌](#设置访问令牌)，最后删除 `emojiDataPath` 和 `testStatusesData` 字段。保存后刷新页面，不出意外就能看到你的长毛象嘟文显示在插件中了。

## 字段说明

## 设置访问令牌

## 主题开发

## 不使用 iframe 插入
