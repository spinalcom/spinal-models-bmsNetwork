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
  constructor(_name = "", type = "", host = "", user = "", password = "", options = new Ptr(0), name = "SpinalNetwork") {
    super();
    if (FileSystem._sig_server) {
      this.add_attr({
        id: _Utilities.Utilities.guid(this.constructor.name),
        name: _name,
        type: type,
        host: host,
        user: user,
        password: password,
        options: options
      });
    }
  }

}
exports.default = SpinalNetwork;

spinalCore.register_models([SpinalNetwork]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxOZXR3b3JrX29sZC5qcyJdLCJuYW1lcyI6WyJzcGluYWxDb3JlIiwicmVxdWlyZSIsImdsb2JhbFR5cGUiLCJ3aW5kb3ciLCJnbG9iYWwiLCJTcGluYWxOZXR3b3JrIiwiTW9kZWwiLCJjb25zdHJ1Y3RvciIsIl9uYW1lIiwidHlwZSIsImhvc3QiLCJ1c2VyIiwicGFzc3dvcmQiLCJvcHRpb25zIiwiUHRyIiwibmFtZSIsIkZpbGVTeXN0ZW0iLCJfc2lnX3NlcnZlciIsImFkZF9hdHRyIiwiaWQiLCJVdGlsaXRpZXMiLCJndWlkIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFJQTs7QUFKQSxNQUFNQSxhQUFhQyxRQUFRLHlCQUFSLENBQW5CO0FBQ0EsTUFBTUMsYUFBYSxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQyxNQUFoQyxHQUF5Q0QsTUFBNUQ7O0FBTUE7Ozs7OztBQU1BLE1BQU1FLGFBQU4sU0FBNEJILFdBQVdJLEtBQXZDLENBQTZDO0FBQzNDOzs7Ozs7Ozs7OztBQVdBQyxjQUFZQyxRQUFRLEVBQXBCLEVBQXdCQyxPQUFPLEVBQS9CLEVBQW1DQyxPQUFPLEVBQTFDLEVBQThDQyxPQUFPLEVBQXJELEVBQXlEQyxXQUFXLEVBQXBFLEVBQ0VDLFVBQVUsSUFBSUMsR0FBSixDQUFRLENBQVIsQ0FEWixFQUN3QkMsT0FDdEIsZUFGRixFQUVtQjtBQUNqQjtBQUNBLFFBQUlDLFdBQVdDLFdBQWYsRUFBNEI7QUFDMUIsV0FBS0MsUUFBTCxDQUFjO0FBQ1pDLFlBQUlDLHFCQUFVQyxJQUFWLENBQWUsS0FBS2QsV0FBTCxDQUFpQlEsSUFBaEMsQ0FEUTtBQUVaQSxjQUFNUCxLQUZNO0FBR1pDLGNBQU1BLElBSE07QUFJWkMsY0FBTUEsSUFKTTtBQUtaQyxjQUFNQSxJQUxNO0FBTVpDLGtCQUFVQSxRQU5FO0FBT1pDLGlCQUFTQTtBQVBHLE9BQWQ7QUFTRDtBQUNGOztBQTNCMEM7a0JBOEI5QlIsYTs7QUFDZkwsV0FBV3NCLGVBQVgsQ0FBMkIsQ0FBQ2pCLGFBQUQsQ0FBM0IiLCJmaWxlIjoiU3BpbmFsTmV0d29ya19vbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzcGluYWxDb3JlID0gcmVxdWlyZShcInNwaW5hbC1jb3JlLWNvbm5lY3RvcmpzXCIpO1xuY29uc3QgZ2xvYmFsVHlwZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3c7XG5cblxuaW1wb3J0IHtcbiAgVXRpbGl0aWVzXG59IGZyb20gXCIuL1V0aWxpdGllc1wiO1xuLyoqXG4gKlxuICpcbiAqIEBjbGFzcyBTcGluYWxOZXR3b3JrXG4gKiBAZXh0ZW5kcyB7Z2xvYmFsVHlwZS5Nb2RlbH1cbiAqL1xuY2xhc3MgU3BpbmFsTmV0d29yayBleHRlbmRzIGdsb2JhbFR5cGUuTW9kZWwge1xuICAvKipcbiAgICpDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFNwaW5hbE5ldHdvcmsuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbX25hbWU9XCJcIl1cbiAgICogQHBhcmFtIHtzdHJpbmd9IFt0eXBlPVwiXCJdXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbaG9zdD1cIlwiXVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3VzZXI9XCJcIl1cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtwYXNzd29yZD1cIlwiXVxuICAgKiBAcGFyYW0ge01vZGVsfSBbb3B0aW9ucz1uZXcgUHRyKDApXSAtIG1vZF9hdHRyIHRvIGNoYW5nZSBpdFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW25hbWU9XCJTcGluYWxOZXR3b3JrXCJdXG4gICAqIEBtZW1iZXJvZiBTcGluYWxOZXR3b3JrXG4gICAqL1xuICBjb25zdHJ1Y3RvcihfbmFtZSA9IFwiXCIsIHR5cGUgPSBcIlwiLCBob3N0ID0gXCJcIiwgdXNlciA9IFwiXCIsIHBhc3N3b3JkID0gXCJcIixcbiAgICBvcHRpb25zID0gbmV3IFB0cigwKSwgbmFtZSA9XG4gICAgXCJTcGluYWxOZXR3b3JrXCIpIHtcbiAgICBzdXBlcigpO1xuICAgIGlmIChGaWxlU3lzdGVtLl9zaWdfc2VydmVyKSB7XG4gICAgICB0aGlzLmFkZF9hdHRyKHtcbiAgICAgICAgaWQ6IFV0aWxpdGllcy5ndWlkKHRoaXMuY29uc3RydWN0b3IubmFtZSksXG4gICAgICAgIG5hbWU6IF9uYW1lLFxuICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICBob3N0OiBob3N0LFxuICAgICAgICB1c2VyOiB1c2VyLFxuICAgICAgICBwYXNzd29yZDogcGFzc3dvcmQsXG4gICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG59XG5leHBvcnQgZGVmYXVsdCBTcGluYWxOZXR3b3JrO1xuc3BpbmFsQ29yZS5yZWdpc3Rlcl9tb2RlbHMoW1NwaW5hbE5ldHdvcmtdKSJdfQ==