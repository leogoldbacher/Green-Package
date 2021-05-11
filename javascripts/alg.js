let data = require("./alg_data.js");

class Walker {
  constructor(startId, routes, em, d, visited, end) {
    this.startId = startId;
    this.routes = routes;
    this.em = em;
    this.d = d;
    this.visited = visited;
    this.end = end;
  }

  useRoute(comingFrom, goingTo, route) {
    this.visited.push(comingFrom);
    this.routes.push(route);
    this.em += route.em;
    this.d += route.d;
    this.end = goingTo;
  }

  createDeepCopy() {
    return new Walker(
      this.startId,
      [...this.routes],
      this.em,
      this.d,
      [...this.visited],
      this.end
    );
  }
}
function generateRoutes() {
  let waitingWalkers = [];
  let genRoutes = [];
  for (let currentCity of data.cities) {
    let curCityId = currentCity.id;
    let routesFrom = data.routes.filter((e) => e.c.includes(curCityId));
    for (let r of routesFrom) {
      const toCityId = r.c[0] == curCityId ? r.c[1] : r.c[0];
      if (
        !genRoutes.find(
          (e) =>
            e.s == curCityId &&
            e.e == toCityId &&
            e.type == r.type
        )
      ) {
        genRoutes.push({
          s: curCityId,
          e: toCityId,
          d: r.d,
          em: r.em,
          routes: [r],
        });
        let walker = new Walker(curCityId, [], 0, 0, [], undefined);
        walker.useRoute(curCityId, toCityId, r);
        waitingWalkers.push(walker);
      } else {
        console.log("skip route");
      }
    }
  }

  while (waitingWalkers.length > 0) {
    console.log(" waitingWalkers: " + waitingWalkers.length);
    console.log("genRoutes: " + genRoutes.length);
    let curWalker = waitingWalkers.pop();
    let routesFrom = data.routes.filter((e) => e.c.includes(curWalker.end));
    let curCityId = curWalker.end;
    for (let r of routesFrom) {
      const toCityId = r.c[0] == curCityId ? r.c[1] : r.c[0];
      if (!curWalker.visited.includes(toCityId)) {
        let newWalker = curWalker.createDeepCopy();
        newWalker.useRoute(curCityId, toCityId, r);
        genRoutes.push({
          s: curWalker.startId,
          e: toCityId,
          d: newWalker.d,
          em: newWalker.em,
          routes: [...newWalker.routes],
        });
        if (genRoutes.length < 60000) {
          waitingWalkers.push(newWalker);
        }
      } else {
        //   console.log("city visited stop walker");
      }
    }
  }
  return genRoutes;
}
let genRoutes = generateRoutes();
const fs = require("fs");
fs.writeFileSync("./genRoutes.json", JSON.stringify(genRoutes));
// let genRoutes= JSON.parse(fs.readFileSync("./genRoutes.json"));
console.log(genRoutes.length);
let foundRoutes = genRoutes.filter(
  (e) => e.s == "W" && e.e == "B"
);
console.log(foundRoutes.length);
let lowestTime = foundRoutes[0];
let lowestems = foundRoutes[0];
for (f of foundRoutes) {
  if (f.d < lowestTime.d) {
    lowestTime = f;
  }
  if (f.em < lowestems.em) {
    lowestems = f;
  }
}
console.log(JSON.stringify(lowestTime));
console.log(JSON.stringify(lowestems));
console.log(
  lowestems.routes.reduce((sum, cur) => (sum += cur.em), 0)
);
let x = foundRoutes.filter(
  (e) =>
    e.routes[0].c[1] == "W" &&
    e.routes[0].c[0] == "L" &&
    e.routes[0].type == "train"
);
// console.log( convertRoutes(x[0]));

function convertRoutes(r) {
  let ret = "";
  for (r of r.routes) {
    ret += `c: ${r.c[0]}, ${r.c[1]} type: ${r.type} em: ${r.em} \n`;
  }
  return ret;
}
let routesFrom = data.routes.filter((e) => e.c.includes("W"));
console.log(routesFrom);
