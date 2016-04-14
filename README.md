# angular-video-bg

_NOTE: This project is no longer being maintained. I have been working primarily in React lately, and no longer have time to keep up with all of the Angular updates._

angular-video-bg is an [Angular.js](http://angularjs.org/) YouTube video background player directive. It stresses simplicity and performance.

![angular-video-bg Screenshot](https://raw.github.com/kanzelm3/angular-video-bg/master/screenshot.png)

## Demo

Play with the [Plunker example](http://plnkr.co/edit/PR2oFbCeDoN3PCwAHMdg?p=preview)

You can also see a demo of the directive here: [Angular YouTube Video Background](http://kanzelm3.github.io/angular-video-bg/)

## Download

* [Latest Version](https://github.com/kanzelm3/angular-video-bg/zipball/master)

You can also install the package using [Bower](http://bower.io).

```sh
bower install angular-video-bg
```

Or add it to your bower.json file:

```javascript
dependencies: {
  "angular-video-bg": "~0.3"
}
```

*No dependencies (besides Angular) are required!*

## The Basics

To use the library, include the JS file on your index page, then include the module in your app:

```javascript
app = angular.module('myApp', ['angularVideoBg'])
```

The directive itself is simply called *video-bg*. The only required attribute is either videoId (which should be a YouTube
video ID) or playlist (which should be an array of video objects, see example in advanced usage section below).

```html
<video-bg video-id="video.id"></video-bg>
```

## Inline Options

There are a number of options that be configured inline with attributes:

| Option               | Default             | Description                                                                                 |
| -------------------- | ------------------- | ------------------------------------------------------------------------------------------- |
| ratio                | 16/9                | Aspect ratio for the supplied videoId.                                                      |
| loop                 | true                | If set to false, video will not automatically replay when it reaches the end.               |
| mute                 | true                | If set to false, the video's sound will play.                                               |
| mobile-image         | YT video thumb      | Background image to display if user is on phone or tablet (videos cannot autoplay on mobile devices), default is YouTube video thumbnail. |
| start                | null                | Video start time in seconds. If set, video will play from that point instead of beginning.  |
| end                  | null                | Video end time in seconds. If set, video will play until that point and stop (or loop).     |
| content-z-index      | 99                  | If set, will replace the z-index of content within the directive.                           |
| allow-click-events   | false               | If set to true, users will be able to click video to pause/play it.                         |
| player-callback      | null                | If provided, player callback method will be called with the YouTube player object as the first and only argument. |

**Example:**

```html
<video-bg video-id="video.id" ratio="4/3" loop="false" mute="false" mobile-image="'/img/background-img.png'" start="30" end="120" content-z-index="500" allow-click-events="true"></video-bg>
```

## Advanced Usage

The documentation above is sufficient for most use-cases; however, there are other options below for those that need more
advanced integration.

### Playlist Capability

If instead of playing a single video, you need to play several videos in a playlist, you should use the playlist attribute
instead of the videoId attribute. The playlist attribute accepts an array of video objects. Each video object must have a
'videoId' property at minimum. Other valid properties that it can have are 'start', 'end', 'mute', and 'mobileImage'. These
all do the same thing as the corresponding options on the directive, however, instead of applying to every video they only
apply to the current video. Example below of using the playlist attribute:

```js
angular.module('myApp').controller('VideoCtrl', function($scope) {

    // Array of videos to use as playlist
    $scope.videos = [{
        videoId: 'some_video',
        mute: false
    },{
        videoId: 'some_other_video',
        start: 10,
        end: 50
    }];

});
```

```html
<video-bg playlist="videos"></video-bg>
```

If you dynamically change this videos array (e.g. add a new video to the list), the new playlist will be loaded and
played accordingly.

### YouTube Player API

If you need more control over the video (for example, if you need to play/pause the video on a button click), provide a
method with "player" as the only argument to the player-callback attribute.

```html
<video-bg video-id="video.id" player-callback="callback(player)"></video-bg>
```

```javascript
angular.module('myApp').controller(['$scope', function($scope) {
    $scope.callback = function(player) {
        $scope.pauseVideo = function() {
            player.pauseVideo();
        };
        $scope.playVideo = function() {
            player.playVideo();
        };
    };
});
```

The player object gives you complete access to all of the methods and properties on the player in the
[YouTube IFrame API](https://developers.google.com/youtube/iframe_api_reference#Playback_controls).

## Browser Support

Tested and working in Chrome, Firefox, Safari, Opera and IE 9+.

## Contributing

Contributions are welcome. Please be sure to document your changes.

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

To get the project running, you'll need [NPM](https://npmjs.org/) and [Bower](http://bower.io/). Run `npm install` and `bower install` to install all dependencies. Then run `grunt serve` in the project directory to watch and compile changes.

If you create new unit test, you can run `grunt test` to execute all of the unit tests. Try to write tests if you contribute.

## Potential Features down the road

* Add support for HTML5, Vimeo videos instead of just YouTube videos.
