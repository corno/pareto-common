import * as p_ from 'pareto-core/implementation/transformer'
import * as p_i from 'pareto-core/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/file_to_file.js"
import * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"

export namespace interface_ {
    export type Error = p_i.Transformer<
        d_in.Error,
        d_out.Phrase
    >
    export type Command_Error = p_i.Transformer<
        d_in.Command_Error,
        d_out.Phrase
    >
}

//dependencies
import * as t_read_file from "pareto-resources/implementation/manual/transformers/read_file/prose"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"

export const Error: interface_.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'too many arguments': return p_.option($, ($) => sh.ph.literal("too many arguments"))
            case 'invalid source path': return p_.option($, ($) => sh.ph.composed([
                sh.ph.literal("invalid source path"),
            ]))
            case 'invalid target path': return p_.option($, ($) => sh.ph.composed([
                sh.ph.literal("invalid target path"),
            ]))
            case 'unexpected': return p_.option($, ($) => sh.ph.composed([
                sh.ph.literal("unexpected "),
                sh.ph.literal("expected:" + $['expected'][0]),
            ]))
            default: return p_.au($[0])
        }
    })

export const Command_Error: interface_.Command_Error = ($) => p_.from.state($).decide(
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
            case 'writing file': return p_.option($, ($) => sh.ph.literal("error writing file"))
            default: return p_.au($[0])
        }
    })