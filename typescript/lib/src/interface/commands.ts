import * as p_ from 'pareto-core/interface/command'

import * as resources_pareto from "pareto-resources/interface/resources"
import * as commands_pareto_application_api from "pareto-application-api/interface/resources"
import * as commands_pareto_stream_api from "pareto-stream-api/interface/commands"
import * as queries_pareto_stream_api from "pareto-stream-api/interface/queries"
import * as resources from "./queries.js"

export namespace procedures {

    export type file_to_file = p_.Command_Procedure<
        commands_pareto_application_api.resources.commands.main,
        null,
        {
            'read file': resources_pareto.filesystem_unrestricted.queries.read_file
            'process data': resources.queries.process_file_data, 
        },
        {
            'write file': resources_pareto.filesystem_unrestricted.commands.write_file,
            'log error': commands_pareto_stream_api.commands.log_error,
        }
    >

    export type file_to_stream = p_.Command_Procedure<
        commands_pareto_application_api.resources.commands.main,
        null,
        {
            'read file': resources_pareto.filesystem_unrestricted.queries.read_file
            'process data': resources.queries.process_file_data, 
        },
        {
            'write to stdout': commands_pareto_stream_api.commands.write_to_stdout
            'log error': commands_pareto_stream_api.commands.log_error,
        }
    >

    export type stream_to_stream = p_.Command_Procedure<
        commands_pareto_application_api.resources.commands.main,
        null,
        {
            'get instream data': queries_pareto_stream_api.queries.get_instream_data,
            'process data': resources.queries.process_stream_data, 
        },
        {
            'log error': commands_pareto_stream_api.commands.log_error
            'write to stdout': commands_pareto_stream_api.commands.write_to_stdout
        }
    >

}