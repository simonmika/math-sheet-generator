import { Task } from './Task'
import { Generator } from './Generator'
import * as Random from './Random'
export class MinusGenerator extends Generator {
	private random: Random.Generator
	constructor(private sum: number) {
		super(sum + 'minus');
		this.random = new Random.Integer(new Random.Uniform(0, sum + 1))
	}
	next(): Task {
			return new Task(this.sum, '-', this.random.next(), undefined)
	}
}
Generator.add(new MinusGenerator(5))
Generator.add(new MinusGenerator(10))
Generator.add(new MinusGenerator(12))