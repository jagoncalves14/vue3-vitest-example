const types = {
  build: {
    description: 'Changes which affect CI configuration files and scripts',
  },
  chore: {
    description: "Changes which aren't user-facing",
  },
  enh: {
    description: 'Changes which improve a feature',
  },
  docs: {
    description: 'Changes which affect documentation',
  },
  feat: {
    description: 'Changes which introduce a new feature',
  },
  fix: {
    description: 'Changes which patch a bug',
  },
  perf: {
    description: 'changes which improve performance.',
  },
  refactor: {
    description: 'Changes which neither fix a bug nor add a feature',
  },
  revert: {
    description: 'Changes which revert a previous commit',
  },
  style: {
    description: "Changes which don't affect code logic, such as white-spaces, formatting, missing semi-colons",
  },
  test: {
    description: 'Changes which add missing tests or correct existing tests',
  },
}

const typesEnum = Object.keys(conventionalCommit.types)

module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: ['commitlint-plugin-function-rules'],
  rules: {
    'type-enum': [2, 'always', typesEnum],
    // Disable generic validation
    'scope-case': [0],

    // Custom scope validation for Jira's ticket
    'function-rules/scope-case': [
      2,
      'always',
      commit => {
        console.log(commit)
        const hasTicketScope = commit.scope && commit.scope.includes('FFE-')
        if (hasTicketScope) {
          const ticketScope = commit.scope.split('-')
          const hasValidTicketScope = !!ticketScope[1] && !isNaN(ticketScope[1])

          if (!hasValidTicketScope) {
            return [false, `scope must specify a valid JIRA ticket number: FFE-0000`]
          }

          return [true]
        }

        return [false, `scope must specify a valid JIRA ticket number: FFE-0000`]
      },
    ],
  },
}
