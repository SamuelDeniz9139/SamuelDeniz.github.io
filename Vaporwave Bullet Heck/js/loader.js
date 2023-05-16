"use strict";
WebFont.load({
    google: {
        families: ['Press Start 2P']
    },
    active: e => {
        console.log("font loaded!");
        // pre-load the images
        app.loader.add([
            "images/Spaceship.png",
            "images/eball.png",
            "images/enball.png",
            "images/nball.png",
            "images/nrgball.png",
            "images/backdrop.jpg",
            "images/backdropGO.jpg",
            "images/background.jpg",
            "images/backgroundGO.jpg"
        ]);
        app.loader.onProgress.add(e => { console.log(`progress=${e.progress}`) });
        app.loader.onComplete.add(setup);
        app.loader.load();
    }
});