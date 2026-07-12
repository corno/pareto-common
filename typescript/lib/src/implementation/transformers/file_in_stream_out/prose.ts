import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/file_to_stream.js"
import type * as s_out from "../../../interface/schemas/prose.js"

namespace declarations {
    export type Error = p_.Transformer<
        s_in.Error_x,
        s_out.Phrase
    >
    export type Command_Error = p_.Transformer<
        s_in.Command_Error,
        s_out.Phrase
    >
}

//dependencies
import * as t_read_file from "pareto-filesystem-unrestricted-api/implementation/transformers/read_file/prose"

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
    })

export const Command_Error: declarations.Command_Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'command line arguments': return p_.option($, ($) => sh.ph.composed([
                sh.ph.literal("error in command line arguments: "),
                Error($)
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