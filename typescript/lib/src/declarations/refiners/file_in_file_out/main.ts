import type * as p_ from 'pareto-core/interface/refiner'


//data types
import type * as d_out from "../../../interface/schemas/file_to_file.js"
import type * as d_function from "../../../interface/schemas/file_to_file.js"
import type * as d_in from "pareto-application-api/interface/data/main"


export type Parameters = p_.Refiner<
    d_out.Parameters,
    d_function.Error,
    d_in.Parameters
>

