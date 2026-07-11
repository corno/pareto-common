import * as p_ from 'pareto-core/implementation/command'

import type * as interface_ from "../../declarations/commands.js"

//data types
import type * as d_main from "pareto-application-api/interface/data/main"
import type * as d_file_to_file from "../../interface/schemas/file_to_file.js"

//dependencies
import * as r_file_in_file_out_from_main from "../refiners/file_in_file_out/main.js"
import * as t_transform_file_to_prose from "../transformers/file_to_file/prose.js"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"


export const $$: interface_.file_to_file = p_.command(
    ($d, $s, $q, $c) => [

        p_.s.handle_error<d_main.Error, d_file_to_file.Error_yy>(
            [

                p_.s.refine(
                    (abort) => r_file_in_file_out_from_main.Parameters($d, ($) => abort(['file in file out', ['command line arguments', $]])),
                    ($r) => [

                        p_.s.query(
                            $q['read file'](
                                $r.in,
                                ($): d_file_to_file.Error_yy => {
                                    return ['file in file out', ['reading file', $]]
                                }
                            ),
                            ($v) => [

                                p_.s.query(
                                    $q['process data'](
                                        {
                                            'path': $r.in,
                                            'data': $v,
                                        },
                                        ($): d_file_to_file.Error_yy => {
                                            return ['processing', $]
                                        }
                                    ),
                                    ($v) => [
                                        $c['write file'].execute(
                                            {
                                                'path': $r.out,
                                                'data': $v.data,
                                            },
                                            ($) => {
                                                return ['file in file out', ['writing file', $]]
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
                                t_transform_file_to_prose.My_Error($)
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
