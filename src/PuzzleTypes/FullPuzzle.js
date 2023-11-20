// // Puzzle 1
// this.puzzle1_icon = new PuzzleIcon(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 200, 200)
// this.puzzle1_icon.disabled = true
// this.gameboard.injectElement(this.puzzle1_icon, 10, 10)
// this.puzzle1 = new PuzzleModal(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2,
//     ["Hello Adventurer,",
//         "",
//         "It's good to meet you. My name is Overseer",
//         "Never have I seen such a worthy foe to take on my game!",
//         "",
//         "The game is simple: solve my puzzles",
//         "Hard? Oh yeah. But we have to keep you interested",
//         "Exciting, isn't it?",
//         "",
//         "Put your skills to the test, I know you can",
//         "Or fail. That's kinda your choice",
//         "Need help? You're not getting it",
//         "Do you know where the next puzzle is?",
//         "---------------------------------------",
//         "I've just told you above. Provide your answer below",
//         "All lower case, one word, please!"], "pond")

class FullPuzzle {
    constructor(array_puzzle, answer, subtext) {
        this.myIcon = new PuzzleIcon(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 200, 200)
        this.myIcon.disabled = true
        this.myPuzzle = new PuzzleModal(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2,
            array_puzzle, answer)
        this.myPuzzle.button.disabled = true
        this.isActive = false
        this.subtext = subtext
    }

    checkDist(me) {
        // see if the grid position of the pacman is the same as the puzzle
        this.isActive = (me.x == this.myIcon.x && me.y == this.myIcon.y)
        return this.isActive
    }

    draw() {
        // this.myIcon.draw()
        push()
        if (this.isActive) {
            this.myPuzzle.draw()
        }
        else {
            this.myPuzzle.remove()
        }
        pop()

        push()
        fill(color(GAME_BLACK))
        rect(0, BOTTOM_OF_SCREEN, SCREEN_WIDTH, 30)
        fill(color(GAME_WHITE))
        textAlign(LEFT, CENTER);
        text(this.subtext, 10, BOTTOM_OF_SCREEN + 15)
        pop()
    }

    reset() {
        this.myPuzzle.remove()
        this.myIcon.reset()
        this.myPuzzle.disabled = true
        this.myIcon.disabled = true
    }

    enable() {
        this.myPuzzle.button.disabled = false
        this.myIcon.disabled = false
    }

    isCorrect()
    {
        return this.myPuzzle.state == "correct"
    }

    isIncorrect()
    {
        return this.myPuzzle.state == "incorrect"
    }
}