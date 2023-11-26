function isOpen(x, y, tile_map) {
    if (x < 0 || x > GRID_COLUMNS - 1 || y < 0 || y > GRID_ROWS - 1) {
        return false
    }
    let val = tile_map[y][0].split("")[x]
    return val != "B"
}

class BetterNode {
    constructor(x, y, parent = null, end = null) {
        this.x = x
        this.y = y
        this.parent = parent
        this.end = end
    }
}

class Star {
    constructor(tile_map) {
        this.start = null
        this.end = null
        this.queue = []
        this.visited = []
        this.path = []
        this.finished = false
        this.tile_map = tile_map
    }

    // make sure the node is not where I am
    isMe(x, y) {
        return (x == this.gridPosX && y == this.gridPosY)
    }

    getNeighbors(node) {
        let neighbors = []

        if (isOpen(node.x, node.y - 1, this.tile_map)) {
            neighbors.push(new BetterNode(node.x, node.y - 1, null, null))
        }
        // down
        if (isOpen(node.x, node.y + 1, this.tile_map)) {
            neighbors.push(new BetterNode(node.x, node.y + 1, null, null))
        }
        // left
        if (isOpen(node.x - 1, node.y, this.tile_map)) {
            neighbors.push(new BetterNode(node.x - 1, node.y, null, null))
        }
        // right
        if (isOpen(node.x + 1, node.y, this.tile_map)) {
            neighbors.push(new BetterNode(node.x + 1, node.y, null, null))
        }

        return neighbors
    }

    heuristic(a, b) {
        return dist(a.x, a.y, b.x, b.y)
    }

    calculatePath(start, end) {


        let queue = [start]
        let visited = []
        let path = []
        let neighbors = []

        // while the queue is not empty

        // run this loop 100 times so I can error out if needed
        for (let i = 0; i < 70; i++) {
            // while the queue is not empty
            if (queue.length > 0) {
                // get the first node in the queue

                let current = queue.shift() // remove the first element from the queue
                // compare current to done

                if (current.x == end.x && current.y == end.y) {
                    let temp = current
                    path.push(temp)
                    while (temp.parent != null) {
                        path.push(temp.parent)
                        temp = temp.parent
                    }
                    break
                }

                visited.push(current) // add the current node to the visited list

                // if the current node is the end node, we're done

                neighbors = []
                // get the neighbors of the current node

                if (current != null) {
                    neighbors = this.getNeighbors(current)
                }
                // assign the parent to the neighbors
                for (let i = 0; i < neighbors.length; i++) {
                    neighbors[i].parent = current
                }

                // for each neighbor, if it's not in the visited list, add it to the queue

                for (let i = 0; i < neighbors.length; i++) {
                    let neighbor = neighbors[i]
                    let found = false
                    for (let j = 0; j < visited.length; j++) {
                        if (visited[j].x == neighbor.x && visited[j].y == neighbor.y) {
                            found = true
                        }
                    }
                    if (!found) {
                        queue.push(neighbor)
                    }
                }

                // sort the queue by the heuristic
                queue.sort((a, b) => {
                    let a_heuristic = this.heuristic(a, end)
                    let b_heuristic = this.heuristic(b, end)
                    return a_heuristic - b_heuristic
                })

            }
        }

        // Saving things to global just to make rendering easier
        this.queue = queue
        this.visited = visited
        this.path = path

        return this.path
    }

    draw() {
        // create new GridDefinedCharacter
        for (let i = 0; i < this.path; i++) {
            let node = this.path[i]
            fill(0, 255, 0)
            rect(node.x * GRID_BOX_SIZE, node.y * GRID_BOX_SIZE, GRID_BOX_SIZE, GRID_BOX_SIZE)
        }
    }

}