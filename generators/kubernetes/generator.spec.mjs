import prom from 'expect';

import { helpers, lookups } from '#test-utils';

const SUB_GENERATOR = 'kubernetes';
const BLUEPRINT_NAMESPACE = `jhipster:${SUB_GENERATOR}`;
const { expect } = prom;

describe('SubGenerator kubernetes of yugabytedb JHipster blueprint', () => {
  describe('micro', () => {
    let result;
    before(async function () {
      result = await helpers
        .create(BLUEPRINT_NAMESPACE)
        .withOptions({
          reproducible: true,
          defaults: true,
          blueprint: 'yugabytedb',
        })
        .withPrompts({
          deploymentApplicationType: 'microservice',
          directoryPath: './',
          adminPassword: 'meetup',
          dockerRepositoryName: 'jhipsterrepository',
          dockerPushCommand: 'docker push',
          kubernetesNamespace: 'jhipsternamespace',
          istio: false,
        })
        .withLookups(lookups)
        .run();
    });

    it('should succeed', () => {
      expect(result.getStateSnapshot()).toMatchSnapshot();
    });
  });

  describe('mono', () => {
    let result;
    before(async function () {
      result = await helpers
        .create(BLUEPRINT_NAMESPACE)
        .withOptions({
          reproducible: true,
          defaults: true,
          blueprint: 'yugabytedb',
        })
        .withPrompts({
          deploymentApplicationType: 'monolith',
          directoryPath: './',
          adminPassword: 'meetup',
          dockerRepositoryName: 'jhipsterrepository',
          dockerPushCommand: 'docker push',
          kubernetesNamespace: 'jhipsternamespace',
          istio: false,
        })
        .withLookups(lookups)
        .run();
    });

    it('should succeed', () => {
      expect(result.getStateSnapshot()).toMatchSnapshot();
    });
  });
});
