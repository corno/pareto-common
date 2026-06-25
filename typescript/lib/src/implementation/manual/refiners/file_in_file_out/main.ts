import * as p_ from 'pareto-core/dist/implementation/refiner'
import * as p_i from 'pareto-core/dist/interface/refiner'
import p_iterate from 'pareto-core/dist/implementation/refiner/specials/iterate'


//data types
import * as d_file_in_file_out from "../../../../interface/data/file_to_file"
import * as d_main from "pareto-resources/dist/interface/data/temp_main"

//dependencies
import * as r_node_path_to_text from "pareto-resources/dist/implementation/manual/refiners/path_unrestricted/text"

export const Parameters: p_i.Refiner<
    d_file_in_file_out.Parameters,
    d_file_in_file_out.Error_x,
    d_main.Parameters
> = ($, abort) => {
    return p_iterate<
        d_file_in_file_out.Parameters,
        string,
        null
    >({
        list: $.arguments,
        end_info: null,
        assign: (iterator) => ({
            'in': r_node_path_to_text.Node_Path(
                iterator.consume.text(
                    ($) => $,
                    (end_info) => abort(['unexpected', {
                        'expected': ['source path', null]
                    }])
                ),
                ($) => abort(['invalid source path', null]),
                {
                    'pedantic': false,
                },
            ),
            'out': r_node_path_to_text.Node_Path(
                iterator.consume.text(
                    ($) => $,
                    (end_info) => abort(['unexpected', {
                        'expected': ['target path', null]
                    }])
                ),
                ($) => abort(['invalid target path', null]),
                {
                    'pedantic': false,
                },
            ),
        }),
        on_dangling_item: () => abort(['too many arguments', null]),
        // create_expectation_error: (expected, found) => ['unexpected', {
        //     'expected': expected
        // }]
    })

}