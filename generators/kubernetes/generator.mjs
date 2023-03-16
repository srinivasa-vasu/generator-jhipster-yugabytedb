import chalk from 'chalk';
import KubernetesGenerator from 'generator-jhipster/esm/generators/kubernetes';
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
import { writeFiles } from './files.cjs';
import { k8s, constants } from '../constants.cjs';
import util from '../utils.cjs';
import { askForAPI, askForRF, askForInstanceType, askForPersistentStorage } from './prompts.cjs';

const { getDBCUrl } = util;
import crypto from 'crypto';

const YB_DSQL = 'ybdb-dsql';
const YB_DSQL_EP_SUFFIX = 'yql';

export default class extends KubernetesGenerator {
  constructor(args, opts, features) {
    super(args, opts, { taskPrefix: PRIORITY_PREFIX, ...features });

    if (this.options.help) return;

    if (!this.options.jhipsterContext) {
      throw new Error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints yugabytedb')}`);
    }
  }

  getJDBCUrl(databaseType, options = {}) {
    return getDBCUrl(databaseType, 'jdbc', options);
  }

  getR2DBCUrl(databaseType, options = {}) {
    return getDBCUrl(databaseType, 'r2dbc', options);
  }

  getDBPassword() {
    return crypto.randomBytes(32).toString('hex');
  }

  _initializing() {
    return {
      setupLocalConsts() {
        this.YBDB_REL_VERSION = constants.YBDB_REL_VERSION;
        this.KUBERNETES_POLICY_API_VERSION = k8s.KUBERNETES_POLICY_API_VERSION;
        this.KUBERNETES_CORE_API_VERSION = k8s.KUBERNETES_CORE_API_VERSION;
        this.KUBERNETES_STATEFULSET_API_VERSION = k8s.KUBERNETES_STATEFULSET_API_VERSION;
        this.KUBERNETES_JOB_API_VERSION = k8s.KUBERNETES_JOB_API_VERSION;
        this.KUBERNETES_YB_DSQL = YB_DSQL;
        this.KUBERNETES_YB_DSQL_EP_SUFFIX = YB_DSQL_EP_SUFFIX;
      },
      initLocalProps() {
        this.dsqlType = this.jhipsterConfig.dsqlType;
        this.kubernetesYBDPRuntime = this.jhipsterConfig.kubernetesYBDPRuntime || false;
        this.kubernetesYBDPRF = this.jhipsterConfig.kubernetesYBDPRF || '3';
        this.kubernetesYBDPIT = this.jhipsterConfig.kubernetesYBDPIT || 0;
      },
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
      askForAPI,
      askForRF,
      askForInstanceType,
      askForPersistentStorage,
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
      async loadingLocalPromptTask() {
        this.jhipsterConfig.kubernetesYBDPRuntime = this.kubernetesYBDPRuntime || false;
        this.jhipsterConfig.kubernetesYBDPRF = this.kubernetesYBDPRF || '3';
        this.jhipsterConfig.kubernetesYBDPIT = this.kubernetesYBDPIT || 0;
        this.masterCPU = 1;
        this.masterMemory = 1;
        this.masterMemoryLimitBytes = this.masterMemory * 1024 * 1024 * 870;
        if (this.kubernetesYBDPIT === 0) {
          this.tserverCPU = 1;
          this.tserverMemory = 1;
          this.tserverMemoryLimitBytes = this.tserverMemory * 1024 * 1024 * 870;
        } else if (this.kubernetesYBDPIT === 1) {
          this.tserverCPU = 2;
          this.tserverMemory = 8;
          this.tserverMemoryLimitBytes = this.tserverMemory * 1024 * 1024 * 870;
        } else if (this.kubernetesYBDPIT === 2) {
          this.tserverCPU = 4;
          this.tserverMemory = 16;
          this.tserverMemoryLimitBytes = this.tserverMemory * 1024 * 1024 * 870;
        } else if (this.kubernetesYBDPIT === 3) {
          this.tserverCPU = 8;
          this.tserverMemory = 32;
          this.tserverMemoryLimitBytes = this.tserverMemory * 1024 * 1024 * 870;
        } else if (this.kubernetesYBDPIT === 4) {
          this.tserverCPU = 16;
          this.tserverMemory = 64;
          this.tserverMemoryLimitBytes = this.tserverMemory * 1024 * 1024 * 870;
        } else if (this.kubernetesYBDPIT === 5) {
          this.tserverCPU = 32;
          this.tserverMemory = 128;
          this.tserverMemoryLimitBytes = this.tserverMemory * 1024 * 1024 * 870;
        } else{
          this.tserverCPU = 1;
          this.tserverMemory = 1;
          this.tserverMemoryLimitBytes = this.tserverMemory * 1024 * 1024 * 870;
        }
      },
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
