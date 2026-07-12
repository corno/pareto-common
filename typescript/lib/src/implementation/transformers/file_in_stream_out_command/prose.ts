import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/file_in_stream_out_command.js"
import type * as s_out from "../../../interface/schemas/prose.js"

//dependencies
import * as t_file_in_stream_out_to_prose from "../file_in_stream_out_refiner/prose.js"
import * as t_read_file from "pareto-filesystem-unrestricted-api/implementation/transformers/read_file/prose"

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
                case 'command line arguments': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.literal("error in command line arguments: "),
                    t_file_in_stream_out_to_prose.Error($)
                ]))
                case 'reading file': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.literal("error reading: "),
                    t_read_file.Error($)
                ]))
                case 'deserializing': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.literal("error deserializing: "),
                    sh.ph.literal($)
                ]))
                case 'writing to stream': return p_.option($, ($) => sh.ph.literal("error writing to stream"))
                default: return p_.exhaustive($[0])
            }
        })
}