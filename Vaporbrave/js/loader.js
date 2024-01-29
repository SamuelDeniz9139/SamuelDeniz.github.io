"use strict";
WebFont.load({
    google: {
        families: ['Press Start 2P']
    },
    active: e => {
        app.loader.add([// pre-load the images
            "images/statue.png",
            "images/BGtitle.jpg",
            "images/BGplay.jpg",
            "images/BGfail.jpg",
            "images/BGcredits.jpg",
            "images/static.png",
            "images/bubble.png",
            "images/dolphin.png",
            "images/creditsButton.png",
            "images/creditsHover.png",
            "images/startButton.png",
            "images/startHover.png",
            "images/retryButton.png",
            "images/retryHover.png",
            "images/titleButton.png",
            "images/titleHover.png"
        ]);
        app.loader.onComplete.add(setup);
        app.loader.load();
    }
});