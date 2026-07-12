import type * as p_ from 'pareto-core/interface/refiner'


//schemas
import type * as s_function from "../../../interface/schemas/file_to_file.js"
import type * as s_in from "../../../interface/schemas/main.js"



export type Parameters = p_.Refiner<
    s_function.Parameters,
    s_function.Error,
    s_in.Parameters
>

