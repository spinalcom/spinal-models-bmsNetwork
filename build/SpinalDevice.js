"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Utilities = require("../Utilities.js");

const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;

/**
 *
 *
 * @class SpinalDevice
 * @extends {globalType.Model}
 */
class SpinalDevice extends globalType.Model {
  /**
   *Creates an instance of SpinalDevice.
   * @param {string} [name=""] 
   * @param {string} [path=""] 
   * @param {string} [type="Sensor"] - one of ["Sensor", "Router", "Actuator"]
   * @param {string} [protocolType=""] 
   * @param {string} [ipAddress="127.0.0.1"]
   * @param {string} [name="SpinalDevice"]
   * @memberof SpinalDevice
   */
  constructor(_name = "", path = "", type, protocolType, ipAddress = "127.0.0.1", name = "SpinalDevice") {
    super();
    if (FileSystem._sig_server) {
      this.add_attr({
        id: _Utilities.Utilities.guid(this.constructor.name),
        name: _name,
        path: path,
        type: new Choice(0, ["Sensor", "Router", "Actuator"]),
        protocolType: protocolType,
        ipAddress: ipAddress,
        type: type || ""
      });
    }
  }

}
exports.default = SpinalDevice;

spinalCore.register_models([SpinalDevice]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxEZXZpY2UuanMiXSwibmFtZXMiOlsic3BpbmFsQ29yZSIsInJlcXVpcmUiLCJnbG9iYWxUeXBlIiwid2luZG93IiwiZ2xvYmFsIiwiU3BpbmFsRGV2aWNlIiwiTW9kZWwiLCJjb25zdHJ1Y3RvciIsIl9uYW1lIiwicGF0aCIsInR5cGUiLCJwcm90b2NvbFR5cGUiLCJpcEFkZHJlc3MiLCJuYW1lIiwiRmlsZVN5c3RlbSIsIl9zaWdfc2VydmVyIiwiYWRkX2F0dHIiLCJpZCIsIlV0aWxpdGllcyIsImd1aWQiLCJDaG9pY2UiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdBOztBQUhBLE1BQU1BLGFBQWFDLFFBQVEseUJBQVIsQ0FBbkI7QUFDQSxNQUFNQyxhQUFhLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRCxNQUE1RDs7QUFLQTs7Ozs7O0FBTUEsTUFBTUUsWUFBTixTQUEyQkgsV0FBV0ksS0FBdEMsQ0FBNEM7QUFDMUM7Ozs7Ozs7Ozs7QUFVQUMsY0FBWUMsUUFBUSxFQUFwQixFQUF3QkMsT0FBTyxFQUEvQixFQUFtQ0MsSUFBbkMsRUFBeUNDLFlBQXpDLEVBQXVEQyxZQUNyRCxXQURGLEVBQ2VDLE9BQU8sY0FEdEIsRUFDc0M7QUFDcEM7QUFDQSxRQUFJQyxXQUFXQyxXQUFmLEVBQTRCO0FBQzFCLFdBQUtDLFFBQUwsQ0FBYztBQUNaQyxZQUFJQyxxQkFBVUMsSUFBVixDQUFlLEtBQUtaLFdBQUwsQ0FBaUJNLElBQWhDLENBRFE7QUFFWkEsY0FBTUwsS0FGTTtBQUdaQyxjQUFNQSxJQUhNO0FBSVpDLGNBQU0sSUFBSVUsTUFBSixDQUFXLENBQVgsRUFBYyxDQUFDLFFBQUQsRUFBVyxRQUFYLEVBQXFCLFVBQXJCLENBQWQsQ0FKTTtBQUtaVCxzQkFBY0EsWUFMRjtBQU1aQyxtQkFBV0EsU0FOQztBQU9aRixjQUFNQSxRQUFRO0FBUEYsT0FBZDtBQVNEO0FBQ0Y7O0FBekJ5QztrQkE0QjdCTCxZOztBQUNmTCxXQUFXcUIsZUFBWCxDQUEyQixDQUFDaEIsWUFBRCxDQUEzQiIsImZpbGUiOiJTcGluYWxEZXZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzcGluYWxDb3JlID0gcmVxdWlyZShcInNwaW5hbC1jb3JlLWNvbm5lY3RvcmpzXCIpO1xuY29uc3QgZ2xvYmFsVHlwZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3c7XG5cbmltcG9ydCB7XG4gIFV0aWxpdGllc1xufSBmcm9tIFwiLi4vVXRpbGl0aWVzLmpzXCI7XG4vKipcbiAqXG4gKlxuICogQGNsYXNzIFNwaW5hbERldmljZVxuICogQGV4dGVuZHMge2dsb2JhbFR5cGUuTW9kZWx9XG4gKi9cbmNsYXNzIFNwaW5hbERldmljZSBleHRlbmRzIGdsb2JhbFR5cGUuTW9kZWwge1xuICAvKipcbiAgICpDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFNwaW5hbERldmljZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtuYW1lPVwiXCJdIFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3BhdGg9XCJcIl0gXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbdHlwZT1cIlNlbnNvclwiXSAtIG9uZSBvZiBbXCJTZW5zb3JcIiwgXCJSb3V0ZXJcIiwgXCJBY3R1YXRvclwiXVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3Byb3RvY29sVHlwZT1cIlwiXSBcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtpcEFkZHJlc3M9XCIxMjcuMC4wLjFcIl1cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtuYW1lPVwiU3BpbmFsRGV2aWNlXCJdXG4gICAqIEBtZW1iZXJvZiBTcGluYWxEZXZpY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKF9uYW1lID0gXCJcIiwgcGF0aCA9IFwiXCIsIHR5cGUsIHByb3RvY29sVHlwZSwgaXBBZGRyZXNzID1cbiAgICBcIjEyNy4wLjAuMVwiLCBuYW1lID0gXCJTcGluYWxEZXZpY2VcIikge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKEZpbGVTeXN0ZW0uX3NpZ19zZXJ2ZXIpIHtcbiAgICAgIHRoaXMuYWRkX2F0dHIoe1xuICAgICAgICBpZDogVXRpbGl0aWVzLmd1aWQodGhpcy5jb25zdHJ1Y3Rvci5uYW1lKSxcbiAgICAgICAgbmFtZTogX25hbWUsXG4gICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgIHR5cGU6IG5ldyBDaG9pY2UoMCwgW1wiU2Vuc29yXCIsIFwiUm91dGVyXCIsIFwiQWN0dWF0b3JcIl0pLFxuICAgICAgICBwcm90b2NvbFR5cGU6IHByb3RvY29sVHlwZSxcbiAgICAgICAgaXBBZGRyZXNzOiBpcEFkZHJlc3MsXG4gICAgICAgIHR5cGU6IHR5cGUgfHwgXCJcIlxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbn1cbmV4cG9ydCBkZWZhdWx0IFNwaW5hbERldmljZTtcbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtTcGluYWxEZXZpY2VdKSJdfQ==