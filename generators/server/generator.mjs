import chalk from 'chalk';
import { writeFiles } from './files.cjs';
import { askForModuleName, askForServerSideOpts, askForOptionalItems } from './prompts.cjs';
import ServerGenerator from 'generator-jhipster/esm/generators/server';
import {
  PRIORITY_PREFIX,
  INITIALIZING_PRIORITY,
  PROMPTING_PRIORITY,
  CONFIGURING_PRIORITY,
  COMPOSING_PRIORITY,
  LOADING_PRIORITY,
  PREPARING_PRIORITY,
  DEFAULT_PRIORITY,
  WRITING_PRIORITY,
  POST_WRITING_PRIORITY,
  INSTALL_PRIORITY,
  END_PRIORITY,
} from 'generator-jhipster/esm/priorities';
import { constants, Types } from '../constants.cjs';
import util from '../utils.cjs';

const { getDBCUrl } = util;
const { POSTGRESQL, CASSANDRA, YSQL, YCQL, SQL } = Types;

export default class extends ServerGenerator {
  constructor(args, opts, features) {
    super(args, opts, { taskPrefix: PRIORITY_PREFIX, ...features });

    if (this.options.help) return;

    if (!this.options.jhipsterContext) {
      throw new Error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints yugabytedb')}`);
    }
    this.loadStoredAppOptions();
    this.loadRuntimeOptions();
  }

  getJDBCUrl(databaseType, options = {}) {
    return getDBCUrl(databaseType, 'jdbc', options);
  }

  getR2DBCUrl(databaseType, options = {}) {
    return getDBCUrl(databaseType, 'r2dbc', options);
  }

  _initializing() {
    return {
      setupLocalServerConsts() {
        this.YBDB_REL_VERSION = constants.YBDB_REL_VERSION;
        this.YSQL_DRIVER_VERSION = constants.YSQL_DRIVER_VERSION;
        this.YCQL_DRIVER_VERSION = constants.YCQL_DRIVER_VERSION;
        this.YBDB_DRIVER = constants.YBDB_DRIVER;
        this.YBDB_TC = constants.YBDB_TC;
      },
      initLocalProps() {
        if (this.jhipsterConfig.dsqlType !== undefined) {
          this.dsqlType = this.jhipsterConfig.dsqlType;
        } else if (this.jhipsterConfig.prodDatabaseType === CASSANDRA) {
          this.dsqlType = YCQL;
        } else if (this.jhipsterConfig.prodDatabaseType === POSTGRESQL) {
          this.dsqlType = YSQL;
        } else {
          // do nothing
        }
      },
      // overrideFakeProps() {
      //   this.skipFakeData = false; // set it to false if production
      // },
    };
  }

  get [INITIALIZING_PRIORITY]() {
    return {
      ...super._initializing(),
      ...this._initializing(),
    };
  }

  _prompting() {
    return {
      askForModuleName,
      askForServerSideOpts,
      askForOptionalItems,
    };
  }

  get [PROMPTING_PRIORITY]() {
    return {
      ...super._prompting(),
      ...this._prompting(),
    };
  }

  get [CONFIGURING_PRIORITY]() {
    return {
      ...super._configuring(),
    };
  }

  get [COMPOSING_PRIORITY]() {
    return {
      ...super._composing(),
    };
  }

  get [LOADING_PRIORITY]() {
    return {
      ...super._loading(),
    };
  }

  get [PREPARING_PRIORITY]() {
    return {
      ...super._preparing(),
    };
  }

  get [DEFAULT_PRIORITY]() {
    return {
      ...super._default(),
    };
  }

  get [WRITING_PRIORITY]() {
    return {
      ...writeFiles(),
    };
  }

  get [POST_WRITING_PRIORITY]() {
    return {
      ...super._postWriting(),
    };
  }

  get [INSTALL_PRIORITY]() {
    return {
      ...super._install(),
    };
  }

  get [END_PRIORITY]() {
    return {
      ...super._end(),
    };
  }
}
