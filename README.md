# Pareto Common

The file/stream operation wrappers forward paragraphs directly to output
resources. They do not serialize paragraphs into string lists.

Output dependencies use `log paragraph` and `log error paragraph`, matching
the paragraph stream API. File writes carry `content.paragraph` and
`content.parameters.{indentation,newline}`.

The file-to-file, file-to-stream, and stream-to-stream wrappers require explicit
`indentation` and `newline` static parameters. The file-to-directory wrapper
requires `error message indentation` and `error message newline`; each generated
file carries its own formatting settings.

Processing errors remain structured, are wrapped as single-sentence paragraphs,
and are reported through `log error paragraph`. Existing exit-code behavior is
preserved.

After compiling the library, run:

```sh
node --test testdata/paragraph-output.test.mjs
```
