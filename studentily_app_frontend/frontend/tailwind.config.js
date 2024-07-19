import plugin from "tailwindcss/plugin";

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "max-1580": { max: "1580px" },

        "between-1200-1350": { min: "1200px", max: "1350px" },
        "between-1005-1200": { min: "1005px", max: "1200px" },
        "between-970-1005": { min: "971px", max: "1005px" },

        "between-768-970": { min: "768px", max: "970px" },

        "between-786-970": { min: "787px", max: "970px" },

        "between-500-767": { min: "500px", max: "767px" },

        "between-767-787": { min: "768px", max: "787px" },
        "between-768-1350": { min: "768px", max: "1350px" },

        "between-768-787": { min: "768px", max: "787px" },

        "between-721-767": { min: "721px", max: "767px" },

        "between-721-1350": { min: "721px", max: "1350px" },

        "between-1151-1251": { min: "1151px", max: "1251px" },

        "between-1091-1150": { min: "1091px", max: "1150px" },

        "between-971-1090": { min: "971px", max: "1090px" },

        "max-720": { max: "720px" },

        "max-550": { max: "550px" },

        "min-1350": { min: "1351px" },
        "max-1455": { max: "1455px" },
        "max-1350": { max: "1350px" },
        "max-1200": { max: "1200px" },
        "max-1150": { max: "1150px" },
        "max-1250": { max: "1250px" },
        "max-1060": { max: "1060px" },
        "max-1005": { max: "1005px" },
        "max-910": { max: "910px" },
        "max-970": { max: "970px" },
        "between-767-970": { min: "767px", max: "970px" },
        "max-960": { max: "960px" },
        "between-767-960": { min: "767px", max: "960px" },
        "max-900": { max: "900px" },
        "max-870": { max: "870px" },
        "max-450": { max: "450px" },
        "max-767": { max: "767px" },
        "min-720": { min: "720px" },
        "max-720": { max: "720px" },
        "min-1060": { min: "1060px" },
        "max-786": { max: "786px" },
        "min-786": { min: "786px" },
        "min-767": { min: "767px" },
        "max-730": { max: "730px" },
        "max-650": { max: "650px" },
        "max-640": { max: "640px" },
        "max-580": { max: "580px" },
        "max-500": { max: "500px" },
        "max-465": { max: "465px" },
        "min-465": { min: "466px" },
        "max-420": { max: "420px" },
        "max-385": { max: "385px" },
        "max-350": { max: "350px" },
        "max-327": { max: "327px" },
        "max-307": { max: "307px" },
      },
    },
  },
};
