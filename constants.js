// Constants
const SCREEN_WIDTH = 500;
const SCREEN_HEIGHT = SCREEN_WIDTH;
const BOTTOM_OF_SCREEN = SCREEN_HEIGHT - 30;
const COLOR_FUDGE_FACTOR = 10;


const GRID_BOX_SIZE = 40; // size of a box in the grid

const GRID_COLUMNS = 40
const GRID_ROWS = GRID_COLUMNS


const GRID_SIZE_XY = GRID_COLUMNS; // how many rows and columns
const ACTUAL_GRID_SIZE = GRID_SIZE_XY * GRID_BOX_SIZE; // how many rows and columns

// Color Pallet
// https://colorhunt.co/palette/040d12183d3d5c837493b1a6
// https://colorhunt.co/palette/10316b000000e25822ececeb
const forsyth_blue = "#204d71";
const GAME_GRAY = "#93B1A6";
const GAME_GRAY_HOVER = "#B6D3C9"
const GAME_BLACK = "#040D12";
const GAME_WHITE = "#ffffff";
const GAME_RED = "#E25822";
const GAME_RED_2 = "#F86E38";
const GAME_GREEN = "#658864";
const GAME_DARK_BLUE = "#00008B";
const GAME_YELLOW = "#F0C808";
const GAME_DARK_GRAY = "#317171";
const GAME_PALE_YELLOW = "#F0E68C";

var CUSTOM_ICON = null


// --- Game Board 1 ---

const GAME_BOARD_1 =
    [
    ["       BBB       B                      "],
    ["       BBB       B                      "],
    ["        B        B     BBBBBBB BB       "],
    ["        BB    BBBBBBBB B     BBBB       "],
    ["        BBBBBBBBBBBBBB B    BBBBB       "],
    ["          B     BBBBBB         BB       "],
    ["                 BBBBB                  "],
    ["      BBB   BBB  BBBBB                  "],
    ["      BBB                               "],
    ["      BBB                               "],
    ["           PPPPPPPPPPPPPPPPPPPP    BBB  "],
    ["          PP                  PP   BBB  "],
    ["WWW      PP            M       PP  BBB  "],
    ["WWWW    PP                      PP   B  "],
    ["WWW     P                        P   B  "],
    ["W       PP                      PP   B  "],
    ["         PP                    PP   BBBB"],
    ["          PP                  PP  BBBBBB"],
    ["   BBB     PPPPPPPPPPPPPPPPPPPP   BBBBBB"],
    ["                                  BBBBBB"],
    ["      BB                          BBBB  "],
    [" BB                                     "],
    ["  B    BBB  BBBBBB BBB BBBBBB           "],
    ["  BBBBBB         B BBB B    B  BBB  BBBB"],
    ["                 B BBB B    B  BBB  BBBB"],
    [" B     B         B BBB B            BBBB"],
    [" B     B   B       BBB B            BBBB"],
    ["BB     B   BBBBBB  BBB              BBBB"],
    ["       B                  BBBBB     BBBB"],
    ["          BBBBB   BBBBB   BBBBB         "],
    ["   BBB    BBBBB           BBBBB  BBB    "],
    ["   BBB    BBBBB  B     B  BBBBB BB    BB"],
    ["                 BBB BBB        B     BB"],
    ["                                      BB"],
    ["                             BBBB     BB"],
    ["   BBB   BB B    B        B        B  BB"],
    ["   B      B B   BB        B B      B  BB"],
    ["   B      BBB   BB        B B      B  BB"],
    ["   B      B B   BB        B        B  BB"],
    ["   BB  BB B B   B  BBBBBB    BBBBB    BB"],
    ["                   B    B             BB"]]


// --- Game Board 2 ---