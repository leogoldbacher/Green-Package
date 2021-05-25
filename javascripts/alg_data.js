const data = {
  cities: [
    {
      id: "W",
      name: "Wien",
      isSelected: false,
      isStart: false,
      coord: {
        lat: 48.20849,
        lon: 16.37208,
        x: 244.50334,
        y: 155.3298,
      },
      link: "https://www.wien.at/",
      wappen: "../images/wappen/wien.png",
    },
    {
      id: "L",
      name: "Linz",
      isSelected: false,
      isStart: false,
      coord: {
        lat: 48.30639,
        lon: 14.28611,
        x: 179.01,
        y: 150.44,
      },
      link: "https://www.linz.at/",
      wappen: "../images/wappen/linz.png",
    },
    {
      id: "I",
      name: "Innsbruck",
      isSelected: false,
      isStart: false,
      coord: {
        lat: 47.26266,
        lon: 11.39454,
        x: 88.21019,
        y: 198.44272,
      },
      link: "https://www.innsbruck.at/",
      wappen: "../images/wappen/innsbruck.png",
    },
    {
      id: "B",
      name: "Bregenz",
      isSelected: false,
      isStart: false,
      coord: {
        lat: 47.50311,
        lon: 9.7471,
        x: 38.085907,
        y: 187.56543,
      },
      link: "https://www.bregenz.at",
      wappen: "../images/wappen/bregenz.png",
    },
    {
      id: "S",
      name: "Salzburg",
      isSelected: false,
      isStart: false,
      coord: {
        lat: 47.79941,
        lon: 13.04399,
        x: 140.04018,
        y: 172.36235,
      },
      link: "https://www.stadt-salzburg.at",
      wappen: "../images/wappen/salzburg.png",
    },
    {
      id: "V",
      name: "Villach",
      isSelected: false,
      isStart: false,
      coord: {
        lat: 46.61028,
        lon: 13.85583,
        x: 165.76761,
        y: 227.86893,
      },
      link: "https://villach.at/",
      wappen: "../images/wappen/villach.png",
    },
    {
      id: "K",
      name: "Klagenfurt",
      isSelected: false,
      isStart: false,
      coord: {
        lat: 46.62472,
        lon: 14.30528,
        x: 180.03477,
        y: 227.31064,
      },
      link: "https://www.klagenfurt.at/",
      wappen: "../images/wappen/klagenfurt.png",
    },
    {
      id: "G",
      name: "Graz",
      isSelected: false,
      isStart: false,
      coord: {
        lat: 47.06667,
        lon: 15.45,
        x: 215.25743,
        y: 208.05748,
      },
      link: "https://www.graz.at/",
      wappen: "../images/wappen/graz.png",
    },
    {
      id: "Ka",
      name: "Kapfenberg",
      isSelected: false,
      isStart: false,
      coord: {
        lat: 47.44458,
        lon: 15.29331,
        x: 213.90904,
        y: 189.56976,
      },
      link: "https://www.kapfenberg.gv.at/",
      wappen: "../images/wappen/kapfenberg.png",
    },
    {
      id: "E",
      name: "Eisenstadt",
      isSelected: false,
      isStart: false,
      coord: {
        lat: 47.84565,
        lon: 16.52327,
        x: 245.22879,
        y: 172.65289,
      },
      link: "https://www.eisenstadt.gv.at/",
      wappen: "../images/wappen/eisenstadt.png",
    },
    {
      id: "Sch",
      name: "Schladming",
      isSelected: false,
      isStart: false,
      coord: {
        lat: 50.84565,
        lon: 18.52327,
        x: 175.66965,
        y: 205.34821,
      },
      link: "https://www.schladming.at/",
      wappen: "../images/wappen/schladming.png",
    },
  ],
  routes: [
    {
      c: ["L", "W"],
      type: "car",
      emission: 34.96,
      duration: 128,
    },
    {
      c: ["L", "W"],
      type: "train",
      emission: 5.88,
      duration: 740,
    },
    {
      c: ["E", "W"],
      type: "car",
      emission: 9.5,
      duration: 49,
    },
    {
      c: ["E", "W"],
      type: "train",
      emission: 1.6,
      duration: 71,
    },
    {
      c: ["E", "Ka"],
      type: "car",
      emission: 22.99,
      duration: 84,
    },
    {
      c: ["E", "Ka"],
      type: "train",
      emission: 3.872,
      duration: 146,
    },
    {
      c: ["L", "Ka"],
      type: "car",
      emission: 39.52,
      duration: 144,
    },
    {
      c: ["L", "Ka"],
      type: "train",
      emission: 6.656,
      duration: 196,
    },
    {
      c: ["G", "Ka"],
      type: "car",
      emission: 11.875,
      duration: 59,
    },
    {
      c: ["G", "Ka"],
      type: "train",
      emission: 2,
      duration: 42,
    },
    {
      c: ["G", "K"],
      type: "car",
      emission: 26.41,
      duration: 102,
    },
    {
      c: ["G", "K"],
      type: "train",
      emission: 4.448,
      duration: 120,
    },
    {
      c: ["V", "K"],
      type: "car",
      emission: 7.505,
      duration: 43,
    },
    {
      c: ["V", "K"],
      type: "train",
      emission: 1.264,
      duration: 37,
    },
    {
      c: ["V", "S"],
      type: "car",
      emission: 36.67,
      duration: 132,
    },
    {
      c: ["V", "S"],
      type: "train",
      emission: 6.176,
      duration: 187,
    },
    {
      c: ["V", "I"],
      type: "car",
      emission: 56.24,
      duration: 256,
    },
    {
      c: ["V", "I"],
      type: "train",
      emission: 9.472,
      duration: 264,
    },
    {
      c: ["S", "I"],
      type: "car",
      emission: 31.16,
      duration: 143,
    },
    {
      c: ["S", "I"],
      type: "train",
      emission: 5.248,
      duration: 108,
    },
    {
      c: ["S", "L"],
      type: "car",
      emission: 31.16,
      duration: 143,
    },
    {
      c: ["S", "L"],
      type: "train",
      emission: 5.248,
      duration: 66,
    },
    {
      c: ["I", "B"],
      type: "car",
      emission: 38.76,
      duration: 178,
    },
    {
      c: ["I", "B"],
      type: "train",
      emission: 6.528,
      duration: 150,
    },
    {
      c: ["Sch", "V"],
      type: "car",
      emission: 21.31,
      duration: 102,
    },
    {
      c: ["Sch", "V"],
      type: "train",
      emission: 4.64,
      duration: 153,
    },
    {
      c: ["Sch", "K"],
      type: "car",
      emission: 26.9,
      duration: 124,
    },
    {
      c: ["Sch", "K"],
      type: "train",
      emission: 5.85,
      duration: 183,
    },
    {
      c: ["Sch", "G"],
      type: "car",
      emission: 24.69,
      duration: 126,
    },
    {
      c: ["Sch", "G"],
      type: "train",
      emission: 5.37,
      duration: 142,
    },
    {
      c: ["Sch", "Ka"],
      type: "car",
      emission: 23.07,
      duration: 119,
    },
    {
      c: ["Sch", "Ka"],
      type: "train",
      emission: 5.02,
      duration: 141,
    },
    {
      c: ["Sch", "S"],
      type: "car",
      emission: 14.5,
      duration: 82,
    },
    {
      c: ["Sch", "S"],
      type: "train",
      emission: 3.16,
      duration: 98,
    },
    {
      c: ["Sch", "I"],
      type: "car",
      emission: 38.36,
      duration: 193,
    },
    {
      c: ["Sch", "I"],
      type: "train",
      emission: 8.35,
      duration: 210,
    },
  ],
};
module.exports = data;
