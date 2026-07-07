import * as p_ from 'pareto-core/interface/query_action'

import * as d_process_file_data from "./data/process_file_data.js"
import * as d_process_stream_data from "./data/process_stream_data.js"


export type process_file_data = p_.Query_Action<d_process_file_data.Result, d_process_file_data.Error, d_process_file_data.Parameters>

export type process_stream_data = p_.Query_Action<d_process_stream_data.Result, d_process_stream_data.Error, d_process_stream_data.Parameters>
