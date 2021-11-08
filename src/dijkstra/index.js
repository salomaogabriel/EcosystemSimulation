// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export default class Dijkstra {
  constructor(grid, currentPositionNode, maxReach) {
    this.grid = grid;
    this.position = currentPositionNode;
    this.maxReach = maxReach;
  }
  update(grid, newPosition) {
    this.grid = grid;
    this.position = newPosition;
    return this.getNodesInSight();
  }
  getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }
  getNodesInSight() {
    const visitedNodesInOrder = [];
    this.position.distance = 0;
    const unvisitedNodes = this.getAllNodes(this.grid);
    while (!!unvisitedNodes.length) {
      this.sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      // If we encounter a wall, we skip it.
      if (closestNode.isWater) continue;
      // If the closest node is at a distance of infinity,
      // we must be trapped and should therefore stop.
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      if (closestNode.distance > this.maxReach) return visitedNodesInOrder;
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
      this.updateUnvisitedNeighbors(closestNode, this.grid);
    }
  }
  getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }
  sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }
  updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = this.getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  }
  getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { column, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][column]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][column]);
    if (column > 0) neighbors.push(grid[row][column - 1]);
    if (column < grid[0].length - 1) neighbors.push(grid[row][column + 1]);
    return neighbors.filter((neighbor) => !neighbor.isVisited);
  }
}
