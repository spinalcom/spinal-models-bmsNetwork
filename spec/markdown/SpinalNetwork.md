<a name="SpinalNetwork"></a>

## SpinalNetwork ⇐ <code>globalType.Model</code>
**Kind**: global class  
**Extends**: <code>globalType.Model</code>  

* [SpinalNetwork](#SpinalNetwork) ⇐ <code>globalType.Model</code>
    * _instance_
        * [.connect()](#SpinalNetwork+connect)
        * [.disconnect()](#SpinalNetwork+disconnect)
        * [.discover([options])](#SpinalNetwork+discover)
        * [.read([endpointId], [options])](#SpinalNetwork+read)
        * [.write([endpointId], [options])](#SpinalNetwork+write)
        * [.getDevice([deviceId], [options])](#SpinalNetwork+getDevice)
        * [.getEndpoint([endpointId], [options])](#SpinalNetwork+getEndpoint)
        * [.subscribe([endpointList], [options])](#SpinalNetwork+subscribe)
        * [.unsubscribe([endpointList], [options])](#SpinalNetwork+unsubscribe)
    * _static_
        * [.SpinalNetwork](#SpinalNetwork.SpinalNetwork)
            * [new SpinalNetwork([_name], [type], [host], [user], [password], [options], [name])](#new_SpinalNetwork.SpinalNetwork_new)

<a name="SpinalNetwork+connect"></a>

### spinalNetwork.connect()
Connects to the network if it's necessary to have a persistent session

**Kind**: instance method of [<code>SpinalNetwork</code>](#SpinalNetwork)  
<a name="SpinalNetwork+disconnect"></a>

### spinalNetwork.disconnect()
Disconnects of the network if previously signed in

**Kind**: instance method of [<code>SpinalNetwork</code>](#SpinalNetwork)  
<a name="SpinalNetwork+discover"></a>

### spinalNetwork.discover([options])
Returns a container of SpinalDevices and SpinalEndpoints

**Kind**: instance method of [<code>SpinalNetwork</code>](#SpinalNetwork)  

| Param | Type |
| --- | --- |
| [options] | <code>object</code> | 

<a name="SpinalNetwork+read"></a>

### spinalNetwork.read([endpointId], [options])
Reads the value of an endpoint

**Kind**: instance method of [<code>SpinalNetwork</code>](#SpinalNetwork)  

| Param | Type |
| --- | --- |
| [endpointId] | <code>string</code> | 
| [options] | <code>object</code> | 

<a name="SpinalNetwork+write"></a>

### spinalNetwork.write([endpointId], [options])
Writes the value to an endpoint

**Kind**: instance method of [<code>SpinalNetwork</code>](#SpinalNetwork)  

| Param | Type |
| --- | --- |
| [endpointId] | <code>string</code> | 
| [options] | <code>object</code> | 

<a name="SpinalNetwork+getDevice"></a>

### spinalNetwork.getDevice([deviceId], [options])
Returns a SpinalDevice

**Kind**: instance method of [<code>SpinalNetwork</code>](#SpinalNetwork)  

| Param | Type |
| --- | --- |
| [deviceId] | <code>string</code> | 
| [options] | <code>object</code> | 

<a name="SpinalNetwork+getEndpoint"></a>

### spinalNetwork.getEndpoint([endpointId], [options])
Returns an SpinalEndpoint

**Kind**: instance method of [<code>SpinalNetwork</code>](#SpinalNetwork)  

| Param | Type |
| --- | --- |
| [endpointId] | <code>string</code> | 
| [options] | <code>object</code> | 

<a name="SpinalNetwork+subscribe"></a>

### spinalNetwork.subscribe([endpointList], [options])
Invoces a callback when new events arrive

**Kind**: instance method of [<code>SpinalNetwork</code>](#SpinalNetwork)  

| Param | Type |
| --- | --- |
| [endpointList] | <code>array</code> | 
| [options] | <code>object</code> | 

<a name="SpinalNetwork+unsubscribe"></a>

### spinalNetwork.unsubscribe([endpointList], [options])
Cancels notification of new events

**Kind**: instance method of [<code>SpinalNetwork</code>](#SpinalNetwork)  

| Param | Type |
| --- | --- |
| [endpointList] | <code>array</code> | 
| [options] | <code>object</code> | 

<a name="SpinalNetwork.SpinalNetwork"></a>

### SpinalNetwork.SpinalNetwork
**Kind**: static class of [<code>SpinalNetwork</code>](#SpinalNetwork)  
<a name="new_SpinalNetwork.SpinalNetwork_new"></a>

#### new SpinalNetwork([_name], [type], [host], [user], [password], [options], [name])
Creates an instance of SpinalNetwork.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_name] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> |  |
| [type] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> |  |
| [host] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> |  |
| [user] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> |  |
| [password] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> |  |
| [options] | <code>Model</code> | <code>new Ptr(0)</code> | mod_attr to change it |
| [name] | <code>string</code> | <code>&quot;\&quot;SpinalNetwork\&quot;&quot;</code> |  |

