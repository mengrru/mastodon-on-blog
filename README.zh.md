# mastodon-on-blog

把你的嘟文放在你的博客上！

## 快速开始

将本项目克隆到你的博客目录中，在需要加入该插件的地方插入代码：

```
<iframe src="<root_path>/mastodon-on-blog/index.html" height=100 width=200></iframe>
```

保存后刷新页面，就能看到插件显示了。

![mastodon](https://user-images.githubusercontent.com/80361883/139525296-b21924cb-84b3-40ac-9cef-1f8743a43b56.png)

\*如果你不想使用克隆到自己博客目录的方式，或者不想使用 iframe，可以查看文档[不使用 iframe](#不使用-iframe)。

## 配置

打开 `mastodon-on-blog/index.html`，看到：

```
MastodonOnBlog({
    instance: 'o3o.ca',
    userId: 541,
    loadingText: '加载中(´·ω·｀)',
    loadFailText: '加载失败(╯°Д°）╯︵ /(.□ . \\)',
    rootDOM: 'my-mastodon-widget',
    staticStatusesDataPath: './test/statuses.json'
})
```

将 `instance` 的值改为你所在的长毛象实例域名，将 `userId` 的值改为你的[数字 id](#获取你的数字-id)，最后删除 `staticStatusesDataPath` 字段。保存后刷新页面，不出意外就能看到你的长毛象嘟文显示在插件中了。

\*如果出现 `status code: 401` 的错误提示，查看 [# Status code: 401](#status-code-401)。

## API

| 字段 | 描述 | 是否必须填写 | 默认值 | 值类型 |
| --- | --- | --- | --- | --- |
| instance | 你所在的长毛象实例的域名 | 是 | \- | String |
| userId | 你的数字 id | 是 | \- | Number |
| tag | 只会显示带有该 tag 的嘟文 | 否 | \- | String |
| shownMax | 显示嘟文的最大条数 | 否 | 20 | Number |
| rootDOM | 插件渲染的根dom的id | 否 | 'my-mastodon-widget' | String |
| loadingText | 等待加载时显示的文字 | 否 | '加载中...' | String |
| loadFailText | 加载失败时显示的问题 | 否 | '加载失败' | String |
| staticStatusesDataPath | 嘟文静态数据的路径。可以在编写插件皮肤的时候使用这个字段注入测试数据 | 否 | \- | String |
| token | 访问令牌。如非必要不要使用。如果必须要用，见 [Status code: 401](#status-code-401) | 否 | \- | String |

## 编写自己的插件皮肤

直接修改文件 `default.style.css` 或者创建一个新的 css 文件并将它 link 到 `index.html` 中。

如果你需要一个独立的 iframe 来测试你的皮肤效果，可以使用 `test/index.html`。

特别地，阅读 [Quick build your own themes](https://github.com/mengrru/mastodon-on-blog/blob/main/themes/livly-1/README.md) 来快速制作自己的皮肤。

## 可用的皮肤

**default**

![mastodon](https://user-images.githubusercontent.com/80361883/139525296-b21924cb-84b3-40ac-9cef-1f8743a43b56.png)

```
https://mengrru.github.io/mastodon-on-blog/default.style.css
```

**livly-1**

![livly1preview](https://user-images.githubusercontent.com/80361883/139531628-de785ad9-6a42-441a-b93a-e88c9c5af229.PNG)

```
https://mengrru.github.io/mastodon-on-blog/themes/livly-1/style.css
```

**livly-2**

![livly2preview](https://user-images.githubusercontent.com/80361883/139531636-c0077c91-3c17-47be-8141-7c35e5851335.PNG)

```
https://mengrru.github.io/mastodon-on-blog/themes/livly-2/style.css
```

**animal-crossing-1**

![like](https://user-images.githubusercontent.com/80361883/139692121-30bcc691-fa21-48c3-a6bf-418130a49bca.PNG)

```
https://mengrru.github.io/mastodon-on-blog/themes/animal-crossing-1/style.css
```

## 常见问题

### 获取你的数字 id

用浏览器打开你的长毛象时间线，点击你自己的头像，然后查看地址栏，你可以看到页面地址为：`<instance domain>/web/accounts/<number>`，其中 `<number>` 就是你的数字 id。

### 不使用 iframe

如果你不想使用 iframe，你可以直接在你的页面引入 `default.style.css` 和 `mastodon-on-blog.js`：

```
<link href="https://mengrru.github.io/mastodon-on-blog/default.style.css" rel="stylesheet">
<script src="https://mengrru.github.io/mastodon-on-blog/mastodon-on-blog.js"></script>
```

然后在你希望放置插件的地方插入下面的 HTML 代码：

```
<div id="my-mastodon-widget"></div>
```

最后在页面底部插入配置插件的 JavaScript 代码：

```
MastodonOnBlog({
    instance: '',
    userId: 1,
    ...
})
```
### Status code: 401

如果插件中显示了错误信息 "Status code: 401"，有两种可能的原因：

1. 你所在的长毛象实例开启了 whitelist mode；
2. 你所在的长毛象实例的版本低于2.7.0。

对于以上两种情况，你需要给你的插件传入一个带有 `read:statuses` 权限的 [token](#设置-token) 来解决：

```
MastodonOnBlog({
    ...
    token: 'your token'
})
```

**风险提示：**

**这个 token 会暴露你的包括仅关注者或某个用户可见在内的所有嘟文。**

### 设置 token

进入页面 `<instance domain>/settings/applications/new`，随便填写一个应用名称，然后**只勾选`read:statuses`选项并取消其它所有选项**，最后点击提交按钮。打开你刚才创建的应用的页面，你的访问令牌（token）。

