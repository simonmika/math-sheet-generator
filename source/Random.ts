export abstract class Generator {
	abstract next(): number
	get(count: number): number[] {
		var result = <number[]>[]
		while (result.length < count)
			result.push(this.next())
		return result
	}
}
export class Uniform extends Generator {
	private length: number
	constructor(private start?: number, end?: number) {
		super()
		if (!this.start)
			this.start = 0
		if (!end)
			end = this.start + 1
		this.length = end - this.start
	}
	next(): number {
		return Math.random() * this.length + this.start
	}
}
export class Integer extends Generator {
	constructor(private backend: Generator) {
		super()
	}
	next(): number {
		return Math.floor(this.backend.next())
	}
}
