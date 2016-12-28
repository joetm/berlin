// Berlin
var coords = [52.507629,13.1459635];

var world = VIZI.world('world', {
  skybox: false,
  postProcessing: false
}).setView(coords);

// Add controls
VIZI.Controls.orbit().addTo(world);

// CartoDB basemap
VIZI.imageTileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(world);

// Buildings from Mapzen
VIZI.topoJSONTileLayer('https://vector.mapzen.com/osm/buildings/{z}/{x}/{y}.topojson?api_key=vector-tiles-NT5Emiw', {
  interactive: true,
  onEachFeature: function(feature, layer) {
    layer.on('click', function(layer, point2d, point3d, intersects) {
      // console.log(layer);
      var id = feature.properties.id;
      var value = feature.properties.landuse_kind;
      // console.log(id + ': ' + value, layer, point2d, point3d, intersects);
      console.log(id + ': ' + value);
    });
  },
  style: function(feature) {

    // console.log(feature.properties);
    /*
      Object
      area: 172
      id: 122699023
      kind: "building"
      landuse_kind: "residential"
      min_zoom: 14
      sort_key: 475
      source: "openstreetmap.org"
      __proto__: Object
    */

    var colour;

/*
// landuse_kind //
allotments
aviary
farm
farmland
farmyard

amusement_ride
animal
aquarium
carousel
cinema
golf_course
petting_zoo
recreation_ground
recreation_track
beach
park
picnic_site
maze

artwork
attraction
camp_site
caravan_site
city_wall
fort
national_park
nature_reserve
natural_forest
natural_park
natural_wood
pedestrian
resort

aerodrome
bridge
fuel
parking
pier
railway

college
library
playground

commercial
generator
industrial

place_of_worship

military
prison

hospital

apron
battlefield
breakwater
cemetery
common
cutline
dam
dike
dog_park
enclosure
fence
footway
forest
garden
gate
glacier
grass
grave_yard
groyne
hanami
land
meadow
pitch
plant
protected_area
quarry

residential

rest_area
retail

retaining_wall
rock
roller_coaster
runway
rural
school
scree
scrub
service_area
snow_fence
sports_centre
stadium
stone
substation
summer_toboggan
taxiway
theatre
theme_park
tower
trail_riding_station
university
urban_area
urban
village_green
wastewater_plant
water_park
water_slide
water_works
wetland
wilderness_hut
wildlife_park
winery
winter_sports
wood
works
zoo
*/

    switch(feature.properties.landuse_kind) {
      case 'commercial':
        colour = '#AA4050';
        break;
      case 'industrial':
        colour = '#AA90DD';
        break;
      case 'school':
      case 'university':
      case 'college':
        colour = '#AAAA00';
        break;
      case 'retail':
        colour = '#00AAAA';
        break;
      case 'place_of_worship':
        colour = 'yellow';
        break;
      case 'parking':
        colour = '#9010A0';
        break;
      case 'allotments':
        colour = 'green';
        break;
      case 'residential':
        colour = '#505050';
        break;
      default:
        colour = '#FFFFFF';
        break;
    }

    var height;
    if (feature.properties.height) {
      height = feature.properties.height;
    } else {
      height = 10 + Math.random() * 10;
    }
    return {
      height: height,
      color: colour
    };
  },
  filter: function(feature) {
    // Don't show points
    return feature.geometry.type !== 'Point';
  },
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://whosonfirst.mapzen.com#License">Who\'s On First</a>.'
}).addTo(world);
