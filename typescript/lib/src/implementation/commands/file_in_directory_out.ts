import * as p_ from 'pareto-core/implementation/command'
import * as p_i from 'pareto-core/interface/command_implementation'

//schemas
import type * as s_main from "../../interface/schemas/main.js"
import type * as s_file_to_file_command from "../../interface/schemas/file_in_directory_out_command.js"

//interface dependencies
import type * as command_interfaces_pareto_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/interface/commands"
import type * as command_interfaces_pareto_application_api from "pareto-application-api/interface/commands"
import type * as command_interfaces_pareto_stream_api from "pareto-stream-api/interface/commands"
import type * as query_interfaces from "../../interface/queries.js"
import type * as query_interfaces_pareto_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/interface/queries"

//dependencies
import * as r_file_in_directory_out_from_main from "../refiners/file_in_directory_out/main.js"
import * as t_f2f_command_to_prose from "../transformers/file_in_directory_out_command/prose.js"
import { $$ as c_write_directory_content } from "pareto-filesystem-unrestricted-api/implementation/commands/write_directory_content"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"

export const $$: p_i.Command_Implementation<
    command_interfaces_pareto_application_api.main,
    null,
    {
        'read file': query_interfaces_pareto_filesystem_unrestricted_api.read_file
        'process data': query_interfaces.file_in_directory_out,
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
                                            'data': $v,
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
                $c['log error'].execute(
                    {
                        'message': sh.pg.sentences([
                            sh.sentence([
                                t_f2f_command_to_prose.Error($)
                            ])
                        ]),
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
