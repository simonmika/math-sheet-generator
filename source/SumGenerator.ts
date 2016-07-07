import { Task } from './Task'
import { Generator } from './Generator'
import * as Random from './Random'
export class SumGenerator extends Generator {
	private random: Random.Generator
	private randomBoolean: Random.Generator
	constructor(private sum: number) {
		super('sum' + sum);
		this.random = new Random.Integer(new Random.Uniform(0, sum + 1))
		this.randomBoolean = new Random.Integer(new Random.Uniform(0, 2))
	}
	next(): Task {
		return this.randomBoolean.next() ?
			new Task(this.random.next(), '+', undefined, this.sum) :
			new Task(undefined, '+', this.random.next(), this.sum)
	}
}
Generator.add(new SumGenerator(5))
Generator.add(new SumGenerator(10))
Generator.add(new SumGenerator(12))