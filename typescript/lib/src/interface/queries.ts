import * as pqi from 'pareto-core/dist/query_interface'

import * as d_process_file_data from "./to_be_generated/process_file_data"
import * as d_process_stream_data from "./to_be_generated/process_stream_data"

export namespace queries {

    export type process_file_data = pqi.Query<d_process_file_data.Result, d_process_file_data.Error, d_process_file_data.Parameters>

    export type process_stream_data = pqi.Query<d_process_stream_data.Result, d_process_stream_data.Error, d_process_stream_data.Parameters>

}