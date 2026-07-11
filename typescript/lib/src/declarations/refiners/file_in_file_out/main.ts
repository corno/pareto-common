import type * as p_ from 'pareto-core/interface/refiner'


//data types
import type * as s_out from "../../../interface/schemas/file_to_file.js"
import type * as s_function from "../../../interface/schemas/file_to_file.js"
import type * as s_in from "pareto-application-api/interface/data/main"


export type Parameters = p_.Refiner<
    s_out.Parameters,
    s_function.Error,
    s_in.Parameters
>

