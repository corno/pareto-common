import * as p_qi from 'pareto-core/dist/interface/query'

import * as d_process_file_data from "./data/process_file_data"
import * as d_process_stream_data from "./data/process_stream_data"

export namespace queries {

    export type process_file_data = p_qi.Query<d_process_file_data.Result, d_process_file_data.Error, d_process_file_data.Parameters>

    export type process_stream_data = p_qi.Query<d_process_stream_data.Result, d_process_stream_data.Error, d_process_stream_data.Parameters>

}