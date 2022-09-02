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
import { askForAPI, askForPersistentStorage } from './prompts.cjs';

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
        this.DOCKER_YBDB = constants.DOCKER_YBDB;
        this.KUBERNETES_POLICY_API_VERSION = k8s.KUBERNETES_POLICY_API_VERSION;
        this.KUBERNETES_CORE_API_VERSION = k8s.KUBERNETES_CORE_API_VERSION;
        this.KUBERNETES_STATEFULSET_API_VERSION = k8s.KUBERNETES_STATEFULSET_API_VERSION;
        this.KUBERNETES_JOB_API_VERSION = k8s.KUBERNETES_JOB_API_VERSION;
        this.KUBERNETES_YB_DSQL = YB_DSQL;
        this.KUBERNETES_YB_DSQL_EP_SUFFIX = YB_DSQL_EP_SUFFIX;
      },
      initLocalProps() {
        this.dsqlType = this.jhipsterConfig.dsqlType;
        this.kubernetesYBDPRuntime =
          this.jhipsterConfig.kubernetesYBDPRuntime !== undefined ? this.jhipsterConfig.kubernetesYBDPRuntime : false;
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
        this.jhipsterConfig.kubernetesYBDPRuntime = this.kubernetesYBDPRuntime !== undefined ? this.kubernetesYBDPRuntime : false;
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
