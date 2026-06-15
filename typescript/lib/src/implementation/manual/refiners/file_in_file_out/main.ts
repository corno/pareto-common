import * as p_i from 'pareto-core/dist/interface/refiner'
import p_iterate from 'pareto-core/dist/implementation/specials/iterate'


//data types
import * as d_file_in_file_out from "../../../../interface/data/file_to_file"
import * as d_main from "pareto-resources/dist/interface/to_be_generated/temp_main"

//dependencies
import * as p_file_in_file_out from "../../productions/file_in_file_out/text"

export const Parameters: p_i.Refiner<
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