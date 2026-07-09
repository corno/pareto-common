
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../interface/data/file_to_stream.js"
import type * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"


export type Error = p_.Transformer<
    d_in.Error_x,
    d_out.Phrase
>
export type Command_Error = p_.Transformer<
    d_in.Command_Error,
    d_out.Phrase
>

