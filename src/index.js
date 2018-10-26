const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;



import SpinalDevice from './SpinalDevice';
import SpinalEndpoint from './SpinalEndpoint';
import SpinalLog from './SpinalLog';
import SpinalNetwork from './SpinalNetwork';

export {
  SpinalDevice,
  SpinalEndpoint,
  SpinalLog,
  SpinalNetwork
}