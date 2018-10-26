"use strict";

var _Utilities = require("./Utilities");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxOZXR3b3JrLmpzIl0sIm5hbWVzIjpbInNwaW5hbENvcmUiLCJyZXF1aXJlIiwiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsIlNwaW5hbE5ldHdvcmsiLCJNb2RlbCIsImNvbnN0cnVjdG9yIiwic2V0dGluZ3MiLCJGaWxlU3lzdGVtIiwiX3NpZ19zZXJ2ZXIiLCJhZGRfYXR0ciIsImlkIiwiVXRpbGl0aWVzIiwiZ3VpZCIsIm5hbWUiLCJuZXR3b3JrTmFtZSIsIkVycm9yIiwidHlwZSIsImhvc3QiLCJ1c2VyIiwicGFzc3dvcmQiLCJvcHRpb25zIiwiY29ubmVjdCIsImRpc2Nvbm5lY3QiLCJkaXNjb3ZlciIsInRvdGFsIiwidmlydHVhbERldmljZXMiLCJQcm9taXNlIiwicmVzIiwicmVqIiwiY29udGFpbmVycyIsImkiLCJwdXNoIiwiY3JlYXRlRmFrZUNvbnRhaW5lciIsImVuZHBvaW50c1BlckRldmljZSIsInJlYWQiLCJlbmRwb2ludElkIiwid3JpdGUiLCJnZXREZXZpY2UiLCJkZXZpY2VJZCIsImdldEVuZHBvaW50Iiwic3Vic2NyaWJlIiwiZW5kcG9udElkcyIsImNhbGxiYWNrIiwic2V0SW50ZXJ2YWwiLCJjcmVhdGVGYWtlVmFsdWVzIiwidXBkYXRlSW50ZXJ2YWwiLCJ1bnN1YnNjcmliZSIsImVuZHBvaW50TGlzdCIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7O0FBR0E7Ozs7OztBQUhBLE1BQU1BLGFBQWFDLFFBQVEseUJBQVIsQ0FBbkI7QUFDQSxNQUFNQyxhQUFhLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRCxNQUE1RDs7QUFJQTs7Ozs7O0FBTUEsTUFBTUUsYUFBTixTQUE0QkgsV0FBV0ksS0FBdkMsQ0FBNkM7QUFDM0M7Ozs7Ozs7Ozs7O0FBV0FDLGNBQVlDLFFBQVosRUFBc0I7QUFDcEI7O0FBRUEsUUFBSUMsV0FBV0MsV0FBZixFQUE0QjtBQUMxQixXQUFLQyxRQUFMLENBQWM7QUFDWkMsWUFBSUMsb0JBQVVDLElBQVYsQ0FBZSxLQUFLUCxXQUFMLENBQWlCUSxJQUFoQyxDQURRO0FBRVpBLGNBQU0sT0FBT1AsU0FBU1EsV0FBaEIsSUFBK0IsV0FBL0IsR0FBNkNSLFNBQVNRLFdBQXRELEdBQ0osSUFBSUMsS0FBSixDQUFVLHVDQUFWLENBSFU7QUFJWkMsY0FBTSxPQUFPVixTQUFTVSxJQUFoQixJQUF3QixXQUF4QixHQUFzQ1YsU0FBU1UsSUFBL0MsR0FBc0QsSUFBSUQsS0FBSixDQUMxRCx1Q0FEMEQsQ0FKaEQ7QUFNWkUsY0FBTSxPQUFPWCxTQUFTVyxJQUFoQixJQUF3QixXQUF4QixHQUFzQ1gsU0FBU1csSUFBL0MsR0FBc0QsRUFOaEQ7QUFPWkMsY0FBTSxPQUFPWixTQUFTWSxJQUFoQixJQUF3QixXQUF4QixHQUFzQ1osU0FBU1ksSUFBL0MsR0FBc0QsRUFQaEQ7QUFRWkMsa0JBQVUsT0FBT2IsU0FBU2EsUUFBaEIsSUFBNEIsV0FBNUIsR0FBMENiLFNBQVNhLFFBQW5ELEdBQ1IsRUFUVTtBQVVaQyxpQkFBU2Q7QUFWRyxPQUFkO0FBWUQ7QUFDRjs7QUFFRDs7OztBQUlBZSxZQUFVLENBRVQ7O0FBRUQ7Ozs7QUFJQUMsZUFBYSxDQUVaOztBQUVEOzs7OztBQUtBQyxXQUFTSCxPQUFULEVBQWtCOztBQUVoQixRQUFJSSxRQUFRLEtBQUtKLE9BQUwsQ0FBYUssY0FBekI7O0FBRUEsV0FBTyxJQUFJQyxPQUFKLENBQVksQ0FBQ0MsR0FBRCxFQUFNQyxHQUFOLEtBQWM7O0FBRS9CLFVBQUlDLGFBQWEsRUFBakI7O0FBRUEsV0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlOLEtBQXBCLEVBQTJCTSxHQUEzQixFQUNFRCxXQUFXRSxJQUFYLENBQWdCQyxvQkFBb0JGLENBQXBCLEVBQXVCLEtBQUtWLE9BQUwsQ0FBYWEsa0JBQXBDLENBQWhCOztBQUVGTixVQUFJRSxVQUFKO0FBRUQsS0FUTSxDQUFQO0FBV0Q7O0FBRUQ7Ozs7OztBQU1BSyxPQUFLQyxVQUFMLEVBQWlCZixPQUFqQixFQUEwQixDQUV6Qjs7QUFFRDs7Ozs7O0FBTUFnQixRQUFNRCxVQUFOLEVBQWtCZixPQUFsQixFQUEyQixDQUUxQjs7QUFFRDs7Ozs7O0FBTUFpQixZQUFVQyxRQUFWLEVBQW9CbEIsT0FBcEIsRUFBNkIsQ0FFNUI7O0FBRUQ7Ozs7OztBQU1BbUIsY0FBWUosVUFBWixFQUF3QmYsT0FBeEIsRUFBaUMsQ0FFaEM7O0FBRUQ7Ozs7OztBQU1Bb0IsWUFBVUMsVUFBVixFQUFzQkMsUUFBdEIsRUFBZ0N0QixPQUFoQyxFQUF5Qzs7QUFFdkM7O0FBRUF1QixnQkFBWSxNQUFNO0FBQ2hCRCxlQUFTRSxpQkFBaUJILFVBQWpCLENBQVQ7QUFDRCxLQUZELEVBRUcsS0FBS3JCLE9BQUwsQ0FBYXlCLGNBRmhCO0FBSUQ7O0FBRUQ7Ozs7OztBQU1BQyxjQUFZQyxZQUFaLEVBQTBCM0IsT0FBMUIsRUFBbUMsQ0FFbEM7O0FBckkwQzs7QUF5STdDNEIsT0FBT0MsT0FBUCxHQUFpQjlDLGFBQWpCO0FBQ0FMLFdBQVdvRCxlQUFYLENBQTJCLENBQUMvQyxhQUFELENBQTNCIiwiZmlsZSI6IlNwaW5hbE5ldHdvcmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzcGluYWxDb3JlID0gcmVxdWlyZShcInNwaW5hbC1jb3JlLWNvbm5lY3RvcmpzXCIpO1xuY29uc3QgZ2xvYmFsVHlwZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3c7XG5cbmltcG9ydCBVdGlsaXRpZXMgZnJvbSBcIi4vVXRpbGl0aWVzXCI7XG5cbi8qKlxuICpcbiAqXG4gKiBAY2xhc3MgU3BpbmFsTmV0d29ya1xuICogQGV4dGVuZHMge2dsb2JhbFR5cGUuTW9kZWx9XG4gKi9cbmNsYXNzIFNwaW5hbE5ldHdvcmsgZXh0ZW5kcyBnbG9iYWxUeXBlLk1vZGVsIHtcbiAgLyoqXG4gICAqQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTcGluYWxOZXR3b3JrLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW19uYW1lPVwiXCJdXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbdHlwZT1cIlwiXVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2hvc3Q9XCJcIl1cbiAgICogQHBhcmFtIHtzdHJpbmd9IFt1c2VyPVwiXCJdXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbcGFzc3dvcmQ9XCJcIl1cbiAgICogQHBhcmFtIHtNb2RlbH0gW29wdGlvbnM9bmV3IFB0cigwKV0gLSBtb2RfYXR0ciB0byBjaGFuZ2UgaXRcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtuYW1lPVwiU3BpbmFsTmV0d29ya1wiXVxuICAgKiBAbWVtYmVyb2YgU3BpbmFsTmV0d29ya1xuICAgKi9cbiAgY29uc3RydWN0b3Ioc2V0dGluZ3MpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgaWYgKEZpbGVTeXN0ZW0uX3NpZ19zZXJ2ZXIpIHtcbiAgICAgIHRoaXMuYWRkX2F0dHIoe1xuICAgICAgICBpZDogVXRpbGl0aWVzLmd1aWQodGhpcy5jb25zdHJ1Y3Rvci5uYW1lKSxcbiAgICAgICAgbmFtZTogdHlwZW9mIHNldHRpbmdzLm5ldHdvcmtOYW1lICE9IFwidW5kZWZpbmVkXCIgPyBzZXR0aW5ncy5uZXR3b3JrTmFtZSA6XG4gICAgICAgICAgbmV3IEVycm9yKCdOZXR3b3JrIG5hbWUgbm90IGRlZmluZWQgaW4gY29uZmlnLmpzJyksXG4gICAgICAgIHR5cGU6IHR5cGVvZiBzZXR0aW5ncy50eXBlICE9IFwidW5kZWZpbmVkXCIgPyBzZXR0aW5ncy50eXBlIDogbmV3IEVycm9yKFxuICAgICAgICAgICdOZXR3b3JrIHR5cGUgbm90IGRlZmluZWQgaW4gY29uZmlnLmpzJyksXG4gICAgICAgIGhvc3Q6IHR5cGVvZiBzZXR0aW5ncy5ob3N0ICE9IFwidW5kZWZpbmVkXCIgPyBzZXR0aW5ncy5ob3N0IDogJycsXG4gICAgICAgIHVzZXI6IHR5cGVvZiBzZXR0aW5ncy51c2VyICE9IFwidW5kZWZpbmVkXCIgPyBzZXR0aW5ncy51c2VyIDogJycsXG4gICAgICAgIHBhc3N3b3JkOiB0eXBlb2Ygc2V0dGluZ3MucGFzc3dvcmQgIT0gXCJ1bmRlZmluZWRcIiA/IHNldHRpbmdzLnBhc3N3b3JkIDpcbiAgICAgICAgICAnJyxcbiAgICAgICAgb3B0aW9uczogc2V0dGluZ3NcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb25uZWN0cyB0byB0aGUgbmV0d29yayBpZiBpdCdzIG5lY2Vzc2FyeSB0byBoYXZlIGEgcGVyc2lzdGVudCBzZXNzaW9uXG4gICAqIEBtZW1iZXJvZiBTcGluYWxOZXR3b3JrXG4gICAqL1xuICBjb25uZWN0KCkge1xuXG4gIH1cblxuICAvKipcbiAgICogRGlzY29ubmVjdHMgb2YgdGhlIG5ldHdvcmsgaWYgcHJldmlvdXNseSBzaWduZWQgaW5cbiAgICogQG1lbWJlcm9mIFNwaW5hbE5ldHdvcmtcbiAgICovXG4gIGRpc2Nvbm5lY3QoKSB7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgY29udGFpbmVyIG9mIFNwaW5hbERldmljZXMgYW5kIFNwaW5hbEVuZHBvaW50c1xuICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gICAqIEBtZW1iZXJvZiBTcGluYWxOZXR3b3JrXG4gICAqL1xuICBkaXNjb3ZlcihvcHRpb25zKSB7XG5cbiAgICBsZXQgdG90YWwgPSB0aGlzLm9wdGlvbnMudmlydHVhbERldmljZXNcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcblxuICAgICAgbGV0IGNvbnRhaW5lcnMgPSBbXVxuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRvdGFsOyBpKyspXG4gICAgICAgIGNvbnRhaW5lcnMucHVzaChjcmVhdGVGYWtlQ29udGFpbmVyKGksIHRoaXMub3B0aW9ucy5lbmRwb2ludHNQZXJEZXZpY2UpKVxuXG4gICAgICByZXMoY29udGFpbmVycylcblxuICAgIH0pXG5cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkcyB0aGUgdmFsdWUgb2YgYW4gZW5kcG9pbnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtlbmRwb2ludElkXVxuICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gICAqIEBtZW1iZXJvZiBTcGluYWxOZXR3b3JrXG4gICAqL1xuICByZWFkKGVuZHBvaW50SWQsIG9wdGlvbnMpIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIFdyaXRlcyB0aGUgdmFsdWUgdG8gYW4gZW5kcG9pbnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtlbmRwb2ludElkXVxuICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gICAqIEBtZW1iZXJvZiBTcGluYWxOZXR3b3JrXG4gICAqL1xuICB3cml0ZShlbmRwb2ludElkLCBvcHRpb25zKSB7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgU3BpbmFsRGV2aWNlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZGV2aWNlSWRdXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAgICogQG1lbWJlcm9mIFNwaW5hbE5ldHdvcmtcbiAgICovXG4gIGdldERldmljZShkZXZpY2VJZCwgb3B0aW9ucykge1xuXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBTcGluYWxFbmRwb2ludFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2VuZHBvaW50SWRdXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAgICogQG1lbWJlcm9mIFNwaW5hbE5ldHdvcmtcbiAgICovXG4gIGdldEVuZHBvaW50KGVuZHBvaW50SWQsIG9wdGlvbnMpIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIEludm9jZXMgYSBjYWxsYmFjayB3aGVuIG5ldyBldmVudHMgYXJyaXZlXG4gICAqIEBwYXJhbSB7YXJyYXl9IFtlbmRwb2ludExpc3RdXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAgICogQG1lbWJlcm9mIFNwaW5hbE5ldHdvcmtcbiAgICovXG4gIHN1YnNjcmliZShlbmRwb250SWRzLCBjYWxsYmFjaywgb3B0aW9ucykge1xuXG4gICAgLy8gVE9ETzogZnJvbSBlbmRwb2ludExpc3QgZ2VuZXJhdGUgZW5kcG9pbnRzIHdpdGggSWQgYW5kIFZhbHVlXG5cbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBjYWxsYmFjayhjcmVhdGVGYWtlVmFsdWVzKGVuZHBvbnRJZHMpKVxuICAgIH0sIHRoaXMub3B0aW9ucy51cGRhdGVJbnRlcnZhbCk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBDYW5jZWxzIG5vdGlmaWNhdGlvbiBvZiBuZXcgZXZlbnRzXG4gICAqIEBwYXJhbSB7YXJyYXl9IFtlbmRwb2ludExpc3RdXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAgICogQG1lbWJlcm9mIFNwaW5hbE5ldHdvcmtcbiAgICovXG4gIHVuc3Vic2NyaWJlKGVuZHBvaW50TGlzdCwgb3B0aW9ucykge1xuXG4gIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNwaW5hbE5ldHdvcms7XG5zcGluYWxDb3JlLnJlZ2lzdGVyX21vZGVscyhbU3BpbmFsTmV0d29ya10pIl19