import * as p_ from 'pareto-core/command'
import * as p_i from 'pareto-core/command_implementation'
import * as p_temp from 'pareto-core/transformer'

import type * as command_interfaces_pareto_application_api from "pareto-application-api/commands/interfaces"
import type * as command_interfaces_pareto_stream_api from "pareto-stream-api/commands/interfaces"
import type * as query_interfaces from "../../queries/interfaces.js"
import type * as query_interfaces_pareto_stream_api from "pareto-stream-api/queries/interfaces"

//schemas
import type * as s_main from "pareto-application-api/schemas/main/schema"
import type * as s_stream_to_stream from "../../schemas/command/schema.js"
import type * as s_paragraph from "pareto-fountain-pen/modules/paragraph/schemas/paragraph/schema"

//dependencies

//shorthands
import * as sh from "pareto-fountain-pen/modules/paragraph/schemas/paragraph/shorthands/deprecated"


export const $$: p_i.Command_Implementation<
    command_interfaces_pareto_application_api.main,
    {
        'indentation': string
        'newline': string
    },
    {
        'get instream data': query_interfaces_pareto_stream_api.get_instream_data
        'process data': query_interfaces.operation
    },
    {
        'log error paragraph': command_interfaces_pareto_stream_api.log_error_paragraph
        'log paragraph': command_interfaces_pareto_stream_api.log_paragraph
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
                                $c['log paragraph'].execute(
                                    {
                                        'paragraph': $v.paragraph,
                                        'indentation': $s.indentation,
                                        'newline': $s.newline,
                                    },
                                    ($): s_stream_to_stream.Error => ['could not write to stdout', null],
                                )
                            ],

                        )

                    ]
                )
            ],
            ($) => [
                $c['log error paragraph'].execute(
                    {
                        'paragraph': sh.pg.sentences([sh.sentence([
                            p_temp.from.state($).decide(
                                ($): s_paragraph.Phrase => {
                                    switch ($[0]) {
                                        case 'could not read instream': return p_temp.option($, ($) => sh.ph.text("could not read instream"))
                                        case 'deserialization failed': return p_temp.option($, ($) => $.message)
                                        case 'could not write to stdout': return p_temp.option($, ($) => sh.ph.text("could not write to stdout"))
                                        default: return p_temp.exhaustive($[0])
                                    }
                                }
                            ),
                        ])]),
                        'indentation': $s.indentation,
                        'newline': $s.newline,
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