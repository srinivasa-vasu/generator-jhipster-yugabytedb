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

const { ANGULAR, REACT, VUE, ANGULAR_X } = Types;

module.exports = {
  postWriteUpdates,
};

function postWriteUpdates() {
  return{
    async postWritingTemplateTask() {
      this.template('src/main/webapp/favicon.ico', 'src/main/webapp/favicon.ico');
      this.template('src/main/webapp/ybdb_logo.svg', 'src/main/webapp/content/images/ybdb_logo.svg');
      this.template('src/main/webapp/yugabytedb-header.svg', 'src/main/webapp/content/images/yugabytedb-header.svg');

      if (this.jhipsterConfig.clientFramework === REACT) {
        this.editFile('src/main/webapp/i18n/en/home.json', content =>
          content.replace('Welcome, Java Hipster', 'Welcome, JHipster YugabyteDB blueprint!')
        );
        this.editFile('src/main/webapp/i18n/en/home.json', content =>
          content.replace('If you have any question on JHipster', 'If you have any question on YugabyteDB')
        );
        this.editFile('src/main/webapp/i18n/en/home.json', content =>
          content.replace('JHipster homepage', 'YugabyteDB homepage')
        );
        this.editFile('src/main/webapp/i18n/en/home.json', content =>
          content.replace('JHipster on Stack Overflow', 'YugabyteDB on Stack Overflow')
        );
        this.editFile('src/main/webapp/i18n/en/home.json', content =>
          content.replace('bugtracker', 'yftt')
        );
        this.editFile('src/main/webapp/i18n/en/home.json', content =>
          content.replace('JHipster bug tracker', 'YugabyteDB Tech Talks')
        );
        this.editFile('src/main/webapp/i18n/en/home.json', content =>
          content.replace('chat', 'slack')
        );
        this.editFile('src/main/webapp/i18n/en/home.json', content =>
          content.replace('JHipster public chat room', 'YugabyteDB community slack channel')
        );
        this.editFile('src/main/webapp/i18n/en/home.json', content =>
          content.replace('follow @jhipster on Twitter', 'follow @yugabyte on Twitter')
        );
        this.editFile('src/main/webapp/i18n/en/home.json', content =>
          content.replace('If you like JHipster', 'If you like YugabyteDB')
        );

        this.editFile('src/main/webapp/app/modules/home/home.tsx', content =>
          content.replace('Welcome, Java Hipster', 'Welcome, JHipster YugabyteDB blueprint!')
        );
        this.editFile('src/main/webapp/app/modules/home/home.tsx', content =>
          content.replace('JHipster homepage', 'YugabyteDB homepage')
        );
        this.editFile('src/main/webapp/app/modules/home/home.tsx', content =>
          content.replace('https://www.jhipster.tech/', 'https://www.yugabyte.com')
        );
        this.editFile('src/main/webapp/app/modules/home/home.tsx', content =>
          content.replace('https://stackoverflow.com/tags/jhipster/info', 'https://stackoverflow.com/tags/yugabytedb/info')
        );
        this.editFile('src/main/webapp/app/modules/home/home.tsx', content =>
          content.replace('home.link.bugtracker', 'home.link.yftt')
        );
        this.editFile('src/main/webapp/app/modules/home/home.tsx', content =>
          content.replace('JHipster bug tracker', 'YugabyteDB Tech Talks')
        );
        this.editFile('src/main/webapp/app/modules/home/home.tsx', content =>
          content.replace('https://github.com/jhipster/generator-jhipster/issues?state=open', 'https://www.yugabyte.com/yftt/')
        );
        this.editFile('src/main/webapp/app/modules/home/home.tsx', content =>
          content.replace('home.link.chat', 'home.link.slack')
        );
        this.editFile('src/main/webapp/app/modules/home/home.tsx', content =>
          content.replace('JHipster public chat room', 'YugabyteDB community slack channel')
        );
        this.editFile('src/main/webapp/app/modules/home/home.tsx', content =>
          content.replace('https://gitter.im/jhipster/generator-jhipster', 'https://communityinviter.com/apps/yugabyte-db/register')
        );
        this.editFile('src/main/webapp/app/modules/home/home.tsx', content =>
          content.replace('follow @jhipster on Twitter', 'follow @yugabytedb on Twitter')
        );
        this.editFile('src/main/webapp/app/modules/home/home.tsx', content =>
          content.replace('https://twitter.com/jhipster', 'https://twitter.com/yugabyte')
        );
        this.editFile('src/main/webapp/app/modules/home/home.tsx', content =>
          content.replace('If you like JHipster', 'If you like YugabyteDB')
        );
        this.editFile('src/main/webapp/app/modules/home/home.tsx', content =>
          content.replace('https://github.com/jhipster/generator-jhipster', 'https://github.com/yugabyte/yugabyte-db')
        );

        this.editFile('src/main/webapp/app/shared/layout/header/header-components.tsx', content =>
          content.replace('logo-jhipster.png', 'ybdb_logo.svg')
        );
        this.editFile('src/main/webapp/content/css/loading.css', content =>
          content.replace('logo-jhipster.png', 'ybdb_logo.svg')
        );
        this.editFile('src/main/webapp/app/modules/home/home.scss', content =>
          content.replace('jhipster_family_member_1.svg', 'yugabytedb-header.svg')
        );
        this.editFile('src/main/webapp/app/modules/home/home.scss', content =>
          content.replace('jhipster_family_member_2.svg', 'yugabytedb-header.svg')
        );
        this.editFile('src/main/webapp/app/modules/home/home.scss', content =>
          content.replace('jhipster_family_member_3.svg', 'yugabytedb-header.svg')
        );
      } else if (this.jhipsterConfig.clientFramework === ANGULAR || this.jhipsterConfig.clientFramework === ANGULAR_X) {

        this.editFile('src/main/webapp/i18n/en/home.json', content =>
          content.replace('Welcome, Java Hipster', 'Welcome, JHipster YugabyteDB blueprint!')
        );
        this.editFile('src/main/webapp/i18n/en/home.json', content =>
          content.replace('If you have any question on JHipster', 'If you have any question on YugabyteDB')
        );
        this.editFile('src/main/webapp/i18n/en/home.json', content =>
          content.replace('JHipster homepage', 'YugabyteDB homepage')
        );
        this.editFile('src/main/webapp/i18n/en/home.json', content =>
          content.replace('JHipster on Stack Overflow', 'YugabyteDB on Stack Overflow')
        );
        this.editFile('src/main/webapp/i18n/en/home.json', content =>
          content.replace('bugtracker', 'yftt')
        );
        this.editFile('src/main/webapp/i18n/en/home.json', content =>
          content.replace('JHipster bug tracker', 'YugabyteDB Tech Talks')
        );
        this.editFile('src/main/webapp/i18n/en/home.json', content =>
          content.replace('chat', 'slack')
        );
        this.editFile('src/main/webapp/i18n/en/home.json', content =>
          content.replace('JHipster public chat room', 'YugabyteDB community slack channel')
        );
        this.editFile('src/main/webapp/i18n/en/home.json', content =>
          content.replace('follow @jhipster on Twitter', 'follow @yugabyte on Twitter')
        );
        this.editFile('src/main/webapp/i18n/en/home.json', content =>
          content.replace('If you like JHipster', 'If you like YugabyteDB')
        );

        this.editFile('src/main/webapp/app/home/home.component.html', content =>
          content.replace('Welcome, Java Hipster', 'Welcome, JHipster YugabyteDB blueprint!')
        );
        this.editFile('src/main/webapp/app/home/home.component.html', content =>
          content.replace('JHipster homepage', 'YugabyteDB homepage')
        );
        this.editFile('src/main/webapp/app/home/home.component.html', content =>
          content.replace('https://www.jhipster.tech/', 'https://www.yugabyte.com')
        );
        this.editFile('src/main/webapp/app/home/home.component.html', content =>
          content.replace('https://stackoverflow.com/tags/jhipster/info', 'https://stackoverflow.com/tags/yugabytedb/info')
        );
        this.editFile('src/main/webapp/app/home/home.component.html', content =>
          content.replace('home.link.bugtracker', 'home.link.yftt')
        );
        this.editFile('src/main/webapp/app/home/home.component.html', content =>
          content.replace('JHipster bug tracker', 'YugabyteDB Tech Talks')
        );
        this.editFile('src/main/webapp/app/home/home.component.html', content =>
          content.replace('https://github.com/jhipster/generator-jhipster/issues?state=open', 'https://www.yugabyte.com/yftt/')
        );
        this.editFile('src/main/webapp/app/home/home.component.html', content =>
          content.replace('home.link.chat', 'home.link.slack')
        );
        this.editFile('src/main/webapp/app/home/home.component.html', content =>
          content.replace('JHipster public chat room', 'YugabyteDB community slack channel')
        );
        this.editFile('src/main/webapp/app/home/home.component.html', content =>
          content.replace('https://gitter.im/jhipster/generator-jhipster', 'https://communityinviter.com/apps/yugabyte-db/register')
        );
        this.editFile('src/main/webapp/app/home/home.component.html', content =>
          content.replace('follow @jhipster on Twitter', 'follow @yugabytedb on Twitter')
        );
        this.editFile('src/main/webapp/app/home/home.component.html', content =>
          content.replace('https://twitter.com/jhipster', 'https://twitter.com/yugabyte')
        );
        this.editFile('src/main/webapp/app/home/home.component.html', content =>
          content.replace('If you like JHipster', 'If you like YugabyteDB')
        );
        this.editFile('src/main/webapp/app/home/home.component.html', content =>
          content.replace('https://github.com/jhipster/generator-jhipster', 'https://github.com/yugabyte/yugabyte-db')
        );

        this.editFile('src/main/webapp/app/layouts/navbar/navbar.component.scss', content =>
          content.replace('logo-jhipster.png', 'ybdb_logo.svg')
        );
        this.editFile('src/main/webapp/content/css/loading.css', content =>
          content.replace('logo-jhipster.png', 'ybdb_logo.svg')
        );
        this.editFile('src/main/webapp/app/home/home.component.scss', content =>
          content.replace('jhipster_family_member_2.svg', 'yugabytedb-header.svg').replace('jhipster_family_member_2.svg', 'yugabytedb-header.svg')
        );
      } else if (this.jhipsterConfig.clientFramework === VUE) {

        this.editFile('src/main/webapp/i18n/en/home.json', content =>
          content.replace('Welcome, Java Hipster', 'Welcome, JHipster YugabyteDB blueprint!')
        );
        this.editFile('src/main/webapp/i18n/en/home.json', content =>
          content.replace('If you have any question on JHipster', 'If you have any question on YugabyteDB')
        );
        this.editFile('src/main/webapp/i18n/en/home.json', content =>
          content.replace('JHipster homepage', 'YugabyteDB homepage')
        );
        this.editFile('src/main/webapp/i18n/en/home.json', content =>
          content.replace('JHipster on Stack Overflow', 'YugabyteDB on Stack Overflow')
        );
        this.editFile('src/main/webapp/i18n/en/home.json', content =>
          content.replace('bugtracker', 'yftt')
        );
        this.editFile('src/main/webapp/i18n/en/home.json', content =>
          content.replace('JHipster bug tracker', 'YugabyteDB Tech Talks')
        );
        this.editFile('src/main/webapp/i18n/en/home.json', content =>
          content.replace('chat', 'slack')
        );
        this.editFile('src/main/webapp/i18n/en/home.json', content =>
          content.replace('JHipster public chat room', 'YugabyteDB community slack channel')
        );
        this.editFile('src/main/webapp/i18n/en/home.json', content =>
          content.replace('follow @jhipster on Twitter', 'follow @yugabyte on Twitter')
        );
        this.editFile('src/main/webapp/i18n/en/home.json', content =>
          content.replace('If you like JHipster', 'If you like YugabyteDB')
        );

        this.editFile('src/main/webapp/app/core/home/home.vue', content =>
          content.replace('Welcome, Java Hipster', 'Welcome, JHipster YugabyteDB blueprint!')
        );
        this.editFile('src/main/webapp/app/core/home/home.vue', content =>
          content.replace('JHipster homepage', 'YugabyteDB homepage')
        );
        this.editFile('src/main/webapp/app/core/home/home.vue', content =>
          content.replace('https://www.jhipster.tech/', 'https://www.yugabyte.com')
        );
        this.editFile('src/main/webapp/app/core/home/home.vue', content =>
          content.replace('https://stackoverflow.com/tags/jhipster/info', 'https://stackoverflow.com/tags/yugabytedb/info')
        );
        this.editFile('src/main/webapp/app/core/home/home.vue', content =>
          content.replace('home.link.bugtracker', 'home.link.yftt')
        );
        this.editFile('src/main/webapp/app/core/home/home.vue', content =>
          content.replace('JHipster bug tracker', 'YugabyteDB Tech Talks')
        );
        this.editFile('src/main/webapp/app/core/home/home.vue', content =>
          content.replace('https://github.com/jhipster/generator-jhipster/issues?state=open', 'https://www.yugabyte.com/yftt/')
        );
        this.editFile('src/main/webapp/app/core/home/home.vue', content =>
          content.replace('home.link.chat', 'home.link.slack')
        );
        this.editFile('src/main/webapp/app/core/home/home.vue', content =>
          content.replace('JHipster public chat room', 'YugabyteDB community slack channel')
        );
        this.editFile('src/main/webapp/app/core/home/home.vue', content =>
          content.replace('https://gitter.im/jhipster/generator-jhipster', 'https://communityinviter.com/apps/yugabyte-db/register')
        );
        this.editFile('src/main/webapp/app/core/home/home.vue', content =>
          content.replace('follow @jhipster on Twitter', 'follow @yugabytedb on Twitter')
        );
        this.editFile('src/main/webapp/app/core/home/home.vue', content =>
          content.replace('https://twitter.com/jhipster', 'https://twitter.com/yugabyte')
        );
        this.editFile('src/main/webapp/app/core/home/home.vue', content =>
          content.replace('If you like JHipster', 'If you like YugabyteDB')
        );
        this.editFile('src/main/webapp/app/core/home/home.vue', content =>
          content.replace('https://github.com/jhipster/generator-jhipster', 'https://github.com/yugabyte/yugabyte-db')
        );

        this.editFile('src/main/webapp/app/core/jhi-navbar/jhi-navbar.vue', content =>
          content.replace('logo-jhipster.png', 'ybdb_logo.svg')
        );
        this.editFile('src/main/webapp/content/css/loading.css', content =>
          content.replace('logo-jhipster.png', 'ybdb_logo.svg')
        );
        this.editFile('src/main/webapp/content/scss/global.scss', content =>
          content.replace('jhipster_family_member_2.svg', 'yugabytedb-header.svg').replace('jhipster_family_member_2.svg', 'yugabytedb-header.svg')
        );
      }
    },
  };
}
