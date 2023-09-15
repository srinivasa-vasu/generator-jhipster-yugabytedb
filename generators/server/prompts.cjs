/**
 * Copyright 2019-2021 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const chalk = require('chalk');

const { Types } = require('../constants.cjs');
const {
  GATEWAY,
  MICROSERVICE,
  MONOLITH,
  EUREKA,
  CONSUL,
  NO,
  PACKAGE_NAME,
  REACTIVE,
  SQL,
  YSQL,
  YCQL,
  POSTGRESQL,
  CASSANDRA,
  DATABASE_TYPE,
  AUTHENTICATION_TYPE,
  JWT,
  OAUTH2,
  SERVICE_DISCOVERY_TYPE,
  CACHE_PROVIDER,
  EHCACHE,
  HAZELCAST,
  INFINISPAN,
  MEMCACHED,
  REDIS,
  NO_CACHE_PROVIDER,
  BUILD_TOOL,
  MAVEN,
  GRADLE,
  SESSION,
  CAFFEINE,
} = Types;

module.exports = {
  askForModuleName,
  askForServerSideOpts,
  askForOptionalItems,
};

async function askForModuleName() {
  if (this.jhipsterConfig.baseName) return undefined;

  return this.askModuleName(this);
}

async function askForServerSideOpts() {
  if (this.existingProject) return;

  const { applicationType } = this.jhipsterConfig;
  const dbOptions = [
    {
      value: POSTGRESQL,
      name: 'YugabyteDB YSQL (PostgreSQL)',
    },
    {
      value: CASSANDRA,
      name: 'YugabyteDB YCQL (Cassandra)',
    },
  ];

  const prompts = [
    {
      when: () => [MONOLITH, MICROSERVICE].includes(applicationType),
      type: 'confirm',
      name: REACTIVE,
      message: 'Do you want to make it reactive with Spring WebFlux?',
      default: REACTIVE,
    },
    {
      when: () => applicationType === GATEWAY || applicationType === MICROSERVICE,
      type: 'input',
      name: 'serverPort',
      validate: input => (/^([0-9]*)$/.test(input) ? true : 'This is not a valid port number.'),
      message:
        'As you are running in a microservice architecture, on which port would like your server to run? It should be unique to avoid port conflicts.',
      default: applicationType === 'gateway' ? '8080' : '8081',
    },
    {
      type: 'input',
      name: PACKAGE_NAME,
      validate: input =>
        /^([a-z_]{1}[a-z0-9_]*(\.[a-z_]{1}[a-z0-9_]*)*)$/.test(input)
          ? true
          : 'The package name you have provided is not a valid Java package name.',
      message: 'What is your default Java package name?',
      default: 'com.mycompany.myapp',
      store: true,
    },
    {
      when: () => applicationType === 'gateway' || applicationType === 'microservice',
      type: 'list',
      name: SERVICE_DISCOVERY_TYPE,
      message: 'Which service discovery server do you want to use?',
      choices: [
        {
          value: EUREKA,
          name: 'JHipster Registry (uses Eureka, provides Spring Cloud Config support and monitoring dashboards)',
        },
        {
          value: CONSUL,
          name: 'Consul',
        },
        {
          value: NO,
          name: 'No service discovery',
        },
      ],
      default: EUREKA,
    },
    {
      when: applicationType === MONOLITH,
      type: 'list',
      name: SERVICE_DISCOVERY_TYPE,
      message: 'Do you want to use the JHipster Registry to configure, monitor and scale your application?',
      choices: [
        {
          value: false,
          name: 'No',
        },
        {
          value: EUREKA,
          name: 'Yes',
        },
      ],
      default: false,
    },
    {
      when: props =>
        (applicationType === MONOLITH && props.serviceDiscoveryType !== EUREKA) || [GATEWAY, MICROSERVICE].includes(applicationType),
      type: 'list',
      name: AUTHENTICATION_TYPE,
      message: `Which ${chalk.yellow('*type*')} of authentication would you like to use?`,
      choices: props => {
        const opts = [
          {
            value: JWT,
            name: 'JWT authentication (stateless, with a token)',
          },
        ];
        opts.push({
          value: OAUTH2,
          name: 'OAuth 2.0 / OIDC Authentication (stateful, works with Keycloak and Okta)',
        });
        if (applicationType === MONOLITH && props.serviceDiscoveryType !== EUREKA) {
          opts.push({
            value: SESSION,
            name: 'HTTP Session Authentication (stateful, default Spring Security mechanism)',
          });
        }
        return opts;
      },
      default: 0,
    },
    {
      type: 'list',
      name: DATABASE_TYPE,
      message: `Which ${chalk.yellow('*api*')} of distributed SQL would you like to use?`,
      choices: props => {
        const opts = [];
        opts.push({
          value: POSTGRESQL,
          name: 'YSQL (Distributed PostgreSQL)',
        });
        if (props.authenticationType !== OAUTH2) {
          opts.push({
            value: CASSANDRA,
            name: 'YCQL (Cassandra)',
          });
        }
        opts.push({
          value: NO,
          name: 'No database',
        });
        return opts;
      },
      default: POSTGRESQL,
    },
    {
      when: props => !props.reactive,
      type: 'list',
      name: CACHE_PROVIDER,
      message: 'Which cache do you want to use? (Spring cache abstraction)',
      choices: [
        {
          value: EHCACHE,
          name: 'Ehcache (local cache, for a single node)',
        },
        {
          value: CAFFEINE,
          name: 'Caffeine (local cache, for a single node)',
        },
        {
          value: HAZELCAST,
          name: 'Hazelcast (distributed cache, for multiple nodes, supports rate-limiting for gateway applications)',
        },
        {
          value: INFINISPAN,
          name: 'Infinispan (hybrid cache, for multiple nodes)',
        },
        {
          value: MEMCACHED,
          name: 'Memcached (distributed cache) - Warning, when using an SQL database, this will disable the Hibernate 2nd level cache!',
        },
        {
          value: REDIS,
          name: 'Redis (distributed cache)',
        },
        {
          value: NO_CACHE_PROVIDER,
          name: 'No cache - Warning, when using an SQL database, this will disable the Hibernate 2nd level cache!',
        },
      ],
      default: applicationType === MICROSERVICE ? 2 : 0,
    },
    {
      when: props =>
        ((props.cacheProvider !== NO_CACHE_PROVIDER && props.cacheProvider !== MEMCACHED) || applicationType === GATEWAY) &&
        props.databaseType === SQL &&
        !props.reactive,
      type: 'confirm',
      name: 'enableHibernateCache',
      message: 'Do you want to use Hibernate 2nd level cache?',
      default: 0,
    },
    {
      type: 'list',
      name: BUILD_TOOL,
      message: 'Would you like to use Maven or Gradle for building the backend?',
      choices: [
        {
          value: MAVEN,
          name: 'Maven',
        },
        {
          value: GRADLE,
          name: 'Gradle',
        },
      ],
      default: MAVEN,
    },
    {
      when: props => props.buildTool === GRADLE && this.options.experimental,
      type: 'confirm',
      name: 'enableGradleEnterprise',
      message: 'Do you want to enable Gradle Enterprise integration?',
      default: false,
    },
    {
      when: props => props.enableGradleEnterprise,
      type: 'input',
      name: 'gradleEnterpriseHost',
      message: 'Enter your Gradle Enterprise host',
      validate: input => (input.length === 0 ? 'Please enter your Gradle Enterprise host' : true),
    },
  ];

  await this.prompt(prompts).then(props => {
    this.serviceDiscoveryType = this.jhipsterConfig.serviceDiscoveryType = props.serviceDiscoveryType;
    if (this.jhipsterConfig.applicationType === GATEWAY) {
      this.reactive = this.jhipsterConfig.reactive = props.reactive = true;
    } else {
      this.reactive = this.jhipsterConfig.reactive = props.reactive;
    }
    this.authenticationType = this.jhipsterConfig.authenticationType = props.authenticationType;

    this.packageName = this.jhipsterConfig.packageName = props.packageName;
    this.serverPort = this.jhipsterConfig.serverPort = props.serverPort || '8080';
    this.cacheProvider = this.jhipsterConfig.cacheProvider = !props.reactive ? props.cacheProvider : NO_CACHE_PROVIDER;
    this.enableHibernateCache = this.jhipsterConfig.enableHibernateCache = !!props.enableHibernateCache;

    this.devDatabaseType = this.jhipsterConfig.devDatabaseType = props.databaseType;
    this.prodDatabaseType = this.jhipsterConfig.prodDatabaseType = props.databaseType;
    this.searchEngine = this.jhipsterConfig.searchEngine = props.searchEngine;
    this.buildTool = this.jhipsterConfig.buildTool = props.buildTool;
    this.enableGradleEnterprise = this.jhipsterConfig.enableGradleEnterprise = props.enableGradleEnterprise;
    this.gradleEnterpriseHost = this.jhipsterConfig.gradleEnterpriseHost = props.gradleEnterpriseHost;
    if (props.databaseType === POSTGRESQL) {
      this.databaseType = this.jhipsterConfig.databaseType = SQL;
      this.dsqlType = this.jhipsterConfig.dsqlType = YSQL;
    }
    if (props.databaseType === CASSANDRA) {
      this.dsqlType = this.jhipsterConfig.dsqlType = YCQL;
    }
  });
}

async function askForOptionalItems() {
  if (this.existingProject) return;

  const applicationType = this.jhipsterConfig.applicationType;
  const reactive = this.jhipsterConfig.reactive;
  const databaseType = this.jhipsterConfig.databaseType;

  const choices = [];
  const defaultChoice = [];
  if (SQL === databaseType) {
    choices.push({
      name: 'Elasticsearch as search engine',
      value: 'searchEngine:elasticsearch',
    });
  }
  if (!reactive) {
    if (applicationType === MONOLITH || applicationType === GATEWAY) {
      choices.push({
        name: 'WebSockets using Spring Websocket',
        value: 'websocket:spring-websocket',
      });
    }
  }
  choices.push({
    name: 'Apache Kafka as asynchronous messages broker',
    value: 'messageBroker:kafka',
  });
  choices.push({
    name: 'API first development using OpenAPI-generator',
    value: 'enableSwaggerCodegen:true',
  });

  const PROMPTS = {
    type: 'checkbox',
    name: 'serverSideOptions',
    message: 'Which other technologies would you like to use?',
    choices,
    default: defaultChoice,
  };

  if (choices.length > 0) {
    return this.prompt(PROMPTS).then(props => {
      this.serverSideOptions = this.jhipsterConfig.serverSideOptions = props.serverSideOptions;
      this.websocket = this.jhipsterConfig.websocket = this.getOptionFromArray(props.serverSideOptions, 'websocket');
      this.searchEngine = this.jhipsterConfig.searchEngine = this.getOptionFromArray(props.serverSideOptions, 'searchEngine');
      this.messageBroker = this.jhipsterConfig.messageBroker = this.getOptionFromArray(props.serverSideOptions, 'messageBroker');
      this.enableSwaggerCodegen = this.jhipsterConfig.enableSwaggerCodegen = this.getOptionFromArray(
        props.serverSideOptions,
        'enableSwaggerCodegen'
      );
      // Only set this option if it hasn't been set in a previous question, as it's only optional for monoliths
      if (!this.jhipsterConfig.serviceDiscoveryType) {
        this.serviceDiscoveryType = this.jhipsterConfig.serviceDiscoveryType = this.getOptionFromArray(
          props.serverSideOptions,
          'serviceDiscoveryType'
        );
      }
    });
  }
  return undefined;
}
