class Settings {

    constructor()
    {
        this.x = 0;
        this.y = 0;
        this.size = 0;
        this.shown = true;
        this.info = []

    }

    draw()
    {
        background(color(GAME_BLACK));
        push()
        // write settings
        fill(color(GAME_WHITE));
        textSize(20);
        text("Settings and Info", 100, 70);
        textSize(12);

        // write out every index of the info
        for (let i = 0; i < this.info.length; i++) {
            text(this.info[i], 110, 100 + i * 20);
        }

        pop()
    }

    setInfo(info)
    {
        this.info = info;
    }
}