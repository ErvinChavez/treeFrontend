const SEASONS = [
  {
    name: "winter",
    months: [12, 1, 2],
    image: "/hero/winter.jpg",
    alt: "Chavez Tree Service crew removing a tree in winter in Lawrenceville, GA",
  },
  {
    name: "spring",
    months: [3, 4, 5],
    image: "/hero/spring.jpg",
    alt: "Chavez Tree Service trimming trees in bloom during spring in Lawrenceville, GA",
  },
  {
    name: "summer",
    months: [6, 7, 8],
    image: "/hero/summer.jpg",
    alt: "Chavez Tree Service performing tree removal under full summer canopy in Lawrenceville, GA",
  },
  {
    name: "fall",
    months: [9, 10, 11],
    image: "/hero/fall.jpg",
    alt: "Chavez Tree Service clearing fall foliage and trees in Lawrenceville, GA",
  },
];

export function getSeasonalHero(date = new Date()) {
  const month = date.getMonth() + 1; // JS months are 0-indexed, so January = 0
  return SEASONS.find((season) => season.months.includes(month)) || SEASONS[0];
}