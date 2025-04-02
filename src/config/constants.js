const house_categories_options = [
  {
    label: "House",
    value: "house",
  },
  {
    label: "Condo",
    value: "condo",
  },
  {
    label: "Townhouse",
    value: "townhouse",
  },
];

const rating = [
  {
    label: "1",
    value: "1",
  },
  {
    label: "2",
    value: "2",
  },
  {
    label: "3",
    value: "3",
  },
  {
    label: "4",
    value: "4",
  },
  {
    label: "5",
    value: "5",
  },
];

// const BACKEND_APP_URL = "http://localhost:8080";
const BACKEND_APP_URL = "http://34.201.135.101:3000/api/hello?";
// const BACKEND_APP_URL = "http://10.0.2.252";

module.exports = { house_categories_options, rating, BACKEND_APP_URL };
