import * as p_prose from 'pareto-core/temp/fountain_pen/prose'

export type Error =
    | ['could not read instream', null]
    | ['deserialization failed', {
        'message': p_prose.Phrase
    }]
    | ['could not write to stdout', null]