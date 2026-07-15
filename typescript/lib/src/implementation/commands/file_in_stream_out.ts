import * as p_ from 'pareto-core/implementation/command'
import * as p_i from 'pareto-core/interface/command_implementation'

//schemas
import type * as s_main from "../../interface/schemas/main.js"
import type * as s_file_to_stream from "../../interface/schemas/file_in_stream_out_command.js"

//dependencies
import * as r_file_in_stream_out_from_main from "../refiners/file_in_stream_out/main.js"
import * as t_file_in_stream_out_command_to_paragraph from "../transformers/file_in_stream_out_command/paragraph.js"
import * as t_paragraph_to_serialized_paragraph from "pareto-fountain-pen/_implementation/transformers/paragraph/serialized"

//interface dependencies
import type * as command_interfaces_pareto_application_api from "pareto-application-api/interface/commands"
import type * as command_interfaces_pareto_stream_api from "pareto-stream-api/interface/commands"
import type * as query_interfaces from "../../interface/queries.js"
import type * as query_interfaces_pareto_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/interface/queries"

export const $$: p_i.Command_Implementation<
    command_interfaces_pareto_application_api.main,
    {
        'indentation': string
        'newline': string
    },
    {
        'read file': query_interfaces_pareto_filesystem_unrestricted_api.read_file
        'process data': query_interfaces.file_in_stream_out
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
                                                'messages': t_paragraph_to_serialized_paragraph.Paragraph(
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
                        'messages': t_paragraph_to_serialized_paragraph.Phrase(
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
