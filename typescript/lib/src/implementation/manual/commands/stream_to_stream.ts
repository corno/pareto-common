import * as p_ from 'pareto-core/dist/command/implementation'
import * as p_t from 'pareto-core/dist/assign'
import p_text_from_list from 'pareto-core/dist/specials/text_from_list'

import * as signatures from "../../../interface/commands"

//data types
import * as d_main from "pareto-resources/dist/interface/to_be_generated/temp_main"
import * as d_fp from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"
import * as d_stream_to_stream from "../../../interface/to_be_generated/stream_to_stream"

//dependencies
import * as t_fp_to_text from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/text"


//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"
import _p_list_from_text from 'pareto-core/dist/specials/list_from_text'


export const $$: signatures.procedures.stream_to_stream = p_.command_procedure(
    ($d, $s, $q, $c) => [

        p_.handle_error<d_main.Error, d_stream_to_stream.Error>(
            [
                p_.query(
                    $q['get instream data'](
                        null,
                        ($): d_stream_to_stream.Error => ['could not read instream', null],
                    ),
                    ($, abort) => $,
                    ($v) => [


                        p_.query(
                            $q['process data'](
                                {
                                    'data': $v,
                                },
                                ($): d_stream_to_stream.Error => {
                                    return ['deserialization failed', $]
                                }
                            ),
                            ($, abort) => $,
                            ($v) => [
                                $c['write to stdout'].execute(
                                    {
                                        'data': p_text_from_list(
                                            $v.data,
                                            ($) => $
                                        )
                                    },
                                    ($): d_stream_to_stream.Error => ['could not write to stdout', null],
                                )
                            ],

                        )

                    ]
                )
            ],
            ($) => [
                $c['log error'].execute(
                    {
                        'message': sh.pg.sentences([
                            sh.sentence([

                                p_t.decide.state($, ($) => {
                                    switch ($[0]) {
                                        case 'could not read instream': return p_t.ss($, ($) => sh.ph.literal("could not read instream"))
                                        case 'deserialization failed': return p_t.ss($, ($) => $)
                                        case 'could not write to stdout': return p_t.ss($, ($) => sh.ph.literal("could not write to stdout"))
                                        default: return p_t.au($[0])
                                    }
                                })
                            ])
                        ]),
                    },
                    ($): d_main.Error => ({
                        'exit code': 2
                    }),
                )
            ],
            () => ({
                'exit code': 1,
            })
        ),
    ]
)