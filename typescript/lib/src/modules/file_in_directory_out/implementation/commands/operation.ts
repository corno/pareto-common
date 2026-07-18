import * as p_ from 'pareto-core/implementation/command'
import * as p_i from 'pareto-core/interface/command_implementation'

//schemas
import type * as s_main from "../../schemas/main.js"
import type * as s_file_to_file_command from "../../schemas/command.js"

//interface dependencies
import type * as command_interfaces_pareto_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/modules/unrestricted/interface/commands"
import type * as command_interfaces_pareto_application_api from "pareto-application-api/interface/commands"
import type * as command_interfaces_pareto_stream_api from "pareto-stream-api/interface/commands"
import type * as query_interfaces from "../../interface/queries.js"
import type * as query_interfaces_pareto_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/modules/unrestricted/interface/queries"

//dependencies
import * as r_file_in_directory_out_from_main from "../refiners/operation/main.js"
import * as t_file_in_directory_out_command_to_paragraph from "../transformers/command/paragraph.js"
import * as t_paragraph_to_serialized_paragraph from "pareto-fountain-pen/_implementation/transformers/paragraph/serialized"
import { $$ as c_write_directory_content } from "pareto-filesystem-unrestricted-api/modules/helpers/implementation/commands/write_directory_content"


export const $$: p_i.Command_Implementation<
    command_interfaces_pareto_application_api.main,
    {
        'error message indentation': string
    },
    {
        'read file': query_interfaces_pareto_filesystem_unrestricted_api.read_file
        'process data': query_interfaces.operation,
    },
    {
        'write file': command_interfaces_pareto_filesystem_unrestricted_api.write_file,
        'log error lines': command_interfaces_pareto_stream_api.log_error_lines,
    }
> = p_.command(
    ($d, $s, $q, $c) => [

        p_.s.handle_error<s_main.Error, s_file_to_file_command.Error>(
            [

                p_.s.refine(
                    (abort) => r_file_in_directory_out_from_main.Parameters($d, ($) => abort(['command line arguments', $])),
                    ($r) => [

                        p_.s.query(
                            $q['read file'](
                                $r.in,
                                ($): s_file_to_file_command.Error => {
                                    return ['reading file', $]
                                }
                            ),
                            ($v) => [

                                p_.s.query(
                                    $q['process data'](
                                        {
                                            'path': $r.in,
                                            'data': $v.data,
                                        },
                                        ($): s_file_to_file_command.Error => {
                                            return ['processing', $]
                                        }
                                    ),
                                    ($v) => [
                                        c_write_directory_content(
                                            null,
                                            null,
                                            {
                                                'write file': $c['write file'],
                                            }
                                        ).execute(
                                            {
                                                'path': $r.out,
                                                'directory': $v.data,
                                            },
                                            ($): s_file_to_file_command.Error => {
                                                return ['writing directory', $]
                                            },
                                        )
                                    ],

                                )
                            ]
                        )
                    ]
                ),
            ],
            ($) => [
                $c['log error lines'].execute(
                    {
                        'lines': t_paragraph_to_serialized_paragraph.Phrase(
                            t_file_in_directory_out_command_to_paragraph.Error($),
                            {
                                'indentation': $s['error message indentation']
                            }
                        ),
                    },
                    ($) => ({
                        'exit code': 2
                    })
                )
            ],
            () => ({
                'exit code': 1
            }),
        ),
    ]
)
