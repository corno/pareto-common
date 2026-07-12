import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/file_in_stream_out_command.js"
import type * as s_out from "../../../interface/schemas/prose.js"

namespace declarations {
    export type Error = p_.Transformer<
        s_in.Error_x,
        s_out.Phrase
    >
}

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"

export const Error: declarations.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'too many arguments': return p_.option($, ($) => sh.ph.literal("too many arguments"))
            case 'invalid source path': return p_.option($, ($) => sh.ph.composed([
                sh.ph.literal("invalid source path"),
            ]))
            case 'unexpected': return p_.option($, ($) => sh.ph.composed([
                sh.ph.literal("unexpected "),
                sh.ph.literal("expected:" + $['expected'][0]),
            ]))
            default: return p_.exhaustive($[0])
        }
    }
)
