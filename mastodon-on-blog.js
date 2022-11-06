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
    shownMax: +Dataset.shownMax,
    showImagesWording: Dataset.showImagesWording || '[Show images]'
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
    e.preventDefault()
    e.path[1].innerHTML = imageData.reduce((a, b) =>
      b.type === 'image'
        ? a + `
          <div class="image-wrapper">
            <a href="${b.preview_url}" target="_blank">
              <img src="${b.preview_url}" />
            </a>
          </div>`
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
    const formatContent = (content, emojis) =>
      content.replace(/:(\w+):/g, getEmojiWrapper(emojis))

    const template = (d, isReblog) => `
      <div class="item">
        ${isReblog ? `<div class="reblog"></div>` : ``}
        ${!isReblog && d.in_reply_to_id ? `<div class="reply"></div>` : ``}
        <div class="content">
          <div class="text">${formatContent(d.content, d.emojis)}</div>
          ${ d.media_attachments.some(e => e.type === 'image')
            ? `
              <div class="images">
                <a class="show-image" onclick="MastodonOnBlogProp.showImage(event, ${JSON.stringify(d.media_attachments).replace(/"/g, '\'')})" href="#">
                  ${Config.showImagesWording}
                </a>
              </div>
            `: ''
          }
        </div>
        <div class="time">${formatTime(d.created_at)}</div>
      </div>
    `

    mainDOM.innerHTML = statusesData.reduce((html, d) =>
      `${html}
        ${d.reblog ? template(d.reblog, true) : template(d)}
      `, '')
    Array.from(document.querySelectorAll(`#${config.rootDOMId} .hashtag`)).forEach(e => {
      e.target = '_blank'
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
