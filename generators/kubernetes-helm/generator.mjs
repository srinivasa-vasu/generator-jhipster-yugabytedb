import chalk from 'chalk';
import KubernetesHelmGenerator from 'generator-jhipster/esm/generators/kubernetes-helm';
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

export default class extends KubernetesHelmGenerator {
  constructor(args, opts, features) {
    super(args, opts, { taskPrefix: PRIORITY_PREFIX, ...features });

    if (this.options.help) return;

    if (!this.options.jhipsterContext) {
      throw new Error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints yugabytedb')}`);
    }
  }

  get [INITIALIZING_PRIORITY]() {
    return {
      ...super._initializing(),
      async initializingTemplateTask() {},
    };
  }

  get [PROMPTING_PRIORITY]() {
    return {
      ...super._prompting(),
      async promptingTemplateTask() {},
    };
  }

  get [CONFIGURING_PRIORITY]() {
    return {
      ...super._configuring(),
      async configuringTemplateTask() {},
    };
  }

  get [COMPOSING_PRIORITY]() {
    return {
      ...super._composing(),
      async composingTemplateTask() {},
    };
  }

  get [LOADING_PRIORITY]() {
    return {
      ...super._loading(),
      async loadingTemplateTask() {},
    };
  }

  get [PREPARING_PRIORITY]() {
    return {
      ...super._preparing(),
      async preparingTemplateTask() {},
    };
  }

  get [DEFAULT_PRIORITY]() {
    return {
      ...super._default(),
      async defaultTemplateTask() {},
    };
  }

  get [WRITING_PRIORITY]() {
    return {
      ...super._writing(),
      async writingTemplateTask() {
        await this.writeFiles({
          sections: {
            files: [{ templates: ['template-file-kubernetes-helm'] }],
          },
          context: this,
        });
      },
    };
  }

  get [POST_WRITING_PRIORITY]() {
    return {
      ...super._postWriting(),
      async postWritingTemplateTask() {},
    };
  }

  get [INSTALL_PRIORITY]() {
    return {
      ...super._install(),
      async installTemplateTask() {},
    };
  }

  get [END_PRIORITY]() {
    return {
      ...super._end(),
      async endTemplateTask() {},
    };
  }
}
