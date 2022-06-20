const fs = require("fs")
const { parse } = require("csv-parse")

const isHabitablePlanet = (planet) => {
    return planet["koi_disposition"] === "CONFIRMED"
        && planet["koi_insol"] > 0.36
        && planet["koi_insol"] < 1.11
        && planet["koi_prad"] < 1.6;
}

const results = [];

fs.createReadStream("kepler_data.csv")
    .pipe(parse({
        comment: "#",
        columns: true
    }))
    .on("data", data => {
        if (isHabitablePlanet(data)) {
            results.push(data);
        }
    })
    .on('error', error => {
        comsole.log(error)
    })
    .on("end", () => {
        console.log(`The number of habitable planets is ${results.length}.`)
        results.map(planet => {
            console.log(planet["kepler_name"])
        })
    });