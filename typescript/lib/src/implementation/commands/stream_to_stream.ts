import * as p_ from 'pareto-core/implementation/command'
import * as p_i from 'pareto-core/interface/command_implementation'
import * as p_temp from 'pareto-core/implementation/transformer'
import p_text_from_list from 'pareto-core/implementation/transformer/specials/text_from_list'

import type * as command_interfaces_pareto_application_api from "pareto-application-api/interface/commands"
import type * as command_interfaces_pareto_stream_api from "pareto-stream-api/interface/commands"
import type * as query_interfaces from "../../interface/queries.js"
import type * as query_interfaces_pareto_stream_api from "pareto-stream-api/interface/queries"

//schemas
import type * as s_main from "pareto-application-api/interface/data/main"
import type * as s_stream_to_stream from "../../interface/schemas/stream_to_stream.js"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"


export const $$: p_i.Command_Implementation<
    command_interfaces_pareto_application_api.main,
    null,
    {
        'get instream data': query_interfaces_pareto_stream_api.get_instream_data,
        'process data': query_interfaces.process_stream_data,
    },
    {
        'log error': command_interfaces_pareto_stream_api.log_error
        'write to stdout': command_interfaces_pareto_stream_api.write_to_stdout
    }
> = p_.command(
    ($d, $s, $q, $c) => [

        p_.s.handle_error<s_main.Error, s_stream_to_stream.Error>(
            [
                p_.s.query(
                    $q['get instream data'](
                        null,
                        ($): s_stream_to_stream.Error => ['could not read instream', null],
                    ),
                    ($v) => [


                        p_.s.query(
                            $q['process data'](
                                {
                                    'data': $v,
                                },
                                ($): s_stream_to_stream.Error => {
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
                                    ($): s_stream_to_stream.Error => ['could not write to stdout', null],
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
                    ($): s_main.Error => ({
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