import * as p_ from 'pareto-core/implementation/transformer'
import type * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../data/file_to_stream.js"
import type * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"

export namespace interface_ {
    export type Error = p_i.Transformer<
        d_in.Error_x,
        d_out.Phrase
    >
    export type Command_Error = p_i.Transformer<
        d_in.Command_Error,
        d_out.Phrase
    >
}
