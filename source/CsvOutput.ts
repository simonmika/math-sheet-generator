import { Output } from './Output'
import { Generator } from './Generator';

export class CsvOutput extends Output {
	constructor() {
		super('csv')
	}
	generate(generator: Generator, outputPath: string, count?: number) {
		var counter = 0
		if (!count)
			count = 14
		var format = (number: number) => number || number == 0 ? number.toString() : ""
		var padLeft = (text: string) => '000'.substring(text.length) + text
		this.save(outputPath, generator.generate(count).map(task => `${padLeft((counter++).toString())}, ${format(task.getLeft())}, "${task.getOperator()}", ${format(task.getRight())}, ${format(task.getResult())}`).join('\n'))
	}
}
Output.add(new CsvOutput())