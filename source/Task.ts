export class Task {
	constructor(private left: number, private operator: string, private right: number, private result: number) {
	}
	getLeft(): number { return this.left }
	getOperator(): string { return this.operator }
	getRight(): number { return this.right }
	getResult(): number { return this.result }
}