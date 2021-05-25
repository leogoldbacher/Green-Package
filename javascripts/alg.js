let data = require("./alg_data.js");

class Walker {
  constructor(startId, routes, emission, duration, visited, end) {
    this.startId = startId;
    this.routes = routes;
    this.emission = emission;
    this.duration = duration;
    this.visited = visited;
    this.end = end;
  }

  useRoute(comingFrom, goingTo, route) {
    this.visited.push(comingFrom);
    this.routes.push(route);
    this.emission += route.emission;
    this.duration += route.duration;
    this.end = goingTo;
  }

  createDeepCopy() {
    return new Walker(
      this.startId,
      [...this.routes],
      this.emission,
      this.duration,
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
          (e) => e.s == curCityId && e.e == toCityId && e.type == r.type
        )
      ) {
        genRoutes.push({
          s: curCityId,
          e: toCityId,
          duration: r.duration,
          emission: r.emission,
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
          duration: newWalker.duration,
          emission: newWalker.emission,
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
let foundRoutes = genRoutes.filter((e) => e.s == "W" && e.e == "Sch");
console.log(foundRoutes.length);
let lowestTime = foundRoutes[0];
let lowestems = foundRoutes[0];
for (f of foundRoutes) {
  if (f.duration < lowestTime.duration) {
    lowestTime = f;
  }
  if (f.emission < lowestems.emission) {
    lowestems = f;
  }
}
// console.log(lowestTime);
// console.log(lowestems);
// console.log("");
// console.log(lowestems.routes);
console.log(lowestTime.routes);
// console.log(JSON.stringify(lowestTime));
// console.log(JSON.stringify(lowestems));
// console.log(lowestems.routes.reduce((sum, cur) => (sum += cur.emission), 0));
// let x = foundRoutes.filter(
//   (e) =>
//     e.routes[0].c[1] == "W" &&
//     e.routes[0].c[0] == "L" &&
//     e.routes[0].type == "train"
// );
// console.log( convertRoutes(x[0]));

function convertRoutes(r) {
  let ret = "";
  for (r of r.routes) {
    ret += `c: ${r.c[0]}, ${r.c[1]} type: ${r.type} emission: ${r.emission} \n`;
  }
  return ret;
}
// let routesFrom = data.routes.filter((e) => e.c.includes("W"));
// console.log(routesFrom);
