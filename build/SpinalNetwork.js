"use strict";

var _spinalCoreConnectorjs = _interopRequireDefault(require("spinal-core-connectorjs"));

var _Utilities = require("./Utilities");

var _SpinalDevice = _interopRequireDefault(require("./SpinalDevice"));

var _SpinalEndpoint = _interopRequireDefault(require("./SpinalEndpoint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const globalType = typeof window === "undefined" ? global : window;

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
        id: (0, _Utilities.guid)(this.constructor.name),
        name: typeof settings.networkName != "undefined" ? settings.networkName : "virtualNetwork",
        type: typeof settings.type != "undefined" ? settings.type : "",
        host: typeof settings.host != "undefined" ? settings.host : "",
        user: typeof settings.user != "undefined" ? settings.user : "",
        password: typeof settings.password != "undefined" ? settings.password : "",
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

        for (var i = 0; i < total; i++) containers.push(createFakeContainer(i, el.endpointsPerDevice));

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


  subscribe(endpontIds, callback, options) {
    // TODO: from endpointList generate endpoints with Id and Value
    setInterval(() => {
      callback(createFakeValues(endpontIds));
    }, this.options.updateInterval);
  }
  /**
   * Cancels notification of new events
   * @param {array} [endpointList]
   * @param {object} [options]
   * @memberof SpinalNetwork
   */


  unsubscribe(endpointList, options) {}

}

_spinalCoreConnectorjs.default.register_models([SpinalNetwork]);

module.exports = SpinalNetwork;
/*************************************************
 * FAKE SPECIFIC FUNCTIONS - NOT PART OF THE LIB *
 *************************************************/

var networkConnector = {
  networkName: 'VirtualNetwork',
  appName: 'VirtualNetworkContext',
  type: 'MyFakeProtocol',
  path: '/VirtualNetwork',
  virtualDevices: 5,
  endpointsPerDevice: 3,
  updateInterval: 1000
};
var test = new SpinalNetwork(networkConnector);
console.log("testes", test instanceof globalType.Model);
const DATA_TYPES = ["DateTime", "Boolean", "String", "Double", "Long", "Integer", "Duration"];
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
    sensorKeys = ["Temperature", "Switch"]; // csv
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

  let device = new _SpinalDevice.default("Device " + index, "Device-" + index);
  return {
    device: device,
    endpoints: endpoints
  };
}

function createFakeEndpoint(deviceIndex, index) {
  var num = parseInt("" + deviceIndex + index);
  let sensorType = sensorTypes[sensorKeys[Math.floor(Math.random() * 2 + 0)]];
  let endpoint = new _SpinalEndpoint.default("Endpoint " + deviceIndex + "_" + index, "Endpoint-" + deviceIndex + "_" + index + "_" + sensorType.name, parseValue(Math.floor(Math.random() * sensorType.max + sensorType.min), sensorType.dataType), sensorType.unit, sensorType.dataType);
  return endpoint;
}

function createFakeValues(endpointIds) {
  let endpointObjs = [];

  for (var i = 0; i < endpointIds.length; i++) {
    let sensorType = sensorTypes[endpointIds[i].split("_")[2]];
    let val = parseValue(Math.floor(Math.random() * sensorType.max + sensorType.min), sensorType.dataType);
    endpointObjs.push({
      path: endpointIds[i],
      value: val
    });
  }

  return endpointObjs;
}

