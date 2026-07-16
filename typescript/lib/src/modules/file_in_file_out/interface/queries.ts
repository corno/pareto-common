import * as p_ from 'pareto-core/interface/query_interface'

import type * as s_file_in_file_out_data from "../schemas/query.js"


export type operation = p_.Query_Interface<
    s_file_in_file_out_data.Result,
    s_file_in_file_out_data.Error,
    s_file_in_file_out_data.Parameters
>