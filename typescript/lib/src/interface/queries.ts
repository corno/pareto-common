import * as p_ from 'pareto-core/interface/query_interface'

import type * as s_process_file_data from "./schemas/process_file_data.js"
import type * as s_process_stream_data from "./schemas/process_stream_data.js"


export type process_file_data = p_.Query_Interface<
    s_process_file_data.Result,
    s_process_file_data.Error,
    s_process_file_data.Parameters
>

export type process_stream_data = p_.Query_Interface<
    s_process_stream_data.Result,
    s_process_stream_data.Error,
    s_process_stream_data.Parameters
>
