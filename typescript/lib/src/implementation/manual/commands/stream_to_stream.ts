import * as p_ from 'pareto-core/implementation/command'
import * as p_temp from 'pareto-core/implementation/transformer'
import p_text_from_list from 'pareto-core/implementation/transformer/specials/text_from_list'

import type * as interface_ from "../../../interface/declarations/commands.js"

//data types
import type * as d_main from "pareto-application-api/interface/data/main"
import type * as d_stream_to_stream from "../../../interface/data/stream_to_stream.js"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"


export const $$: interface_.stream_to_stream = p_.command(
    ($d, $s, $q, $c) => [

        p_.s.handle_error<d_main.Error, d_stream_to_stream.Error>(
            [
                p_.s.query(
                    $q['get instream data'](
                        null,
                        ($): d_stream_to_stream.Error => ['could not read instream', null],
                    ),
                    ($v) => [


                        p_.s.query(
                            $q['process data'](
                                {
                                    'data': $v,
                                },
                                ($): d_stream_to_stream.Error => {
                                    return ['deserialization failed', $]
                                }
                            ),
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

                                p_temp.from.state($).decide(
                                    ($) => {
                                        switch ($[0]) {
                                            case 'could not read instream': return p_temp.ss($, ($) => sh.ph.literal("could not read instream"))
                                            case 'deserialization failed': return p_temp.ss($, ($) => $)
                                            case 'could not write to stdout': return p_temp.ss($, ($) => sh.ph.literal("could not write to stdout"))
                                            default: return p_temp.exhaustive($[0])
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