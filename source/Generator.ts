import { Task } from './Task'
import * as Random from './Random'

export abstract class Generator {
	constructor(private name: string) { }
	getName(): string { return this.name }
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
		var result = name.split('+').map(name => {
			var r: Generator
			this.generators.forEach(generator => {
				if (generator.name == name)
					r = generator
			})
			return r
		})
		return !result || result.length < 1 ? null :
			result.length > 1 ? new CombinedGenerator(result) :
			result[0]
	}
	static next(name: string): Task {
		return Generator.get(name).next()
	}
	static generate(name: string, count: number): Task[] {
		return Generator.get(name).generate(count)
	}
}
export class CombinedGenerator extends Generator {
	private random: Random.Generator
	constructor(private generators: Generator[]) {
		super(generators.map(generator => generator.getName()).join('+'));
		this.random = new Random.Integer(new Random.Uniform(0, generators.length))
	}
	next(): Task {
		return this.generators[this.random.next()].next()
	}
}