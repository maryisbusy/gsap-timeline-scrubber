# GSAP Timeline Scrubber
Inject a scrubber for testing GSAP animation timelines

Installation: include `<script src="timeline-scrubber.js"></script>` in your file before any code or scripts that will call it.

Usage: `TimelineScrubber.init( timeline [, label] );`

Example:

    var myTimeline = new TimelineLite();
    TimelineScrubber.init(myTimeline, "My Animation");

