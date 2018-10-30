"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Utilities = require("./Utilities");

const spinalCore = require("spinal-core-connectorjs");

const globalType = typeof window === "undefined" ? global : window;

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
        id: (0, _Utilities.guid)(this.constructor.name),
        name: _name,
        path: path,
        currentValue: currentValue,
        unit: unit,
        dataType: new Choice(0, ["Null", "Boolean", "Unsigned", "Unsigned8", "Unsigned16", "Unsigned32", "Integer", "Integer16", "Real", "Double", "OctetString", "CharacterString", "BitString", "Enumerated", "Date", "Time", "Array", "DateTime", "Long", "String", "Duration"]),
        seuilMin: {
          value: min,
          active: false
        },
        seuilMax: {
          value: max,
          active: false
        },
        alarmType: new Choice(1, ["min", "normal", "max"]),
        oldAlarmType: oldAlarmType,
        dataNature: dataNature,
        currentLog: new Model()
      });
      if (typeof dataType !== "undefined") this.dataType.set(dataType);
      if (typeof alarmType !== "undefined") this.dataType.set(alarmType);
    }
  }

}

var _default = SpinalEndpoint;
exports.default = _default;
spinalCore.register_models([SpinalEndpoint]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxFbmRwb2ludC5qcyJdLCJuYW1lcyI6WyJzcGluYWxDb3JlIiwicmVxdWlyZSIsImdsb2JhbFR5cGUiLCJ3aW5kb3ciLCJnbG9iYWwiLCJTcGluYWxFbmRwb2ludCIsIk1vZGVsIiwiY29uc3RydWN0b3IiLCJfbmFtZSIsInBhdGgiLCJjdXJyZW50VmFsdWUiLCJ1bml0IiwiZGF0YVR5cGUiLCJtaW4iLCJtYXgiLCJkYXRhTmF0dXJlIiwiYWxhcm1UeXBlIiwib2xkQWxhcm1UeXBlIiwibmFtZSIsIkZpbGVTeXN0ZW0iLCJfc2lnX3NlcnZlciIsImFkZF9hdHRyIiwiaWQiLCJDaG9pY2UiLCJzZXVpbE1pbiIsInZhbHVlIiwiYWN0aXZlIiwic2V1aWxNYXgiLCJjdXJyZW50TG9nIiwic2V0IiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBRkEsTUFBTUEsVUFBVSxHQUFHQyxPQUFPLENBQUMseUJBQUQsQ0FBMUI7O0FBQ0EsTUFBTUMsVUFBVSxHQUFHLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRCxNQUE1RDs7QUFPQSxNQUFNRSxjQUFOLFNBQTZCSCxVQUFVLENBQUNJLEtBQXhDLENBQThDO0FBQzVDOzs7Ozs7Ozs7Ozs7O0FBYUFDLEVBQUFBLFdBQVcsQ0FBQ0MsS0FBSyxHQUFHLEVBQVQsRUFBYUMsSUFBSSxHQUFHLEVBQXBCLEVBQXdCQyxZQUFZLEdBQUcsQ0FBdkMsRUFBMENDLElBQUksR0FBRyxFQUFqRCxFQUFxREMsUUFBckQsRUFDVEMsR0FBRyxHQUNILENBRlMsRUFHVEMsR0FBRyxHQUNILENBSlMsRUFLVEMsVUFBVSxHQUFHLEVBTEosRUFNVEMsU0FOUyxFQU9UQyxZQUFZLEdBQUcsUUFQTixFQVFUQyxJQUFJLEdBQ0osZ0JBVFMsRUFTUztBQUNsQjs7QUFDQSxRQUFJQyxVQUFVLENBQUNDLFdBQWYsRUFBNEI7QUFDMUIsV0FBS0MsUUFBTCxDQUFjO0FBQ1pDLFFBQUFBLEVBQUUsRUFBRSxxQkFBSyxLQUFLZixXQUFMLENBQWlCVyxJQUF0QixDQURRO0FBRVpBLFFBQUFBLElBQUksRUFBRVYsS0FGTTtBQUdaQyxRQUFBQSxJQUFJLEVBQUVBLElBSE07QUFJWkMsUUFBQUEsWUFBWSxFQUFFQSxZQUpGO0FBS1pDLFFBQUFBLElBQUksRUFBRUEsSUFMTTtBQU1aQyxRQUFBQSxRQUFRLEVBQUUsSUFBSVcsTUFBSixDQUFXLENBQVgsRUFBYyxDQUFDLE1BQUQsRUFBUyxTQUFULEVBQW9CLFVBQXBCLEVBQ3RCLFdBRHNCLEVBQ1QsWUFEUyxFQUNLLFlBREwsRUFDbUIsU0FEbkIsRUFFdEIsV0FGc0IsRUFFVCxNQUZTLEVBRUQsUUFGQyxFQUVTLGFBRlQsRUFHdEIsaUJBSHNCLEVBR0gsV0FIRyxFQUdVLFlBSFYsRUFHd0IsTUFIeEIsRUFJdEIsTUFKc0IsRUFJZCxPQUpjLEVBSUwsVUFKSyxFQUlPLE1BSlAsRUFJZSxRQUpmLEVBSXlCLFVBSnpCLENBQWQsQ0FORTtBQVlaQyxRQUFBQSxRQUFRLEVBQUU7QUFDUkMsVUFBQUEsS0FBSyxFQUFFWixHQURDO0FBRVJhLFVBQUFBLE1BQU0sRUFBRTtBQUZBLFNBWkU7QUFnQlpDLFFBQUFBLFFBQVEsRUFBRTtBQUNSRixVQUFBQSxLQUFLLEVBQUVYLEdBREM7QUFFUlksVUFBQUEsTUFBTSxFQUFFO0FBRkEsU0FoQkU7QUFvQlpWLFFBQUFBLFNBQVMsRUFBRSxJQUFJTyxNQUFKLENBQVcsQ0FBWCxFQUFjLENBQUMsS0FBRCxFQUFRLFFBQVIsRUFBa0IsS0FBbEIsQ0FBZCxDQXBCQztBQXFCWk4sUUFBQUEsWUFBWSxFQUFFQSxZQXJCRjtBQXNCWkYsUUFBQUEsVUFBVSxFQUFFQSxVQXRCQTtBQXVCWmEsUUFBQUEsVUFBVSxFQUFFLElBQUl0QixLQUFKO0FBdkJBLE9BQWQ7QUEwQkEsVUFBSSxPQUFPTSxRQUFQLEtBQW9CLFdBQXhCLEVBQ0UsS0FBS0EsUUFBTCxDQUFjaUIsR0FBZCxDQUFrQmpCLFFBQWxCO0FBRUYsVUFBSSxPQUFPSSxTQUFQLEtBQXFCLFdBQXpCLEVBQ0UsS0FBS0osUUFBTCxDQUFjaUIsR0FBZCxDQUFrQmIsU0FBbEI7QUFDSDtBQUNGOztBQTFEMkM7O2VBNEQvQlgsYzs7QUFDZkwsVUFBVSxDQUFDOEIsZUFBWCxDQUEyQixDQUFDekIsY0FBRCxDQUEzQiIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNwaW5hbENvcmUgPSByZXF1aXJlKFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNcIik7XG5jb25zdCBnbG9iYWxUeXBlID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHdpbmRvdztcbmltcG9ydCB7XG4gIGd1aWRcbn0gZnJvbSBcIi4vVXRpbGl0aWVzXCI7XG5cblxuXG5jbGFzcyBTcGluYWxFbmRwb2ludCBleHRlbmRzIGdsb2JhbFR5cGUuTW9kZWwge1xuICAvKipcbiAgICpDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFNwaW5hbEVuZHBvaW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW19uYW1lPVwiXCJdXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbcGF0aD1cIlwiXVxuICAgKiBAcGFyYW0ge251bWJlcn0gW2N1cnJlbnRWYWx1ZT0wXVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3VuaXQ9XCJcIl1cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtkYXRhVHlwZT1cIk51bGxcIl1cbiAgICogQHBhcmFtIHtPYmp9IFtzZXVpbE1pbj17dmFsdWU6IDAsYWN0aXZlIDogZmFsc2V9XVxuICAgKiBAcGFyYW0ge09ian0gW3NldWlsTWF4PXt2YWx1ZTowLGFjdGl2ZTogZmFsc2V9XVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2RhdGFOYXR1cmU9XCJcIl0gZXhhbXBsZSA6IHRlbXBlcmF0dXJlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbbmFtZT1cIlNwaW5hbEVuZHBvaW50XCJdXG4gICAqIEBtZW1iZXJvZiBTcGluYWxFbmRwb2ludFxuICAgKi9cbiAgY29uc3RydWN0b3IoX25hbWUgPSBcIlwiLCBwYXRoID0gXCJcIiwgY3VycmVudFZhbHVlID0gMCwgdW5pdCA9IFwiXCIsIGRhdGFUeXBlLFxuICAgIG1pbiA9XG4gICAgMCxcbiAgICBtYXggPVxuICAgIDAsXG4gICAgZGF0YU5hdHVyZSA9IFwiXCIsXG4gICAgYWxhcm1UeXBlLFxuICAgIG9sZEFsYXJtVHlwZSA9IFwibm9ybWFsXCIsXG4gICAgbmFtZSA9XG4gICAgXCJTcGluYWxFbmRwb2ludFwiKSB7XG4gICAgc3VwZXIoKTtcbiAgICBpZiAoRmlsZVN5c3RlbS5fc2lnX3NlcnZlcikge1xuICAgICAgdGhpcy5hZGRfYXR0cih7XG4gICAgICAgIGlkOiBndWlkKHRoaXMuY29uc3RydWN0b3IubmFtZSksXG4gICAgICAgIG5hbWU6IF9uYW1lLFxuICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICBjdXJyZW50VmFsdWU6IGN1cnJlbnRWYWx1ZSxcbiAgICAgICAgdW5pdDogdW5pdCxcbiAgICAgICAgZGF0YVR5cGU6IG5ldyBDaG9pY2UoMCwgW1wiTnVsbFwiLCBcIkJvb2xlYW5cIiwgXCJVbnNpZ25lZFwiLFxuICAgICAgICAgIFwiVW5zaWduZWQ4XCIsIFwiVW5zaWduZWQxNlwiLCBcIlVuc2lnbmVkMzJcIiwgXCJJbnRlZ2VyXCIsXG4gICAgICAgICAgXCJJbnRlZ2VyMTZcIiwgXCJSZWFsXCIsIFwiRG91YmxlXCIsIFwiT2N0ZXRTdHJpbmdcIixcbiAgICAgICAgICBcIkNoYXJhY3RlclN0cmluZ1wiLCBcIkJpdFN0cmluZ1wiLCBcIkVudW1lcmF0ZWRcIiwgXCJEYXRlXCIsXG4gICAgICAgICAgXCJUaW1lXCIsIFwiQXJyYXlcIiwgXCJEYXRlVGltZVwiLCBcIkxvbmdcIiwgXCJTdHJpbmdcIiwgXCJEdXJhdGlvblwiXG4gICAgICAgIF0pLFxuICAgICAgICBzZXVpbE1pbjoge1xuICAgICAgICAgIHZhbHVlOiBtaW4sXG4gICAgICAgICAgYWN0aXZlOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICBzZXVpbE1heDoge1xuICAgICAgICAgIHZhbHVlOiBtYXgsXG4gICAgICAgICAgYWN0aXZlOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICBhbGFybVR5cGU6IG5ldyBDaG9pY2UoMSwgW1wibWluXCIsIFwibm9ybWFsXCIsIFwibWF4XCJdKSxcbiAgICAgICAgb2xkQWxhcm1UeXBlOiBvbGRBbGFybVR5cGUsXG4gICAgICAgIGRhdGFOYXR1cmU6IGRhdGFOYXR1cmUsXG4gICAgICAgIGN1cnJlbnRMb2c6IG5ldyBNb2RlbCgpXG4gICAgICB9KTtcblxuICAgICAgaWYgKHR5cGVvZiBkYXRhVHlwZSAhPT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgdGhpcy5kYXRhVHlwZS5zZXQoZGF0YVR5cGUpO1xuXG4gICAgICBpZiAodHlwZW9mIGFsYXJtVHlwZSAhPT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgdGhpcy5kYXRhVHlwZS5zZXQoYWxhcm1UeXBlKTtcbiAgICB9XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFNwaW5hbEVuZHBvaW50O1xuc3BpbmFsQ29yZS5yZWdpc3Rlcl9tb2RlbHMoW1NwaW5hbEVuZHBvaW50XSkiXX0=