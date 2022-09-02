// import expect from 'expect';

// import { helpers, lookups } from '#test-utils';

// const SUB_GENERATOR = 'kubernetes-helm';
// const BLUEPRINT_NAMESPACE = `jhipster:${SUB_GENERATOR}`;

// describe('SubGenerator kubernetes-helm of yugabytedb JHipster blueprint', () => {
//   describe('run', () => {
//     let result;
//     before(async function () {
//       result = await helpers
//         .create(BLUEPRINT_NAMESPACE)
//         .withOptions({
//           reproducible: true,
//           defaults: true,
//           blueprint: 'yugabytedb',
//         })
//         .withLookups(lookups)
//         .run();
//     });

//     it('should succeed', () => {
//       expect(result.getStateSnapshot()).toMatchSnapshot();
//     });
//   });
// });
