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
    co2Vergleich() {
      return (
        this.selectedRoute.costs[0].emission /
        this.selectedRoute.costs[1].emission
      ).toFixed(2);
    },
    dauerVergleich() {
      return (
        this.selectedRoute.costs[0].duration /
        this.selectedRoute.costs[1].duration
      ).toFixed(2);
    },
  },
  methods: {
    findRoute() {
      // console.log(this.selectedCities);
      // console.log(
      //   this.routes.filter((e) =>
      //     e.c.includes(this.selectedCities.find((e) => e.isStart == true).id)
      //   )
      // );
      return this.routes.find(
        (e) =>
          e.c.includes(this.selectedCities[0].id) &&
          e.c.includes(this.selectedCities[1].id)
      );
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
      this.selectedCities[0].isStart = true;
      if (this.selectedCities.length != 2) return;
      if (this.selectedCities[0].coord.lon > this.selectedCities[1].coord.lon) {
        const h = this.selectedCities[0];
        this.selectedCities[0] = this.selectedCities[1];
        this.selectedCities[1] = h;
      }
    },
    createRoutes() {
      return this.routes.filter((e) => e.c.includes(this.selectedCities[0]));
    },
  },
  created() {},
});

class Walker {
  constructor(start, routes, emission, duration) {
    this.route = routes;
    this.emission = emission;
    this.duration = duration;
    this.start = start;
  }

  useRoute(route) {
    let walkers = vm.createRoutes();
    while(walker in walkers){
      
    }
  }

  createDeepCopy() {
    return new Walker(this.start, this.routes, this.emission, this.duration);
  }
}
