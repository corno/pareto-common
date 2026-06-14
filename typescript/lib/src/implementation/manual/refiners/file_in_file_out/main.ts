import * as pt from 'pareto-core/dist/assign'
import * as pi from 'pareto-core/dist/interface'
import p_iterate from 'pareto-core/dist/specials/iterate'


//data types
import * as d_file_in_file_out from "../../../../interface/to_be_generated/file_to_file"
import * as d_main from "pareto-resources/dist/interface/to_be_generated/temp_main"

//dependencies
import * as p_file_in_file_out from "../../productions/file_in_file_out/text"

export const Parameters: pi.Refiner<
    d_file_in_file_out.Parameters,
    d_file_in_file_out.Error_x,
    d_main.Parameters
> = ($, abort) => {
    return p_iterate(
        $.arguments,
        null,
        (iter) => iter.assert_finished(
            () => ({
                'in': p_file_in_file_out.Path(iter, ($) => abort(['in path', $])),
                'out': p_file_in_file_out.Path(iter, ($) => abort(['out path', $])),
            }),
            {
                not_finished: ($) => abort(['too many arguments', null]),
            }

        ),
    )

}