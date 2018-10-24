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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxFbmRwb2ludC5qcyJdLCJuYW1lcyI6WyJzcGluYWxDb3JlIiwicmVxdWlyZSIsImdsb2JhbFR5cGUiLCJ3aW5kb3ciLCJnbG9iYWwiLCJTcGluYWxFbmRwb2ludCIsIk1vZGVsIiwiY29uc3RydWN0b3IiLCJfbmFtZSIsInBhdGgiLCJjdXJyZW50VmFsdWUiLCJ1bml0IiwiZGF0YVR5cGUiLCJtaW4iLCJtYXgiLCJkYXRhTmF0dXJlIiwiYWxhcm1UeXBlIiwib2xkQWxhcm1UeXBlIiwibmFtZSIsIkZpbGVTeXN0ZW0iLCJfc2lnX3NlcnZlciIsImFkZF9hdHRyIiwiaWQiLCJVdGlsaXRpZXMiLCJndWlkIiwiQ2hvaWNlIiwic2V1aWxNaW4iLCJ2YWx1ZSIsImFjdGl2ZSIsInNldWlsTWF4IiwiY3VycmVudExvZyIsInJlZ2lzdGVyX21vZGVscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7O0FBRkEsTUFBTUEsYUFBYUMsUUFBUSx5QkFBUixDQUFuQjtBQUNBLE1BQU1DLGFBQWEsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixHQUFnQ0MsTUFBaEMsR0FBeUNELE1BQTVEOztBQUlBOzs7Ozs7QUFNQSxNQUFNRSxjQUFOLFNBQTZCSCxXQUFXSSxLQUF4QyxDQUE4QztBQUM1Qzs7Ozs7Ozs7Ozs7OztBQWFBQyxjQUFZQyxRQUFRLEVBQXBCLEVBQXdCQyxPQUFPLEVBQS9CLEVBQW1DQyxlQUFlLENBQWxELEVBQXFEQyxPQUFPLEVBQTVELEVBQWdFQyxRQUFoRSxFQUNFQyxNQUNBLENBRkYsRUFHRUMsTUFDQSxDQUpGLEVBS0VDLGFBQWEsRUFMZixFQU1FQyxTQU5GLEVBT0VDLGVBQWUsUUFQakIsRUFRRUMsT0FDQSxnQkFURixFQVNvQjtBQUNsQjtBQUNBLFFBQUlDLFdBQVdDLFdBQWYsRUFBNEI7QUFDMUIsV0FBS0MsUUFBTCxDQUFjO0FBQ1pDLFlBQUlDLHFCQUFVQyxJQUFWLENBQWUsS0FBS2pCLFdBQUwsQ0FBaUJXLElBQWhDLENBRFE7QUFFWkEsY0FBTVYsS0FGTTtBQUdaQyxjQUFNQSxJQUhNO0FBSVpDLHNCQUFjQSxZQUpGO0FBS1pDLGNBQU1BLElBTE07QUFNWkMsa0JBQVVBLFdBQVdBLFFBQVgsR0FBc0IsSUFBSWEsTUFBSixDQUFXLENBQVgsRUFBYyxDQUFDLE1BQUQsRUFDNUMsU0FENEMsRUFFNUMsVUFGNEMsRUFHNUMsV0FINEMsRUFHL0IsWUFIK0IsRUFHakIsWUFIaUIsRUFHSCxTQUhHLEVBSTVDLFdBSjRDLEVBSS9CLE1BSitCLEVBSXZCLFFBSnVCLEVBSWIsYUFKYSxFQUs1QyxpQkFMNEMsRUFLekIsV0FMeUIsRUFLWixZQUxZLEVBS0UsTUFMRixFQU01QyxNQU40QyxFQU1wQyxPQU5vQyxFQU0zQixVQU4yQixFQU1mLE1BTmUsRUFNUCxRQU5PLEVBTUcsVUFOSCxDQUFkLENBTnBCO0FBY1pDLGtCQUFVO0FBQ1JDLGlCQUFPZCxHQURDO0FBRVJlLGtCQUFRO0FBRkEsU0FkRTtBQWtCWkMsa0JBQVU7QUFDUkYsaUJBQU9iLEdBREM7QUFFUmMsa0JBQVE7QUFGQSxTQWxCRTtBQXNCWlosbUJBQVdBLFlBQVlBLFNBQVosR0FBd0IsSUFBSVMsTUFBSixDQUFXLENBQVgsRUFBYyxDQUFDLEtBQUQsRUFDL0MsUUFEK0MsRUFDckMsS0FEcUMsQ0FBZCxDQXRCdkI7QUF5QlpSLHNCQUFjQSxZQXpCRjtBQTBCWkYsb0JBQVlBLFVBMUJBO0FBMkJaZSxvQkFBWSxJQUFJeEIsS0FBSjtBQTNCQSxPQUFkOztBQThCQTtBQUNBOztBQUVBO0FBQ0E7QUFDRDtBQUNGO0FBOUQyQztrQkFnRS9CRCxjOztBQUNmTCxXQUFXK0IsZUFBWCxDQUEyQixDQUFDMUIsY0FBRCxDQUEzQiIsImZpbGUiOiJTcGluYWxFbmRwb2ludC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNwaW5hbENvcmUgPSByZXF1aXJlKFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNcIik7XG5jb25zdCBnbG9iYWxUeXBlID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHdpbmRvdztcbmltcG9ydCB7XG4gIFV0aWxpdGllc1xufSBmcm9tIFwiLi4vVXRpbGl0aWVzLmpzXCI7XG4vKipcbiAqXG4gKlxuICogQGNsYXNzIFNwaW5hbEVuZHBvaW50XG4gKiBAZXh0ZW5kcyB7TW9kZWx9XG4gKi9cbmNsYXNzIFNwaW5hbEVuZHBvaW50IGV4dGVuZHMgZ2xvYmFsVHlwZS5Nb2RlbCB7XG4gIC8qKlxuICAgKkNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU3BpbmFsRW5kcG9pbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbX25hbWU9XCJcIl1cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtwYXRoPVwiXCJdXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbY3VycmVudFZhbHVlPTBdXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbdW5pdD1cIlwiXVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2RhdGFUeXBlPVwiTnVsbFwiXVxuICAgKiBAcGFyYW0ge09ian0gW3NldWlsTWluPXt2YWx1ZTogMCxhY3RpdmUgOiBmYWxzZX1dXG4gICAqIEBwYXJhbSB7T2JqfSBbc2V1aWxNYXg9e3ZhbHVlOjAsYWN0aXZlOiBmYWxzZX1dXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZGF0YU5hdHVyZT1cIlwiXSBleGFtcGxlIDogdGVtcGVyYXR1cmVcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtuYW1lPVwiU3BpbmFsRW5kcG9pbnRcIl1cbiAgICogQG1lbWJlcm9mIFNwaW5hbEVuZHBvaW50XG4gICAqL1xuICBjb25zdHJ1Y3RvcihfbmFtZSA9IFwiXCIsIHBhdGggPSBcIlwiLCBjdXJyZW50VmFsdWUgPSAwLCB1bml0ID0gXCJcIiwgZGF0YVR5cGUsXG4gICAgbWluID1cbiAgICAwLFxuICAgIG1heCA9XG4gICAgMCxcbiAgICBkYXRhTmF0dXJlID0gXCJcIixcbiAgICBhbGFybVR5cGUsXG4gICAgb2xkQWxhcm1UeXBlID0gXCJub3JtYWxcIixcbiAgICBuYW1lID1cbiAgICBcIlNwaW5hbEVuZHBvaW50XCIpIHtcbiAgICBzdXBlcigpO1xuICAgIGlmIChGaWxlU3lzdGVtLl9zaWdfc2VydmVyKSB7XG4gICAgICB0aGlzLmFkZF9hdHRyKHtcbiAgICAgICAgaWQ6IFV0aWxpdGllcy5ndWlkKHRoaXMuY29uc3RydWN0b3IubmFtZSksXG4gICAgICAgIG5hbWU6IF9uYW1lLFxuICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICBjdXJyZW50VmFsdWU6IGN1cnJlbnRWYWx1ZSxcbiAgICAgICAgdW5pdDogdW5pdCxcbiAgICAgICAgZGF0YVR5cGU6IGRhdGFUeXBlID8gZGF0YVR5cGUgOiBuZXcgQ2hvaWNlKDAsIFtcIk51bGxcIixcbiAgICAgICAgICBcIkJvb2xlYW5cIixcbiAgICAgICAgICBcIlVuc2lnbmVkXCIsXG4gICAgICAgICAgXCJVbnNpZ25lZDhcIiwgXCJVbnNpZ25lZDE2XCIsIFwiVW5zaWduZWQzMlwiLCBcIkludGVnZXJcIixcbiAgICAgICAgICBcIkludGVnZXIxNlwiLCBcIlJlYWxcIiwgXCJEb3VibGVcIiwgXCJPY3RldFN0cmluZ1wiLFxuICAgICAgICAgIFwiQ2hhcmFjdGVyU3RyaW5nXCIsIFwiQml0U3RyaW5nXCIsIFwiRW51bWVyYXRlZFwiLCBcIkRhdGVcIixcbiAgICAgICAgICBcIlRpbWVcIiwgXCJBcnJheVwiLCBcIkRhdGVUaW1lXCIsIFwiTG9uZ1wiLCBcIlN0cmluZ1wiLCBcIkR1cmF0aW9uXCJcbiAgICAgICAgXSksXG4gICAgICAgIHNldWlsTWluOiB7XG4gICAgICAgICAgdmFsdWU6IG1pbixcbiAgICAgICAgICBhY3RpdmU6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHNldWlsTWF4OiB7XG4gICAgICAgICAgdmFsdWU6IG1heCxcbiAgICAgICAgICBhY3RpdmU6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIGFsYXJtVHlwZTogYWxhcm1UeXBlID8gYWxhcm1UeXBlIDogbmV3IENob2ljZSgxLCBbXCJtaW5cIixcbiAgICAgICAgICBcIm5vcm1hbFwiLCBcIm1heFwiXG4gICAgICAgIF0pLFxuICAgICAgICBvbGRBbGFybVR5cGU6IG9sZEFsYXJtVHlwZSxcbiAgICAgICAgZGF0YU5hdHVyZTogZGF0YU5hdHVyZSxcbiAgICAgICAgY3VycmVudExvZzogbmV3IE1vZGVsKClcbiAgICAgIH0pO1xuXG4gICAgICAvLyBpZiAodHlwZW9mIGRhdGFUeXBlICE9PSBcInVuZGVmaW5lZFwiKVxuICAgICAgLy8gICB0aGlzLmRhdGFUeXBlLnNldChkYXRhVHlwZSk7XG5cbiAgICAgIC8vIGlmICh0eXBlb2YgYWxhcm1UeXBlICE9PSBcInVuZGVmaW5lZFwiKVxuICAgICAgLy8gICB0aGlzLmRhdGFUeXBlLnNldChhbGFybVR5cGUpO1xuICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgU3BpbmFsRW5kcG9pbnQ7XG5zcGluYWxDb3JlLnJlZ2lzdGVyX21vZGVscyhbU3BpbmFsRW5kcG9pbnRdKSJdfQ==