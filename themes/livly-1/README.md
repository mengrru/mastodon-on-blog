# Quick build your own themes

Open `style.css`, and look the code before `/****************/`:

```
#my-mastodon-widget {
    color: #666;
    background: 
        linear-gradient(to right top,
          #b8d4d8 25%,
          rgba(255,255,255,0) 25%) 0 0,
        linear-gradient(to left top,
          #b8d4d8 25%,
          rgba(255,255,255,0) 25%) 0 0,
        linear-gradient(to right bottom,
          #b8d4d8 25%,
          rgba(255,255,255,0) 25%) 0 0,
        linear-gradient(to left bottom,
          #b8d4d8 25%,
          rgba(255,255,255,0) 25%) 0 0; 
    background-color: #d9e4e8;
    background-size:  20px 40px;
    background-position: -10px 20px;
}
#my-mastodon-widget::before {
    width: 100px;
    height: 120px;
    background: url('./head-s.png');
    background-size: auto 120px;
    top: 0;
    right: 0;
}
#my-mastodon-widget::after {
    content: "Powered By Mastodon";
    color: #fff;
    text-shadow: 1px 1px 1px #7cadb4;
}
#my-mastodon-widget .main {
    background-color: rgba(238,244,246, .62);
}
#my-mastodon-widget a {
    color: #89adb1;
}
#my-mastodon-widget ::-webkit-scrollbar-thumb {
  background: #fdfdfd;
}
#my-mastodon-widget .item::before {
    background-image: url(./icon.png);
    width: 17px;
    height: 15px;
}
#my-mastodon-widget .time {
    color: #666;
    border-bottom: 2px dotted #fff;
}
#my-mastodon-widget .images .image-wrapper {
    border: 1px solid #efefef;
}
```

Your can modify the colors and header image or others details as you like, for example, I modified:

```
#my-mastodon-widget {
    background: 
        linear-gradient(to right top,
          #aaca81 25%,
          rgba(255,255,255,0) 25%) 0 0,
        linear-gradient(to left top,
          #aaca81 25%,
          rgba(255,255,255,0) 25%) 0 0,
        linear-gradient(to right bottom,
          #aaca81 25%,
          rgba(255,255,255,0) 25%) 0 0,
        linear-gradient(to left bottom,
          #aaca81 25%,
          rgba(255,255,255,0) 25%) 0 0; 
    background-color: #feefb4;
    background-size:  20px 40px;
}

#my-mastodon-widget::before {
    width: 170px;
    height: 120px;
    background-image: url('./like.png');
    background-size: 170px auto;
    right: 5px;
}
#my-mastodon-widget::after {
    text-shadow: 1px 1px 0px #72a237;
}
#my-mastodon-widget .main {
    background-color: rgba(255,245,240, .62);
}
#my-mastodon-widget a {
    color: #fb8964;
}
#my-mastodon-widget ::-webkit-scrollbar-thumb {
  background: #afce88;
}
#my-mastodon-widget .item::before {
    background-image: none;
    background-color: #fb8964;
    width: 7px;
    height: 7px;
    padding: 0;
    margin-top: 4px;
}
#my-mastodon-widget .images .image-wrapper {
    border: 1px solid #fb8964;
}
```

then I get a Tom Nook theme:


Enjoy!
