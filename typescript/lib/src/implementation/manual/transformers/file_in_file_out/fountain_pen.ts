import * as pt from 'pareto-core/dist/assign'
import * as pi from 'pareto-core/dist/interface'

//data types
import * as d_in from "../../../../interface/to_be_generated/file_to_file"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//dependencies
import * as t_read_file from "pareto-resources/dist/implementation/manual/transformers/read_file/fountain_pen"
// import * as s_fp from "pareto-fountain-pen/dist/implementation/manual/schemas/block/serializers"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

export const Path_Error: pi.Transformer<d_in.Path_Error, d_out.Phrase> = ($) => pt.decide.state($, ($) => {
    switch ($[0]) {
        case 'missing': return pt.ss($, ($) => sh.ph.literal("missing"))
        case 'not valid': return pt.ss($, ($) => sh.ph.literal("not valid"))
        default: return pt.au($[0])
    }
})

export const Error: pi.Transformer<d_in.Error_x, d_out.Phrase> = ($) => pt.decide.state($, ($) => {
    switch ($[0]) {
        case 'too many arguments': return pt.ss($, ($) => sh.ph.literal("too many arguments"))
        case 'in path': return pt.ss($, ($) => sh.ph.composed([
            sh.ph.literal("in path: "),
            Path_Error($)
        ]))
        case 'out path': return pt.ss($, ($) => sh.ph.composed([
            sh.ph.literal("out path: "),
            Path_Error($)
        ]))
        default: return pt.au($[0])
    }
})

export const Command_Error: pi.Transformer<d_in.Command_Error, d_out.Phrase> = ($) => pt.decide.state($, ($) => {
    switch ($[0]) {
        case 'command line arguments': return pt.ss($, ($) => sh.ph.composed([
            sh.ph.literal("error in command line arguments: "),
            Error($)
        ]))
        case 'reading file': return pt.ss($, ($) => sh.ph.composed([
            sh.ph.literal("error reading: "),
            t_read_file.Error($)
        ]))
        case 'deserializing': return pt.ss($, ($) => sh.ph.composed([
            sh.ph.literal("error deserializing: "),
            sh.ph.literal($)
        ]))
        case 'writing file': return pt.ss($, ($) => sh.ph.literal("error writing file"))
        default: return pt.au($[0])
    }
})