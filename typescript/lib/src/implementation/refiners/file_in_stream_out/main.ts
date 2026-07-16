import type * as p_i from 'pareto-core/interface/refiner'
import p_iterate from 'pareto-core/implementation/refiner/specials/iterate'


//schemas
import type * as s_file_in_stream_out from "../../../interface/schemas/file_in_stream_out_command.js"
import type * as s_main from "../../../interface/schemas/main.js"

//dependencies
import * as deser_path from "pareto-filesystem-unrestricted-api/modules/unrestricted/implementation/deserializers/path"

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
            'in': deser_path.Node_Path(
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