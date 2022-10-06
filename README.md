# mastodon-on-blog

English Docs | [中文文档](https://github.com/mengrru/mastodon-on-blog/blob/main/README.zh.md)

Put a Mastodon widget on your website or blog.

## Quick start

Clone this repo to your blog dir, and insert the code to your page:

```
<iframe src="<root_path>/mastodon-on-blog/index.html" height=100 width=200></iframe>
```

Save and refresh the page, then you can see the widget looks like this:

![mastodon](https://user-images.githubusercontent.com/80361883/139525296-b21924cb-84b3-40ac-9cef-1f8743a43b56.png)

\*if you don't want to clone this repo and use iframe, go to [# Not using iframe](#not-using-iframe).

## Configuration

Open `mastodon-on-blog/index.html` and focus on:

```
<script
  data-instance="o3o.ca"
  data-user-id="541"
  data-loading-text="加载中(´·ω·｀)"
  data-root-dom-id="my-mastodon-widget"
  data-static-statuses-data-path="./test/statuses.json"
  data-style-path="./default.style.css"
  src="./mastodon-on-blog.js"
></script>
```

Change the value of `data-instance` to the domain name of your Mastodon instance, change the value of `data-user-id` to your [number id](#get-your-number-id), and at last remove `data-static-statuses-data-path`. Save and refresh your page, and you can see your toots was shown in the widget.

\*if you get the message `status code: 401`, go to [# Status code: 401](#status-code-401).

## API

| Field | Description | Required | Default |
| --- | --- | --- | --- |
| data-instance | the domain name of your Mastodon instance | yes | \- |
| data-user-id | your number id | yes | \- |
| data-tag | only show the toots with this tag | no | \- |
| data-style-path | path of css file that would stylus your widget | no | \- |
| data-shown-max | the max number of your toots will be shown | no | 20 |
| data-root-dom-id | the id of root DOM that widget rendering | no | 'my-mastodon-widget' |
| data-loading-text | the shown text when loading | no | 'loading...' |
| data-load-fail-text | the shown text when loading failed | no | 'load failed' |
| data-static-statuses-data-path | the path of static statuses data. you can use it when you build widget themes | no | \- |
| data-token | your access token. usually not needed, and use with caution [if needed](#status-code-401). | no | \- |

## Build your own themes

Modify the file `default.style.css` to build your own styles, or create a new css file modify the value of field `data-style-path` to its path.

If you need an independent iframe to test your work, you can use `test/index.html`.

For quick modify, read [Quick build your own themes](https://github.com/mengrru/mastodon-on-blog/blob/main/themes/livly-1/README.md).

## Available themes

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

## FAQ

### Get your number id

Open your Mastodon timeline in browser, and click your avatar, then look at address bar you can find the url is `<instance domain>/web/accounts/<number>`, the `<number>` is your number id.

### Not using iframe

If you don't want to use iframe, you can import `mastodon-on-blog.js` to your page:

```
<script
  data-instance="<your instance domain>"
  data-user-id="<your user id>"
  data-style-path="https://mengrru.github.io/mastodon-on-blog/default.style.css"
  src="https://mengrru.github.io/mastodon-on-blog/mastodon-on-blog.js">
</script>
```

then insert this HTML code to where you want the widget is rendered:

```
<div id="my-mastodon-widget"></div>
```
### Status code: 401

if you get the message "Status code: 401" in your widget, there are two possibilities:

1. Your instance is in whitelist mode;
2. The version of your instance is older than 2.7.0

Under all of status above, your should use a `read:statuses` [token](#set-your-access-token) to fetch your toots:

```
MastodonOnBlog({
    ...
    token: 'your token'
})
```

**RISK WARNING:**

**The token will expose all your toots, including your private toots like what follower-only or someone-only.**

### Set your access token

Enter `<instance domain>/settings/applications/new`, fill an application name (whatever you like), **only check `read:statuses` and uncheck all others options**, then click submit button. Open the application page you just created, you can find the access token (你的访问令牌 in Chinese).
