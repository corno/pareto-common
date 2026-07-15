import * as p_ from 'pareto-core/implementation/command'
import * as p_i from 'pareto-core/interface/command_implementation'
import * as p_temp from 'pareto-core/implementation/transformer'

import type * as command_interfaces_pareto_application_api from "pareto-application-api/interface/commands"
import type * as command_interfaces_pareto_stream_api from "pareto-stream-api/interface/commands"
import type * as query_interfaces from "../../interface/queries.js"
import type * as query_interfaces_pareto_stream_api from "pareto-stream-api/interface/queries"

//schemas
import type * as s_main from "../../interface/schemas/main.js"
import type * as s_stream_to_stream from "../../interface/schemas/stream_in_stream_out_command.js"
import type * as s_paragraph from "pareto-fountain-pen/interface/schemas/paragraph"

//dependencies
import * as t_paragraph_to_serialized_paragraph from "pareto-fountain-pen/_implementation/transformers/paragraph/serialized"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/paragraph/deprecated"


export const $$: p_i.Command_Implementation<
    command_interfaces_pareto_application_api.main,
    {
        'indentation': string
    },
    {
        'get instream data': query_interfaces_pareto_stream_api.get_instream_data
        'process data': query_interfaces.stream_in_stream_out
    },
    {
        'log error lines': command_interfaces_pareto_stream_api.log_error_lines
        'log lines': command_interfaces_pareto_stream_api.log_lines
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
                                    'data': $v.data,
                                },
                                ($): s_stream_to_stream.Error => {
                                    return ['deserialization failed', {
                                        'message': $.message
                                    }]
                                }
                            ),
                            ($v) => [
                                $c['log lines'].execute(
                                    {
                                        'messages': t_paragraph_to_serialized_paragraph.Paragraph(
                                            $v.paragraph,
                                            {
                                                'indentation': $s.indentation
                                            }
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
                $c['log error lines'].execute(
                    {
                        'messages': t_paragraph_to_serialized_paragraph.Phrase(
                            p_temp.from.state($).decide(
                                ($): s_paragraph.Phrase => {
                                    switch ($[0]) {
                                        case 'could not read instream': return p_temp.ss($, ($) => sh.ph.text("could not read instream"))
                                        case 'deserialization failed': return p_temp.ss($, ($) => $.message)
                                        case 'could not write to stdout': return p_temp.ss($, ($) => sh.ph.text("could not write to stdout"))
                                        default: return p_temp.exhaustive($[0])
                                    }
                                }
                            ),
                            {
                                'indentation': $s.indentation
                            }
                        )
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