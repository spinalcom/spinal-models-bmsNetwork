const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;

import Utilities from "./Utilities";

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
        id: Utilities.guid(this.constructor.name),
        name: typeof settings.networkName != "undefined" ? settings.networkName :
          new Error('Network name not defined in config.js'),
        type: typeof settings.type != "undefined" ? settings.type : new Error(
          'Network type not defined in config.js'),
        host: typeof settings.host != "undefined" ? settings.host : '',
        user: typeof settings.user != "undefined" ? settings.user : '',
        password: typeof settings.password != "undefined" ? settings.password :
          '',
        options: settings
      });
    }
  }

  /**
   * Connects to the network if it's necessary to have a persistent session
   * @memberof SpinalNetwork
   */
  connect() {

  }

  /**
   * Disconnects of the network if previously signed in
   * @memberof SpinalNetwork
   */
  disconnect() {

  }

  /**
   * Returns a container of SpinalDevices and SpinalEndpoints
   * @param {object} [options]
   * @memberof SpinalNetwork
   */
  discover(options) {

    let total = this.options.virtualDevices

    return new Promise((res, rej) => {

      let containers = []

      for (var i = 0; i < total; i++)
        containers.push(createFakeContainer(i, this.options.endpointsPerDevice))

      res(containers)

    })

  }

  /**
   * Reads the value of an endpoint
   * @param {string} [endpointId]
   * @param {object} [options]
   * @memberof SpinalNetwork
   */
  read(endpointId, options) {

  }

  /**
   * Writes the value to an endpoint
   * @param {string} [endpointId]
   * @param {object} [options]
   * @memberof SpinalNetwork
   */
  write(endpointId, options) {

  }

  /**
   * Returns a SpinalDevice
   * @param {string} [deviceId]
   * @param {object} [options]
   * @memberof SpinalNetwork
   */
  getDevice(deviceId, options) {

  }

  /**
   * Returns an SpinalEndpoint
   * @param {string} [endpointId]
   * @param {object} [options]
   * @memberof SpinalNetwork
   */
  getEndpoint(endpointId, options) {

  }

  /**
   * Invoces a callback when new events arrive
   * @param {array} [endpointList]
   * @param {object} [options]
   * @memberof SpinalNetwork
   */
  subscribe(endpontIds, callback, options) {

    // TODO: from endpointList generate endpoints with Id and Value

    setInterval(() => {
      callback(createFakeValues(endpontIds))
    }, this.options.updateInterval);

  }

  /**
   * Cancels notification of new events
   * @param {array} [endpointList]
   * @param {object} [options]
   * @memberof SpinalNetwork
   */
  unsubscribe(endpointList, options) {

  }

}

module.exports = SpinalNetwork;
spinalCore.register_models([SpinalNetwork])