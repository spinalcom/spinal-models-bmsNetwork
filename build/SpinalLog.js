"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Utilities = require("./Utilities");

var _SpinalEndpoint = _interopRequireDefault(require("./SpinalEndpoint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const spinalCore = require("spinal-core-connectorjs");

const globalType = typeof window === "undefined" ? global : window;

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
      id: (0, _Utilities.guid)(type),
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

var _default = SpinalLog;
exports.default = _default;
spinalCore.register_models([SpinalLog]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxMb2cuanMiXSwibmFtZXMiOlsic3BpbmFsQ29yZSIsInJlcXVpcmUiLCJnbG9iYWxUeXBlIiwid2luZG93IiwiZ2xvYmFsIiwiU3BpbmFsTG9nIiwiTW9kZWwiLCJjb25zdHJ1Y3RvciIsImVuZHBvaW50TmFtZSIsInR5cGUiLCJ1c2VyIiwibWVzc2FnZSIsImVuZHBvaW50Tm9kZSIsInZhbHVlIiwiYWRkX2F0dHIiLCJpZCIsIm5hbWUiLCJkYXRlX2JlZ2luIiwiRGF0ZSIsIm5vdyIsImRhdGVfZW5kIiwiZW5kcG9pbnQiLCJQdHIiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7QUFHQTs7OztBQUxBLE1BQU1BLFVBQVUsR0FBR0MsT0FBTyxDQUFDLHlCQUFELENBQTFCOztBQUNBLE1BQU1DLFVBQVUsR0FBRyxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQyxNQUFoQyxHQUF5Q0QsTUFBNUQ7O0FBT0EsTUFBTUUsU0FBTixTQUF3QkgsVUFBVSxDQUFDSSxLQUFuQyxDQUF5QztBQUN2Qzs7Ozs7Ozs7O0FBU0FDLEVBQUFBLFdBQVcsQ0FBQ0MsWUFBRCxFQUFlQyxJQUFmLEVBQXFCQyxJQUFyQixFQUEyQkMsT0FBM0IsRUFBb0NDLFlBQXBDLEVBQWtEQyxLQUFsRCxFQUF5RDtBQUNsRTtBQUNBLFNBQUtDLFFBQUwsQ0FBYztBQUNaQyxNQUFBQSxFQUFFLEVBQUUscUJBQUtOLElBQUwsQ0FEUTtBQUVaTyxNQUFBQSxJQUFJLEVBQUVSLFlBRk07QUFHWkMsTUFBQUEsSUFBSSxFQUFFLENBQUMsTUFBTTtBQUNYLFlBQUlBLElBQUksSUFBSSxLQUFaLEVBQ0UsT0FBTyxvQkFBUDtBQUNGLGVBQU8sb0JBQVA7QUFDRCxPQUpLLEdBSE07QUFRWlEsTUFBQUEsVUFBVSxFQUFFQyxJQUFJLENBQUNDLEdBQUwsRUFSQTtBQVNaQyxNQUFBQSxRQUFRLEVBQUVGLElBQUksQ0FBQ0MsR0FBTCxFQVRFO0FBVVpULE1BQUFBLElBQUksRUFBRUEsSUFWTTtBQVdaQyxNQUFBQSxPQUFPLEVBQUVBLE9BWEc7QUFZWkUsTUFBQUEsS0FBSyxFQUFFQSxLQVpLO0FBYVpRLE1BQUFBLFFBQVEsRUFBRSxJQUFJQyxHQUFKLENBQVFWLFlBQVI7QUFiRSxLQUFkO0FBZ0JEOztBQTVCc0M7O2VBK0IxQlAsUzs7QUFDZkwsVUFBVSxDQUFDdUIsZUFBWCxDQUEyQixDQUFDbEIsU0FBRCxDQUEzQiIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNwaW5hbENvcmUgPSByZXF1aXJlKFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNcIik7XG5jb25zdCBnbG9iYWxUeXBlID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHdpbmRvdztcbmltcG9ydCB7XG4gIGd1aWRcbn0gZnJvbSBcIi4vVXRpbGl0aWVzXCI7XG5pbXBvcnQgU3BpbmFsRW5kcG9pbnQgZnJvbSBcIi4vU3BpbmFsRW5kcG9pbnRcIjtcblxuXG5jbGFzcyBTcGluYWxMb2cgZXh0ZW5kcyBnbG9iYWxUeXBlLk1vZGVsIHtcbiAgLyoqXG4gICAqIFxuICAgKiBAcGFyYW0ge3N0cmluZ30gZW5kcG9pbnROYW1lIFxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXIgXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFxuICAgKiBAcGFyYW0ge1NwaW5hbEVuZHBvaW50fSBlbmRwb2ludE5vZGUgXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBcbiAgICovXG4gIGNvbnN0cnVjdG9yKGVuZHBvaW50TmFtZSwgdHlwZSwgdXNlciwgbWVzc2FnZSwgZW5kcG9pbnROb2RlLCB2YWx1ZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5hZGRfYXR0cih7XG4gICAgICBpZDogZ3VpZCh0eXBlKSxcbiAgICAgIG5hbWU6IGVuZHBvaW50TmFtZSxcbiAgICAgIHR5cGU6ICgoKSA9PiB7XG4gICAgICAgIGlmICh0eXBlID09IFwibWluXCIpXG4gICAgICAgICAgcmV0dXJuIFwiU3BpbmFsVGhyZXNob2xkTWluXCI7XG4gICAgICAgIHJldHVybiBcIlNwaW5hbFRocmVzaG9sZE1heFwiO1xuICAgICAgfSkoKSxcbiAgICAgIGRhdGVfYmVnaW46IERhdGUubm93KCksXG4gICAgICBkYXRlX2VuZDogRGF0ZS5ub3coKSxcbiAgICAgIHVzZXI6IHVzZXIsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW5kcG9pbnQ6IG5ldyBQdHIoZW5kcG9pbnROb2RlKVxuXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTcGluYWxMb2c7XG5zcGluYWxDb3JlLnJlZ2lzdGVyX21vZGVscyhbU3BpbmFsTG9nXSk7Il19