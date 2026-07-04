import * as p_ from 'pareto-core/dist/implementation/command'
import p_text_from_list from 'pareto-core/dist/implementation/transformer/specials/text_from_list'

import * as interface_ from "../../../interface/commands"

//data types
import * as d_main from "pareto-resources/dist/interface/data/temp_main"
import * as d_file_to_stream from "../../../interface/data/file_to_stream"

//dependencies
import * as r_file_in_stream_out_from_main from "../refiners/file_in_stream_out/main"
import * as t_file_to_stream_to_prose from "../transformers/file_to_stream/prose"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose/deprecated"


export const $$: interface_.procedures.file_to_stream = p_.command_procedure(
    ($d, $s, $q, $c) => [

        p_.s.handle_error<d_main.Error, d_file_to_stream.Error>(
            [

                p_.s.refine(
                    (abort) => r_file_in_stream_out_from_main.Parameters($d, ($) => abort(['file in stream out', ['command line arguments', $]])),
                    ($r) => [

                        p_.s.query(
                            $q['read file'](
                                $r.in,
                                ($): d_file_to_stream.Error => {
                                    return ['file in stream out', ['reading file', $]]
                                }
                            ),
                            ($v) => [

                                p_.s.query(
                                    $q['process data'](
                                        {
                                            'path': $r.in,
                                            'data': $v,
                                        },
                                        ($): d_file_to_stream.Error => {
                                            return ['processing', $]
                                        }
                                    ),
                                    ($v) => [
                                        $c['write to stdout'].execute(
                                            {
                                                'data': p_text_from_list(
                                                    $v.data,
                                                    ($) => $
                                                ),
                                            },
                                            ($) => {
                                                return ['file in stream out', ['writing to stream', $]]
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
                                t_file_to_stream_to_prose.My_Error($)
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
