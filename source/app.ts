import { Generator } from './Generator'
import { Output } from './Output'

import './CsvOutput'
import './SumGenerator'

export class Program {
	constructor() { }
	run(generatorName: string, outputPath: string, count: number) {
		var generator = Generator.get(generatorName)
		Output.generate(generator, outputPath, count)
	}
}
new Program().run(process.argv[2], process.argv[3], Number.parseInt(process.argv[4]))