function parseValue(value, dataType) {
  if (dataType == DATA_TYPES["Boolean"]) return value == "True";
  if (dataType == DATA_TYPES["Long"] || dataType == DATA_TYPES["Double"]) if (value == null) value = 0;
  return parseFloat(value);

  if (dataType == DATA_TYPES["Integer"]) {
    if (value == null) value = 0;
    return parseInt(value);
  }

  if (value == null) value = "null";
  return value;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxOZXR3b3JrLmpzIl0sIm5hbWVzIjpbImdsb2JhbFR5cGUiLCJ3aW5kb3ciLCJnbG9iYWwiLCJTcGluYWxOZXR3b3JrIiwiTW9kZWwiLCJjb25zdHJ1Y3RvciIsInNldHRpbmdzIiwiRmlsZVN5c3RlbSIsIl9zaWdfc2VydmVyIiwiYWRkX2F0dHIiLCJpZCIsIm5hbWUiLCJuZXR3b3JrTmFtZSIsInR5cGUiLCJob3N0IiwidXNlciIsInBhc3N3b3JkIiwib3B0aW9ucyIsIlB0ciIsImNvbm5lY3QiLCJkaXNjb25uZWN0IiwiZGlzY292ZXIiLCJQcm9taXNlIiwicmVzIiwicmVqIiwibG9hZCIsImVsIiwiY29udGFpbmVycyIsInRvdGFsIiwidmlydHVhbERldmljZXMiLCJnZXQiLCJpIiwicHVzaCIsImNyZWF0ZUZha2VDb250YWluZXIiLCJlbmRwb2ludHNQZXJEZXZpY2UiLCJyZWFkIiwid3JpdGUiLCJlbmRwb2ludElkIiwiZ2V0RGV2aWNlIiwiZGV2aWNlSWQiLCJnZXRFbmRwb2ludCIsInN1YnNjcmliZSIsImVuZHBvbnRJZHMiLCJjYWxsYmFjayIsInNldEludGVydmFsIiwiY3JlYXRlRmFrZVZhbHVlcyIsInVwZGF0ZUludGVydmFsIiwidW5zdWJzY3JpYmUiLCJlbmRwb2ludExpc3QiLCJzcGluYWxDb3JlIiwicmVnaXN0ZXJfbW9kZWxzIiwibW9kdWxlIiwiZXhwb3J0cyIsIm5ldHdvcmtDb25uZWN0b3IiLCJhcHBOYW1lIiwicGF0aCIsInRlc3QiLCJjb25zb2xlIiwibG9nIiwiREFUQV9UWVBFUyIsInNlbnNvclR5cGVzIiwiVGVtcGVyYXR1cmUiLCJ1bml0IiwiZGF0YVR5cGUiLCJtaW4iLCJtYXgiLCJTd2l0Y2giLCJzZW5zb3JLZXlzIiwiaW5kZXgiLCJ0b3RhbEVuZHBvaW50cyIsImVuZHBvaW50cyIsImNyZWF0ZUZha2VFbmRwb2ludCIsImRldmljZSIsIlNwaW5hbERldmljZSIsImRldmljZUluZGV4IiwibnVtIiwicGFyc2VJbnQiLCJzZW5zb3JUeXBlIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZW5kcG9pbnQiLCJTcGluYWxFbmRwb2ludCIsInBhcnNlVmFsdWUiLCJlbmRwb2ludElkcyIsImVuZHBvaW50T2JqcyIsImxlbmd0aCIsInNwbGl0IiwidmFsIiwidmFsdWUiLCJwYXJzZUZsb2F0Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOztBQUdBOztBQUNBOzs7O0FBSEEsTUFBTUEsVUFBVSxHQUFHLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRCxNQUE1RDs7QUFLQTtBQUVBLE1BQU1FLGFBQU4sU0FBNEJILFVBQVUsQ0FBQ0ksS0FBdkMsQ0FBNkM7QUFDM0M7Ozs7Ozs7Ozs7O0FBV0FDLEVBQUFBLFdBQVcsQ0FBQ0MsUUFBRCxFQUFXO0FBQ3BCOztBQUVBLFFBQUlDLFVBQVUsQ0FBQ0MsV0FBZixFQUE0QjtBQUMxQixXQUFLQyxRQUFMLENBQWM7QUFDWkMsUUFBQUEsRUFBRSxFQUFFLHFCQUFLLEtBQUtMLFdBQUwsQ0FBaUJNLElBQXRCLENBRFE7QUFFWkEsUUFBQUEsSUFBSSxFQUNGLE9BQU9MLFFBQVEsQ0FBQ00sV0FBaEIsSUFBK0IsV0FBL0IsR0FDSU4sUUFBUSxDQUFDTSxXQURiLEdBRUksZ0JBTE07QUFNWkMsUUFBQUEsSUFBSSxFQUFFLE9BQU9QLFFBQVEsQ0FBQ08sSUFBaEIsSUFBd0IsV0FBeEIsR0FBc0NQLFFBQVEsQ0FBQ08sSUFBL0MsR0FBc0QsRUFOaEQ7QUFPWkMsUUFBQUEsSUFBSSxFQUFFLE9BQU9SLFFBQVEsQ0FBQ1EsSUFBaEIsSUFBd0IsV0FBeEIsR0FBc0NSLFFBQVEsQ0FBQ1EsSUFBL0MsR0FBc0QsRUFQaEQ7QUFRWkMsUUFBQUEsSUFBSSxFQUFFLE9BQU9ULFFBQVEsQ0FBQ1MsSUFBaEIsSUFBd0IsV0FBeEIsR0FBc0NULFFBQVEsQ0FBQ1MsSUFBL0MsR0FBc0QsRUFSaEQ7QUFTWkMsUUFBQUEsUUFBUSxFQUNOLE9BQU9WLFFBQVEsQ0FB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dkQsQ0FEa0IsRUFFbEJhLFVBQVUsQ0FBQ2QsUUFGTyxDQUFwQjtBQUtBc0IsSUFBQUEsWUFBWSxDQUFDckQsSUFBYixDQUFrQjtBQUNoQnVCLE1BQUFBLElBQUksRUFBRTZCLFdBQVcsQ0FBQ3JELENBQUQsQ0FERDtBQUVoQjBELE1BQUFBLEtBQUssRUFBRUQ7QUFGUyxLQUFsQjtBQUlEOztBQUVELFNBQU9ILFlBQVA7QUFDRDs7QUFFRCxTQUFTRixVQUFULENBQW9CTSxLQUFwQixFQUEyQjFCLFFBQTNCLEVBQXFDO0FBQ25DLE1BQUlBLFFBQVEsSUFBSUosVUFBVSxDQUFDLFNBQUQsQ0FBMUIsRUFBdUMsT0FBTzhCLEtBQUssSUFBSSxNQUFoQjtBQUV2QyxNQUFJMUIsUUFBUSxJQUFJSixVQUFVLENBQUMsTUFBRCxDQUF0QixJQUFrQ0ksUUFBUSxJQUFJSixVQUFVLENBQUMsUUFBRCxDQUE1RCxFQUNFLElBQUk4QixLQUFLLElBQUksSUFBYixFQUFtQkEsS0FBSyxHQUFHLENBQVI7QUFDckIsU0FBT0MsVUFBVSxDQUFDRCxLQUFELENBQWpCOztBQUVBLE1BQUkxQixRQUFRLElBQUlKLFVBQVUsQ0FBQyxTQUFELENBQTFCLEVBQXVDO0FBQ3JDLFFBQUk4QixLQUFLLElBQUksSUFBYixFQUFtQkEsS0FBSyxHQUFHLENBQVI7QUFDbkIsV0FBT2IsUUFBUSxDQUFDYSxLQUFELENBQWY7QUFDRDs7QUFFRCxNQUFJQSxLQUFLLElBQUksSUFBYixFQUFtQkEsS0FBSyxHQUFHLE1BQVI7QUFDbkIsU0FBT0EsS0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHNwaW5hbENvcmUgZnJvbSBcInNwaW5hbC1jb3JlLWNvbm5lY3RvcmpzXCI7XG5pbXBvcnQgeyBwcm9taXNlTG9hZCwgZ3VpZCB9IGZyb20gXCIuL1V0aWxpdGllc1wiO1xuY29uc3QgZ2xvYmFsVHlwZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3c7XG5cbmltcG9ydCBTcGluYWxEZXZpY2UgZnJvbSBcIi4vU3BpbmFsRGV2aWNlXCI7XG5pbXBvcnQgU3BpbmFsRW5kcG9pbnQgZnJvbSBcIi4vU3BpbmFsRW5kcG9pbnRcIjtcblxuLy8gdmFyIGNzdiA9IHJlcXVpcmUoXCJmYXN0LWNzdlwiKTtcblxuY2xhc3MgU3BpbmFsTmV0d29yayBleHRlbmRzIGdsb2JhbFR5cGUuTW9kZWwge1xuICAvKiogXG4gICAqQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTcGluYWxOZXR3b3JrLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW19uYW1lPVwiXCJdXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbdHlwZT1cIlwiXVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2hvc3Q9XCJcIl1cbiAgICogQHBhcmFtIHtzdHJpbmd9IFt1c2VyPVwiXCJdXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbcGFzc3dvcmQ9XCJcIl1cbiAgICogQHBhcmFtIHtQdHJ9IFtvcHRpb25zPW5ldyBNb2RlbF0gLSBtb2RfYXR0ciB0byBjaGFuZ2UgaXRcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtuYW1lPVwiU3BpbmFsTmV0d29ya1wiXVxuICAgKiBAbWVtYmVyb2YgU3BpbmFsTmV0d29ya1xuICAgKi9cbiAgY29uc3RydWN0b3Ioc2V0dGluZ3MpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgaWYgKEZpbGVTeXN0ZW0uX3NpZ19zZXJ2ZXIpIHtcbiAgICAgIHRoaXMuYWRkX2F0dHIoe1xuICAgICAgICBpZDogZ3VpZCh0aGlzLmNvbnN0cnVjdG9yLm5hbWUpLFxuICAgICAgICBuYW1lOlxuICAgICAgICAgIHR5cGVvZiBzZXR0aW5ncy5uZXR3b3JrTmFtZSAhPSBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgICA/IHNldHRpbmdzLm5ldHdvcmtOYW1lXG4gICAgICAgICAgICA6IFwidmlydHVhbE5ldHdvcmtcIixcbiAgICAgICAgdHlwZTogdHlwZW9mIHNldHRpbmdzLnR5cGUgIT0gXCJ1bmRlZmluZWRcIiA/IHNldHRpbmdzLnR5cGUgOiBcIlwiLFxuICAgICAgICBob3N0OiB0eXBlb2Ygc2V0dGluZ3MuaG9zdCAhPSBcInVuZGVmaW5lZFwiID8gc2V0dGluZ3MuaG9zdCA6IFwiXCIsXG4gICAgICAgIHVzZXI6IHR5cGVvZiBzZXR0aW5ncy51c2VyICE9IFwidW5kZWZpbmVkXCIgPyBzZXR0aW5ncy51c2VyIDogXCJcIixcbiAgICAgICAgcGFzc3dvcmQ6XG4gICAgICAgICAgdHlwZW9mIHNldHRpbmdzLnBhc3N3b3JkICE9IFwidW5kZWZpbmVkXCIgPyBzZXR0aW5ncy5wYXNzd29yZCA6IFwiXCIsXG4gICAgICAgIG9wdGlvbnM6IG5ldyBnbG9iYWxUeXBlLlB0cihuZXcgTW9kZWwoc2V0dGluZ3MpKVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbm5lY3RzIHRvIHRoZSBuZXR3b3JrIGlmIGl0J3MgbmVjZXNzYXJ5IHRvIGhhdmUgYSBwZXJzaXN0ZW50IHNlc3Npb25cbiAgICogQG1lbWJlcm9mIFNwaW5hbE5ldHdvcmtcbiAgICovXG4gIGNvbm5lY3QoKSB7fVxuXG4gIC8qKlxuICAgKiBEaXNjb25uZWN0cyBvZiB0aGUgbmV0d29yayBpZiBwcmV2aW91c2x5IHNpZ25lZCBpblxuICAgKiBAbWVtYmVyb2YgU3BpbmFsTmV0d29ya1xuICAgKi9cbiAgZGlzY29ubmVjdCgpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBjb250YWluZXIgb2YgU3BpbmFsRGV2aWNlcyBhbmQgU3BpbmFsRW5kcG9pbnRzXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAgICogQG1lbWJlcm9mIFNwaW5hbE5ldHdvcmtcbiAgICovXG4gIGRpc2NvdmVyKG9wdGlvbnMpIHtcbiAgICBcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcblxuICAgICAgdGhpcy5vcHRpb25zLmxvYWQoKGVsKSA9PiB7XG4gICAgICAgIGxldCBjb250YWluZXJzID0gW107XG4gICAgICAgIGxldCB0b3RhbCA9IGVsLnZpcnR1YWxEZXZpY2VzLmdldCgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRvdGFsOyBpKyspXG4gICAgICAgIGNvbnRhaW5lcnMucHVzaChcbiAgICAgICAgICBjcmVhdGVGYWtlQ29udGFpbmVyKGksIGVsLmVuZHBvaW50c1BlckRldmljZSlcbiAgICAgICAgKTtcblxuICAgICAgcmVzKGNvbnRhaW5lcnMpO1xuICAgICAgfSlcblxuICAgICAgXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVhZHMgdGhlIHZhbHVlIG9mIGFuIGVuZHBvaW50XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZW5kcG9pbnRJZF1cbiAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICAgKiBAbWVtYmVyb2YgU3BpbmFsTmV0d29ya1xuICAgKi9cbiAgcmVhZCgpIHt9XG5cbiAgLyoqXG4gICAqIFdyaXRlcyB0aGUgdmFsdWUgdG8gYW4gZW5kcG9pbnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtlbmRwb2ludElkXVxuICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gICAqIEBtZW1iZXJvZiBTcGluYWxOZXR3b3JrXG4gICAqL1xuICB3cml0ZShlbmRwb2ludElkLCBvcHRpb25zKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgU3BpbmFsRGV2aWNlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZGV2aWNlSWRdXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAgICogQG1lbWJlcm9mIFNwaW5hbE5ldHdvcmtcbiAgICovXG4gIGdldERldmljZShkZXZpY2VJZCwgb3B0aW9ucykge31cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBTcGluYWxFbmRwb2ludFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2VuZHBvaW50SWRdXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAgICogQG1lbWJlcm9mIFNwaW5hbE5ldHdvcmtcbiAgICovXG4gIGdldEVuZHBvaW50KGVuZHBvaW50SWQsIG9wdGlvbnMpIHt9XG5cbiAgLyoqXG4gICAqIEludm9jZXMgYSBjYWxsYmFjayB3aGVuIG5ldyBldmVudHMgYXJyaXZlXG4gICAqIEBwYXJhbSB7YXJyYXl9IFtlbmRwb2ludExpc3RdXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAgICogQG1lbWJlcm9mIFNwaW5hbE5ldHdvcmtcbiAgICovXG4gIHN1YnNjcmliZShlbmRwb250SWRzLCBjYWxsYmFjaywgb3B0aW9ucykge1xuICAgIC8vIFRPRE86IGZyb20gZW5kcG9pbnRMaXN0IGdlbmVyYXRlIGVuZHBvaW50cyB3aXRoIElkIGFuZCBWYWx1ZVxuXG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgY2FsbGJhY2soY3JlYXRlRmFrZVZhbHVlcyhlbmRwb250SWRzKSk7XG4gICAgfSwgdGhpcy5vcHRpb25zLnVwZGF0ZUludGVydmFsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYW5jZWxzIG5vdGlmaWNhdGlvbiBvZiBuZXcgZXZlbnRzXG4gICAqIEBwYXJhbSB7YXJyYXl9IFtlbmRwb2ludExpc3RdXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAgICogQG1lbWJlcm9mIFNwaW5hbE5ldHdvcmtcbiAgICovXG4gIHVuc3Vic2NyaWJlKGVuZHBvaW50TGlzdCwgb3B0aW9ucykge31cbn1cblxuc3BpbmFsQ29yZS5yZWdpc3Rlcl9tb2RlbHMoW1NwaW5hbE5ldHdvcmtdKTtcbm1vZHVsZS5leHBvcnRzID0gU3BpbmFsTmV0d29yaztcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIEZBS0UgU1BFQ0lGSUMgRlVOQ1RJT05TIC0gTk9UIFBBUlQgT0YgVEhFIExJQiAqXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxudmFyIG5ldHdvcmtDb25uZWN0b3IgPSB7XG4gIG5ldHdvcmtOYW1lOiAnVmlydHVhbE5ldHdvcmsnLFxuICBhcHBOYW1lOiAnVmlydHVhbE5ldHdvcmtDb250ZXh0JyxcbiAgdHlwZTogJ015RmFrZVByb3RvY29sJyxcbiAgcGF0aDogJy9WaXJ0dWFsTmV0d29yaycsXG4gIHZpcnR1YWxEZXZpY2VzOiA1LFxuICBlbmRwb2ludHNQZXJEZXZpY2U6IDMsXG4gIHVwZGF0ZUludGVydmFsOiAxMDAwXG59XG5cbiB2YXIgdGVzdCA9IG5ldyBTcGluYWxOZXR3b3JrKG5ldHdvcmtDb25uZWN0b3IpO1xuXG4gY29uc29sZS5sb2coXCJ0ZXN0ZXNcIiwgdGVzdCBpbnN0YW5jZW9mIGdsb2JhbFR5cGUuTW9kZWwpXG5cblxuXG5cbmNvbnN0IERBVEFfVFlQRVMgPSBbXG4gIFwiRGF0ZVRpbWVcIixcbiAgXCJCb29sZWFuXCIsXG4gIFwiU3RyaW5nXCIsXG4gIFwiRG91YmxlXCIsXG4gIFwiTG9uZ1wiLFxuICBcIkludGVnZXJcIixcbiAgXCJEdXJhdGlvblwiXG5dO1xubGV0IHNlbnNvclR5cGVzID0ge1xuICAgIFRlbXBlcmF0dXJlOiB7XG4gICAgICBuYW1lOiBcIlRlbXBlcmF0dXJlXCIsXG4gICAgICB1bml0OiBcIsKwQ1wiLFxuICAgICAgZGF0YVR5cGU6IFwiRG91YmxlXCIsXG4gICAgICBtaW46IFwiMFwiLFxuICAgICAgbWF4OiBcIjMwXCJcbiAgICB9LFxuICAgIFN3aXRjaDoge1xuICAgICAgbmFtZTogXCJTd2l0Y2hcIixcbiAgICAgIHVuaXQ6IFwiUG93ZXJcIixcbiAgICAgIGRhdGFUeXBlOiBcIkJvb2xlYW5cIixcbiAgICAgIG1pbjogXCIwXCIsXG4gICAgICBtYXg6IFwiMlwiXG4gICAgfVxuICB9LFxuICBzZW5zb3JLZXlzID0gW1wiVGVtcGVyYXR1cmVcIiwgXCJTd2l0Y2hcIl07XG5cbi8vIGNzdlxuLy8gICAuZnJvbVBhdGgoJ3NlbnNvclRlbXBsYXRlcy5jc3YnLCB7XG4vLyAgICAgZGVsaW1pdGVyOiAnLCdcbi8vICAgfSlcbi8vICAgLm9uKFwiZGF0YVwiLCBmdW5jdGlvbihkYXRhKSB7XG4vLyAgICAgbGV0IHMgPSB7XG4vLyAgICAgICBuYW1lOiBkYXRhWzBdLFxuLy8gICAgICAgdW5pdDogZGF0YVsxXSxcbi8vICAgICAgIGRhdGFUeXBlOiBkYXRhWzJdXG4vLyAgICAgfVxuXG4vLyAgICAgcy5taW4gPSB0eXBlb2YgZGF0YVszXSAhPSBcInVuZGVmaW5lZFwiID8gZGF0YVszXSA6IHVuZGVmaW5lZDtcbi8vICAgICBzLm1heCA9IHR5cGVvZiBkYXRhWzRdICE9IFwidW5kZWZpbmVkXCIgPyBkYXRhWzRdIDogdW5kZWZpbmVkO1xuXG4vLyAgICAgc2Vuc29yVHlwZXNbcy5uYW1lXSA9IHNcbi8vICAgICBzZW5zb3JLZXlzLnB1c2gocy5uYW1lKTtcbi8vICAgfSk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUZha2VDb250YWluZXIoaW5kZXgsIHRvdGFsRW5kcG9pbnRzKSB7XG4gIGxldCBlbmRwb2ludHMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRvdGFsRW5kcG9pbnRzOyBpKyspIHtcbiAgICBlbmRwb2ludHMucHVzaChjcmVhdGVGYWtlRW5kcG9pbnQoaW5kZXgsIGkpKTtcbiAgfVxuXG4gIGxldCBkZXZpY2UgPSBuZXcgU3BpbmFsRGV2aWNlKFwiRGV2aWNlIFwiICsgaW5kZXgsIFwiRGV2aWNlLVwiICsgaW5kZXgpO1xuXG4gIHJldHVybiB7XG4gICAgZGV2aWNlOiBkZXZpY2UsXG4gICAgZW5kcG9pbnRzOiBlbmRwb2ludHNcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRmFrZUVuZHBvaW50KGRldmljZUluZGV4LCBpbmRleCkge1xuICB2YXIgbnVtID0gcGFyc2VJbnQoXCJcIiArIGRldmljZUluZGV4ICsgaW5kZXgpO1xuXG4gIGxldCBzZW5zb3JUeXBlID0gc2Vuc29yVHlwZXNbc2Vuc29yS2V5c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyICsgMCldXTtcblxuICBsZXQgZW5kcG9pbnQgPSBuZXcgU3BpbmFsRW5kcG9pbnQoXG4gICAgXCJFbmRwb2ludCBcIiArIGRldmljZUluZGV4ICsgXCJfXCIgKyBpbmRleCxcbiAgICBcIkVuZHBvaW50LVwiICsgZGV2aWNlSW5kZXggKyBcIl9cIiArIGluZGV4ICsgXCJfXCIgKyBzZW5zb3JUeXBlLm5hbWUsXG4gICAgcGFyc2VWYWx1ZShcbiAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHNlbnNvclR5cGUubWF4ICsgc2Vuc29yVHlwZS5taW4pLFxuICAgICAgc2Vuc29yVHlwZS5kYXRhVHlwZVxuICAgICksXG4gICAgc2Vuc29yVHlwZS51bml0LFxuICAgIHNlbnNvclR5cGUuZGF0YVR5cGVcbiAgKTtcblxuICByZXR1cm4gZW5kcG9pbnQ7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZha2VWYWx1ZXMoZW5kcG9pbnRJZHMpIHtcbiAgbGV0IGVuZHBvaW50T2JqcyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZW5kcG9pbnRJZHMubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgc2Vuc29yVHlwZSA9IHNlbnNvclR5cGVzW2VuZHBvaW50SWRzW2ldLnNwbGl0KFwiX1wiKVsyXV07XG5cbiAgICBsZXQgdmFsID0gcGFyc2VWYWx1ZShcbiAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHNlbnNvclR5cGUubWF4ICsgc2Vuc29yVHlwZS5taW4pLFxuICAgICAgc2Vuc29yVHlwZS5kYXRhVHlwZVxuICAgICk7XG5cbiAgICBlbmRwb2ludE9ianMucHVzaCh7XG4gICAgICBwYXRoOiBlbmRwb2ludElkc1tpXSxcbiAgICAgIHZhbHVlOiB2YWxcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBlbmRwb2ludE9ianM7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVmFsdWUodmFsdWUsIGRhdGFUeXBlKSB7XG4gIGlmIChkYXRhVHlwZSA9PSBEQVRBX1RZUEVTW1wiQm9vbGVhblwiXSkgcmV0dXJuIHZhbHVlID09IFwiVHJ1ZVwiO1xuXG4gIGlmIChkYXRhVHlwZSA9PSBEQVRBX1RZUEVTW1wiTG9uZ1wiXSB8fCBkYXRhVHlwZSA9PSBEQVRBX1RZUEVTW1wiRG91YmxlXCJdKVxuICAgIGlmICh2YWx1ZSA9PSBudWxsKSB2YWx1ZSA9IDA7XG4gIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKTtcblxuICBpZiAoZGF0YVR5cGUgPT0gREFUQV9UWVBFU1tcIkludGVnZXJcIl0pIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkgdmFsdWUgPSAwO1xuICAgIHJldHVybiBwYXJzZUludCh2YWx1ZSk7XG4gIH1cblxuICBpZiAodmFsdWUgPT0gbnVsbCkgdmFsdWUgPSBcIm51bGxcIjtcbiAgcmV0dXJuIHZhbHVlO1xufVxuIl19