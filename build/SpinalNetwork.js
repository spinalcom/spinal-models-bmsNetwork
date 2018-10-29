"use strict";

var _Utilities = require("./Utilities");

var _SpinalDevice = require("./SpinalDevice");

var _SpinalDevice2 = _interopRequireDefault(_SpinalDevice);

var _SpinalEndpoint = require("./SpinalEndpoint");

var _SpinalEndpoint2 = _interopRequireDefault(_SpinalEndpoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;

var csv = require("fast-csv");

/**
 *
 *
 * @class SpinalNetwork
 * @extends {globalType.Model}
 */
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
        id: _Utilities.Utilities.guid(this.constructor.name),
        name: typeof settings.networkName != "undefined" ? settings.networkName : 'virtualNetwork',
        type: typeof settings.type != "undefined" ? settings.type : '',
        host: typeof settings.host != "undefined" ? settings.host : '',
        user: typeof settings.user != "undefined" ? settings.user : '',
        password: typeof settings.password != "undefined" ? settings.password : '',
        options: new Model(settings)
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

    let total = this.options.virtualDevices;

    return new Promise((res, rej) => {

      let containers = [];

      for (var i = 0; i < total; i++) containers.push(createFakeContainer(i, this.options.endpointsPerDevice));

      res(containers);
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

spinalCore.register_models([SpinalNetwork]);
module.exports = SpinalNetwork;

/*************************************************
 * FAKE SPECIFIC FUNCTIONS - NOT PART OF THE LIB *
 *************************************************/

const DATA_TYPES = ['DateTime', 'Boolean', 'String', 'Double', 'Long', 'Integer', 'Duration'];
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

  let device = new _SpinalDevice2.default('Device ' + index, 'Device-' + index);

  return {
    device: device,
    endpoints: endpoints
  };
}

function createFakeEndpoint(deviceIndex, index) {
  var num = parseInt('' + deviceIndex + index);

  let sensorType = sensorTypes[sensorKeys[Math.floor(Math.random() * 2 + 0)]];

  let endpoint = new _SpinalEndpoint2.default('Endpoint ' + deviceIndex + '_' + index, 'Endpoint-' + deviceIndex + '_' + index + '_' + sensorType.name, parseValue(Math.floor(Math.random() * sensorType.max + sensorType.min), sensorType.dataType), sensorType.unit, sensorType.dataType);

  return endpoint;
}

function createFakeValues(endpointIds) {

  let endpointObjs = [];

  for (var i = 0; i < endpointIds.length; i++) {

    let sensorType = sensorTypes[endpointIds[i].split('_')[2]];

    let val = parseValue(Math.floor(Math.random() * sensorType.max + sensorType.min), sensorType.dataType);

    endpointObjs.push({
      path: endpointIds[i],
      value: val
    });
  }

  return endpointObjs;
}

function parseValue(value, dataType) {
  if (dataType == DATA_TYPES['Boolean']) return value == 'True';

  if (dataType == DATA_TYPES['Long'] || dataType == DATA_TYPES['Double']) if (value == null) value = 0;
  return parseFloat(value);

  if (dataType == DATA_TYPES['Integer']) {
    if (value == null) value = 0;
    return parseInt(value);
  }

  if (value == null) value = "null";
  return value;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxOZXR3b3JrLmpzIl0sIm5hbWVzIjpbInNwaW5hbENvcmUiLCJyZXF1aXJlIiwiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsImNzdiIsIlNwaW5hbE5ldHdvcmsiLCJNb2RlbCIsImNvbnN0cnVjdG9yIiwic2V0dGluZ3MiLCJGaWxlU3lzdGVtIiwiX3NpZ19zZXJ2ZXIiLCJhZGRfYXR0ciIsImlkIiwiVXRpbGl0aWVzIiwiZ3VpZCIsIm5hbWUiLCJuZXR3b3JrTmFtZSIsInR5cGUiLCJob3N0IiwidXNlciIsInBhc3N3b3JkIiwib3B0aW9ucyIsImNvbm5lY3QiLCJkaXNjb25uZWN0IiwiZGlzY292ZXIiLCJ0b3RhbCIsInZpcnR1YWxEZXZpY2VzIiwiUHJvbWlzZSIsInJlcyIsInJlaiIsImNvbnRhaW5lcnMiLCJpIiwicHVzaCIsImNyZWF0ZUZha2VDb250YWluZXIiLCJlbmRwb2ludHNQZXJEZXZpY2UiLCJyZWFkIiwid3JpdGUiLCJlbmRwb2ludElkIiwiZ2V0RGV2aWNlIiwiZGV2aWNlSWQiLCJnZXRFbmRwb2ludCIsInN1YnNjcmliZSIsImVuZHBvbnRJZHMiLCJjYWxsYmFjayIsInNldEludGVydmFsIiwiY3JlYXRlRmFrZVZhbHVlcyIsInVwZGF0ZUludGVydmFsIiwidW5zdWJzY3JpYmUiLCJlbmRwb2ludExpc3QiLCJyZWdpc3Rlcl9tb2RlbHMiLCJtb2R1bGUiLCJleHBvcnRzIiwiREFUQV9UWVBFUyIsInNlbnNvclR5cGVzIiwiVGVtcGVyYXR1cmUiLCJ1bml0IiwiZGF0YVR5cGUiLCJtaW4iLCJtYXgiLCJTd2l0Y2giLCJzZW5zb3JLZXlzIiwiaW5kZXgiLCJ0b3RhbEVuZHBvaW50cyIsImVuZHBvaW50cyIsImNyZWF0ZUZha2VFbmRwb2ludCIsImRldmljZSIsIlNwaW5hbERldmljZSIsImRldmljZUluZGV4IiwibnVtIiwicGFyc2VJbnQiLCJzZW5zb3JUeXBlIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZW5kcG9pbnQiLCJTcGluYWxFbmRwb2ludCIsInBhcnNlVmFsdWUiLCJlbmRwb2ludElkcyIsImVuZHBvaW50T2JqcyIsImxlbmd0aCIsInNwbGl0IiwidmFsIiwicGF0aCIsInZhbHVlIiwicGFyc2VGbG9hdCJdLCJtYXBwaW5ncyI6Ijs7QUFHQTs7QUFJQTs7OztBQUNBOzs7Ozs7QUFSQSxNQUFNQSxhQUFhQyxRQUFRLHlCQUFSLENBQW5CO0FBQ0EsTUFBTUMsYUFBYSxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQyxNQUFoQyxHQUF5Q0QsTUFBNUQ7O0FBU0EsSUFBSUUsTUFBTUosUUFBUSxVQUFSLENBQVY7O0FBRUE7Ozs7OztBQU1BLE1BQU1LLGFBQU4sU0FBNEJKLFdBQVdLLEtBQXZDLENBQTZDO0FBQzNDOzs7Ozs7Ozs7OztBQVdBQyxjQUFZQyxRQUFaLEVBQXNCO0FBQ3BCOztBQUVBLFFBQUlDLFdBQVdDLFdBQWYsRUFBNEI7QUFDMUIsV0FBS0MsUUFBTCxDQUFjO0FBQ1pDLFlBQUlDLHFCQUFVQyxJQUFWLENBQWUsS0FBS1AsV0FBTCxDQUFpQlEsSUFBaEMsQ0FEUTtBQUVaQSxjQUFNLE9BQU9QLFNBQVNRLFdBQWhCLElBQStCLFdBQS9CLEdBQTZDUixTQUFTUSxXQUF0RCxHQUFvRSxnQkFGOUQ7QUFHWkMsY0FBTSxPQUFPVCxTQUFTUyxJQUFoQixJQUF3QixXQUF4QixHQUFzQ1QsU0FBU1MsSUFBL0MsR0FBc0QsRUFIaEQ7QUFJWkMsY0FBTSxPQUFPVixTQUFTVSxJQUFoQixJQUF3QixXQUF4QixHQUFzQ1YsU0FBU1UsSUFBL0MsR0FBc0QsRUFKaEQ7QUFLWkMsY0FBTSxPQUFPWCxTQUFTVyxJQUFoQixJQUF3QixXQUF4QixHQUFzQ1gsU0FBU1csSUFBL0MsR0FBc0QsRUFMaEQ7QUFNWkMsa0JBQVUsT0FBT1osU0FBU1ksUUFBaEIsSUFBNEIsV0FBNUIsR0FBMENaLFNBQVNZLFFBQW5ELEdBQ1IsRUFQVTtBQVFaQyxpQkFBUyxJQUFJZixLQUFKLENBQVVFLFFBQVY7QUFSRyxP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SixXQUFXLFNBQVgsQ0FBaEIsRUFDRSxPQUFPK0IsU0FBUyxNQUFoQjs7QUFFRixNQUFJM0IsWUFBWUosV0FBVyxNQUFYLENBQVosSUFBa0NJLFlBQVlKLFdBQVcsUUFBWCxDQUFsRCxFQUNFLElBQUkrQixTQUFTLElBQWIsRUFDRUEsUUFBUSxDQUFSO0FBQ0osU0FBT0MsV0FBV0QsS0FBWCxDQUFQOztBQUVBLE1BQUkzQixZQUFZSixXQUFXLFNBQVgsQ0FBaEIsRUFBdUM7QUFDckMsUUFBSStCLFNBQVMsSUFBYixFQUNFQSxRQUFRLENBQVI7QUFDRixXQUFPZCxTQUFTYyxLQUFULENBQVA7QUFDRDs7QUFFRCxNQUFJQSxTQUFTLElBQWIsRUFDRUEsUUFBUSxNQUFSO0FBQ0YsU0FBT0EsS0FBUDtBQUNEIiwiZmlsZSI6IlNwaW5hbE5ldHdvcmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzcGluYWxDb3JlID0gcmVxdWlyZShcInNwaW5hbC1jb3JlLWNvbm5lY3RvcmpzXCIpO1xuY29uc3QgZ2xvYmFsVHlwZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3c7XG5cbmltcG9ydCB7XG4gIFV0aWxpdGllc1xufSBmcm9tIFwiLi9VdGlsaXRpZXNcIjtcblxuaW1wb3J0IFNwaW5hbERldmljZSBmcm9tIFwiLi9TcGluYWxEZXZpY2VcIjtcbmltcG9ydCBTcGluYWxFbmRwb2ludCBmcm9tIFwiLi9TcGluYWxFbmRwb2ludFwiO1xuXG52YXIgY3N2ID0gcmVxdWlyZShcImZhc3QtY3N2XCIpO1xuXG4vKipcbiAqXG4gKlxuICogQGNsYXNzIFNwaW5hbE5ldHdvcmtcbiAqIEBleHRlbmRzIHtnbG9iYWxUeXBlLk1vZGVsfVxuICovXG5jbGFzcyBTcGluYWxOZXR3b3JrIGV4dGVuZHMgZ2xvYmFsVHlwZS5Nb2RlbCB7XG4gIC8qKlxuICAgKkNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU3BpbmFsTmV0d29yay5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtfbmFtZT1cIlwiXVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3R5cGU9XCJcIl1cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtob3N0PVwiXCJdXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbdXNlcj1cIlwiXVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3Bhc3N3b3JkPVwiXCJdXG4gICAqIEBwYXJhbSB7UHRyfSBbb3B0aW9ucz1uZXcgTW9kZWxdIC0gbW9kX2F0dHIgdG8gY2hhbmdlIGl0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbbmFtZT1cIlNwaW5hbE5ldHdvcmtcIl1cbiAgICogQG1lbWJlcm9mIFNwaW5hbE5ldHdvcmtcbiAgICovXG4gIGNvbnN0cnVjdG9yKHNldHRpbmdzKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmIChGaWxlU3lzdGVtLl9zaWdfc2VydmVyKSB7XG4gICAgICB0aGlzLmFkZF9hdHRyKHtcbiAgICAgICAgaWQ6IFV0aWxpdGllcy5ndWlkKHRoaXMuY29uc3RydWN0b3IubmFtZSksXG4gICAgICAgIG5hbWU6IHR5cGVvZiBzZXR0aW5ncy5uZXR3b3JrTmFtZSAhPSBcInVuZGVmaW5lZFwiID8gc2V0dGluZ3MubmV0d29ya05hbWUgOiAndmlydHVhbE5ldHdvcmsnLFxuICAgICAgICB0eXBlOiB0eXBlb2Ygc2V0dGluZ3MudHlwZSAhPSBcInVuZGVmaW5lZFwiID8gc2V0dGluZ3MudHlwZSA6ICcnLFxuICAgICAgICBob3N0OiB0eXBlb2Ygc2V0dGluZ3MuaG9zdCAhPSBcInVuZGVmaW5lZFwiID8gc2V0dGluZ3MuaG9zdCA6ICcnLFxuICAgICAgICB1c2VyOiB0eXBlb2Ygc2V0dGluZ3MudXNlciAhPSBcInVuZGVmaW5lZFwiID8gc2V0dGluZ3MudXNlciA6ICcnLFxuICAgICAgICBwYXNzd29yZDogdHlwZW9mIHNldHRpbmdzLnBhc3N3b3JkICE9IFwidW5kZWZpbmVkXCIgPyBzZXR0aW5ncy5wYXNzd29yZCA6XG4gICAgICAgICAgJycsXG4gICAgICAgIG9wdGlvbnM6IG5ldyBNb2RlbChzZXR0aW5ncylcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb25uZWN0cyB0byB0aGUgbmV0d29yayBpZiBpdCdzIG5lY2Vzc2FyeSB0byBoYXZlIGEgcGVyc2lzdGVudCBzZXNzaW9uXG4gICAqIEBtZW1iZXJvZiBTcGluYWxOZXR3b3JrXG4gICAqL1xuICBjb25uZWN0KCkge1xuXG4gIH1cblxuICAvKipcbiAgICogRGlzY29ubmVjdHMgb2YgdGhlIG5ldHdvcmsgaWYgcHJldmlvdXNseSBzaWduZWQgaW5cbiAgICogQG1lbWJlcm9mIFNwaW5hbE5ldHdvcmtcbiAgICovXG4gIGRpc2Nvbm5lY3QoKSB7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgY29udGFpbmVyIG9mIFNwaW5hbERldmljZXMgYW5kIFNwaW5hbEVuZHBvaW50c1xuICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gICAqIEBtZW1iZXJvZiBTcGluYWxOZXR3b3JrXG4gICAqL1xuICBkaXNjb3ZlcihvcHRpb25zKSB7XG5cbiAgICBsZXQgdG90YWwgPSB0aGlzLm9wdGlvbnMudmlydHVhbERldmljZXNcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcblxuICAgICAgbGV0IGNvbnRhaW5lcnMgPSBbXVxuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRvdGFsOyBpKyspXG4gICAgICAgIGNvbnRhaW5lcnMucHVzaChjcmVhdGVGYWtlQ29udGFpbmVyKGksIHRoaXMub3B0aW9ucy5lbmRwb2ludHNQZXJEZXZpY2UpKVxuXG4gICAgICByZXMoY29udGFpbmVycylcblxuICAgIH0pXG5cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkcyB0aGUgdmFsdWUgb2YgYW4gZW5kcG9pbnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtlbmRwb2ludElkXVxuICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gICAqIEBtZW1iZXJvZiBTcGluYWxOZXR3b3JrXG4gICAqL1xuICByZWFkKCl7fVxuXG4gIC8qKlxuICAgKiBXcml0ZXMgdGhlIHZhbHVlIHRvIGFuIGVuZHBvaW50XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZW5kcG9pbnRJZF1cbiAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICAgKiBAbWVtYmVyb2YgU3BpbmFsTmV0d29ya1xuICAgKi9cbiAgd3JpdGUoZW5kcG9pbnRJZCwgb3B0aW9ucykge1xuXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIFNwaW5hbERldmljZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2RldmljZUlkXVxuICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gICAqIEBtZW1iZXJvZiBTcGluYWxOZXR3b3JrXG4gICAqL1xuICBnZXREZXZpY2UoZGV2aWNlSWQsIG9wdGlvbnMpIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gU3BpbmFsRW5kcG9pbnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtlbmRwb2ludElkXVxuICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gICAqIEBtZW1iZXJvZiBTcGluYWxOZXR3b3JrXG4gICAqL1xuICBnZXRFbmRwb2ludChlbmRwb2ludElkLCBvcHRpb25zKSB7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBJbnZvY2VzIGEgY2FsbGJhY2sgd2hlbiBuZXcgZXZlbnRzIGFycml2ZVxuICAgKiBAcGFyYW0ge2FycmF5fSBbZW5kcG9pbnRMaXN0XVxuICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gICAqIEBtZW1iZXJvZiBTcGluYWxOZXR3b3JrXG4gICAqL1xuICBzdWJzY3JpYmUoZW5kcG9udElkcywgY2FsbGJhY2ssIG9wdGlvbnMpIHtcblxuICAgIC8vIFRPRE86IGZyb20gZW5kcG9pbnRMaXN0IGdlbmVyYXRlIGVuZHBvaW50cyB3aXRoIElkIGFuZCBWYWx1ZVxuXG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgY2FsbGJhY2soY3JlYXRlRmFrZVZhbHVlcyhlbmRwb250SWRzKSlcbiAgICB9LCB0aGlzLm9wdGlvbnMudXBkYXRlSW50ZXJ2YWwpO1xuXG4gIH1cblxuICAvKipcbiAgICogQ2FuY2VscyBub3RpZmljYXRpb24gb2YgbmV3IGV2ZW50c1xuICAgKiBAcGFyYW0ge2FycmF5fSBbZW5kcG9pbnRMaXN0XVxuICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gICAqIEBtZW1iZXJvZiBTcGluYWxOZXR3b3JrXG4gICAqL1xuICB1bnN1YnNjcmliZShlbmRwb2ludExpc3QsIG9wdGlvbnMpIHtcblxuICB9XG5cbn1cblxuXG5zcGluYWxDb3JlLnJlZ2lzdGVyX21vZGVscyhbU3BpbmFsTmV0d29ya10pXG5tb2R1bGUuZXhwb3J0cyA9IFNwaW5hbE5ldHdvcms7XG5cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIEZBS0UgU1BFQ0lGSUMgRlVOQ1RJT05TIC0gTk9UIFBBUlQgT0YgVEhFIExJQiAqXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuY29uc3QgREFUQV9UWVBFUyA9IFsnRGF0ZVRpbWUnLCAnQm9vbGVhbicsICdTdHJpbmcnLCAnRG91YmxlJywgJ0xvbmcnLFxuICAnSW50ZWdlcicsICdEdXJhdGlvbidcbl1cbmxldCBzZW5zb3JUeXBlcyA9IHtcbiAgICBUZW1wZXJhdHVyZToge1xuICAgICAgbmFtZTogXCJUZW1wZXJhdHVyZVwiLFxuICAgICAgdW5pdDogXCLCsENcIixcbiAgICAgIGRhdGFUeXBlOiBcIkRvdWJsZVwiLFxuICAgICAgbWluOiBcIjBcIixcbiAgICAgIG1heDogXCIzMFwiXG4gICAgfSxcbiAgICBTd2l0Y2g6IHtcbiAgICAgIG5hbWU6IFwiU3dpdGNoXCIsXG4gICAgICB1bml0OiBcIlBvd2VyXCIsXG4gICAgICBkYXRhVHlwZTogXCJCb29sZWFuXCIsXG4gICAgICBtaW46IFwiMFwiLFxuICAgICAgbWF4OiBcIjJcIlxuICAgIH1cbiAgfSxcbiAgc2Vuc29yS2V5cyA9IFtcIlRlbXBlcmF0dXJlXCIsIFwiU3dpdGNoXCJdXG5cbi8vIGNzdlxuLy8gICAuZnJvbVBhdGgoJ3NlbnNvclRlbXBsYXRlcy5jc3YnLCB7XG4vLyAgICAgZGVsaW1pdGVyOiAnLCdcbi8vICAgfSlcbi8vICAgLm9uKFwiZGF0YVwiLCBmdW5jdGlvbihkYXRhKSB7XG4vLyAgICAgbGV0IHMgPSB7XG4vLyAgICAgICBuYW1lOiBkYXRhWzBdLFxuLy8gICAgICAgdW5pdDogZGF0YVsxXSxcbi8vICAgICAgIGRhdGFUeXBlOiBkYXRhWzJdXG4vLyAgICAgfVxuXG4vLyAgICAgcy5taW4gPSB0eXBlb2YgZGF0YVszXSAhPSBcInVuZGVmaW5lZFwiID8gZGF0YVszXSA6IHVuZGVmaW5lZDtcbi8vICAgICBzLm1heCA9IHR5cGVvZiBkYXRhWzRdICE9IFwidW5kZWZpbmVkXCIgPyBkYXRhWzRdIDogdW5kZWZpbmVkO1xuXG4vLyAgICAgc2Vuc29yVHlwZXNbcy5uYW1lXSA9IHNcbi8vICAgICBzZW5zb3JLZXlzLnB1c2gocy5uYW1lKTtcbi8vICAgfSk7XG5cblxuZnVuY3Rpb24gY3JlYXRlRmFrZUNvbnRhaW5lcihpbmRleCwgdG90YWxFbmRwb2ludHMpIHtcblxuICBsZXQgZW5kcG9pbnRzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b3RhbEVuZHBvaW50czsgaSsrKSB7XG4gICAgZW5kcG9pbnRzLnB1c2goY3JlYXRlRmFrZUVuZHBvaW50KGluZGV4LCBpKSk7XG4gIH1cblxuICBsZXQgZGV2aWNlID0gbmV3IFNwaW5hbERldmljZSgnRGV2aWNlICcgKyBpbmRleCwgJ0RldmljZS0nICsgaW5kZXgpO1xuXG4gIHJldHVybiB7XG4gICAgZGV2aWNlOiBkZXZpY2UsXG4gICAgZW5kcG9pbnRzOiBlbmRwb2ludHNcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVGYWtlRW5kcG9pbnQoZGV2aWNlSW5kZXgsIGluZGV4KSB7XG4gIHZhciBudW0gPSBwYXJzZUludCgnJyArIGRldmljZUluZGV4ICsgaW5kZXgpO1xuXG4gIGxldCBzZW5zb3JUeXBlID0gc2Vuc29yVHlwZXNbc2Vuc29yS2V5c1tNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMikgKyAwKV1dXG5cbiAgbGV0IGVuZHBvaW50ID0gbmV3IFNwaW5hbEVuZHBvaW50KFxuICAgICdFbmRwb2ludCAnICsgZGV2aWNlSW5kZXggKyAnXycgKyBpbmRleCxcbiAgICAnRW5kcG9pbnQtJyArIGRldmljZUluZGV4ICsgJ18nICsgaW5kZXggKyAnXycgKyBzZW5zb3JUeXBlLm5hbWUsXG4gICAgcGFyc2VWYWx1ZShNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogc2Vuc29yVHlwZS5tYXgpICsgc2Vuc29yVHlwZS5taW4pLFxuICAgICAgc2Vuc29yVHlwZS5kYXRhVHlwZSksXG4gICAgc2Vuc29yVHlwZS51bml0LFxuICAgIHNlbnNvclR5cGUuZGF0YVR5cGVcbiAgKTtcblxuICByZXR1cm4gZW5kcG9pbnQ7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZha2VWYWx1ZXMoZW5kcG9pbnRJZHMpIHtcblxuICBsZXQgZW5kcG9pbnRPYmpzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbmRwb2ludElkcy5sZW5ndGg7IGkrKykge1xuXG4gICAgbGV0IHNlbnNvclR5cGUgPSBzZW5zb3JUeXBlc1tlbmRwb2ludElkc1tpXS5zcGxpdCgnXycpWzJdXVxuXG4gICAgbGV0IHZhbCA9IHBhcnNlVmFsdWUoTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIHNlbnNvclR5cGUubWF4KSArXG4gICAgICBzZW5zb3JUeXBlLm1pbiksIHNlbnNvclR5cGUuZGF0YVR5cGUpO1xuXG4gICAgZW5kcG9pbnRPYmpzLnB1c2goe1xuICAgICAgcGF0aDogZW5kcG9pbnRJZHNbaV0sXG4gICAgICB2YWx1ZTogdmFsXG4gICAgfSk7XG5cbiAgfVxuXG4gIHJldHVybiBlbmRwb2ludE9ianM7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVmFsdWUodmFsdWUsIGRhdGFUeXBlKSB7XG4gIGlmIChkYXRhVHlwZSA9PSBEQVRBX1RZUEVTWydCb29sZWFuJ10pXG4gICAgcmV0dXJuIHZhbHVlID09ICdUcnVlJ1xuXG4gIGlmIChkYXRhVHlwZSA9PSBEQVRBX1RZUEVTWydMb25nJ10gfHwgZGF0YVR5cGUgPT0gREFUQV9UWVBFU1snRG91YmxlJ10pXG4gICAgaWYgKHZhbHVlID09IG51bGwpXG4gICAgICB2YWx1ZSA9IDBcbiAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpXG5cbiAgaWYgKGRhdGFUeXBlID09IERBVEFfVFlQRVNbJ0ludGVnZXInXSkge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKVxuICAgICAgdmFsdWUgPSAwXG4gICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlKVxuICB9XG5cbiAgaWYgKHZhbHVlID09IG51bGwpXG4gICAgdmFsdWUgPSBcIm51bGxcIlxuICByZXR1cm4gdmFsdWVcbn0iXX0=