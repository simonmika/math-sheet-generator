/// <reference path='./tsd.d.ts' />
import * as fs from 'fs'
import { Task } from './Task'
import { Generator } from './Generator'

export abstract class Output {
	constructor(private extension: string) {	}
	abstract generate(generator: Generator, outputPath: string, count: number): void
	protected save(outputPath: string, content: string) {
		fs.writeFileSync(outputPath, content)
	}
	private static outputs = <Output[]>[]
	static add(generator: Output) {
		this.outputs.push(generator)
	}
	static generate(generator: Generator, outputPath: string, count?: number) {
		var extension = outputPath.match(/\.(.+)$/)[1]
		Output.outputs.forEach(output => {
			if (output.extension == extension)
				output.generate(generator, outputPath, count)
		})
	}
}