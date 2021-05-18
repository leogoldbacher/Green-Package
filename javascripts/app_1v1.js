// data is loaded in index_1v1.h
// let allRoutes = require("./genRoutes.js");

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

const vm = new Vue({
  el: "#app",
  data: {
    title: "Green Package",
    routes: data.routes,
    cities: data.cities,
    selectedCities: [],
    emissionLines: [],
    durationLines: [],
    lowestTime: 0,
    lowestems: 0,
    genRoutes: [],
  },
  computed: {
    // selectedRoute() {
    //   return this.findRoute();
    // },
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
    // findRoute() {
    //   let route = this.routes.filter(
    //     (e) =>
    //       e.c.includes(this.selectedCities[0].id) &&
    //       e.c.includes(this.selectedCities[1].id)
    //   );
    //   return route;
    // },
    selectCity(id) {
      console.log();
      // Methode um Städte auszuwählen
      let city = this.cities.find((e) => e.id == id);
      if (city.isSelected == false) {
        city.isSelected = true;
        if (this.selectedCities.length == 2) {
          city.isSelected = false;
        } else if (this.selectedCities.length < 2) {
          this.selectedCities.push(city);
          this.durationLines = [];
          this.emissionLines = [];
        }
      } else {
        city.isSelected = false;
        this.selectedCities = this.selectedCities.filter((e) => e.id != id);
      }
      if (this.selectedCities.length == 2) {
        this.findRoutes();
      }
      this.westlichsteSelectedCity();
      // console.log(this.selectedCities);
    },

    drawRouteEmission(cs, ce) {
      const c1 = cs.coord;
      const c2 = ce.coord;
      this.emissionLines.push({ x1: c1.x, y1: c1.y, x2: c2.x, y2: c2.y });
      console.log(this.emissionLines);
    },

    drawRouteDuration(cs, ce) {
      const c1 = cs.coord;
      const c2 = ce.coord;
      this.durationLines.push({ x1: c1.x, y1: c1.y, x2: c2.x, y2: c2.y });
      console.log(this.durationLines);
    },

    doubleClick(id) {
      // Wenn doubleClick auf eine nicht markierte stadt gemacht wird dann werden alle demakiert bis auf die geclickte
      // console.log("juhu");
      // console.log(this.selectedCities);
      let cityDouble = this.cities.find((e) => e.id == id);
      for (let c of this.cities) {
        c.isSelected = false;
        this.emissionLines = [];
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
    generateRoutes() {
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
            // console.log("skip route");
          }
        }
      }

      while (waitingWalkers.length > 0) {
        // console.log(" waitingWalkers: " + waitingWalkers.length);
        // console.log("genRoutes: " + genRoutes.length);
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
    },
    findRoutes() {
      let foundRoutes = this.genRoutes.filter(
        (e) =>
          e.s == this.selectedCities[0].id && e.e == this.selectedCities[1].id
      );
      // console.log(foundRoutes[0]);
      this.lowestTime = foundRoutes[0];
      this.lowestems = foundRoutes[0];
      for (f of foundRoutes) {
        if (f.duration < this.lowestTime.duration) {
          this.lowestTime = f;
        }
        if (f.emission < this.lowestems.emission) {
          this.lowestems = f;
        }
      }
      console.log(this.lowestems);
      console.log(this.lowestTime);
      for (let r of this.lowestTime.routes) {
        let c1 = this.cities.find((e) => e.id == r.c[0]);
        let c2 = this.cities.find((e) => e.id == r.c[1]);
        this.drawRouteDuration(c1, c2);
      }

      for (let r of this.lowestems.routes) {
        let c3 = this.cities.find((e) => e.id == r.c[0]);
        let c4 = this.cities.find((e) => e.id == r.c[1]);
        this.drawRouteEmission(c3, c4);
      }
      // console.log(lowestTime);
      // console.log(lowestems);
    },
  },
  created() {
    this.genRoutes = this.generateRoutes();
    // console.log(this.genRoutes.length);
    // console.log(allRoutes.length);
  },
});
