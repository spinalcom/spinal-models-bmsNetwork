"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Utilities = require("./Utilities");

const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;

/**
 *
 *
 * @class SpinalEndpoint
 * @extends {Model}
 */
class SpinalEndpoint extends globalType.Model {
  /**
   *Creates an instance of SpinalEndpoint.
   * @param {string} [_name=""]
   * @param {string} [path=""]
   * @param {number} [currentValue=0]
   * @param {string} [unit=""]
   * @param {string} [dataType="Null"]
   * @param {Obj} [seuilMin={value: 0,active : false}]
   * @param {Obj} [seuilMax={value:0,active: false}]
   * @param {string} [dataNature=""] example : temperature
   * @param {string} [name="SpinalEndpoint"]
   * @memberof SpinalEndpoint
   */
  constructor(_name = "", path = "", currentValue = 0, unit = "", dataType, min = 0, max = 0, dataNature = "", alarmType, oldAlarmType = "normal", name = "SpinalEndpoint") {
    super();
    if (FileSystem._sig_server) {
      this.add_attr({
        id: _Utilities.Utilities.guid(this.constructor.name),
        name: _name,
        path: path,
        currentValue: currentValue,
        unit: unit,
        dataType: dataType ? dataType : new Choice(0, ["Null", "Boolean", "Unsigned", "Unsigned8", "Unsigned16", "Unsigned32", "Integer", "Integer16", "Real", "Double", "OctetString", "CharacterString", "BitString", "Enumerated", "Date", "Time", "Array", "DateTime", "Long", "String", "Duration"]),
        seuilMin: {
          value: min,
          active: false
        },
        seuilMax: {
          value: max,
          active: false
        },
        alarmType: alarmType ? alarmType : new Choice(1, ["min", "normal", "max"]),
        oldAlarmType: oldAlarmType,
        dataNature: dataNature,
        currentLog: new Model()
      });

      // if (typeof dataType !== "undefined")
      //   this.dataType.set(dataType);

      // if (typeof alarmType !== "undefined")
      //   this.dataType.set(alarmType);
    }
  }
}
exports.default = SpinalEndpoint;

