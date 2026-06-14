import * as pci from 'pareto-core/dist/command_interface'

import * as resources_pareto from "pareto-resources/dist/interface/resources"
import * as commands_pareto_stream from "pareto-stream/dist/interface/commands"
import * as queries_pareto_stream from "pareto-stream/dist/interface/queries"
import * as resources from "./queries"

import * as d_prose_serialize from "pareto-fountain-pen/dist/interface/to_be_generated/prose_serialize"

export namespace procedures {

    export type file_to_file = pci.Command_Procedure<
        resources_pareto.resources.commands.main,
        null,
        {
            'read file': resources_pareto.filesystem_unrestricted.queries.read_file
            'process data': resources.queries.process_file_data, 
        },
        {
            'write file': resources_pareto.filesystem_unrestricted.commands.write_file,
            'log error': commands_pareto_stream.commands.log_error,
        }
    >

    export type stream_to_stream = pci.Command_Procedure<
        resources_pareto.resources.commands.main,
        null,
        {
            'get instream data': queries_pareto_stream.queries.get_instream_data,
            'process data': resources.queries.process_stream_data, 
        },
        {
            'log error': commands_pareto_stream.commands.log_error
            'write to stdout': commands_pareto_stream.commands.write_to_stdout
        }
    >

}