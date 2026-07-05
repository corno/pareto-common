import * as p_ from 'pareto-core/dist/implementation/transformer'

//data types
import * as d_in from "../../../../interface/data/file_to_file"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//dependencies
import * as t_file_in_file_out_to_prose from "../file_in_file_out/prose"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose/deprecated"

export const My_Error = ($: d_in.Error_yy): d_out.Phrase => {
    return p_.from.state($).decide(
        ($): d_out.Phrase => {
            switch ($[0]) {
                case 'processing': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.literal("processing error: "),
                    $
                ]))
                case 'file in file out': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.literal("file in file out: "),
                    t_file_in_file_out_to_prose.Command_Error($)
                ]))
                default: return p_.au($[0])
            }
        })
}