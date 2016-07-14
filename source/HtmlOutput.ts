import { Output } from './Output'
import { Generator } from './Generator';
import { Task } from './Task'

export class HtmlOutput extends Output {
	constructor(extension?: string) {
		super(extension ? extension : 'html')
	}
	generate(generator: Generator, outputPath: string, count?: number) {
		if (!count)
			count = 1
		count *= 20
		this.save(outputPath,
			`<!doctype html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Title</title>
		<script src="http://fred-wang.github.io/mathml.css/mspace.js"></script>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/4.2.0/normalize.min.css">
		<style>
			@page {
				size: A4;
			}
			html {
				font-family: Ubuntu, Verdana, Geneva, Tahoma, sans-serif;
			}
			input[type="radio"] {
				display: none;
				margin: 0;
			}
			section {
				width: 48%;
				border: solid 1px black;
				display: inline-block;
				text-align: center;
				margin-bottom: 5mm;
			}
			section:nth-child(odd) {
				margin-right: 4mm;
			}
			section > math {
				display: inline-block;
				font-size: 3em;
			}
			section > form {
				display: table;
				width: 100%;
				table-layout: fixed;
				border-top: solid 1px black;
			}
			section > form > label {
				display: table-cell;
				text-align: center;
				font-size: 1.2em;
			}
			section > form > label:not(:last-child) {
				border-right: solid 1px black;
			}
		</style>
	</head>
	<body>
${generator.generate(count).map(this.generateTask).join('')}
	</body>
</html>
`)
	}
	private generateTask(task: Task): string {
		var format = (number: number) => number || number == 0 ? number.toString() : "&nbsp;&nbsp;&nbsp;&nbsp;"
		return `		<section>
			<math>
				<mrow><mn>${format(task.getLeft())}</mn><mo>${task.getOperator()}</mo><mn>${format(task.getRight())}</mn><mo>=</mo><mn>${format(task.getResult())}</mn></mrow>
			</math>
			<form action="">
				<label><input type="radio" name="result" value="0"><math><mn>0</mn></math></label>
				<label><input type="radio" name="result" value="1"><math><mn>1</mn></math></label>
				<label><input type="radio" name="result" value="2"><math><mn>2</mn></math></label>
				<label><input type="radio" name="result" value="3"><math><mn>3</mn></math></label>
				<label><input type="radio" name="result" value="4"><math><mn>4</mn></math></label>
				<label><input type="radio" name="result" value="5"><math><mn>5</mn></math></label>
				<label><input type="radio" name="result" value="6"><math><mn>6</mn></math></label>
				<label><input type="radio" name="result" value="7"><math><mn>7</mn></math></label>
				<label><input type="radio" name="result" value="8"><math><mn>8</mn></math></label>
				<label><input type="radio" name="result" value="9"><math><mn>9</mn></math></label>
				<label><input type="radio" name="result" value="10"><math><mn>10</mn></math></label>
			</form>
		</section>
`
	}
}
Output.add(new HtmlOutput())