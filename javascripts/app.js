const ys = 46.5484077;
const ye = 49.3857256;

const vm = new Vue({
  el: "#app",
  filters: {
    flipY(v) {
      return ye - parseFloat(v) + ys;
    },
  },
  data: {
    sx: 8.1,
    sy: 46,
    w: 8,
    h: 3,
    title: "Green",
    routes: [],
    cities: [
      {
        id: "W",
        name: "Wien",
        coord: {
          lat: 48.20849,
          lon: 16.37208,
        },
        link: "https://www.wien.at/",
      },
      {
        id: "L",
        name: "Linz",
        coord: {
          lat: 48.30639,
          lon: 14.28611,
        },
        link: "https://www.linz.at/",
      },
      {
        id: "I",
        name: "Innsbruck",
        coord: {
          lat: 47.26266,
          lon: 11.39454,
        },
        link: "https://www.innsbruck.at/",
      },
    ],
  },
  methods: {},
  created() {},
});
