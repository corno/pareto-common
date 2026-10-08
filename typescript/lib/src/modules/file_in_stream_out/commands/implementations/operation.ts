import * as p_ from 'pareto-core/command'
import * as p_i from 'pareto-core/command_implementation'

//schemas
import type * as s_main from "pareto-application-api/schemas/main/schema"
import type * as s_file_to_stream from "../../schemas/command/schema.js"

//dependencies
import * as r_file_in_stream_out_from_main from "../../schemas/command/refiners/main.js"
import * as t_file_in_stream_out_command_to_paragraph from "../../schemas/command/transformers/paragraph.js"
import * as sh from "pareto-fountain-pen/modules/paragraph/schemas/paragraph/shorthands/deprecated"

//interface dependencies
import type * as command_interfaces_pareto_application_api from "pareto-application-api/commands/interfaces"
import type * as command_interfaces_pareto_stream_api from "pareto-stream-api/commands/interfaces"
import type * as query_interfaces from "../../queries/interfaces.js"
import type * as query_interfaces_pareto_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/modules/unrestricted/queries/interfaces"

export const $$: p_i.Command_Implementation<
    command_interfaces_pareto_application_api.main,
    {
        'indentation': string
        'newline': string
    },
    {
        'read file': query_interfaces_pareto_filesystem_unrestricted_api.read_file
        'process data': query_interfaces.operation
    },
    {
        'log paragraph': command_interfaces_pareto_stream_api.log_paragraph
        'log error paragraph': command_interfaces_pareto_stream_api.log_error_paragraph
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
                                        $c['log paragraph'].execute(
                                            {
                                                'paragraph': $v.data,
                                                'indentation': $s.indentation,
                                                'newline': $s.newline,
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
                $c['log error paragraph'].execute(
                    {
                        'paragraph': sh.pg.sentences([sh.sentence([t_file_in_stream_out_command_to_paragraph.Error($)])]),
                        'indentation': $s.indentation,
                        'newline': $s.newline,
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
