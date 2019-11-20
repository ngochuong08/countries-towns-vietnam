const xlsx = require('node-xlsx');
const fs = require('fs');
const obj = xlsx.parse(fs.readFileSync(__dirname + '/DSTTP.xls'));
let count = 0;
const cities = [];
obj[0].data.forEach(city => {
  const existCity = cities.find(c => c.id === city[1])
  if (!existCity) {
    cities[count] = { id: city[1], name: city[0], districts: [] };
    count++;
  }
  else {
    const existDistict = existCity.districts.find(dis => dis.id === city[3])
    if (!existDistict) {
      existCity.districts.push({ id: city[3], name: city[2], towns: [] })
    }
    else {
      const existTown = existDistict.towns.find(t => t.id === city[5])
      if (!existTown) {
        existDistict.towns.push({ id: city[5], name: city[4] })
      }
    }
  }
})
fs.writeFile('./City.json', JSON.stringify(cities), 'utf8'), function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("The file was saved!");
});