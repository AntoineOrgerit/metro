const Graph = (function (param) {
    let mapGlobal;
    let extractKeys = function (obj) {
        let keys = [], key;
        for (key in obj) {
            Object.prototype.hasOwnProperty.call(obj, key) && keys.push(key);
        }
        return keys;
    };

    let sorter = function (a, b) {
        return parseFloat(a) - parseFloat(b);
    };

    let findPaths = function (map, start, end, infinity) {
        infinity = infinity || Infinity;

        let costs = {},
            open = {'0': [start]},
            predecessors = {},
            keys;

        let addToOpen = function (cost, vertex) {
            var key = "" + cost;
            if (!open[key]) open[key] = [];
            open[key].push(vertex);
        };

        costs[start] = 0;

        while (open) {
            if (!(keys = extractKeys(open)).length) break;

            keys.sort(sorter);

            let key = keys[0],
                bucket = open[key],
                node = bucket.shift(),
                currentCost = parseFloat(key),
                adjacentNodes = map[node] || {};

            if (!bucket.length) delete open[key];

            for (let vertex in adjacentNodes) {
                if (Object.prototype.hasOwnProperty.call(adjacentNodes, vertex)) {
                    let cost = adjacentNodes[vertex],
                        totalCost = cost + currentCost,
                        vertexCost = costs[vertex];

                    if ((vertexCost === param) || (vertexCost > totalCost)) {
                        costs[vertex] = totalCost;
                        addToOpen(totalCost, vertex);
                        predecessors[vertex] = node;
                    }
                }
            }
        }

        if (costs[end] === param) {
            return null;
        } else {
            return predecessors;
        }

    };
    // modifier pour retourner le numero de ligne
    let extractShortest = function (predecessors, end) {
        let nodes = [],
            u = end;
        var last = end;
        var valuePlusOne = "";
        while (u !== param) {
            if (predecessors[u] !== undefined) {
                valuePlusOne = u;
                u = predecessors[u];
                nodes.push({"objet": (mapGlobal[last][u]), "libelle": last});
                last = u;
            } else {
                nodes.push({"objet": (mapGlobal[last][valuePlusOne]), "libelle": last})
                u = predecessors[u];
            }
        }

        nodes.reverse();
        return nodes;
    };


    //nodes = [start, end]
    let findShortestPath = function (map, nodes) {
        let start = nodes.shift(),
            end,
            predecessors,
            path = [],
            shortest;

        while (nodes.length) {
            end = nodes.shift();
            predecessors = findPaths(map, start, end);

            if (predecessors) {
                shortest = extractShortest(predecessors, end);
                if (nodes.length) {
                    path.push.apply(path, shortest.slice(0, -1));
                } else {
                    return path.concat(shortest);
                }
            } else {
                return null;
            }

            start = end;
        }
    };

    let toArray = function (list, offset) {
        try {
            return Array.prototype.slice.call(list, offset);
        } catch (e) {
            let a = [];
            for (let i = offset || 0, l = list.length; i < l; ++i) {
                a.push(list[i]);
            }
            return a;
        }
    };

    let Graph = function (map) {
        mapGlobal = map;
        this.map = map;
    };

    Graph.prototype.findShortestPath = function (start, end) {

        let _map = this.map;
        if (Object.prototype.toString.call(start) === '[object Array]') {
            return findShortestPath(_map, start);
        } else if (arguments.length === 2) {
            return findShortestPath(_map, [start, end]);
        } else {
            return findShortestPath(_map, toArray(arguments));
        }
    };

    Graph.findShortestPath = function (map, start, end) {
        if (Object.prototype.toString.call(start) === '[object Array]') {
            return findShortestPath(map, start);
        } else if (arguments.length === 3) {
            return findShortestPath(map, [start, end]);
        } else {
            return findShortestPath(map, toArray(arguments, 1));
        }
    };

    return Graph;

})();
