
import type * as p_paragraph from "./paragraph.js"


export type Error =
    | ['could not read instream', null]
    | ['deserialization failed', {
        'message': p_paragraph.Phrase
    }]
    | ['could not write to stdout', null]