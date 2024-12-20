#!/usr/bin/env node

import {select} from '@inquirer/prompts'
import {xls2json} from "./conversions/xls2json";

const cli = async () => {
    const conversions = await select({
        message: 'File conversion',
        choices: [
            {name: 'XLS/X to JSON', value: 'xls2json'},
        ],
    })

    switch (conversions) {
        case 'xls2json':
            xls2json()
            break
        default:
            console.error('Conversion not supported')
            process.exit(1)
    }
}

cli()
