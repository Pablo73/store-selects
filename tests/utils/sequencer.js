const Sequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends Sequencer {
  sort(tests) {
    const copyTests = Array.from(tests);
     return copyTests
     .sort((a, b) => (a.path.split('-')[0] > b.path.split('-')[0] ? 1 : -1));
    }
  }

module.exports = CustomSequencer;