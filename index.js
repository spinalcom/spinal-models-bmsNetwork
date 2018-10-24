const spinalCore = require("spinal-core-connectorjs");
const globalType = typeof window === "undefined" ? global : window;



import SpinalDevice from './src/SpinalDevice';
import SpinalEndpoint from './src/SpinalEndpoint';
import SpinalEndpoint from './src/SpinalLog';
import SpinalNetwork from './src/SpinalNetwork';

export {
  SpinalDevice,
  SpinalEndpoint,
  SpinalEndpoint,
  SpinalNetwork
}