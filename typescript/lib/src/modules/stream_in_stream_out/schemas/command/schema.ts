
import type * as p_paragraph from "pareto-fountain-pen/modules/paragraph/schemas/paragraph/schema"


export type Error =
    | ['could not read instream', null]
    | ['deserialization failed', {
        'message': p_paragraph.Phrase
    }]
    | ['could not write to stdout', null]