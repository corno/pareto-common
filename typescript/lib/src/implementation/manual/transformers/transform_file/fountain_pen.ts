import * as pt from 'pareto-core/dist/implementation/transformer'

//data types
import * as d_in from "../../../../interface/to_be_generated/file_to_file"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//dependencies
import * as t_file_in_file_out_to_fp from "../file_in_file_out/fountain_pen"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

export const My_Error = ($: d_in.Error): d_out.Phrase => {
    return pt.decide.state($, ($): d_out.Phrase => {
        switch ($[0]) {
            case 'processing': return pt.ss($, ($) => sh.ph.composed([
                sh.ph.literal("processing error: "),

                $
            ]))
            case 'file in file out': return pt.ss($, ($) => sh.ph.composed([
                sh.ph.literal("file in file out: "),
                t_file_in_file_out_to_fp.Command_Error($)
            ]))
            default: return pt.au($[0])
        }
    })
}