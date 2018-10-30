import spinalCore from "spinal-core-connectorjs";
import { promiseLoad, guid } from "./Utilities";
const globalType = typeof window === "undefined" ? global : window;

import SpinalDevice from "./SpinalDevice";
import SpinalEndpoint from "./SpinalEndpoint";

// var csv = require("fast-csv");

class SpinalNetwork extends globalType.Model {
  /**
   *Creates an instance of SpinalNetwork.
   * @param {string} [_name=""]
   * @param {string} [type=""]
   * @param {string} [host=""]
   * @param {string} [user=""]
   * @param {string} [password=""]
   * @param {Ptr} [options=new Model] - mod_attr to change it
   * @param {string} [name="SpinalNetwork"]
   * @memberof SpinalNetwork
   */
  constructor(settings) {
    super();

    if (FileSystem._sig_server) {
      this.add_attr({
        id: guid(this.constructor.name),
        name:
          typeof settings.networkName != "undefined"
            ? settings.networkName
            : "virtualNetwork",
        type: typeof settings.type != "undefined" ? settings.type : "",
        host: typeof settings.host != "undefined" ? settings.host : "",
        user: typeof settings.user != "undefined" ? settings.user : "",
        password:
          typeof settings.password != "undefined" ? settings.password : "",
        options: new globalType.Ptr(new Model(settings))
      });
    }
  }

  /**
   * Connects to the network if it's necessary to have a persistent session
   * @memberof SpinalNetwork
   */
  connect() {}

  /**
   * Disconnects of the network if previously signed in
   * @memberof SpinalNetwork
   */
  disconnect() {}

  /**
   * Returns a container of SpinalDevices and SpinalEndpoints
   * @param {object} [options]
   * @memberof SpinalNetwork
   */
  discover(options) {
    return new Promise((res, rej) => {
      this.options.load(el => {
        let containers = [];
        let total = el.virtualDevices.get();
        for (var i = 0; i < total; i++)
          containers.push(createFakeContainer(i, el.endpointsPerDevice));

        res(containers);
      });
    });
  }

  /**
   * Reads the value of an endpoint
   * @param {string} [endpointId]
   * @param {object} [options]
   * @memberof SpinalNetwork
   */
  read() {}

  /**
   * Writes the value to an endpoint
   * @param {string} [endpointId]
   * @param {object} [options]
   * @memberof SpinalNetwork
   */
  write(endpointId, options) {}

  /**
   * Returns a SpinalDevice
   * @param {string} [deviceId]
   * @param {object} [options]
   * @memberof SpinalNetwork
   */
  getDevice(deviceId, options) {}

  /**
   * Returns an SpinalEndpoint
   * @param {string} [endpointId]
   * @param {object} [options]
   * @memberof SpinalNetwork
   */
  getEndpoint(endpointId, options) {}

  /**
   * Invoces a callback when new events arrive
   * @param {array} [endpointList]
   * @param {object} [options]
   * @memberof SpinalNetwork
   */
  subscribe(endpontIds, callback) {
    // TODO: from endpointList generate endpoints with Id and Value
    this.options.load(el => {
      setInterval(() => {
        callback(createFakeValues(endpontIds));
      }, el.updateInterval);
    });
  }

  /**
   * Cancels notification of new events
   * @param {array} [endpointList]
   * @param {object} [options]
   * @memberof SpinalNetwork
   */
  unsubscribe(endpointList, options) {}
}

spinalCore.register_models([SpinalNetwork]);
module.exports = SpinalNetwork;

/*************************************************
 * FAKE SPECIFIC FUNCTIONS - NOT PART OF THE LIB *
 *************************************************/

var networkConnector = {
  networkName: "VirtualNetwork",
  appName: "VirtualNetworkContext",
  type: "MyFakeProtocol",
  path: "/VirtualNetwork",
  virtualDevices: 5,
  endpointsPerDevice: 3,
  updateInterval: 1000
};

const DATA_TYPES = [
  "DateTime",
  "Boolean",
  "String",
  "Double",
  "Long",
  "Integer",
  "Duration"
];
let sensorTypes = {
    Temperature: {
      name: "Temperature",
      unit: "°C",
      dataType: "Double",
      min: "0",
      max: "30"
    },
    Switch: {
      name: "Switch",
      unit: "Power",
      dataType: "Boolean",
      min: "0",
      max: "2"
    }
  },
  sensorKeys = ["Temperature", "Switch"];

// csv
//   .fromPath('sensorTemplates.csv', {
//     delimiter: ','
//   })
//   .on("data", function(data) {
//     let s = {
//       name: data[0],
//       unit: data[1],
//       dataType: data[2]
//     }

//     s.min = typeof data[3] != "undefined" ? data[3] : undefined;
//     s.max = typeof data[4] != "undefined" ? data[4] : undefined;

//     sensorTypes[s.name] = s
//     sensorKeys.push(s.name);
//   });

function createFakeContainer(index, totalEndpoints) {
  let endpoints = [];

  for (var i = 0; i < totalEndpoints; i++) {
    endpoints.push(createFakeEndpoint(index, i));
  }

  let device = new SpinalDevice("Device " + index, "Device-" + index);

  return {
    device: device,
    endpoints: endpoints
  };
}

function createFakeEndpoint(deviceIndex, index) {
  var num = parseInt("" + deviceIndex + index);

  let sensorType = sensorTypes[sensorKeys[Math.floor(Math.random() * 2 + 0)]];

  let endpoint = new SpinalEndpoint(
    "Endpoint " + deviceIndex + "_" + index,
    "Endpoint-" + deviceIndex + "_" + index + "_" + sensorType.name,
    parseValue(
      Math.floor(Math.random() * sensorType.max + sensorType.min),
      sensorType.dataType
    ),
    sensorType.unit,
    sensorType.dataType
  );

  return endpoint;
}

function createFakeValues(endpointIds) {
  let endpointObjs = [];

  for (var i = 0; i < endpointIds.length; i++) {
    let sensorType = sensorTypes[endpointIds[i].split("_")[2]];

    let val = parseValue(
      Math.floor(Math.random() * sensorType.max + sensorType.min),
      sensorType.dataType
    );

    endpointObjs.push({
      path: endpointIds[i],
      value: val
    });
  }

  return endpointObjs;
}

function parseValue(value, dataType) {
  if (dataType == DATA_TYPES["Boolean"]) return value == "True";

  if (dataType == DATA_TYPES["Long"] || dataType == DATA_TYPES["Double"])
    if (value == null) value = 0;
  return parseFloat(value);

  if (dataType == DATA_TYPES["Integer"]) {
    if (value == null) value = 0;
    return parseInt(value);
  }

  if (value == null) value = "null";
  return value;
}
