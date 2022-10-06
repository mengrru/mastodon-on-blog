;(function () {

  const Dataset = document.currentScript.dataset
  const Config = {
    loadingText: Dataset.loadingText || 'loading...',
    loadFailText: Dataset.loadFailText || 'load failed',
    rootDOMId: Dataset.rootDomId || 'my-mastodon-widget',
    stylePath: Dataset.stylePath,
    instance: Dataset.instance, // required
    userId: Dataset.userId, // required
    staticStatusesDataPath: Dataset.staticStatusesDataPath,
    token: Dataset.token,
    tag: Dataset.tag,
    shownMax: +Dataset.shownMax
  }

  function launch (config) {
    console.log('launch')
    if (!config.instance) {
      throw new Error('an instance url is required.')
    }
    if (!config.userId) {
      throw new Error('a user id is required.')
    }
    config.loadingText = config.loadingText || 'loading...'
    config.loadFailText = config.loadFailText || 'load failed'
    config.rootDOMId = config.rootDOMId || 'my-mastodon-widget'
    if (!document.getElementById(config.rootDOMId)) {
      throw new Error('cannot find the root DOM #' + config.rootDOMId)
    }
    create(config)
    launched = true
  }

  window.MastodonOnBlog = function (config) {
    launched || launch(config)
  }
  window.MastodonOnBlogProp = {
    showImage
  }

  function loadFile (path, token) {
    return fetch(path, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .catch(e => {
        console.error('Load file ' + path + ' failed.')
        throw e
      })
  }
  function showImage (e, imageData) {
    e.path[1].innerHTML = imageData.reduce((a, b) =>
      b.type === 'image'
        ? a + `<div class="image-wrapper"><img src="${b.preview_url}" /></div>`
        : a
      , '')
    return false
  }
  function render (statusesData, mainDOM, config) {
    const getEmojiWrapper = (emojisData) => 
      (match, p1) => {
        if (!emojisData) return match
        const data = emojisData.find(e => e.shortcode === p1)
        return data ? `<img class="emoji" src="${data.static_url}"/>` : match
      }
    mainDOM.innerHTML = statusesData.reduce((html, d) =>
      `${html}
        <div class="item">
          <div class="content">${d.content.replace(/:(\w+):/g, getEmojiWrapper(d.emojis))}</div>
            ${ d.media_attachments.some(e => e.type === 'image')
              ? `
                <div class="images">
                  <a class="show-image" onclick="MastodonOnBlogProp.showImage(event, ${JSON.stringify(d.media_attachments).replace(/"/g, '\'')})" href="#">
                    显示图片
                  </a>
                </div>
              `: ''
            }
          <div class="time">${formatTime(d.created_at)}</div>
        </div>
      `, '')
    Array.from(document.querySelectorAll('.hashtag')).forEach(e => {
      e.remove()
    })
    if (config.stylePath) {
      loadFile(config.stylePath)
        .then(data => data.text())
        .then(style => {
          const styleDOM = document.createElement('style')
          styleDOM.innerHTML = style.replace(/#my-mastodon-widget/g, `#${config.rootDOMId}`)
          mainDOM.appendChild(styleDOM)
        })
    }
  }
  function formatTime (dateString) {
    return new Date(dateString).toLocaleString()
  }
  function create (config) {
    const rootDOM = document.getElementById(config.rootDOMId)
    const mainDOM = document.createElement('div')
    mainDOM.className = 'main'
    mainDOM.innerHTML = config.loadingText
    rootDOM.appendChild(mainDOM)

    const path = config.staticStatusesDataPath ||
      `https://${config.instance}/api/v1/accounts/${config.userId}/statuses?tagged=${config.tag || ''}&exclude_replies=true`

    loadFile(path, config.token)
      .then(data => {
        if (data.status >= 400) {
          throw data.status
        }
        return data.json()
      })
      .then(data => {
        render(data.slice(0, config.shownMax || data.length), mainDOM, config)
      })
      .catch(statusCode => {
        mainDOM.innerHTML = config.loadFailText + '<br>status code: ' + statusCode
      })
  }

  // for compatibility
  let launched = false
  launch(Config)

})()
