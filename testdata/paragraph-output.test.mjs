import assert from 'node:assert/strict'
import test from 'node:test'

import * as r from '../typescript/lib/node_modules/pareto-core/dist/resource.js'
import * as sh from '../typescript/lib/node_modules/pareto-fountain-pen/dist/modules/paragraph/schemas/paragraph/shorthands/deprecated.js'
import { Paragraph } from '../typescript/lib/node_modules/pareto-fountain-pen/dist/modules/paragraph/schemas/paragraph/transformers/serialized.js'
import { $$ as file_to_file } from '../typescript/lib/dist/modules/file_in_file_out/commands/implementations/operation.js'
import { $$ as file_to_directory } from '../typescript/lib/dist/modules/file_in_directory_out/commands/implementations/operation.js'
import { $$ as file_to_stream } from '../typescript/lib/dist/modules/file_in_stream_out/commands/implementations/operation.js'
import { $$ as stream_to_stream } from '../typescript/lib/dist/modules/stream_in_stream_out/commands/implementations/operation.js'

const paragraph = sh.pg.sentences([
    sh.sentence([sh.ph.text('first'), sh.ph.indent(sh.pg.sentences([sh.sentence([sh.ph.text('nested')])]))]),
])
const error_phrase = sh.ph.text('processing failed')
const formatting = { indentation: '--', newline: '\r\n' }
const input = r.query((parameters, success) => success({ data: r.literal.list([]) }))
const run = (command, args) => new Promise((resolve, reject) =>
    command.execute({ arguments: r.literal.list(args) }, (error) => error).__start(resolve, reject)
)
const record = (items) => r.command((parameters, success) => {
    items.push(parameters)
    return success()
})
const cases = [
    ['file to file', file_to_file, ['input.lna', 'output.txt']],
    ['file to directory', file_to_directory, ['input.lna', 'output']],
    ['file to stream', file_to_stream, ['input.lna']],
    ['stream to stream', stream_to_stream, []],
]

for (const [name, implementation, args] of cases) {
    const setup = (fail = false) => {
        const writes = []
        const errors = []
        const directory = r.literal.dictionary({
            nested: ['directory', r.literal.dictionary({
                'output.txt': ['file', { content: { paragraph, parameters: formatting } }],
            })],
        })
        const query = r.query((parameters, success, error) =>
            fail ? error({ message: error_phrase }) : success({ paragraph, data: name === 'file to directory' ? directory : paragraph })
        )
        const command = implementation(
            name === 'file to directory' ? {
                'error message indentation': formatting.indentation,
                'error message newline': formatting.newline,
                'remove before writing': false,
                'replace spaces in node names by underscores': false,
            } : formatting,
            { 'read file': input, 'get instream data': input, 'process data': query },
            {
                'write file': record(writes),
                'log paragraph': record(writes),
                'log error paragraph': record(errors),
                remove: r.command((parameters, success) => success()),
            },
        )
        return { command, writes, errors }
    }

    test(name + ' forwards paragraphs and explicit formatting without serializing', async () => {
        const { command, writes, errors } = setup()
        await run(command, args)
        assert.equal(writes.length, 1)
        assert.equal(errors.length, 0)
        const output = writes[0].content ?? writes[0]
        assert.equal(output.paragraph, paragraph)
        assert.equal('lines' in output, false)
        if (output.parameters) {
            assert.deepEqual(output.parameters, formatting)
        } else {
            assert.equal(output.indentation, formatting.indentation)
            assert.equal(output.newline, formatting.newline)
        }
    })

    test(name + ' reports processing errors as paragraphs with explicit formatting', async () => {
        const { command, writes, errors } = setup(true)
        await assert.rejects(run(command, args), (error) => error['exit code'] === 1)
        assert.equal(writes.length, 0)
        assert.equal(errors.length, 1)
        assert.equal(errors[0].indentation, formatting.indentation)
        assert.equal(errors[0].newline, formatting.newline)
        assert.equal('lines' in errors[0], false)
        assert.match(Paragraph(errors[0].paragraph, { indentation: formatting.indentation }).__get_raw().join('\n'), /processing failed/)
    })
}
