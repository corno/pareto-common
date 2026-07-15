import * as p_ from 'pareto-core/implementation/command'
import * as p_i from 'pareto-core/interface/command_implementation'

//schemas
import type * as s_main from "../../interface/schemas/main.js"
import type * as s_file_to_file_command from "../../interface/schemas/file_in_file_out_command.js"

//dependencies
import * as r_file_in_file_out_from_main from "../refiners/file_in_file_out/main.js"
import * as t_f2f_command_to_prose from "../serializers/file_in_file_out_command.js"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose_simple/deprecated"

//interface dependencies
import type * as command_interfaces_pareto_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/interface/commands"
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
        'process data': query_interfaces.file_in_file_out,
    },
    {
        'write file': command_interfaces_pareto_filesystem_unrestricted_api.write_file,
        'log error': command_interfaces_pareto_stream_api.log_error,
    }
> = p_.command(
    ($d, $s, $q, $c) => [

        p_.s.handle_error<s_main.Error, s_file_to_file_command.Error>(
            [

                p_.s.refine(
                    (abort) => r_file_in_file_out_from_main.Parameters($d, ($) => abort(['command line arguments', $])),
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
                                            return ['processing', $.phrase]
                                        }
                                    ),
                                    ($v) => [
                                        $c['write file'].execute(
                                            {
                                                'path': $r.out,
                                                'paragraph': $v.paragraph,
                                                'indentation': $s.indentation,
                                                'newline': $s.newline,
                                            },
                                            ($) => {
                                                return ['writing file', $]
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
                $c['log error'].execute(
                    {
                        'phrase': t_f2f_command_to_prose.Error($),
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
