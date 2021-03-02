// data is loaded in index_1v1.html
const vm = new Vue({
  el: "#app",
  data: {
    title: "Green Package",
    routes: data.routes,
    cities: data.cities,
    selectedCities: [],
  },
  methods: {
    selectCity(id) {
      // Methode um Städte auszuwählen
      // console.log(this.cities.find((e) => e.id == id));
      let city = this.cities.find((e) => e.id == id);
      if (city.isSelected == false) {
        city.isSelected = true;
        this.selectedCities.push(city);
      } else {
        city.isSelected = false;
        this.selectedCities = this.selectedCities.filter((e) => e.id != id);
      }
      if (this.selectedCities.length == 2) {
        this.drawRoute();
      }
      // console.log(this.selectedCities);
    },

    drawRoute() {},
  },
  created() {},
});
