# mastodon-on-blog

Put a Mastodon widget on your website or blog.

## Quick start

Clone this repo to your blog dir, and insert the code to your page:

```
<iframe src="<root_path>/mastodon-on-blog/index.html" height=100 width=200></iframe>
```

Save and refresh the page, then you can see the widget looks like this:

![mastodon](https://user-images.githubusercontent.com/80361883/139525296-b21924cb-84b3-40ac-9cef-1f8743a43b56.png)

\*if you don't want to clone this repo and use iframe, go [# Not use iframe](#not-use-iframe).

## Configuration

Open `mastodon-on-blog/index.html` and focus on:

```
MastodonOnBlog({
    instance: 'o3o.ca',
    userId: 541,
    loadingText: '加载中(´·ω·｀)',
    loadFailText: '加载失败(╯°Д°）╯︵ /(.□ . \\)',
    token: '',
    rootDOM: 'my-mastodon-widget',
    staticEmojiDataPath: './test/emoji.json',
    staticStatusesDataPath: './test/statuses.json'
})
```

Change `instance` to the domain name of your Mastodon instance, change `userId` to your [number id](#get-your-number-id), change `token` to your [access token](#set-your-access-token), and last remove `staticEmojiDataPath` and `staticStatusesDataPath`. Save and refresh your page, and you can see your toot show in the widget.

## API

| Field | Description | Required | Default |
| --- | --- | --- | --- |
| instance | the domain name of your Mastodon instance | yes | \- |
| userId | your number id | yes | \- |
| token | your access token | yes | \- |
| tag | only show the toot with this tag | no | \- |
| rootDOM | the root DOM of widget rendering | no | 'my-mastodon-widget' |
| loadingText | the shown text when loading | no | '加载中...' |
| loadFailText | the shown text when loading failed | no | '加载失败' |
| staticEmojiDataPath | the path of static emoji data. you can copy a static one from `<instance domain>/api/v1/custom_emojis` and use it to speed up the loading of widget | no | \- |
| staticStatusesDataPath | the path of static statuses data. you can use it when you build widget themes | no | \- |

## Build your own themes

Modify the file `default.style.css` to build your own styles, or create a new css file and link it in the `index.html`.

If you need an independent iframe to test your work, you can use `test/index.html`.

## Available themes

**default**

![mastodon](https://user-images.githubusercontent.com/80361883/139525296-b21924cb-84b3-40ac-9cef-1f8743a43b56.png)

```
https://raw.githubusercontent.com/mengrru/mastodon-on-blog/main/default.style.css
```

**livly-1**

![livly1preview](https://user-images.githubusercontent.com/80361883/139531628-de785ad9-6a42-441a-b93a-e88c9c5af229.PNG)

```
https://raw.githubusercontent.com/mengrru/mastodon-on-blog/main/themes/livly-1/style.css
```

**livly-2**

![livly2preview](https://user-images.githubusercontent.com/80361883/139531636-c0077c91-3c17-47be-8141-7c35e5851335.PNG)

```
https://raw.githubusercontent.com/mengrru/mastodon-on-blog/main/themes/livly-2/style.css
```

## FAQ

### Get your number id

Open your Mastodon timeline in browser, and click your avatar, then look at address bar you can find the url is `<instance domain>/web/accounts/<number>`, the `<number>` is your number id.

### Set your access token

Enter `<instance domain>/settings/applications/new`, fill an application name (whatever you like), **only check `read:statuses` and uncheck all others options**, then click submit button. Open the application page you just created, you can find the access token (你的访问令牌 in Chinese).

### Not use iframe

If you don't want to use iframe, you can import `default.style.css` and `mastodon-on-blog.js` to your page:

```
<link href="https://raw.githubusercontent.com/mengrru/mastodon-on-blog/main/default.style.css" rel="stylesheet">
<script src="https://raw.githubusercontent.com/mengrru/mastodon-on-blog/main/mastodon-on-blog.js"></script>
```

then insert the HTML code to where you want the widget is rendered:

```
<div id="my-mastodon-widget"></div>
```

at last insert the config code at the bottom of your page:

```
MastodonOnBlog({
    instance: '',
    userId: 1,
    token: '',
    ...
})
```
