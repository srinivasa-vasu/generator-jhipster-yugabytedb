const { databaseData, Types } = require('./constants.cjs');

module.exports = {
  addSectionsCondition,
  mergeSections,
  getDBCUrl,
};

function addSectionsCondition(files, commonCondition) {
  return Object.fromEntries(
    Object.entries(files).map(([sectionName, sectionValue]) => {
      sectionValue = sectionValue.map(block => {
        const { condition } = block;
        let newCondition = commonCondition;
        if (typeof condition === 'function') {
          newCondition = (...args) => {
            return commonCondition(...args) && condition(...args);
          };
        } else if (condition !== undefined) {
          newCondition = (...args) => commonCondition(...args) && condition;
        }
        block = {
          ...block,
          condition: newCondition,
        };
        return block;
      });
      return [sectionName, sectionValue];
    })
  );
}

function mergeSections(...allFiles) {
  const generated = {};
  for (const files of allFiles) {
    for (const [sectionName, sectionValue] of Object.entries(files)) {
      generated[sectionName] = generated[sectionName] || [];
      generated[sectionName].push(...sectionValue);
    }
  }
  return generated;
}

function getDBCUrl(databaseType, protocol, options = {}) {
  if (!protocol) {
    throw new Error('protocol is required');
  }
  const { databaseName } = options;
  if (!databaseName) {
    throw new Error("option 'databaseName' is required");
  }
  if ([Types.POSTGRESQL].includes(databaseType) && !options.hostname) {
    throw new Error(`option 'hostname' is required for ${databaseType} databaseType`);
  } else if (![Types.POSTGRESQL, Types.H2_DISK, Types.H2_MEMORY].includes(databaseType)) {
    throw new Error(`${databaseType} databaseType is not supported`);
  }
  let databaseDataForType = databaseData[databaseType];
  if (databaseDataForType[protocol]) {
    databaseDataForType = {
      ...databaseDataForType,
      ...databaseDataForType[protocol],
    };
  }
  const { protocolSuffix = '', extraOptions = '', useDirectory = false } = databaseDataForType;
  let { port = '' } = databaseDataForType;
  if (useDirectory && !options.localDirectory) {
    throw new Error(`'localDirectory' option should be provided for ${databaseType} databaseType`);
  }
  const databaseHasHost = options.hostname;
  if (options.itests && H2_MEMORY === databaseType) {
    port = ':12344';
  }
  let url = `${protocol}:${protocolSuffix}`;
  if (options.localDirectory) {
    url += `${options.localDirectory}/`;
  } else {
    url += databaseHasHost ? options.hostname : databaseName;
    url += port;
  }
  if (databaseHasHost || options.localDirectory) {
    url += databaseName;
  }
  return `${url}${options.skipExtraOptions ? '' : extraOptions}`;
}