spinalCore.register_models([SpinalEndpoint]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxFbmRwb2ludC5qcyJdLCJuYW1lcyI6WyJzcGluYWxDb3JlIiwicmVxdWlyZSIsImdsb2JhbFR5cGUiLCJ3aW5kb3ciLCJnbG9iYWwiLCJTcGluYWxFbmRwb2ludCIsIk1vZGVsIiwiY29uc3RydWN0b3IiLCJfbmFtZSIsInBhdGgiLCJjdXJyZW50VmFsdWUiLCJ1bml0IiwiZGF0YVR5cGUiLCJtaW4iLCJtYXgiLCJkYXRhTmF0dXJlIiwiYWxhcm1UeXBlIiwib2xkQWxhcm1UeXBlIiwibmFtZSIsIkZpbGVTeXN0ZW0iLCJfc2lnX3NlcnZlciIsImFkZF9hdHRyIiwiaWQiLCJVdGlsaXRpZXMiLCJndWlkIiwiQ2hvaWNlIiwic2V1aWxNaW4iLCJ2YWx1ZSIsImFjdGl2ZSIsInNldWlsTWF4IiwiY3VycmVudExvZyIsInJlZ2lzdGVyX21vZGVscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7O0FBRkEsTUFBTUEsYUFBYUMsUUFBUSx5QkFBUixDQUFuQjtBQUNBLE1BQU1DLGFBQWEsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixHQUFnQ0MsTUFBaEMsR0FBeUNELE1BQTVEOztBQUlBOzs7Ozs7QUFNQSxNQUFNRSxjQUFOLFNBQTZCSCxXQUFXSSxLQUF4QyxDQUE4QztBQUM1Qzs7Ozs7Ozs7Ozs7OztBQWFBQyxjQUFZQyxRQUFRLEVBQXBCLEVBQXdCQyxPQUFPLEVBQS9CLEVBQW1DQyxlQUFlLENBQWxELEVBQXFEQyxPQUFPLEVBQTVELEVBQWdFQyxRQUFoRSxFQUNFQyxNQUNBLENBRkYsRUFHRUMsTUFDQSxDQUpGLEVBS0VDLGFBQWEsRUFMZixFQU1FQyxTQU5GLEVBT0VDLGVBQWUsUUFQakIsRUFRRUMsT0FDQSxnQkFURixFQVNvQjtBQUNsQjtBQUNBLFFBQUlDLFdBQVdDLFdBQWYsRUFBNEI7QUFDMUIsV0FBS0MsUUFBTCxDQUFjO0FBQ1pDLFlBQUlDLHFCQUFVQyxJQUFWLENBQWUsS0FBS2pCLFdBQUwsQ0FBaUJXLElBQWhDLENBRFE7QUFFWkEsY0FBTVYsS0FGTTtBQUdaQyxjQUFNQSxJQUhNO0FBSVpDLHNCQUFjQSxZQUpGO0FBS1pDLGNBQU1BLElBTE07QUFNWkMsa0JBQVVBLFdBQVdBLFFBQVgsR0FBc0IsSUFBSWEsTUFBSixDQUFXLENBQVgsRUFBYyxDQUFDLE1BQUQsRUFDNUMsU0FENEMsRUFFNUMsVUFGNEMsRUFHNUMsV0FINEMsRUFHL0IsWUFIK0IsRUFHakIsWUFIaUIsRUFHSCxTQUhHLEVBSTVDLFdBSjRDLEVBSS9CLE1BSitCLEVBSXZCLFFBSnVCLEVBSWIsYUFKYSxFQUs1QyxpQkFMNEMsRUFLekIsV0FMeUIsRUFLWixZQUxZLEVBS0UsTUFMRixFQU01QyxNQU40QyxFQU1wQyxPQU5vQyxFQU0zQixVQU4yQixFQU1mLE1BTmUsRUFNUCxRQU5PLEVBTUcsVUFOSCxDQUFkLENBTnBCO0FBY1pDLGtCQUFVO0FBQ1JDLGlCQUFPZCxHQURDO0FBRVJlLGtCQUFRO0FBRkEsU0FkRTtBQWtCWkMsa0JBQVU7QUFDUkYsaUJBQU9iLEdBREM7QUFFUmMsa0JBQVE7QUFGQSxTQWxCRTtBQXNCWlosbUJBQVdBLFlBQVlBLFNBQVosR0FBd0IsSUFBSVMsTUFBSixDQUFXLENBQVgsRUFBYyxDQUFDLEtBQUQsRUFDL0MsUUFEK0MsRUFDckMsS0FEcUMsQ0FBZCxDQXRCdkI7QUF5QlpSLHNCQUFjQSxZQXpCRjtBQTBCWkYsb0JBQVlBLFVBMUJBO0FBMkJaZSxvQkFBWSxJQUFJeEIsS0FBSjtBQTNCQSxPQUFkOztBQThCQTtBQUNBOztBQUVBO0FBQ0E7QUFDRDtBQUNGO0FBOUQyQztrQkFnRS9CRCxjOztBQUNmTCxXQUFXK0IsZUFBWCxDQUEyQixDQUFDMUIsY0FBRCxDQUEzQiIsImZpbGUiOiJTcGluYWxFbmRwb2ludC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNwaW5hbENvcmUgPSByZXF1aXJlKFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNcIik7XG5jb25zdCBnbG9iYWxUeXBlID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHdpbmRvdztcbmltcG9ydCB7XG4gIFV0aWxpdGllc1xufSBmcm9tIFwiLi9VdGlsaXRpZXNcIjtcbi8qKlxuICpcbiAqXG4gKiBAY2xhc3MgU3BpbmFsRW5kcG9pbnRcbiAqIEBleHRlbmRzIHtNb2RlbH1cbiAqL1xuY2xhc3MgU3BpbmFsRW5kcG9pbnQgZXh0ZW5kcyBnbG9iYWxUeXBlLk1vZGVsIHtcbiAgLyoqXG4gICAqQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTcGluYWxFbmRwb2ludC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtfbmFtZT1cIlwiXVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3BhdGg9XCJcIl1cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtjdXJyZW50VmFsdWU9MF1cbiAgICogQHBhcmFtIHtzdHJpbmd9IFt1bml0PVwiXCJdXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZGF0YVR5cGU9XCJOdWxsXCJdXG4gICAqIEBwYXJhbSB7T2JqfSBbc2V1aWxNaW49e3ZhbHVlOiAwLGFjdGl2ZSA6IGZhbHNlfV1cbiAgICogQHBhcmFtIHtPYmp9IFtzZXVpbE1heD17dmFsdWU6MCxhY3RpdmU6IGZhbHNlfV1cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtkYXRhTmF0dXJlPVwiXCJdIGV4YW1wbGUgOiB0ZW1wZXJhdHVyZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW25hbWU9XCJTcGluYWxFbmRwb2ludFwiXVxuICAgKiBAbWVtYmVyb2YgU3BpbmFsRW5kcG9pbnRcbiAgICovXG4gIGNvbnN0cnVjdG9yKF9uYW1lID0gXCJcIiwgcGF0aCA9IFwiXCIsIGN1cnJlbnRWYWx1ZSA9IDAsIHVuaXQgPSBcIlwiLCBkYXRhVHlwZSxcbiAgICBtaW4gPVxuICAgIDAsXG4gICAgbWF4ID1cbiAgICAwLFxuICAgIGRhdGFOYXR1cmUgPSBcIlwiLFxuICAgIGFsYXJtVHlwZSxcbiAgICBvbGRBbGFybVR5cGUgPSBcIm5vcm1hbFwiLFxuICAgIG5hbWUgPVxuICAgIFwiU3BpbmFsRW5kcG9pbnRcIikge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKEZpbGVTeXN0ZW0uX3NpZ19zZXJ2ZXIpIHtcbiAgICAgIHRoaXMuYWRkX2F0dHIoe1xuICAgICAgICBpZDogVXRpbGl0aWVzLmd1aWQodGhpcy5jb25zdHJ1Y3Rvci5uYW1lKSxcbiAgICAgICAgbmFtZTogX25hbWUsXG4gICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgIGN1cnJlbnRWYWx1ZTogY3VycmVudFZhbHVlLFxuICAgICAgICB1bml0OiB1bml0LFxuICAgICAgICBkYXRhVHlwZTogZGF0YVR5cGUgPyBkYXRhVHlwZSA6IG5ldyBDaG9pY2UoMCwgW1wiTnVsbFwiLFxuICAgICAgICAgIFwiQm9vbGVhblwiLFxuICAgICAgICAgIFwiVW5zaWduZWRcIixcbiAgICAgICAgICBcIlVuc2lnbmVkOFwiLCBcIlVuc2lnbmVkMTZcIiwgXCJVbnNpZ25lZDMyXCIsIFwiSW50ZWdlclwiLFxuICAgICAgICAgIFwiSW50ZWdlcjE2XCIsIFwiUmVhbFwiLCBcIkRvdWJsZVwiLCBcIk9jdGV0U3RyaW5nXCIsXG4gICAgICAgICAgXCJDaGFyYWN0ZXJTdHJpbmdcIiwgXCJCaXRTdHJpbmdcIiwgXCJFbnVtZXJhdGVkXCIsIFwiRGF0ZVwiLFxuICAgICAgICAgIFwiVGltZVwiLCBcIkFycmF5XCIsIFwiRGF0ZVRpbWVcIiwgXCJMb25nXCIsIFwiU3RyaW5nXCIsIFwiRHVyYXRpb25cIlxuICAgICAgICBdKSxcbiAgICAgICAgc2V1aWxNaW46IHtcbiAgICAgICAgICB2YWx1ZTogbWluLFxuICAgICAgICAgIGFjdGl2ZTogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgc2V1aWxNYXg6IHtcbiAgICAgICAgICB2YWx1ZTogbWF4LFxuICAgICAgICAgIGFjdGl2ZTogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgYWxhcm1UeXBlOiBhbGFybVR5cGUgPyBhbGFybVR5cGUgOiBuZXcgQ2hvaWNlKDEsIFtcIm1pblwiLFxuICAgICAgICAgIFwibm9ybWFsXCIsIFwibWF4XCJcbiAgICAgICAgXSksXG4gICAgICAgIG9sZEFsYXJtVHlwZTogb2xkQWxhcm1UeXBlLFxuICAgICAgICBkYXRhTmF0dXJlOiBkYXRhTmF0dXJlLFxuICAgICAgICBjdXJyZW50TG9nOiBuZXcgTW9kZWwoKVxuICAgICAgfSk7XG5cbiAgICAgIC8vIGlmICh0eXBlb2YgZGF0YVR5cGUgIT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAvLyAgIHRoaXMuZGF0YVR5cGUuc2V0KGRhdGFUeXBlKTtcblxuICAgICAgLy8gaWYgKHR5cGVvZiBhbGFybVR5cGUgIT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAvLyAgIHRoaXMuZGF0YVR5cGUuc2V0KGFsYXJtVHlwZSk7XG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBTcGluYWxFbmRwb2ludDtcbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtTcGluYWxFbmRwb2ludF0pIl19