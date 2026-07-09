import * as p_ from 'pareto-core/interface/command_implementation'

import type * as command_interfaces_pareto_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/interface/commands"
import type * as command_interfaces_pareto_application_api from "pareto-application-api/interface/commands"
import type * as command_interfaces_pareto_stream_api from "pareto-stream-api/interface/commands"
import type * as query_interfaces_pareto_stream_api from "pareto-stream-api/interface/queries"
import * as query_interfaces from "../interface/queries.js"
import type * as query_interfaces_pareto_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/interface/queries"

export type file_to_file = p_.Command_Implementation<
    command_interfaces_pareto_application_api.main,
    null,
    {
        'read file': query_interfaces_pareto_filesystem_unrestricted_api.read_file
        'process data': query_interfaces.process_file_data,
    },
    {
        'write file': command_interfaces_pareto_filesystem_unrestricted_api.write_file,
        'log error': command_interfaces_pareto_stream_api.log_error,
    }
>

export type file_to_stream = p_.Command_Implementation<
    command_interfaces_pareto_application_api.main,
    null,
    {
        'read file': query_interfaces_pareto_filesystem_unrestricted_api.read_file
        'process data': query_interfaces.process_file_data,
    },
    {
        'write to stdout': command_interfaces_pareto_stream_api.write_to_stdout
        'log error': command_interfaces_pareto_stream_api.log_error,
    }
>

export type stream_to_stream = p_.Command_Implementation<
    command_interfaces_pareto_application_api.main,
    null,
    {
        'get instream data': query_interfaces_pareto_stream_api.get_instream_data,
        'process data': query_interfaces.process_stream_data,
    },
    {
        'log error': command_interfaces_pareto_stream_api.log_error
        'write to stdout': command_interfaces_pareto_stream_api.write_to_stdout
    }
>