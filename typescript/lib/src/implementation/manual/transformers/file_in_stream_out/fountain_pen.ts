import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/file_to_stream"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//dependencies
import * as t_read_file from "pareto-resources/dist/implementation/manual/transformers/read_file/fountain_pen"
// import * as s_fp from "pareto-fountain-pen/dist/implementation/manual/schemas/block/serializers"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose/deprecated"

export const Path_Error: p_i.Transformer<
d_in.Path_Error, d_out.Phrase
> = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'missing': return p_.ss($, ($) => sh.ph.literal("missing"))
            case 'not valid': return p_.ss($, ($) => sh.ph.literal("not valid"))
            default: return p_.au($[0])
        }
    })

export const Error: p_i.Transformer<
d_in.Error_x, d_out.Phrase
> = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'too many arguments': return p_.ss($, ($) => sh.ph.literal("too many arguments"))
            case 'in path': return p_.ss($, ($) => sh.ph.composed([
                sh.ph.literal("in path: "),
                Path_Error($)
            ]))
            default: return p_.au($[0])
        }
    })

export const Command_Error: p_i.Transformer<
d_in.Command_Error, d_out.Phrase
> = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'command line arguments': return p_.ss($, ($) => sh.ph.composed([
                sh.ph.literal("error in command line arguments: "),
                Error($)
            ]))
            case 'reading file': return p_.ss($, ($) => sh.ph.composed([
                sh.ph.literal("error reading: "),
                t_read_file.Error($)
            ]))
            case 'deserializing': return p_.ss($, ($) => sh.ph.composed([
                sh.ph.literal("error deserializing: "),
                sh.ph.literal($)
            ]))
            case 'writing to stream': return p_.ss($, ($) => sh.ph.literal("error writing to stream"))
            default: return p_.au($[0])
        }
    })