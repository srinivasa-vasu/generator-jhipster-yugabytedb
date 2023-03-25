import chalk from 'chalk';
import { constants } from '../generators/constants.cjs';

const { YBDB_VERSION } = constants;

export function getBanner() {
  return `
${chalk.rgb(189, 52, 235).bold('██╗   ██╗██╗   ██╗ ██████╗  █████╗ ██████╗ ██╗   ██╗████████╗███████╗')}${chalk.rgb(254,103,56).bold('██████╗ ██████╗ ')}
${chalk.rgb(189, 52, 235).bold('╚██╗ ██╔╝██║   ██║██╔════╝ ██╔══██╗██╔══██╗╚██╗ ██╔╝╚══██╔══╝██╔════╝')}${chalk.rgb(254,103,56).bold('██╔══██╗██╔══██╗')}
${chalk.rgb(189, 52, 235).bold(' ╚████╔╝ ██║   ██║██║  ███╗███████║██████╔╝ ╚████╔╝    ██║   █████╗  ')}${chalk.rgb(254,103,56).bold('██║  ██║██████╔╝')}
${chalk.rgb(189, 52, 235).bold('  ╚██╔╝  ██║   ██║██║   ██║██╔══██║██╔══██╗  ╚██╔╝     ██║   ██╔══╝  ')}${chalk.rgb(254,103,56).bold('██║  ██║██╔══██╗')}
${chalk.rgb(189, 52, 235).bold('   ██║   ╚██████╔╝╚██████╔╝██║  ██║██████╔╝   ██║      ██║   ███████╗')}${chalk.rgb(254,103,56).bold('██████╔╝██████╔╝')}
${chalk.rgb(189, 52, 235).bold('   ╚═╝    ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═════╝    ╚═╝      ╚═╝   ╚══════╝')}${chalk.rgb(254,103,56).bold('╚═════╝ ╚═════╝ ')}
${chalk.magentaBright.dim('                        ██████╗ ███████╗ ██████╗ ██╗     ')}
${chalk.magentaBright.dim('                        ██╔══██╗██╔════╝██╔═══██╗██║     ')}
${chalk.magentaBright.dim('                        ██║  ██║███████╗██║   ██║██║     ')}
${chalk.magentaBright.dim('                        ██║  ██║╚════██║██║▄▄ ██║██║     ')}
${chalk.magentaBright.dim('                        ██████╔╝███████║╚██████╔╝███████╗')}
${chalk.magentaBright.dim('                        ╚═════╝ ╚══════╝ ╚══▀▀═╝ ╚══════╝')}
${chalk.greenBright.bold('                         https://www.yugabyte.com/\n')}
${chalk.white(` Welcome to YugabyteDB Distributed SQL :: Running YugabyteDB v${chalk.white.bold(YBDB_VERSION)} generator`)}
${chalk.white(' This blueprint generates Jhispter project with YugabyteDB distributed SQL.')}
${chalk.green(' _______________________________________________________________________________________________________________\n')}
${chalk.white(
  ` ${chalk.yellow('::')} This project is a ${chalk.blue.bold('YugabyteDB')} blueprint for ${chalk.green.bold('JHipster')} ${chalk.yellow(
    '::'
  )}`
)}
${chalk.green(' _______________________________________________________________________________________________________________\n')}`;
}
