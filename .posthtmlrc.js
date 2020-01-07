const execSync = require("child_process").execSync

const { name } = require("./package.json")

const gitCommands = {
  GIT_VERSION: (process.env.NOW_GITHUB_COMMIT_SHA && process.env.NOW_GITHUB_COMMIT_SHA.substr(0, 7)) || "git describe --always --tags --dirty=+",
  GIT_HASH: process.env.NOW_GITHUB_COMMIT_SHA || "git rev-parse HEAD",
  GIT_BRANCH: process.env.NOW_GITHUB_COMMIT_REF || "git rev-parse --abbrev-ref HEAD",
  GIT_AUTHOR: process.env.NOW_GITHUB_COMMIT_AUTHOR_NAME || "git show -s --pretty=%an",
}
Object.keys(gitCommands).forEach((key) => {
  const value = gitCommands[key]
  process.env[key] = /^git/.test(value) ? execSync(value).toString().replace("\n", "") : value
})

module.exports = {
  plugins: {
    "posthtml-expressions": {
      locals: {
        name,
        process: {
          env: process.env,
        },
      }
    }
  }
}
