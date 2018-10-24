"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Utilities = require("../Utilities.js");

var _SpinalEndpoint = require("./SpinalEndpoint");

var _SpinalEndpoint2 = _interopRequireDefault(_SpinalEndpoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;

/**
 * @class SpinalLog
 * @extends {Model}
 */
class SpinalLog extends globalType.Model {
  /**
   * 
   * @param {string} endpointName 
   * @param {string} type 
   * @param {string} user 
   * @param {string} message 
   * @param {SpinalEndpoint} endpointNode 
   * @param {number} value 
   */
  constructor(endpointName, type, user, message, endpointNode, value) {
    super();
    this.add_attr({
      id: _Utilities.Utilities.guid(type),
      name: endpointName,
      type: (() => {
        if (type == "min") return "SpinalThresholdMin";
        return "SpinalThresholdMax";
      })(),
      date_begin: Date.now(),
      date_end: Date.now(),
      user: user,
      message: message,
      value: value,
      endpoint: new Ptr(endpointNode)

    });
  }
}

exports.default = SpinalLog;

spinalCore.register_models([SpinalLog]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxMb2cuanMiXSwibmFtZXMiOlsic3BpbmFsQ29yZSIsInJlcXVpcmUiLCJnbG9iYWxUeXBlIiwid2luZG93IiwiZ2xvYmFsIiwiU3BpbmFsTG9nIiwiTW9kZWwiLCJjb25zdHJ1Y3RvciIsImVuZHBvaW50TmFtZSIsInR5cGUiLCJ1c2VyIiwibWVzc2FnZSIsImVuZHBvaW50Tm9kZSIsInZhbHVlIiwiYWRkX2F0dHIiLCJpZCIsIlV0aWxpdGllcyIsImd1aWQiLCJuYW1lIiwiZGF0ZV9iZWdpbiIsIkRhdGUiLCJub3ciLCJkYXRlX2VuZCIsImVuZHBvaW50IiwiUHRyIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7QUFHQTs7Ozs7O0FBTEEsTUFBTUEsYUFBYUMsUUFBUSx5QkFBUixDQUFuQjtBQUNBLE1BQU1DLGFBQWEsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixHQUFnQ0MsTUFBaEMsR0FBeUNELE1BQTVEOztBQUtBOzs7O0FBSUEsTUFBTUUsU0FBTixTQUF3QkgsV0FBV0ksS0FBbkMsQ0FBeUM7QUFDdkM7Ozs7Ozs7OztBQVNBQyxjQUFZQyxZQUFaLEVBQTBCQyxJQUExQixFQUFnQ0MsSUFBaEMsRUFBc0NDLE9BQXRDLEVBQStDQyxZQUEvQyxFQUE2REMsS0FBN0QsRUFBb0U7QUFDbEU7QUFDQSxTQUFLQyxRQUFMLENBQWM7QUFDWkMsVUFBSUMscUJBQVVDLElBQVYsQ0FBZVIsSUFBZixDQURRO0FBRVpTLFlBQU1WLFlBRk07QUFHWkMsWUFBTSxDQUFDLE1BQU07QUFDWCxZQUFJQSxRQUFRLEtBQVosRUFDRSxPQUFPLG9CQUFQO0FBQ0YsZUFBTyxvQkFBUDtBQUNELE9BSkssR0FITTtBQVFaVSxrQkFBWUMsS0FBS0MsR0FBTCxFQVJBO0FBU1pDLGdCQUFVRixLQUFLQyxHQUFMLEVBVEU7QUFVWlgsWUFBTUEsSUFWTTtBQVdaQyxlQUFTQSxPQVhHO0FBWVpFLGFBQU9BLEtBWks7QUFhWlUsZ0JBQVUsSUFBSUMsR0FBSixDQUFRWixZQUFSOztBQWJFLEtBQWQ7QUFnQkQ7QUE1QnNDOztrQkErQjFCUCxTOztBQUNmTCxXQUFXeUIsZUFBWCxDQUEyQixDQUFDcEIsU0FBRCxDQUEzQiIsImZpbGUiOiJTcGluYWxMb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzcGluYWxDb3JlID0gcmVxdWlyZShcInNwaW5hbC1jb3JlLWNvbm5lY3RvcmpzXCIpO1xuY29uc3QgZ2xvYmFsVHlwZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3c7XG5pbXBvcnQge1xuICBVdGlsaXRpZXNcbn0gZnJvbSBcIi4uL1V0aWxpdGllcy5qc1wiO1xuaW1wb3J0IFNwaW5hbEVuZHBvaW50IGZyb20gXCIuL1NwaW5hbEVuZHBvaW50XCI7XG4vKipcbiAqIEBjbGFzcyBTcGluYWxMb2dcbiAqIEBleHRlbmRzIHtNb2RlbH1cbiAqL1xuY2xhc3MgU3BpbmFsTG9nIGV4dGVuZHMgZ2xvYmFsVHlwZS5Nb2RlbCB7XG4gIC8qKlxuICAgKiBcbiAgICogQHBhcmFtIHtzdHJpbmd9IGVuZHBvaW50TmFtZSBcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyIFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBcbiAgICogQHBhcmFtIHtTcGluYWxFbmRwb2ludH0gZW5kcG9pbnROb2RlIFxuICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgXG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbmRwb2ludE5hbWUsIHR5cGUsIHVzZXIsIG1lc3NhZ2UsIGVuZHBvaW50Tm9kZSwgdmFsdWUpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYWRkX2F0dHIoe1xuICAgICAgaWQ6IFV0aWxpdGllcy5ndWlkKHR5cGUpLFxuICAgICAgbmFtZTogZW5kcG9pbnROYW1lLFxuICAgICAgdHlwZTogKCgpID0+IHtcbiAgICAgICAgaWYgKHR5cGUgPT0gXCJtaW5cIilcbiAgICAgICAgICByZXR1cm4gXCJTcGluYWxUaHJlc2hvbGRNaW5cIjtcbiAgICAgICAgcmV0dXJuIFwiU3BpbmFsVGhyZXNob2xkTWF4XCI7XG4gICAgICB9KSgpLFxuICAgICAgZGF0ZV9iZWdpbjogRGF0ZS5ub3coKSxcbiAgICAgIGRhdGVfZW5kOiBEYXRlLm5vdygpLFxuICAgICAgdXNlcjogdXNlcixcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbmRwb2ludDogbmV3IFB0cihlbmRwb2ludE5vZGUpXG5cbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNwaW5hbExvZztcbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtTcGluYWxMb2ddKTsiXX0=