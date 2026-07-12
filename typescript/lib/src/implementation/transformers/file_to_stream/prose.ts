import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/file_to_stream.js"
import type * as s_out from "../../../interface/schemas/prose.js"

//dependencies
import * as t_file_in_stream_out_to_prose from "../file_in_stream_out/prose.js"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"

export const My_Error = ($: s_in.Error): s_out.Phrase => {
    return p_.from.state($).decide(
        ($) => {
            switch ($[0]) {
                case 'processing': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.literal("processing error: "),

                    $
                ]))
                case 'file in stream out': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.literal("file in stream out: "),
                    t_file_in_stream_out_to_prose.Command_Error($)
                ]))
                default: return p_.exhaustive($[0])
            }
        })
}