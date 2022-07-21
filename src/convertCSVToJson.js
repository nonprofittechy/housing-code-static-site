import housingChecklistCSV from "./housing_code_checklist.csv";
import * as Papa from "papaparse";

/**
 * helper function to convert the csv to an object. When the CSV gets updated, run this and then copy over the data to
 * housing_code_checklist.json and store it as a child of the "data" key.
 */
export const printObject = async () => {
	fetch( housingChecklistCSV )
        .then( response => response.text() )
        .then( async (responseText) => {
            let data = Papa.parse(responseText).data;
            console.log(data);
        });
}

