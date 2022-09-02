/**
 * Copyright 2013-2022 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const { Types } = require('../constants.cjs');
const { POSTGRESQL, CASSANDRA } = Types;

module.exports = {
  askForAPI,
  askForPersistentStorage,
};

async function askForAPI() {
  if (this.regenerate) return;

  let merge = 0;
  this.appConfigs.forEach(appConfig => {
    if (appConfig.prodDatabaseType === POSTGRESQL || appConfig.prodDatabaseType === CASSANDRA) {
      merge = merge + 1;
    }
  });
  const prompts = [
    {
      when: () => merge >= 2,
      type: 'list',
      name: 'kubernetesYBDPRuntime',
      message: 'Do you want to have a single distributed YugabyteDB runtime?',
      choices: [
        {
          value: true,
          name: 'Yes',
        },
        {
          value: false,
          name: 'No',
        },
      ],
      default: true,
    },
  ];
  const props = await this.prompt(prompts);
  this.kubernetesYBDPRuntime = this.jhipsterConfig.kubernetesYBDPRuntime =
    props.kubernetesYBDPRuntime !== undefined ? props.kubernetesYBDPRuntime : false;
}

async function askForPersistentStorage() {
  // do nothing
  return;
}
