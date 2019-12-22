// transition table:
// {
//     // state
//     0: {
//         // colors
//         0: {
//             color: a,
//             turn: b,
//             state: c
//         },
//         .
//         .
//         .
//         n: {
//             color: a,
//             turn: b,
//             state: c
//         }
//     },
//     .
//     .
//     .
//     N: {
//         0: {
//             color: a,
//             turn: b,
//             state: c
//         },
//         .
//         .
//         .
//         n: {
//             color: a,
//             turn: b,
//             state: c
//         }
//     }
// }

function getRand(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

let transition_tables = [
    {
        // states
        0: {
            // colors
            0: {color: 1, turn: 2, state: 0},     
            1: {color: 1, turn: 2, state: 1}  
        },
        1: {
            0: {color: 0, turn: 1, state: 0},     
            1: {color: 0, turn: 1, state: 1}  
        }
    },
    {
        // states
        0: {
            // colors
            0: {color: 1, turn: 1, state: 1},     
            1: {color: 1, turn: 8, state: 0}  
        },
        1: {
            0: {color: 1, turn: 2, state: 1},     
            1: {color: 0, turn: 1, state: 0}  
        }
    },
    {
        // states
        0: {
            // colors
            0: {color: 1, turn: 2, state: 1},     
            1: {color: 0, turn: 2, state: 1}  
        },
        1: {
            0: {color: 1, turn: 1, state: 0},     
            1: {color: 1, turn: 1, state: 1}  
        }
    },
    {
        // states
        0: {
            // colors
            0: {color: 1, turn: 8, state: 0},     
            1: {color: 1, turn: 2, state: 1}  
        },
        1: {
            0: {color: 0, turn: 2, state: 0},     
            1: {color: 0, turn: 8, state: 1}  
        }
    },
    {
        // states
        0: {
            // colors
            0: {color: 1, turn: 8, state: 1},     
            1: {color: 1, turn: 8, state: 1}  
        },
        1: {
            0: {color: 1, turn: 2, state: 1},     
            1: {color: 0, turn: 1, state: 0}  
        }
    },
    {
        // states
        0: {
            // colors
            0: {color: 1, turn: 8, state: 1},     
            1: {color: 1, turn: 2, state: 0}  
        },
        1: {
            0: {color: 1, turn: 4, state: 1},     
            1: {color: 1, turn: 4, state: 2}  
        },
        2: {
            0: {color: 0, turn: 0, state: 0},     
            1: {color: 0, turn: 4, state: 0}  
        }
    },
    {
        // states
        0: {
            0: {color: 1, turn: 1, state: 0},
            1: {color: 0, turn: 2, state: 2},
            2: {color: 1, turn: 1, state: 1}
        },
        1: {
            0: {color: 0, turn: 2, state: 2},
            1: {color: 2, turn: 2, state: 2},
            2: {color: 1, turn: 1, state: 2}
        },
        2: {
            0: {color: 2, turn: 2, state: 2},
            1: {color: 0, turn: 1, state: 1},
            2: {color: 0, turn: 1, state: 1}
        }
    }
];