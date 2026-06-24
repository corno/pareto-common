import * as p_ from 'pareto-core/dist/implementation/refiner'
import * as p_i from 'pareto-core/dist/interface/refiner'
import p_iterate from 'pareto-core/dist/implementation/refiner/specials/iterate'


//data types
import * as d_file_in_stream_out from "../../../../interface/data/file_to_stream"
import * as d_main from "pareto-resources/dist/interface/data/temp_main"

//dependencies
import * as pr_file_in_stream_out from "../../productions/file_in_stream_out/text"

export const Parameters: p_i.Refiner<
    d_file_in_stream_out.Parameters,
    d_file_in_stream_out.Error_x,
    d_main.Parameters
> = ($, abort) => {
    return p_iterate(
        $.arguments,
        null,
        p_.literal.set<d_file_in_stream_out.Error_x>(['too many arguments', null]),
        abort,
        (iter) => ({
            'in': pr_file_in_stream_out.Path(
                iter.to_new_iterator(($) => ['in path', $]),
            ),
        }),
    )

}