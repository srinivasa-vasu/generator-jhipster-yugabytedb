# generator-jhipster-yugabytedb

> ## <img src="assets/open_source_lt.png" alt="Open Source" height="20" width="20"> JHipster YugabyteDB Distributed SQL blueprint <img src="assets/community_lt.png" alt="Open Source" height="20" width="20">

> > ![beta-status]

[![NPM version][npm-image]][npm-url]

[![Generator Build Status][github-actions-generator-image]][github-actions-url]

<img src="https://raw.githubusercontent.com/jhipster/jhipster-artwork/main/family/jhipster_family_member_6.png" alt="JHipster Family Member" width=200 style="max-width:50%;">

This is a [JHipster](https://www.jhipster.tech/) blueprint that adds [YugabyteDB](https://www.yugabyte.com/yugabytedb/) (distributed SQL) support. This blueprint generates a Jhipster application with YugabyteDB as the database. It supports both [YSQL](https://docs.yugabyte.com/stable/api/ysql/) and [YCQL](https://docs.yugabyte.com/stable/api/ycql/) APIs.

## Installation and Usage

1. Install yugabytedb
   - `npm install -g generator-jhipster-yugabytedb`
2. Create a new folder for your application
3. Start the application scaffolding with the command
   - `yugabytedb` / `ybdb`
4. To generate the Kubernetes manifests, run the following command
   - `yugabytedb k8s` / `ybdb k8s`

Alternatively, if you already have JHipster installed, you can use this blueprint with:

- To generate a new application

```
$ jhipster --blueprints yugabytedb
```

- To deploy to a Kubernetes runtime

```
$ jhipster --blueprints yugabytedb k8s
```

[npm-image]: https://img.shields.io/npm/v/generator-jhipster-yugabytedb.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-yugabytedb
[github-generator-image]: https://github.com/srinivasa-vasu/generator-jhipster-yugabytedb/actions/workflows/generator.yml/badge.svg
[github-generator-url]: https://github.com/srinivasa-vasu/generator-jhipster-yugabytedb/actions/workflows/generator.yml
[github-integration-image]: https://github.com/srinivasa-vasu/generator-jhipster-yugabytedb/actions/workflows/integration.yml/badge.svg
[github-integration-url]: https://github.com/srinivasa-vasu/generator-jhipster-yugabytedb/actions/workflows/integration.yml
[github-actions-generator-image]: https://github.com/srinivasa-vasu/generator-jhipster-yugabytedb/workflows/Generator/badge.svg
[github-actions-url]: https://github.com/srinivasa-vasu/generator-jhipster-yugabytedb/actions/workflows/generator.yml
[yb-open-source]: assets/open_source.png
[ysql]: assets/ysql.png
[ycql]: assets/ycql.png
[beta-status]: https://img.shields.io/badge/Status-Beta-blue?style=for-the-badge&logo=appveyor
