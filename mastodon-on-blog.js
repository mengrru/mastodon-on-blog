;(function () {
    function loadFile (path, token, fn, errfn) {
        const request = new XMLHttpRequest()
        request.open('get', path)
        request.setRequestHeader('Authorization', 'Bearer ' + token)
        request.send(null)
        request.onload = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    fn(request.responseText)
                } else {
                    console.warn('Load file ' + path + ' failed.')
                    typeof errfn === 'function' ? errfn(request.status) : ''
                }
            }
        }
    }
    function showImage (e, imageData) {
        e.path[1].innerHTML = imageData.reduce((a, b) => {
            if (b.type === 'image') {
                return a + `<div class="image-wrapper"><img src="${b.preview_url}" /></div>`
            }
            return a
        }, '')
    }
    function render (statusesData, config) {
        let html = ''
        for (const d of statusesData) {
            const getEmoji = getEmojiWrapper(d.emojis)
            let content = d.content
            content = content.replace(/:(\w+):/g, getEmoji)
            html += `
            <div class="item">
                <div class="content">${content}</div>
            `
            if (d.media_attachments.some(e => e.type === 'image')) {
                html += `
                    <div class="images"><a class="show-image" onclick="MastodonOnBlogProp.showImage(event, ${JSON.stringify(d.media_attachments).replace(/"/g, '\'')})" href="#">显示图片</a></div>
                `
            }
            html += `
                <div class="time">${formatTime(d.created_at)}</div>
            </div>
            `
        }
        const rootDOM = document.getElementById(config.rootDOM)
        const mainDOM = rootDOM.querySelector('.main')
        mainDOM.innerHTML = html
        Array.prototype.slice.call(document.querySelectorAll('.hashtag')).forEach(e => {
            e.remove()
        })
    }
    function getEmojiWrapper (emojisData) {
        return function (match, p1) {
            if (!emojisData) return match
            const data = emojisData.find(e => e.shortcode === p1)
            return data ? `<img class="emoji" src="${data.static_url}"/>` : match
        }
    }
    function formatTime (dateString) {
        const date = new Date(dateString)
        return `
        ${date.getFullYear()}-${formatNumber(date.getMonth() + 1)}-${formatNumber(date.getDate())} ${formatNumber(date.getHours())}:${formatNumber(date.getMinutes())}:${formatNumber(date.getSeconds())}`
    }
    function formatNumber (num) {
        return num.toString().padStart(2, '0')
    }
    function launch (config) {
        const rootDOM = document.getElementById(config.rootDOM)
        const mainDOM = document.createElement('div')
        mainDOM.className = 'main'
        mainDOM.innerHTML = config.loadingText
        rootDOM.appendChild(mainDOM)

        loadFile(config.staticStatusesDataPath ||
            `https://${config.instance}/api/v1/accounts/${config.userId}/statuses?tagged=${config.tag || ''}`, config.token,
            (str) => {
                const statusesData = JSON.parse(str)
                render(statusesData.slice(0, config.shownMax || statusesData.length), config)
            }, (statusCode) => {
                mainDOM.innerHTML = config.loadFailText + '<br>status code: ' + statusCode
            })
    }

    window.MastodonOnBlog = function (config) {
        if (!config.instance) {
            throw new Error('required a instance url.')
        }
        if (!config.userId) {
            throw new Error('required a user id.')
        }
        config.loadingText = config.loadingText || '加载中...'
        config.loadFailText = config.loadFailText || '加载失败'
        config.rootDOM = config.rootDOM || 'my-mastodon-widget'
        if (!document.getElementById(config.rootDOM)) {
            throw new Error('cannot find root DOM #' + config.rootDOM)
        }
        launch(config)
    }
    window.MastodonOnBlogProp = {
        showImage: showImage
    }
})()
