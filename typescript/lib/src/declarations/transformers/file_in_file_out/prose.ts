
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../interface/schemas/file_to_file.js"
import type * as d_out from "pareto-fountain-pen/interface/data/prose"


export type Error = p_.Transformer<
    d_in.Error,
    d_out.Phrase
>
export type Command_Error = p_.Transformer<
    d_in.Command_Error,
    d_out.Phrase
>

