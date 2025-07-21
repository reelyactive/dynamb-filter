/**
 * Copyright reelyActive 2025
 * We believe in an open Internet of Things
 */


/**
 * DynambFilter Class
 * Maintain and apply filter parameters for dynambs.
 */
class DynambFilter {

  /**
   * DynambFilter constructor
   * @param {Object} parameters The filter parameters.
   * @constructor
   */
  constructor(parameters) {
    parameters = parameters || {};

    if(parameters.hasOwnProperty('acceptedDeviceSignatures') &&
       Array.isArray(parameters.acceptedDeviceSignatures)) {
      this.acceptedDeviceSignatures = parameters.acceptedDeviceSignatures;
    }

    if(parameters.hasOwnProperty('acceptedDeviceIds') &&
       Array.isArray(parameters.acceptedDeviceIds)) {
      this.acceptedDeviceIds = parameters.acceptedDeviceIds;
    }

    if(parameters.hasOwnProperty('acceptedDeviceIdTypes') &&
       Array.isArray(parameters.acceptedDeviceIdTypes)) {
      this.acceptedDeviceIdTypes = parameters.acceptedDeviceIdTypes;
    }

    if(parameters.hasOwnProperty('acceptedProperties') &&
       Array.isArray(parameters.acceptedProperties)) {
      this.acceptedProperties = parameters.acceptedProperties;
    }
  }

  /**
   * Does the filter observe an acceptedDeviceSignatures parameter?
   */
  get hasAcceptedDeviceSignatures() {
    return this.hasOwnProperty('acceptedDeviceSignatures');
  }

  /**
   * Does the filter observe an acceptedDeviceIds parameter?
   */
  get hasAcceptedDeviceIds() {
    return this.hasOwnProperty('acceptedDeviceIds');
  }

  /**
   * Does the filter observe an acceptedDeviceIdTypes parameter?
   */
  get hasAcceptedDeviceIdTypes() {
    return this.hasOwnProperty('acceptedDeviceIdTypes');
  }

  /**
   * Does the filter observe an acceptedProperties parameter?
   */
  get hasAcceptedProperties() {
    return this.hasOwnProperty('acceptedProperties');
  }

  /**
   * Does the given dynamb pass the filters?.
   * @param {Object} dynamb The dynamb to test against the filters.
   */
  isPassing(dynamb) {
    if(this.hasAcceptedDeviceSignatures &&
       !testAcceptedDeviceSignatures(this, dynamb)) {
      return false;
    }
    if(this.hasAcceptedDeviceIdTypes &&
       !testAcceptedDeviceIdTypes(this, dynamb)) {
      return false;
    }
    if(this.hasAcceptedDeviceIds &&
       !testAcceptedDeviceIds(this, dynamb)) {
      return false;
    }
    if(this.hasAcceptedProperties && !testAcceptedProperties(this, dynamb)) {
      return false;
    }
    return true;
  }

}


/**
 * Test if the given dynamb passes the given accepted deviceSignatures.
 * @param {DynambFilter} instance The filter instance.
 * @param {Object} dynamb The given dynamb.
 */
function testAcceptedDeviceSignatures(instance, dynamb) {
  let acceptedDeviceSignatures = instance.acceptedDeviceSignatures;
  let signature = dynamb.deviceId + '/' + dynamb.deviceIdType;

  return acceptedDeviceSignatures.includes(signature);
}


/**
 * Test if the given dynamb passes the given accepted deviceIds.
 * @param {DynambFilter} instance The filter instance.
 * @param {Object} dynamb The given dynamb.
 */
function testAcceptedDeviceIds(instance, dynamb) {
  let acceptedDeviceIds = instance.acceptedDeviceIds;

  return acceptedDeviceIds.includes(dynamb.deviceId);
}


/**
 * Test if the given dynamb passes the given accepted deviceIdTypes.
 * @param {DynambFilter} instance The filter instance.
 * @param {Object} dynamb The given dynamb.
 */
function testAcceptedDeviceIdTypes(instance, dynamb) {
  let acceptedDeviceIdTypes = instance.acceptedDeviceIdTypes;

  return acceptedDeviceIdTypes.includes(dynamb.deviceIdType);
}


/**
 * Test if the given dynamb passes the given accepted properties.
 * @param {DynambFilter} instance The filter instance.
 * @param {Object} dynamb The given dynamb.
 */
function testAcceptedProperties(instance, dynamb) {
  let acceptedProperties = instance.acceptedProperties;
  let hasAcceptedProperty = false;

  for(const property in dynamb) {
    if((property !== 'deviceId') && (property !== 'deviceIdType') &&
       (property !== 'timestamp') && acceptedProperties.includes(property)) {
      hasAcceptedProperty = true;
    }
  }

  return hasAcceptedProperty;
}


module.exports = DynambFilter;
