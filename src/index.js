/* 
The goal is to refactor this code! 

The testData CSV string represents a table of people and their favourite foods. 

The first row shows the names of the columns and the following rows
contain a persons first name, last name, and favourite foods; each piece of data being separated by a comma
while multiple favourite foods are separated by "|". 

For example the second row is:

first name = Lizabeth
last name = Ewert
favourite foods = ramen and steak

We want to split the csv into rows and format their information into a sentence reading:

"<FIRST NAME> <LAST NAME> likes these foods: <LIST OF FOODS>" 

and then separate each sentence by a <br/>

Example:
'
Lizabeth's sentence would be:
"Lizabeth Ewert likes these foods: ramen, steak."

The comments explain what the code is doing,
not what you need to do.

Whatever you would like to refactor is up to you, 
we're looking for:
- Clarity: splitting up your code in a readable and reusable way
- Context: can you explain to us what changes you have made and why?

*/

// Do not alter this string
const testData = `first_name,last_name,favourite_foods
Mozelle,Broxap,sushi
Lizabeth,Ewert,ramen|steak
Enriqueta,Dewitt,indian|ice cream|italian
Mallissa,Gedling,italian|tacos|caribbean
Valle,Brettel,BBQ|greek|salads|sushi`;

/* 
Create a reusable function that will parse our input csv data into a JSON.
This prevents hard-coding and makes the code more re-usable so that we can 
pass any csv through this function. Passing a JSON object through the string
formatter will make data manipulaiton easier. 
*/

/**
 * Converts a csv string into a json object
 * @param {string} csv - A csv string
 * @param {string} delimiter - the delimiter for the items
 * @param {string} lineSeparator - the line separator for each record
 * @returns {object} formatted JSON object of the input csv
 */
function csv2json(csv, delimiter = ",", lineSeparator = "\n") {
  /*
   rather than create a new var for each header, we can parse out the 
   first line using slice on the first line, and split each with a comma
  */
  const headers = csv.slice(0, csv.indexOf(lineSeparator)).split(delimiter);
  return (
    csv
      //split the rest of the array from the headers
      .slice(csv.indexOf(lineSeparator) + 1)
      // create an array with each record as an item
      .split(lineSeparator)
      // rather than a for loop to iterate through records, we will use the ES6 map method, which is more readable and clean
      .map(v => {
        // split the records in our array by the delimiter
        const values = v.split(delimiter);
        // use the reducer function to format values into an array
        return headers.reduce(
          // use spread syntax to return the entire object and replace index values with headers
          (obj, header, index) => ({ ...obj, [header]: values[index] }),
          {}
        );
      })
  );
}

// The new formatPerson function will do the entire formatting for us

/**
 * Converts a csv string into a json object
 * @param {object} json - A valid JSON object
 * @returns {string} formatted sentence for each item in the JSON
 */
function formatPerson(json) {
  const jsonData = csv2json(json);

  // Empty array forMattedPeople will hold the formatted setntences
  const formattedPeople = [];
  // use a forEach loop to iterate through each object in the JSON to format the string
  jsonData.forEach(x =>
    // template strings are cleaner & more readable than joining strings and vars
    formattedPeople.push(
      `${x.first_name} ${
        x.last_name
      } likes these foods: ${x.favourite_foods.split("|").join(", ")}.`
    )
  );
  // return formatted strings with a linebreak in between sentences
  return formattedPeople.join("<br/>");
}

// Add the sentences to the page on the right ---->
document.getElementById("app").innerHTML = formatPerson(testData);
