export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'chore', 'refactor', 'docs', 'style', 'test', 'ci']],
    'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']],
  },
}
