import * as p_ from 'pareto-core/interface/query_interface'

import type * as s_file_in_file_out_data from "../modules/file_in_file_out/schemas/query.js"
import type * as s_file_in_directory_out_data from "./schemas/file_in_directory_out_query.js"
import type * as s_file_in_stream_out_data from "./schemas/file_in_stream_out_query.js"
import type * as s_stream_in_stream_out_data from "./schemas/stream_in_stream_out_query.js"


export type file_in_file_out = p_.Query_Interface<
    s_file_in_file_out_data.Result,
    s_file_in_file_out_data.Error,
    s_file_in_file_out_data.Parameters
>
export type file_in_directory_out = p_.Query_Interface<
    s_file_in_directory_out_data.Result,
    s_file_in_directory_out_data.Error,
    s_file_in_directory_out_data.Parameters
>
export type file_in_stream_out = p_.Query_Interface<
    s_file_in_stream_out_data.Result,
    s_file_in_stream_out_data.Error,
    s_file_in_stream_out_data.Parameters
>

export type stream_in_stream_out = p_.Query_Interface<
    s_stream_in_stream_out_data.Result,
    s_stream_in_stream_out_data.Error,
    s_stream_in_stream_out_data.Parameters
>
