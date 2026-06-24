import * as p_ from 'pareto-core/dist/implementation/refiner'
import * as p_i from 'pareto-core/dist/interface/refiner'
import p_iterate from 'pareto-core/dist/implementation/refiner/specials/iterate'


//data types
import * as d_file_in_stream_out from "../../../../interface/data/file_to_stream"
import * as d_main from "pareto-resources/dist/interface/data/temp_main"

//dependencies
import * as r_node_path_to_text from "pareto-resources/dist/implementation/manual/refiners/path_unrestricted/text"

export const Parameters: p_i.Refiner<
    d_file_in_stream_out.Parameters,
    d_file_in_stream_out.Error_x,
    d_main.Parameters
> = ($, abort) => {
    return p_iterate<
        d_file_in_stream_out.Parameters,
        d_file_in_stream_out.Error_x,
        d_file_in_stream_out.Expected,
        string,
        null
    >({
        list: $.arguments,
        end_info: null,
        abort: abort,
        assign: (iterator) => ({
                    'in': iterator.consume(
                        ($) => r_node_path_to_text.Node_Path(
                            $,
                            ($) => iterator.abort(['invalid source path', null]),
                            {
                                'pedantic': true,
                            },
                        ),
                        () => iterator.abort(['unexpected', {
                            'expected': ['source path', null]
                        }])
                    ),
        }),
        create_dangling_item_error: () => p_.literal.set<d_file_in_stream_out.Error_x>(['too many arguments', null]),
        create_expectation_error: (expected, found) => ['unexpected', {
            'expected': expected
        }]
    })

}