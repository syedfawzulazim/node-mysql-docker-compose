import { exec } from 'child_process'
import { glob } from 'glob'
import * as fs from 'fs'
;(async () => {
  const dbConnectionString = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
  const migrationRun = `${__dirname}/../../../node_modules/.bin/sequelize db:migrate --url ${dbConnectionString} --migrations-compiled-path`
  const migrationRevert = `${__dirname}/../../../node_modules/.bin/sequelize db:migrate:undo --url ${dbConnectionString} --migrations-compiled-path`
  const migrationGenerate = `${__dirname}/../../../node_modules/.bin/sequelize migration:generate --url ${dbConnectionString} --migrations-source-path`
  const operation = process.argv[2]
  const allowedOperations = ['up', 'revert', 'generate']
  if (operation === undefined || !allowedOperations.includes(operation)) {
    console.error(
      '\x1b[31m',
      `Migrating Operation is Missing or is not in the allowed operations list, allowed operations are '${allowedOperations.join(
        ' | ',
      )}'`,
      '\x1b[0m',
    )
    return
  }
  
  if (operation === 'generate') {
    if (process.argv[3] === undefined) {
      console.error('\x1b[31m', 'Migration Path is Missing', '\x1b[0m')
      console.info(
        '\x1b[36m',
        'Usage: yarn migration:generate <MIGRATION_PATH> <MIGRATION_NAME>',
        '\x1b[0m',
      )
      return
    }
    if (process.argv[4] === undefined) {
      console.log('\x1b[31m', 'Migration Name is Missing'), '\x1b[0m'
      console.info(
        '\x1b[36m',
        'Usage: yarn migration:generate <MIGRATION_PATH> <MIGRATION_NAME>',
        '\x1b[0m',
      )
      return
    }
    exec(
      `${migrationGenerate} ${process.argv[3]} --name ${process.argv[4]}`,
      (err, stdout, stderr) => {
        console.log(err)
        console.log(stdout)
        console.log(stderr)
      },
    )
    return
  }

  for (const file of glob.sync(`${__dirname}/../calculators/**/migrations`)) {
    let command = `${migrationRun} ${file}`
    if (operation === 'revert') {
      if (process.argv[3] === undefined) {
        console.error('\x1b[31m', 'Migration Name is Missing', '\x1b[0m')
        console.info(
          '\x1b[36m',
          'Usage: yarn migration:revert <MIGRATION_NAME>',
          '\x1b[0m',
        )
        return
      }
      if (!fs.existsSync(`${file}/${process.argv[3]}`)) {
        console.error(
          '\x1b[31m',
          `Migration with name ${process.argv[3]} does not exist in path '${file}'`,
          '\x1b[0m',
        )
        return
      }
      command = `${migrationRevert} ${file} --name ${process.argv[3]}`
    }
    exec(command, (err, stdout, stderr) => {
      console.info(stdout)
      console.error(stderr)
    })
  }
})()
