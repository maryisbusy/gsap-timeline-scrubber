
var TimelineScrubber = (function() {

    var scrubberCount = 0,
        cssLoaded = false;

    function initScrubber(timeline, label) {
        scrubberCount++;

        var scrubberID = 'scrubber-wrapper-' + scrubberCount;
        timeline.eventCallback('onUpdate', function() { updateSlider(this, scrubberID); });

        injectScrubberCSS();
        injectScrubberHTML(scrubberID, label);
        addScrubberEvents(timeline, scrubberID);
    }

    function addScrubberEvents(timeline, scrubberID) {
        var scrubber = document.getElementById(scrubberID);
        scrubber.getElementsByClassName('duration')[0].innerHTML = timeline.duration();

        scrubber.getElementsByClassName('play')[0].addEventListener('click',function() {
            if (timeline.progress() !== 1) {
                timeline.play();
            } else {
                timeline.restart();
            }
        });

        scrubber.getElementsByClassName('pause')[0].addEventListener(   'click', function() { timeline.pause();   });
        scrubber.getElementsByClassName('resume')[0].addEventListener(  'click', function() { timeline.resume();  });
        scrubber.getElementsByClassName('reverse')[0].addEventListener( 'click', function() { timeline.reverse(); });
        scrubber.getElementsByClassName('restart')[0].addEventListener( 'click', function() { timeline.restart(); });

        scrubber.getElementsByClassName('slider')[0].addEventListener('input',function() {
            timeline.pause();
            timeline.progress( this.value/100 );
        });
    }

    function updateSlider(timeline, scrubberID) {
        var timelineProgress = (timeline.progress() * 100).toFixed();
        var currentScrubber = document.getElementById(scrubberID);
        currentScrubber.getElementsByClassName('slider')[0].value = timelineProgress;
        currentScrubber.getElementsByClassName('progress')[0].innerHTML = timelineProgress;
        currentScrubber.getElementsByClassName('time')[0].innerHTML = timeline.time().toFixed(2);
    }

    function injectScrubberCSS() {
        if (!cssLoaded) {
            var scrubberCSS = '' +
                '#scrubber         { margin: 20px 10px; z-index: 9999; position: relative; }' +
                '#scrubber h1      { font-size: 110%; text-transform: uppercase; }' +
                '#scrubber button  { padding: 10px; margin-right: 10px; }' +
                '#scrubber .slider { margin: 20px 0; width: 500px; }';

            var styles = document.createElement('style');
            styles.appendChild(document.createTextNode(scrubberCSS));
            document.head.appendChild(styles);
            cssLoaded = true;
        }
    }

    function injectScrubberHTML(scrubberID, label) {
        label = label || 'Timeline';

        var scrubberHTML = '<div id="scrubber">' +
                '<h1 class="slider-label" for="slider"> ' + label + '</h1>' +
                '<button class="play">play</button>' +
                '<button class="pause">pause</button>' +
                '<button class="resume">resume</button>' +
                '<button class="reverse">reverse</button>' +
                '<button class="restart">restart</button>' +
                '<div><input type="range" class="slider" min="0" max="100" value="0"></div>' +
                '<div>Progress: <span class="progress">0</span>%</div>' +
                '<div>Time: <span class="time">0.00</span>s</div>' +
                '<div>Duration: <span class="duration">0.00</span>s</div>' +
            '</div>';

        var scrubberWrapper = document.createElement('div');
        scrubberWrapper.setAttribute('id', scrubberID);
        scrubberWrapper.innerHTML = scrubberHTML;
        document.body.appendChild(scrubberWrapper);
    }

    var publicAPI = {
        init: initScrubber
    }

    return publicAPI;

})();

