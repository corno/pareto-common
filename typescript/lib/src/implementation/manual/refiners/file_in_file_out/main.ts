import type * as p_i from 'pareto-core/interface/refiner'
import p_iterate from 'pareto-core/implementation/refiner/specials/iterate'


//data types
import type * as d_out from "../../../../interface/data/file_to_file.js"
import type * as d_function from "../../../../interface/data/file_to_file.js"
import type * as d_in from "pareto-application-api/interface/data/main"

export namespace interface_ {
    export type Parameters = p_i.Refiner<
        d_out.Parameters,
        d_function.Error,
        d_in.Parameters
    >
}

//dependencies
import * as r_node_path_to_text from "pareto-resources/implementation/manual/refiners/path_unrestricted/text"

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