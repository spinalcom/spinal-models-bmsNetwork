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

_spinalCoreConnectorjs.default.register_models([SpinalNetwork]);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxOZXR3b3JrLmpzIl0sIm5hbWVzIjpbImdsb2JhbFR5cGUiLCJ3aW5kb3ciLCJnbG9iYWwiLCJTcGluYWxOZXR3b3JrIiwiTW9kZWwiLCJjb25zdHJ1Y3RvciIsInNldHRpbmdzIiwiRmlsZVN5c3RlbSIsIl9zaWdfc2VydmVyIiwiYWRkX2F0dHIiLCJpZCIsIm5hbWUiLCJuZXR3b3JrTmFtZSIsInR5cGUiLCJob3N0IiwidXNlciIsInBhc3N3b3JkIiwib3B0aW9ucyIsIlB0ciIsImNvbm5lY3QiLCJkaXNjb25uZWN0IiwiZGlzY292ZXIiLCJQcm9taXNlIiwicmVzIiwicmVqIiwibG9hZCIsImVsIiwiY29udGFpbmVycyIsInRvdGFsIiwidmlydHVhbERldmljZXMiLCJnZXQiLCJpIiwicHVzaCIsImNyZWF0ZUZha2VDb250YWluZXIiLCJlbmRwb2ludHNQZXJEZXZpY2UiLCJyZWFkIiwid3JpdGUiLCJlbmRwb2ludElkIiwiZ2V0RGV2aWNlIiwiZGV2aWNlSWQiLCJnZXRFbmRwb2ludCIsInN1YnNjcmliZSIsImVuZHBvbnRJZHMiLCJjYWxsYmFjayIsInNldEludGVydmFsIiwiY3JlYXRlRmFrZVZhbHVlcyIsInVwZGF0ZUludGVydmFsIiwidW5zdWJzY3JpYmUiLCJlbmRwb2ludExpc3QiLCJzcGluYWxDb3JlIiwicmVnaXN0ZXJfbW9kZWxzIiwibW9kdWxlIiwiZXhwb3J0cyIsIm5ldHdvcmtDb25uZWN0b3IiLCJhcHBOYW1lIiwicGF0aCIsIkRBVEFfVFlQRVMiLCJzZW5zb3JUeXBlcyIsIlRlbXBlcmF0dXJlIiwidW5pdCIsImRhdGFUeXBlIiwibWluIiwibWF4IiwiU3dpdGNoIiwic2Vuc29yS2V5cyIsImluZGV4IiwidG90YWxFbmRwb2ludHMiLCJlbmRwb2ludHMiLCJjcmVhdGVGYWtlRW5kcG9pbnQiLCJkZXZpY2UiLCJTcGluYWxEZXZpY2UiLCJkZXZpY2VJbmRleCIsIm51bSIsInBhcnNlSW50Iiwic2Vuc29yVHlwZSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImVuZHBvaW50IiwiU3BpbmFsRW5kcG9pbnQiLCJwYXJzZVZhbHVlIiwiZW5kcG9pbnRJZHMiLCJlbmRwb2ludE9ianMiLCJsZW5ndGgiLCJzcGxpdCIsInZhbCIsInZhbHVlIiwicGFyc2VGbG9hdCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFHQTs7QUFDQTs7OztBQUhBLE1BQU1BLFVBQVUsR0FBRyxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQyxNQUFoQyxHQUF5Q0QsTUFBNUQ7O0FBS0E7QUFFQSxNQUFNRSxhQUFOLFNBQTRCSCxVQUFVLENBQUNJLEtBQXZDLENBQTZDO0FBQzNDOzs7Ozs7Ozs7OztBQVdBQyxFQUFBQSxXQUFXLENBQUNDLFFBQUQsRUFBVztBQUNwQjs7QUFFQSxRQUFJQyxVQUFVLENBQUNDLFdBQWYsRUFBNEI7QUFDMUIsV0FBS0MsUUFBTCxDQUFjO0FBQ1pDLFFBQUFBLEVBQUUsRUFBRSxxQkFBSyxLQUFLTCxXQUFMLENBQWlCTSxJQUF0QixDQURRO0FBRVpBLFFBQUFBLElBQUksRUFDRixPQUFPTCxRQUFRLENBQUNNLFdBQWhCLElBQStCLFdBQS9CLEdBQ0lOLFFBQVEsQ0FBQ00sV0FEYixHQUVJLGdCQUxNO0FBTVpDLFFBQUFBLElBQUksRUFBRSxPQUFPUCxRQUFRLENBQUNPLElBQWhCLElBQXdCLFdBQXhCLEdBQXNDUCxRQUFRLENBQUNPLElBQS9DLEdBQXNELEVBTmhEO0FBT1pDLFFBQUFBLElBQUksRUFBRSxPQUFPUixRQUFRLENBQUNRLElBQWhCLElBQXdCLFdBQXhCLEdBQXNDUixRQUFRLENBQUNRLElBQS9DLEdBQXNELEVBUGhEO0FBUVpDLFFBQUFBLElBQUksRUFBRSxPQUFPVCxRQUFRLENBQUNTLElBQWhCLElBQXdCLFdBQXhCLEdBQXNDVCxRQUFRLENBQUNTLElBQS9DLEdBQXNELEVBUmhEO0FBU1pDLFFBQUFBLFFBQVEsRUFDTixPQUFPVixRQUFRLENBQUNVLFFBQWhCLElBQTRCLFdBQTVCLEdB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QUNsRCxDQUFELENBREQ7QUFFaEJ1RCxNQUFBQSxLQUFLLEVBQUVEO0FBRlMsS0FBbEI7QUFJRDs7QUFFRCxTQUFPSCxZQUFQO0FBQ0Q7O0FBRUQsU0FBU0YsVUFBVCxDQUFvQk0sS0FBcEIsRUFBMkIxQixRQUEzQixFQUFxQztBQUNuQyxNQUFJQSxRQUFRLElBQUlKLFVBQVUsQ0FBQyxTQUFELENBQTFCLEVBQXVDLE9BQU84QixLQUFLLElBQUksTUFBaEI7QUFFdkMsTUFBSTFCLFFBQVEsSUFBSUosVUFBVSxDQUFDLE1BQUQsQ0FBdEIsSUFBa0NJLFFBQVEsSUFBSUosVUFBVSxDQUFDLFFBQUQsQ0FBNUQsRUFDRSxJQUFJOEIsS0FBSyxJQUFJLElBQWIsRUFBbUJBLEtBQUssR0FBRyxDQUFSO0FBQ3JCLFNBQU9DLFVBQVUsQ0FBQ0QsS0FBRCxDQUFqQjs7QUFFQSxNQUFJMUIsUUFBUSxJQUFJSixVQUFVLENBQUMsU0FBRCxDQUExQixFQUF1QztBQUNyQyxRQUFJOEIsS0FBSyxJQUFJLElBQWIsRUFBbUJBLEtBQUssR0FBRyxDQUFSO0FBQ25CLFdBQU9iLFFBQVEsQ0FBQ2EsS0FBRCxDQUFmO0FBQ0Q7O0FBRUQsTUFBSUEsS0FBSyxJQUFJLElBQWIsRUFBbUJBLEtBQUssR0FBRyxNQUFSO0FBQ25CLFNBQU9BLEtBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzcGluYWxDb3JlIGZyb20gXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc1wiO1xuaW1wb3J0IHsgcHJvbWlzZUxvYWQsIGd1aWQgfSBmcm9tIFwiLi9VdGlsaXRpZXNcIjtcbmNvbnN0IGdsb2JhbFR5cGUgPSB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogd2luZG93O1xuXG5pbXBvcnQgU3BpbmFsRGV2aWNlIGZyb20gXCIuL1NwaW5hbERldmljZVwiO1xuaW1wb3J0IFNwaW5hbEVuZHBvaW50IGZyb20gXCIuL1NwaW5hbEVuZHBvaW50XCI7XG5cbi8vIHZhciBjc3YgPSByZXF1aXJlKFwiZmFzdC1jc3ZcIik7XG5cbmNsYXNzIFNwaW5hbE5ldHdvcmsgZXh0ZW5kcyBnbG9iYWxUeXBlLk1vZGVsIHtcbiAgLyoqXG4gICAqQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTcGluYWxOZXR3b3JrLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW19uYW1lPVwiXCJdXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbdHlwZT1cIlwiXVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2hvc3Q9XCJcIl1cbiAgICogQHBhcmFtIHtzdHJpbmd9IFt1c2VyPVwiXCJdXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbcGFzc3dvcmQ9XCJcIl1cbiAgICogQHBhcmFtIHtQdHJ9IFtvcHRpb25zPW5ldyBNb2RlbF0gLSBtb2RfYXR0ciB0byBjaGFuZ2UgaXRcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtuYW1lPVwiU3BpbmFsTmV0d29ya1wiXVxuICAgKiBAbWVtYmVyb2YgU3BpbmFsTmV0d29ya1xuICAgKi9cbiAgY29uc3RydWN0b3Ioc2V0dGluZ3MpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgaWYgKEZpbGVTeXN0ZW0uX3NpZ19zZXJ2ZXIpIHtcbiAgICAgIHRoaXMuYWRkX2F0dHIoe1xuICAgICAgICBpZDogZ3VpZCh0aGlzLmNvbnN0cnVjdG9yLm5hbWUpLFxuICAgICAgICBuYW1lOlxuICAgICAgICAgIHR5cGVvZiBzZXR0aW5ncy5uZXR3b3JrTmFtZSAhPSBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgICA/IHNldHRpbmdzLm5ldHdvcmtOYW1lXG4gICAgICAgICAgICA6IFwidmlydHVhbE5ldHdvcmtcIixcbiAgICAgICAgdHlwZTogdHlwZW9mIHNldHRpbmdzLnR5cGUgIT0gXCJ1bmRlZmluZWRcIiA/IHNldHRpbmdzLnR5cGUgOiBcIlwiLFxuICAgICAgICBob3N0OiB0eXBlb2Ygc2V0dGluZ3MuaG9zdCAhPSBcInVuZGVmaW5lZFwiID8gc2V0dGluZ3MuaG9zdCA6IFwiXCIsXG4gICAgICAgIHVzZXI6IHR5cGVvZiBzZXR0aW5ncy51c2VyICE9IFwidW5kZWZpbmVkXCIgPyBzZXR0aW5ncy51c2VyIDogXCJcIixcbiAgICAgICAgcGFzc3dvcmQ6XG4gICAgICAgICAgdHlwZW9mIHNldHRpbmdzLnBhc3N3b3JkICE9IFwidW5kZWZpbmVkXCIgPyBzZXR0aW5ncy5wYXNzd29yZCA6IFwiXCIsXG4gICAgICAgIG9wdGlvbnM6IG5ldyBnbG9iYWxUeXBlLlB0cihuZXcgTW9kZWwoc2V0dGluZ3MpKVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbm5lY3RzIHRvIHRoZSBuZXR3b3JrIGlmIGl0J3MgbmVjZXNzYXJ5IHRvIGhhdmUgYSBwZXJzaXN0ZW50IHNlc3Npb25cbiAgICogQG1lbWJlcm9mIFNwaW5hbE5ldHdvcmtcbiAgICovXG4gIGNvbm5lY3QoKSB7fVxuXG4gIC8qKlxuICAgKiBEaXNjb25uZWN0cyBvZiB0aGUgbmV0d29yayBpZiBwcmV2aW91c2x5IHNpZ25lZCBpblxuICAgKiBAbWVtYmVyb2YgU3BpbmFsTmV0d29ya1xuICAgKi9cbiAgZGlzY29ubmVjdCgpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBjb250YWluZXIgb2YgU3BpbmFsRGV2aWNlcyBhbmQgU3BpbmFsRW5kcG9pbnRzXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAgICogQG1lbWJlcm9mIFNwaW5hbE5ldHdvcmtcbiAgICovXG4gIGRpc2NvdmVyKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgICB0aGlzLm9wdGlvbnMubG9hZChlbCA9PiB7XG4gICAgICAgIGxldCBjb250YWluZXJzID0gW107XG4gICAgICAgIGxldCB0b3RhbCA9IGVsLnZpcnR1YWxEZXZpY2VzLmdldCgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRvdGFsOyBpKyspXG4gICAgICAgICAgY29udGFpbmVycy5wdXNoKGNyZWF0ZUZha2VDb250YWluZXIoaSwgZWwuZW5kcG9pbnRzUGVyRGV2aWNlKSk7XG5cbiAgICAgICAgcmVzKGNvbnRhaW5lcnMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVhZHMgdGhlIHZhbHVlIG9mIGFuIGVuZHBvaW50XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZW5kcG9pbnRJZF1cbiAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICAgKiBAbWVtYmVyb2YgU3BpbmFsTmV0d29ya1xuICAgKi9cbiAgcmVhZCgpIHt9XG5cbiAgLyoqXG4gICAqIFdyaXRlcyB0aGUgdmFsdWUgdG8gYW4gZW5kcG9pbnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtlbmRwb2ludElkXVxuICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gICAqIEBtZW1iZXJvZiBTcGluYWxOZXR3b3JrXG4gICAqL1xuICB3cml0ZShlbmRwb2ludElkLCBvcHRpb25zKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgU3BpbmFsRGV2aWNlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZGV2aWNlSWRdXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAgICogQG1lbWJlcm9mIFNwaW5hbE5ldHdvcmtcbiAgICovXG4gIGdldERldmljZShkZXZpY2VJZCwgb3B0aW9ucykge31cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBTcGluYWxFbmRwb2ludFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2VuZHBvaW50SWRdXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAgICogQG1lbWJlcm9mIFNwaW5hbE5ldHdvcmtcbiAgICovXG4gIGdldEVuZHBvaW50KGVuZHBvaW50SWQsIG9wdGlvbnMpIHt9XG5cbiAgLyoqXG4gICAqIEludm9jZXMgYSBjYWxsYmFjayB3aGVuIG5ldyBldmVudHMgYXJyaXZlXG4gICAqIEBwYXJhbSB7YXJyYXl9IFtlbmRwb2ludExpc3RdXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAgICogQG1lbWJlcm9mIFNwaW5hbE5ldHdvcmtcbiAgICovXG4gIHN1YnNjcmliZShlbmRwb250SWRzLCBjYWxsYmFjaykge1xuICAgIC8vIFRPRE86IGZyb20gZW5kcG9pbnRMaXN0IGdlbmVyYXRlIGVuZHBvaW50cyB3aXRoIElkIGFuZCBWYWx1ZVxuICAgIHRoaXMub3B0aW9ucy5sb2FkKGVsID0+IHtcbiAgICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgY2FsbGJhY2soY3JlYXRlRmFrZVZhbHVlcyhlbmRwb250SWRzKSk7XG4gICAgICB9LCBlbC51cGRhdGVJbnRlcnZhbCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2FuY2VscyBub3RpZmljYXRpb24gb2YgbmV3IGV2ZW50c1xuICAgKiBAcGFyYW0ge2FycmF5fSBbZW5kcG9pbnRMaXN0XVxuICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gICAqIEBtZW1iZXJvZiBTcGluYWxOZXR3b3JrXG4gICAqL1xuICB1bnN1YnNjcmliZShlbmRwb2ludExpc3QsIG9wdGlvbnMpIHt9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtTcGluYWxOZXR3b3JrXSk7XG5tb2R1bGUuZXhwb3J0cyA9IFNwaW5hbE5ldHdvcms7XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBGQUtFIFNQRUNJRklDIEZVTkNUSU9OUyAtIE5PVCBQQVJUIE9GIFRIRSBMSUIgKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbnZhciBuZXR3b3JrQ29ubmVjdG9yID0ge1xuICBuZXR3b3JrTmFtZTogXCJWaXJ0dWFsTmV0d29ya1wiLFxuICBhcHBOYW1lOiBcIlZpcnR1YWxOZXR3b3JrQ29udGV4dFwiLFxuICB0eXBlOiBcIk15RmFrZVByb3RvY29sXCIsXG4gIHBhdGg6IFwiL1ZpcnR1YWxOZXR3b3JrXCIsXG4gIHZpcnR1YWxEZXZpY2VzOiA1LFxuICBlbmRwb2ludHNQZXJEZXZpY2U6IDMsXG4gIHVwZGF0ZUludGVydmFsOiAxMDAwXG59O1xuXG5jb25zdCBEQVRBX1RZUEVTID0gW1xuICBcIkRhdGVUaW1lXCIsXG4gIFwiQm9vbGVhblwiLFxuICBcIlN0cmluZ1wiLFxuICBcIkRvdWJsZVwiLFxuICBcIkxvbmdcIixcbiAgXCJJbnRlZ2VyXCIsXG4gIFwiRHVyYXRpb25cIlxuXTtcbmxldCBzZW5zb3JUeXBlcyA9IHtcbiAgICBUZW1wZXJhdHVyZToge1xuICAgICAgbmFtZTogXCJUZW1wZXJhdHVyZVwiLFxuICAgICAgdW5pdDogXCLCsENcIixcbiAgICAgIGRhdGFUeXBlOiBcIkRvdWJsZVwiLFxuICAgICAgbWluOiBcIjBcIixcbiAgICAgIG1heDogXCIzMFwiXG4gICAgfSxcbiAgICBTd2l0Y2g6IHtcbiAgICAgIG5hbWU6IFwiU3dpdGNoXCIsXG4gICAgICB1bml0OiBcIlBvd2VyXCIsXG4gICAgICBkYXRhVHlwZTogXCJCb29sZWFuXCIsXG4gICAgICBtaW46IFwiMFwiLFxuICAgICAgbWF4OiBcIjJcIlxuICAgIH1cbiAgfSxcbiAgc2Vuc29yS2V5cyA9IFtcIlRlbXBlcmF0dXJlXCIsIFwiU3dpdGNoXCJdO1xuXG4vLyBjc3Zcbi8vICAgLmZyb21QYXRoKCdzZW5zb3JUZW1wbGF0ZXMuY3N2Jywge1xuLy8gICAgIGRlbGltaXRlcjogJywnXG4vLyAgIH0pXG4vLyAgIC5vbihcImRhdGFcIiwgZnVuY3Rpb24oZGF0YSkge1xuLy8gICAgIGxldCBzID0ge1xuLy8gICAgICAgbmFtZTogZGF0YVswXSxcbi8vICAgICAgIHVuaXQ6IGRhdGFbMV0sXG4vLyAgICAgICBkYXRhVHlwZTogZGF0YVsyXVxuLy8gICAgIH1cblxuLy8gICAgIHMubWluID0gdHlwZW9mIGRhdGFbM10gIT0gXCJ1bmRlZmluZWRcIiA/IGRhdGFbM10gOiB1bmRlZmluZWQ7XG4vLyAgICAgcy5tYXggPSB0eXBlb2YgZGF0YVs0XSAhPSBcInVuZGVmaW5lZFwiID8gZGF0YVs0XSA6IHVuZGVmaW5lZDtcblxuLy8gICAgIHNlbnNvclR5cGVzW3MubmFtZV0gPSBzXG4vLyAgICAgc2Vuc29yS2V5cy5wdXNoKHMubmFtZSk7XG4vLyAgIH0pO1xuXG5mdW5jdGlvbiBjcmVhdGVGYWtlQ29udGFpbmVyKGluZGV4LCB0b3RhbEVuZHBvaW50cykge1xuICBsZXQgZW5kcG9pbnRzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b3RhbEVuZHBvaW50czsgaSsrKSB7XG4gICAgZW5kcG9pbnRzLnB1c2goY3JlYXRlRmFrZUVuZHBvaW50KGluZGV4LCBpKSk7XG4gIH1cblxuICBsZXQgZGV2aWNlID0gbmV3IFNwaW5hbERldmljZShcIkRldmljZSBcIiArIGluZGV4LCBcIkRldmljZS1cIiArIGluZGV4KTtcblxuICByZXR1cm4ge1xuICAgIGRldmljZTogZGV2aWNlLFxuICAgIGVuZHBvaW50czogZW5kcG9pbnRzXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZha2VFbmRwb2ludChkZXZpY2VJbmRleCwgaW5kZXgpIHtcbiAgdmFyIG51bSA9IHBhcnNlSW50KFwiXCIgKyBkZXZpY2VJbmRleCArIGluZGV4KTtcblxuICBsZXQgc2Vuc29yVHlwZSA9IHNlbnNvclR5cGVzW3NlbnNvcktleXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMiArIDApXV07XG5cbiAgbGV0IGVuZHBvaW50ID0gbmV3IFNwaW5hbEVuZHBvaW50KFxuICAgIFwiRW5kcG9pbnQgXCIgKyBkZXZpY2VJbmRleCArIFwiX1wiICsgaW5kZXgsXG4gICAgXCJFbmRwb2ludC1cIiArIGRldmljZUluZGV4ICsgXCJfXCIgKyBpbmRleCArIFwiX1wiICsgc2Vuc29yVHlwZS5uYW1lLFxuICAgIHBhcnNlVmFsdWUoXG4gICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzZW5zb3JUeXBlLm1heCArIHNlbnNvclR5cGUubWluKSxcbiAgICAgIHNlbnNvclR5cGUuZGF0YVR5cGVcbiAgICApLFxuICAgIHNlbnNvclR5cGUudW5pdCxcbiAgICBzZW5zb3JUeXBlLmRhdGFUeXBlXG4gICk7XG5cbiAgcmV0dXJuIGVuZHBvaW50O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGYWtlVmFsdWVzKGVuZHBvaW50SWRzKSB7XG4gIGxldCBlbmRwb2ludE9ianMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGVuZHBvaW50SWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IHNlbnNvclR5cGUgPSBzZW5zb3JUeXBlc1tlbmRwb2ludElkc1tpXS5zcGxpdChcIl9cIilbMl1dO1xuXG4gICAgbGV0IHZhbCA9IHBhcnNlVmFsdWUoXG4gICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzZW5zb3JUeXBlLm1heCArIHNlbnNvclR5cGUubWluKSxcbiAgICAgIHNlbnNvclR5cGUuZGF0YVR5cGVcbiAgICApO1xuXG4gICAgZW5kcG9pbnRPYmpzLnB1c2goe1xuICAgICAgcGF0aDogZW5kcG9pbnRJZHNbaV0sXG4gICAgICB2YWx1ZTogdmFsXG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gZW5kcG9pbnRPYmpzO1xufVxuXG5mdW5jdGlvbiBwYXJzZVZhbHVlKHZhbHVlLCBkYXRhVHlwZSkge1xuICBpZiAoZGF0YVR5cGUgPT0gREFUQV9UWVBFU1tcIkJvb2xlYW5cIl0pIHJldHVybiB2YWx1ZSA9PSBcIlRydWVcIjtcblxuICBpZiAoZGF0YVR5cGUgPT0gREFUQV9UWVBFU1tcIkxvbmdcIl0gfHwgZGF0YVR5cGUgPT0gREFUQV9UWVBFU1tcIkRvdWJsZVwiXSlcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkgdmFsdWUgPSAwO1xuICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSk7XG5cbiAgaWYgKGRhdGFUeXBlID09IERBVEFfVFlQRVNbXCJJbnRlZ2VyXCJdKSB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpIHZhbHVlID0gMDtcbiAgICByZXR1cm4gcGFyc2VJbnQodmFsdWUpO1xuICB9XG5cbiAgaWYgKHZhbHVlID09IG51bGwpIHZhbHVlID0gXCJudWxsXCI7XG4gIHJldHVybiB2YWx1ZTtcbn1cbiJdfQ==