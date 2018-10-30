"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Utilities = require("./Utilities");

const spinalCore = require("spinal-core-connectorjs");

const globalType = typeof window === "undefined" ? global : window;

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
        id: (0, _Utilities.guid)(this.constructor.name),
        name: _name,
        path: path,
        type: new Choice(0, ["Sensor", "Router", "Actuator"]),
        protocolType: protocolType,
        ipAddress: ipAddress
      });
      if (typeof type !== "undefined") this.type.set(type);
    }
  }

}

var _default = SpinalDevice;
exports.default = _default;
spinalCore.register_models([SpinalDevice]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxEZXZpY2UuanMiXSwibmFtZXMiOlsic3BpbmFsQ29yZSIsInJlcXVpcmUiLCJnbG9iYWxUeXBlIiwid2luZG93IiwiZ2xvYmFsIiwiU3BpbmFsRGV2aWNlIiwiTW9kZWwiLCJjb25zdHJ1Y3RvciIsIl9uYW1lIiwicGF0aCIsInR5cGUiLCJwcm90b2NvbFR5cGUiLCJpcEFkZHJlc3MiLCJuYW1lIiwiRmlsZVN5c3RlbSIsIl9zaWdfc2VydmVyIiwiYWRkX2F0dHIiLCJpZCIsIkNob2ljZSIsInNldCIsInJlZ2lzdGVyX21vZGVscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUdBOztBQUhBLE1BQU1BLFVBQVUsR0FBR0MsT0FBTyxDQUFDLHlCQUFELENBQTFCOztBQUNBLE1BQU1DLFVBQVUsR0FBRyxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQyxNQUFoQyxHQUF5Q0QsTUFBNUQ7O0FBT0EsTUFBTUUsWUFBTixTQUEyQkgsVUFBVSxDQUFDSSxLQUF0QyxDQUE0QztBQUMxQzs7Ozs7Ozs7OztBQVVBQyxFQUFBQSxXQUFXLENBQUNDLEtBQUssR0FBRyxFQUFULEVBQWFDLElBQUksR0FBRyxFQUFwQixFQUF3QkMsSUFBeEIsRUFBOEJDLFlBQTlCLEVBQTRDQyxTQUFTLEdBQzlELFdBRFMsRUFFVEMsSUFBSSxHQUNKLGNBSFMsRUFHTztBQUNoQjs7QUFDQSxRQUFJQyxVQUFVLENBQUNDLFdBQWYsRUFBNEI7QUFDMUIsV0FBS0MsUUFBTCxDQUFjO0FBQ1pDLFFBQUFBLEVBQUUsRUFBRSxxQkFBSyxLQUFLVixXQUFMLENBQWlCTSxJQUF0QixDQURRO0FBRVpBLFFBQUFBLElBQUksRUFBRUwsS0FGTTtBQUdaQyxRQUFBQSxJQUFJLEVBQUVBLElBSE07QUFJWkMsUUFBQUEsSUFBSSxFQUFFLElBQUlRLE1BQUosQ0FBVyxDQUFYLEVBQWMsQ0FBQyxRQUFELEVBQVcsUUFBWCxFQUFxQixVQUFyQixDQUFkLENBSk07QUFLWlAsUUFBQUEsWUFBWSxFQUFFQSxZQUxGO0FBTVpDLFFBQUFBLFNBQVMsRUFBRUE7QUFOQyxPQUFkO0FBUUEsVUFBSSxPQUFPRixJQUFQLEtBQWdCLFdBQXBCLEVBQ0UsS0FBS0EsSUFBTCxDQUFVUyxHQUFWLENBQWNULElBQWQ7QUFDSDtBQUNGOztBQTVCeUM7O2VBK0I3QkwsWTs7QUFDZkwsVUFBVSxDQUFDb0IsZUFBWCxDQUEyQixDQUFDZixZQUFELENBQTNCIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc3BpbmFsQ29yZSA9IHJlcXVpcmUoXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc1wiKTtcbmNvbnN0IGdsb2JhbFR5cGUgPSB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogd2luZG93O1xuXG5pbXBvcnQge1xuICBndWlkXG59IGZyb20gXCIuL1V0aWxpdGllc1wiO1xuXG5cbmNsYXNzIFNwaW5hbERldmljZSBleHRlbmRzIGdsb2JhbFR5cGUuTW9kZWwge1xuICAvKipcbiAgICpDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFNwaW5hbERldmljZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtuYW1lPVwiXCJdIFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3BhdGg9XCJcIl0gXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbdHlwZT1cIlNlbnNvclwiXSAtIG9uZSBvZiBbXCJTZW5zb3JcIiwgXCJSb3V0ZXJcIiwgXCJBY3R1YXRvclwiXVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3Byb3RvY29sVHlwZT1cIlwiXSBcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtpcEFkZHJlc3M9XCIxMjcuMC4wLjFcIl1cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtuYW1lPVwiU3BpbmFsRGV2aWNlXCJdXG4gICAqIEBtZW1iZXJvZiBTcGluYWxEZXZpY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKF9uYW1lID0gXCJcIiwgcGF0aCA9IFwiXCIsIHR5cGUsIHByb3RvY29sVHlwZSwgaXBBZGRyZXNzID1cbiAgICBcIjEyNy4wLjAuMVwiLFxuICAgIG5hbWUgPVxuICAgIFwiU3BpbmFsRGV2aWNlXCIpIHtcbiAgICBzdXBlcigpO1xuICAgIGlmIChGaWxlU3lzdGVtLl9zaWdfc2VydmVyKSB7XG4gICAgICB0aGlzLmFkZF9hdHRyKHtcbiAgICAgICAgaWQ6IGd1aWQodGhpcy5jb25zdHJ1Y3Rvci5uYW1lKSxcbiAgICAgICAgbmFtZTogX25hbWUsXG4gICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgIHR5cGU6IG5ldyBDaG9pY2UoMCwgW1wiU2Vuc29yXCIsIFwiUm91dGVyXCIsIFwiQWN0dWF0b3JcIl0pLFxuICAgICAgICBwcm90b2NvbFR5cGU6IHByb3RvY29sVHlwZSxcbiAgICAgICAgaXBBZGRyZXNzOiBpcEFkZHJlc3NcbiAgICAgIH0pO1xuICAgICAgaWYgKHR5cGVvZiB0eXBlICE9PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICB0aGlzLnR5cGUuc2V0KHR5cGUpO1xuICAgIH1cbiAgfVxuXG59XG5leHBvcnQgZGVmYXVsdCBTcGluYWxEZXZpY2U7XG5zcGluYWxDb3JlLnJlZ2lzdGVyX21vZGVscyhbU3BpbmFsRGV2aWNlXSkiXX0=