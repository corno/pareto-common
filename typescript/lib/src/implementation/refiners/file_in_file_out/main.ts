import p_iterate from 'pareto-core/implementation/refiner/specials/iterate'

import type * as interface_ from "../../../declarations/refiners/file_in_file_out/main.js"


//data types
import type * as d_out from "../../../interface/data/file_to_file.js"

//dependencies
import * as r_node_path_to_text from "pareto-resources/implementation/refiners/path_unrestricted/text"

export const Parameters: interface_.Parameters = ($, abort) => {
    return p_iterate<
        d_out.Parameters,
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
                    'pedantic': false,
                },
            ),
            'out': r_node_path_to_text.Node_Path(
                iterator.consume(
                    ($) => abort(['unexpected', {
                        'expected': ['target path', null]
                    }]),
                    ($) => $,
                ),
                ($) => abort(['invalid target path', null]),
                {
                    'pedantic': false,
                },
            ),
        }),
        on_dangling_item: () => abort(['too many arguments', null]),
    })
}