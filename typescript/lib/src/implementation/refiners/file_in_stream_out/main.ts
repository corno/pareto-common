import type * as p_i from 'pareto-core/interface/refiner'
import p_iterate from 'pareto-core/implementation/refiner/specials/iterate'


//data types
import type * as s_file_in_stream_out from "../../../interface/schemas/file_to_stream.js"
import type * as s_main from "pareto-application-api/interface/data/main"

//dependencies
import * as r_node_path_to_text from "pareto-resources/implementation/refiners/path_unrestricted/text"

export const Parameters: p_i.Refiner<
    s_file_in_stream_out.Parameters,
    s_file_in_stream_out.Error_x,
    s_main.Parameters
> = ($, abort) => {
    return p_iterate<
        s_file_in_stream_out.Parameters,
        string,
        null
    >({
        list: $.arguments,
        end_info: null,
        assign: (iterator) => ({
            'in': r_node_path_to_text.Node_Path(
                iterator.consume(
                    ($) => abort(['unexpected', {
                        'expected': ['source path', null]
                    }]),
                    ($) => $,
                ),
                ($) => abort(['invalid source path', null]),
                {
                    'pedantic': true,
                },
            ),
        }),
        on_dangling_item: () => abort(['too many arguments', null]),
    })

}