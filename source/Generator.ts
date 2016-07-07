import { Task } from './Task'

export abstract class Generator {
	constructor(private name: string) {	}
	abstract next(): Task
	generate(count: number): Task[] {
		var result = <Task[]>[]
		while (result.length < count)
			result.push(this.next())
		return result
	}
	private static generators = <Generator[]>[]
	static add(generator: Generator) {
		this.generators.push(generator)
	}
	static get(name: string): Generator {
		var result: Generator
		this.generators.forEach(generator => {
			if (generator.name == name)
				result = generator
		})
		return result
	}
	static next(name: string): Task {
		return Generator.get(name).next()
	}
	static generate(name: string, count: number): Task[] {
		return Generator.get(name).generate(count)
	}
}