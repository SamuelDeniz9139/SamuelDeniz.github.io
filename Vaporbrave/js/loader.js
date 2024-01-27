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
            "images/bubble.png"
        ]);
        app.loader.onComplete.add(setup);
        app.loader.load();
    }
});