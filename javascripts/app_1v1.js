// data is loaded in index_1v1.html
const vm = new Vue({
  el: "#app",
  data: {
    title: "Green Package",
    routes: data.routes,
    cities: data.cities,
    selectedCities: [],
    lines: [],
  },
  computed: {
    selectedRoute() {
      return this.findRoute();
    },
    // co2Vergleich() {
    //   let erg = this.selectedRoute
    // },
    // dauerVergleich() {
    //   return (
    //     this.selectedRoute.costs[0].duration /
    //     this.selectedRoute.costs[1].duration
    //   ).toFixed(2);
    // },
  },
  methods: {
    findRoute() {
      let route = this.routes.filter(
        (e) =>
          e.c.includes(this.selectedCities[0].id) &&
          e.c.includes(this.selectedCities[1].id)
      );
      return route;
    },
    selectCity(id) {
      // Methode um Städte auszuwählen
      let city = this.cities.find((e) => e.id == id);
      if (city.isSelected == false) {
        city.isSelected = true;
        if (this.selectedCities.length == 2) {
          city.isSelected = false;
        } else if (this.selectedCities.length < 2) {
          this.selectedCities.push(city);
        }
      } else {
        city.isSelected = false;
        this.selectedCities = this.selectedCities.filter((e) => e.id != id);
        this.lines = [];
      }
      if (this.selectedCities.length == 2) {
        this.drawRoute();
      }
      this.westlichsteSelectedCity();
      // console.log(this.selectedCities);
    },

    drawRoute() {
      const c1 = this.selectedCities[0].coord;
      const c2 = this.selectedCities[1].coord;
      this.lines = [];
      this.lines.push({ x1: c1.x, y1: c1.y, x2: c2.x, y2: c2.y });

      //   let newRoute = document.createElementNS(
      //     "http://www.w3.org/2000/svg",
      //     "line"
      //   );
      //   newRoute.setAttribute("x1", this.selectedCities[0].coord.x);
      //   newRoute.setAttribute("y1", this.selectedCities[0].coord.y);
      //   newRoute.setAttribute("x1", this.selectedCities[1].coord.x);
      //   newRoute.setAttribute("y1", this.selectedCities[1].coord.y);
      //   newRoute.setAttribute("stroke", "black");
    },

    doubleClick(id) {
      // Wenn doubleClick auf eine nicht markierte stadt gemacht wird dann werden alle demakiert bis auf die geclickte
      // console.log("juhu");
      // console.log(this.selectedCities);
      let cityDouble = this.cities.find((e) => e.id == id);
      for (let c of this.cities) {
        c.isSelected = false;
        this.lines = [];
        this.selectedCities = [];
      }
      cityDouble.isSelected = true;
      this.selectedCities.push(cityDouble);
      // console.log(this.selectedCities);
    },
    westlichsteSelectedCity() {
      if (this.selectedCities.length != 2) return;
      if (this.selectedCities[0].coord.lon > this.selectedCities[1].coord.lon) {
        const h = this.selectedCities[0];
        this.selectedCities[0] = this.selectedCities[1];
        this.selectedCities[1] = h;
      }
    },
  },
  created() {},
});

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
          (e) => e.startCityId == curCityId && e.endCityId == toCityId
        )
      ) {
        genRoutes.push({
          startCityId: curCityId,
          endCityId: toCityId,
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
    let curWalker = waitingWalkers.shift();
    let routesFrom = data.routes.filter((e) => e.c.includes(curWalker.end));
    let curCityId = curWalker.end;
    for (let r of routesFrom) {
      const toCityId = r.c[0] == curCityId ? r.c[1] : r.c[0];
      if (!curWalker.visited.includes(toCityId)) {
        let newWalker = curWalker.createDeepCopy();
        newWalker.useRoute(curCityId, toCityId, r);
        genRoutes.push({
          startCityId: curWalker.startCityId,
          endCityId: toCityId,
          duration: newWalker.duration,
          emission: newWalker.emission,
          routes: [...newWalker.routes],
        });
        if (genRoutes.length < 18000) {
          waitingWalkers.push(newWalker);
        }
      } else {
        console.log("city visited stop walker");
      }
    }
  }
}

generateRoutes();
