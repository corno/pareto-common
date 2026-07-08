import type * as p_i from 'pareto-core/interface/refiner'
import p_iterate from 'pareto-core/implementation/refiner/specials/iterate'


//data types
import type * as d_out from "../../../data/file_to_file.js"
import type * as d_function from "../../../data/file_to_file.js"
import type * as d_in from "pareto-application-api/interface/data/main"

export namespace interface_ {
    export type Parameters = p_i.Refiner<
        d_out.Parameters,
        d_function.Error,
        d_in.Parameters
    >
}
