/// <reference path='./tsd.d.ts' />
import * as fs from 'fs'
import * as cp from 'child_process'
import { HtmlOutput } from './HtmlOutput'
import { Generator } from './Generator';

export class PdfOutput extends HtmlOutput {
	constructor() {
		super('pdf')
	}
	protected save(outputPath: string, content: string) {
		fs.writeFileSync(outputPath, cp.execFileSync("prince", ["--javascript", "-", "-o", "-"], { input: content }))
	}
}
PdfOutput.add(new PdfOutput())
