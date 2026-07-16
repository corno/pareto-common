import * as p_ from 'pareto-core/implementation/refiner'

import p_iterate from 'pareto-core/implementation/refiner/specials/iterate'


//schemas
import type * as s_out from "../../../schemas/refiner.js"
//schemas
import type * as s_function from "../../../schemas/refiner.js"
import type * as s_in from "../../../../../interface/schemas/main.js"

export namespace declarations {

    export type Parameters = p_.Refiner<
        s_function.Parameters,
        s_function.Error,
        s_in.Parameters
    >
}


//dependencies
import * as deser_path from "pareto-filesystem-unrestricted-api/modules/unrestricted/implementation/deserializers/path"

export const Parameters: declarations.Parameters = ($, abort) => {
    return p_iterate<
        s_out.Parameters,
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
                    'pedantic': false,
                },
            ),
            'out': deser_path.Node_Path(
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