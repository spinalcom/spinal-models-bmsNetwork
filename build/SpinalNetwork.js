"use strict";

var _Utilities = require("../Utilities.js");

var _Utilities2 = _interopRequireDefault(_Utilities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;

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
   * @param {Model} [options=new Ptr(0)] - mod_attr to change it
   * @param {string} [name="SpinalNetwork"]
   * @memberof SpinalNetwork
   */
  constructor(settings) {
    super();

    if (FileSystem._sig_server) {
      this.add_attr({
        id: _Utilities2.default.guid(this.constructor.name),
        name: typeof settings.networkName != "undefined" ? settings.networkName : new Error('Network name not defined in config.js'),
        type: typeof settings.type != "undefined" ? settings.type : new Error('Network type not defined in config.js'),
        host: typeof settings.host != "undefined" ? settings.host : '',
        user: typeof settings.user != "undefined" ? settings.user : '',
        password: typeof settings.password != "undefined" ? settings.password : '',
        options: settings
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
  read(endpointId, options) {}

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

module.exports = SpinalNetwork;
spinalCore.register_models([SpinalNetwork]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxOZXR3b3JrLmpzIl0sIm5hbWVzIjpbInNwaW5hbENvcmUiLCJyZXF1aXJlIiwiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsIlNwaW5hbE5ldHdvcmsiLCJNb2RlbCIsImNvbnN0cnVjdG9yIiwic2V0dGluZ3MiLCJGaWxlU3lzdGVtIiwiX3NpZ19zZXJ2ZXIiLCJhZGRfYXR0ciIsImlkIiwiVXRpbGl0aWVzIiwiZ3VpZCIsIm5hbWUiLCJuZXR3b3JrTmFtZSIsIkVycm9yIiwidHlwZSIsImhvc3QiLCJ1c2VyIiwicGFzc3dvcmQiLCJvcHRpb25zIiwiY29ubmVjdCIsImRpc2Nvbm5lY3QiLCJkaXNjb3ZlciIsInRvdGFsIiwidmlydHVhbERldmljZXMiLCJQcm9taXNlIiwicmVzIiwicmVqIiwiY29udGFpbmVycyIsImkiLCJwdXNoIiwiY3JlYXRlRmFrZUNvbnRhaW5lciIsImVuZHBvaW50c1BlckRldmljZSIsInJlYWQiLCJlbmRwb2ludElkIiwid3JpdGUiLCJnZXREZXZpY2UiLCJkZXZpY2VJZCIsImdldEVuZHBvaW50Iiwic3Vic2NyaWJlIiwiZW5kcG9udElkcyIsImNhbGxiYWNrIiwic2V0SW50ZXJ2YWwiLCJjcmVhdGVGYWtlVmFsdWVzIiwidXBkYXRlSW50ZXJ2YWwiLCJ1bnN1YnNjcmliZSIsImVuZHBvaW50TGlzdCIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7O0FBR0E7Ozs7OztBQUhBLE1BQU1BLGFBQWFDLFFBQVEseUJBQVIsQ0FBbkI7QUFDQSxNQUFNQyxhQUFhLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRCxNQUE1RDs7QUFJQTs7Ozs7O0FBTUEsTUFBTUUsYUFBTixTQUE0QkgsV0FBV0ksS0FBdkMsQ0FBNkM7QUFDM0M7Ozs7Ozs7Ozs7O0FBV0FDLGNBQVlDLFFBQVosRUFBc0I7QUFDcEI7O0FBRUEsUUFBSUMsV0FBV0MsV0FBZixFQUE0QjtBQUMxQixXQUFLQyxRQUFMLENBQWM7QUFDWkMsWUFBSUMsb0JBQVVDLElBQVYsQ0FBZSxLQUFLUCxXQUFMLENBQWlCUSxJQUFoQyxDQURRO0FBRVpBLGNBQU0sT0FBT1AsU0FBU1EsV0FBaEIsSUFBK0IsV0FBL0IsR0FBNkNSLFNBQVNRLFdBQXRELEdBQ0osSUFBSUMsS0FBSixDQUFVLHVDQUFWLENBSFU7QUFJWkMsY0FBTSxPQUFPVixTQUFTVSxJQUFoQixJQUF3QixXQUF4QixHQUFzQ1YsU0FBU1UsSUFBL0MsR0FBc0QsSUFBSUQsS0FBSixDQUMxRCx1Q0FEMEQsQ0FKaEQ7QUFNWkUsY0FBTSxPQUFPWCxTQUFTVyxJQUFoQixJQUF3QixXQUF4QixHQUFzQ1gsU0FBU1csSUFBL0MsR0FBc0QsRUFOaEQ7QUFPWkMsY0FBTSxPQUFPWixTQUFTWSxJQUFoQixJQUF3QixXQUF4QixHQUFzQ1osU0FBU1ksSUFBL0MsR0FBc0QsRUFQaEQ7QUFRWkMsa0JBQVUsT0FBT2IsU0FBU2EsUUFBaEIsSUFBNEIsV0FBNUIsR0FBMENiLFNBQVNhLFFBQW5ELEdBQ1IsRUFUVTtBQVVaQyxpQkFBU2Q7QUFWRyxPQUFkO0FBWUQ7QUFDRjs7QUFFRDs7OztBQUlBZSxZQUFVLENBRVQ7O0FBRUQ7Ozs7QUFJQUMsZUFBYSxDQUVaOztBQUVEOzs7OztBQUtBQyxXQUFTSCxPQUFULEVBQWtCOztBQUVoQixRQUFJSSxRQUFRLEtBQUtKLE9BQUwsQ0FBYUssY0FBekI7O0FBRUEsV0FBTyxJQUFJQyxPQUFKLENBQVksQ0FBQ0MsR0FBRCxFQUFNQyxHQUFOLEtBQWM7O0FBRS9CLFVBQUlDLGFBQWEsRUFBakI7O0FBRUEsV0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlOLEtBQXBCLEVBQTJCTSxHQUEzQixFQUNFRCxXQUFXRSxJQUFYLENBQWdCQyxvQkFBb0JGLENBQXBCLEVBQXVCLEtBQUtWLE9BQUwsQ0FBYWEsa0JBQXBDLENBQWhCOztBQUVGTixVQUFJRSxVQUFKO0FBRUQsS0FUTSxDQUFQO0FBV0Q7O0FBRUQ7Ozs7OztBQU1BSyxPQUFLQyxVQUFMLEVBQWlCZixPQUFqQixFQUEwQixDQUV6Qjs7QUFFRDs7Ozs7O0FBTUFnQixRQUFNRCxVQUFOLEVBQWtCZixPQUFsQixFQUEyQixDQUUxQjs7QUFFRDs7Ozs7O0FBTUFpQixZQUFVQyxRQUFWLEVBQW9CbEIsT0FBcEIsRUFBNkIsQ0FFNUI7O0FBRUQ7Ozs7OztBQU1BbUIsY0FBWUosVUFBWixFQUF3QmYsT0FBeEIsRUFBaUMsQ0FFaEM7O0FBRUQ7Ozs7OztBQU1Bb0IsWUFBVUMsVUFBVixFQUFzQkMsUUFBdEIsRUFBZ0N0QixPQUFoQyxFQUF5Qzs7QUFFdkM7O0FBRUF1QixnQkFBWSxNQUFNO0FBQ2hCRCxlQUFTRSxpQkFBaUJILFVBQWpCLENBQVQ7QUFDRCxLQUZELEVBRUcsS0FBS3JCLE9BQUwsQ0FBYXlCLGNBRmhCO0FBSUQ7O0FBRUQ7Ozs7OztBQU1BQyxjQUFZQyxZQUFaLEVBQTBCM0IsT0FBMUIsRUFBbUMsQ0FFbEM7O0FBckkwQzs7QUF5STdDNEIsT0FBT0MsT0FBUCxHQUFpQjlDLGFBQWpCO0FBQ0FMLFdBQVdvRCxlQUFYLENBQTJCLENBQUMvQyxhQUFELENBQTNCIiwiZmlsZSI6IlNwaW5hbE5ldHdvcmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzcGluYWxDb3JlID0gcmVxdWlyZShcInNwaW5hbC1jb3JlLWNvbm5lY3RvcmpzXCIpO1xuY29uc3QgZ2xvYmFsVHlwZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3c7XG5cbmltcG9ydCBVdGlsaXRpZXMgZnJvbSAnLi4vVXRpbGl0aWVzLmpzJztcblxuLyoqXG4gKlxuICpcbiAqIEBjbGFzcyBTcGluYWxOZXR3b3JrXG4gKiBAZXh0ZW5kcyB7Z2xvYmFsVHlwZS5Nb2RlbH1cbiAqL1xuY2xhc3MgU3BpbmFsTmV0d29yayBleHRlbmRzIGdsb2JhbFR5cGUuTW9kZWwge1xuICAvKipcbiAgICpDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFNwaW5hbE5ldHdvcmsuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbX25hbWU9XCJcIl1cbiAgICogQHBhcmFtIHtzdHJpbmd9IFt0eXBlPVwiXCJdXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbaG9zdD1cIlwiXVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3VzZXI9XCJcIl1cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtwYXNzd29yZD1cIlwiXVxuICAgKiBAcGFyYW0ge01vZGVsfSBbb3B0aW9ucz1uZXcgUHRyKDApXSAtIG1vZF9hdHRyIHRvIGNoYW5nZSBpdFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW25hbWU9XCJTcGluYWxOZXR3b3JrXCJdXG4gICAqIEBtZW1iZXJvZiBTcGluYWxOZXR3b3JrXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzZXR0aW5ncykge1xuICAgIHN1cGVyKCk7XG5cbiAgICBpZiAoRmlsZVN5c3RlbS5fc2lnX3NlcnZlcikge1xuICAgICAgdGhpcy5hZGRfYXR0cih7XG4gICAgICAgIGlkOiBVdGlsaXRpZXMuZ3VpZCh0aGlzLmNvbnN0cnVjdG9yLm5hbWUpLFxuICAgICAgICBuYW1lOiB0eXBlb2Ygc2V0dGluZ3MubmV0d29ya05hbWUgIT0gXCJ1bmRlZmluZWRcIiA/IHNldHRpbmdzLm5ldHdvcmtOYW1lIDpcbiAgICAgICAgICBuZXcgRXJyb3IoJ05ldHdvcmsgbmFtZSBub3QgZGVmaW5lZCBpbiBjb25maWcuanMnKSxcbiAgICAgICAgdHlwZTogdHlwZW9mIHNldHRpbmdzLnR5cGUgIT0gXCJ1bmRlZmluZWRcIiA/IHNldHRpbmdzLnR5cGUgOiBuZXcgRXJyb3IoXG4gICAgICAgICAgJ05ldHdvcmsgdHlwZSBub3QgZGVmaW5lZCBpbiBjb25maWcuanMnKSxcbiAgICAgICAgaG9zdDogdHlwZW9mIHNldHRpbmdzLmhvc3QgIT0gXCJ1bmRlZmluZWRcIiA/IHNldHRpbmdzLmhvc3QgOiAnJyxcbiAgICAgICAgdXNlcjogdHlwZW9mIHNldHRpbmdzLnVzZXIgIT0gXCJ1bmRlZmluZWRcIiA/IHNldHRpbmdzLnVzZXIgOiAnJyxcbiAgICAgICAgcGFzc3dvcmQ6IHR5cGVvZiBzZXR0aW5ncy5wYXNzd29yZCAhPSBcInVuZGVmaW5lZFwiID8gc2V0dGluZ3MucGFzc3dvcmQgOlxuICAgICAgICAgICcnLFxuICAgICAgICBvcHRpb25zOiBzZXR0aW5nc1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbm5lY3RzIHRvIHRoZSBuZXR3b3JrIGlmIGl0J3MgbmVjZXNzYXJ5IHRvIGhhdmUgYSBwZXJzaXN0ZW50IHNlc3Npb25cbiAgICogQG1lbWJlcm9mIFNwaW5hbE5ldHdvcmtcbiAgICovXG4gIGNvbm5lY3QoKSB7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNjb25uZWN0cyBvZiB0aGUgbmV0d29yayBpZiBwcmV2aW91c2x5IHNpZ25lZCBpblxuICAgKiBAbWVtYmVyb2YgU3BpbmFsTmV0d29ya1xuICAgKi9cbiAgZGlzY29ubmVjdCgpIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBjb250YWluZXIgb2YgU3BpbmFsRGV2aWNlcyBhbmQgU3BpbmFsRW5kcG9pbnRzXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAgICogQG1lbWJlcm9mIFNwaW5hbE5ldHdvcmtcbiAgICovXG4gIGRpc2NvdmVyKG9wdGlvbnMpIHtcblxuICAgIGxldCB0b3RhbCA9IHRoaXMub3B0aW9ucy52aXJ0dWFsRGV2aWNlc1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuXG4gICAgICBsZXQgY29udGFpbmVycyA9IFtdXG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG90YWw7IGkrKylcbiAgICAgICAgY29udGFpbmVycy5wdXNoKGNyZWF0ZUZha2VDb250YWluZXIoaSwgdGhpcy5vcHRpb25zLmVuZHBvaW50c1BlckRldmljZSkpXG5cbiAgICAgIHJlcyhjb250YWluZXJzKVxuXG4gICAgfSlcblxuICB9XG5cbiAgLyoqXG4gICAqIFJlYWRzIHRoZSB2YWx1ZSBvZiBhbiBlbmRwb2ludFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2VuZHBvaW50SWRdXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAgICogQG1lbWJlcm9mIFNwaW5hbE5ldHdvcmtcbiAgICovXG4gIHJlYWQoZW5kcG9pbnRJZCwgb3B0aW9ucykge1xuXG4gIH1cblxuICAvKipcbiAgICogV3JpdGVzIHRoZSB2YWx1ZSB0byBhbiBlbmRwb2ludFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2VuZHBvaW50SWRdXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAgICogQG1lbWJlcm9mIFNwaW5hbE5ldHdvcmtcbiAgICovXG4gIHdyaXRlKGVuZHBvaW50SWQsIG9wdGlvbnMpIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBTcGluYWxEZXZpY2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtkZXZpY2VJZF1cbiAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICAgKiBAbWVtYmVyb2YgU3BpbmFsTmV0d29ya1xuICAgKi9cbiAgZ2V0RGV2aWNlKGRldmljZUlkLCBvcHRpb25zKSB7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIFNwaW5hbEVuZHBvaW50XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZW5kcG9pbnRJZF1cbiAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICAgKiBAbWVtYmVyb2YgU3BpbmFsTmV0d29ya1xuICAgKi9cbiAgZ2V0RW5kcG9pbnQoZW5kcG9pbnRJZCwgb3B0aW9ucykge1xuXG4gIH1cblxuICAvKipcbiAgICogSW52b2NlcyBhIGNhbGxiYWNrIHdoZW4gbmV3IGV2ZW50cyBhcnJpdmVcbiAgICogQHBhcmFtIHthcnJheX0gW2VuZHBvaW50TGlzdF1cbiAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICAgKiBAbWVtYmVyb2YgU3BpbmFsTmV0d29ya1xuICAgKi9cbiAgc3Vic2NyaWJlKGVuZHBvbnRJZHMsIGNhbGxiYWNrLCBvcHRpb25zKSB7XG5cbiAgICAvLyBUT0RPOiBmcm9tIGVuZHBvaW50TGlzdCBnZW5lcmF0ZSBlbmRwb2ludHMgd2l0aCBJZCBhbmQgVmFsdWVcblxuICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGNhbGxiYWNrKGNyZWF0ZUZha2VWYWx1ZXMoZW5kcG9udElkcykpXG4gICAgfSwgdGhpcy5vcHRpb25zLnVwZGF0ZUludGVydmFsKTtcblxuICB9XG5cbiAgLyoqXG4gICAqIENhbmNlbHMgbm90aWZpY2F0aW9uIG9mIG5ldyBldmVudHNcbiAgICogQHBhcmFtIHthcnJheX0gW2VuZHBvaW50TGlzdF1cbiAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICAgKiBAbWVtYmVyb2YgU3BpbmFsTmV0d29ya1xuICAgKi9cbiAgdW5zdWJzY3JpYmUoZW5kcG9pbnRMaXN0LCBvcHRpb25zKSB7XG5cbiAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3BpbmFsTmV0d29yaztcbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtTcGluYWxOZXR3b3JrXSkiXX0=