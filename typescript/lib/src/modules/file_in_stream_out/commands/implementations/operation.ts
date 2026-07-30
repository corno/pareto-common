import * as p_ from 'pareto-core/implementation/command'
import * as p_i from 'pareto-core/interface/command_implementation'

//schemas
import type * as s_main from "pareto-application-api/schemas/main/schema"
import type * as s_file_to_stream from "../../schemas/command/schema.js"

//dependencies
import * as r_file_in_stream_out_from_main from "../../schemas/command/refiners/main.js"
import * as t_file_in_stream_out_command_to_paragraph from "../../schemas/command/transformers/paragraph.js"
import * as t_paragraph_to_serialized_paragraph from "pareto-fountain-pen/modules/paragraph/schemas/paragraph/transformers/serialized"

//interface dependencies
import type * as command_interfaces_pareto_application_api from "pareto-application-api/commands/interfaces"
import type * as command_interfaces_pareto_stream_api from "pareto-stream-api/commands/interfaces"
import type * as query_interfaces from "../../queries/interfaces.js"
import type * as query_interfaces_pareto_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/modules/unrestricted/queries/interfaces"

export const $$: p_i.Command_Implementation<
    command_interfaces_pareto_application_api.main,
    {
        'indentation': string
    },
    {
        'read file': query_interfaces_pareto_filesystem_unrestricted_api.read_file
        'process data': query_interfaces.operation
    },
    {
        'log lines': command_interfaces_pareto_stream_api.log_lines
        'log error lines': command_interfaces_pareto_stream_api.log_error_lines
    }
> = p_.command(
    ($d, $s, $q, $c) => [

        p_.s.handle_error<s_main.Error, s_file_to_stream.Error>(
            [

                p_.s.refine(
                    (abort) => r_file_in_stream_out_from_main.Parameters($d, ($) => abort(['command line arguments', $])),
                    ($r) => [

                        p_.s.query(
                            $q['read file'](
                                $r.in,
                                ($): s_file_to_stream.Error => {
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
                                        ($): s_file_to_stream.Error => {
                                            return ['processing', $]
                                        }
                                    ),
                                    ($v) => [
                                        $c['log lines'].execute(
                                            {
                                                'lines': t_paragraph_to_serialized_paragraph.Paragraph(
                                                    $v.data,
                                                    {
                                                        'indentation': $s.indentation,
                                                    }
                                                )
                                            },
                                            ($) => {
                                                return ['writing to stream', $]
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
                            t_file_in_stream_out_command_to_paragraph.Error($),
                            {
                                'indentation': $s.indentation
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
