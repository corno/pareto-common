
import type * as p_ from 'pareto-core/interface/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/file_to_stream.js"
import type * as s_out from "pareto-fountain-pen/interface/data/prose"


export type Error = p_.Transformer<
    s_in.Error_x,
    s_out.Phrase
>
export type Command_Error = p_.Transformer<
    s_in.Command_Error,
    s_out.Phrase
>

