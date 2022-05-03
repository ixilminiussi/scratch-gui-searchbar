import { words } from "lodash";
import { rotation } from "synonyms/dictionary";
import { TST, dictionary, tag_dictionary, synonym_dictionary } from "./search-structures.js"
const synonyms = require('synonyms'); 

// AUTOCOMPLETE
// =============================================================================================
/**
 * First search algorithm, simply returns results that contain the specified input
 * @param {array} blocks    - list of blocks to search through
 * @param {String} query    - user query
 * @param {Integer} sl      - size of slice to take (by default 5)
 * @returns - a list of relevant results
 */
 const autocompleteSearch = (blocks, query, sl=-1) => {

    // Used to generate the original TST
    /*let root = {};
    for (var i = 0; i < blocks.length; i ++) {
        root = add(blocks[i].prompt, 0, root);
    }
    console.log(root);*/

    if (query === '') {
        return [];
    }

    let prompts = autocomplete(query.toLowerCase());

    let results = blocks.filter(block => prompts.includes(block.prompt) || block.prompt === query);

    results.sort((a, b) => (a.prompt.length - b.prompt.length));

    if (sl === -1) {
        return(results);
    }

    return results.slice(0, sl);
}; 

class Node {
    constructor(char, flag=false) {
        this.char = char;
        this.flag = flag;
        
        this.lo = {};
        this.mid = {};
        this.hi = {};

        this.words = [];
    }
}

/**
 * Used to add a new word to the TST, no longer ran but used to generate the initial TST
 * @param {String} str  - the word to be added to the TST
 * @param {int} i       - used for recursion, initiate at 0
 * @param {Node} node   - the initial root node of the TST
 * @returns 
 */
function add(str, i=0, node=TST) {

    if (isEmpty(node)) { // if the node is empty, create one
        node = new Node(str[i], false);
        node = add(str, i, node);

        return node;
    }

    if (i === str.length-1) { // if we reach the last character, flag the node
        node.flag = true;

        return node;
    }

    if (str[i] < node.char) { // if the character is lower than the node, move to the left and do not progress
        node.lo = add(str, i, node.lo);

        return node;
    } 
    
    if (str[i] > node.char) { // if the character is higher than the node, move to the right and do not progress
        node.hi = add(str, i, node.hi);

        return node;
    }

    node.words.push(str); // otherwise, if it is the same character, move to the middle and progress by one character
    node.mid = add(str, i+1, node.mid);

    return node;
}

/**
 * Used to explore the autocomplete TST
 * @param {String} str  - the current text to autocomplete
 * @param {int} i       - used for recursion, initiate at 0
 * @param {Node} node   - the initial root Node of the TST, by default root
 * @returns 
 */
function autocomplete(str, i=0, node=TST) {

    if (isEmpty(node)) {
        return [];
    }

    if (i < str.length) {

        if (str[i] < node.char) {
            return autocomplete(str, i, node.lo);
        }
    
        if (str[i] > node.char) {
            return autocomplete(str, i, node.hi);
        }
    
        if (i === str.length - 1) { // if we reached the last character of the query, return all words
            return node.words;
        } else {
            return autocomplete(str, i+1, node.mid);
        }
    }

    return node.words;
}

/**
 * Checks if JSON object is empty (i.e. {})
 * @param {JSON} obj    - the object we want to check
 * @returns             - true if empty, false otherwise
 */
function isEmpty(obj) {
    return JSON.stringify(obj) === JSON.stringify({});
}
// =============================================================================================

// SUGGESTION
// =============================================================================================
/**
 * Second search algorithm, similar to direct search but allows for user input errors,
 * as well as varying order of words
 * @param {array} blocks - list of blocks to search through
 * @param {String} query - user query
 * @param {Integer} sl - size of slice to take (by default 5)
 * @returns - a list of relevant results
 */
const suggestionSearch = (blocks, query, synonymCost=0, letterCost=1, threshold=2, sl=10) => {

    let words = query.split(" ");

    // First, loop through all words, return list with cost
    // Find prompts that match, give them score threshold + 1, and subtract word cost

    if (query === '') {
        return [];
    }

    for (var i in words) {
        blocks = singleSuggestionSearch(blocks, words[i], synonymCost, letterCost);
    }

    let results = blocks.filter(block => block.relevance > 0);
    results.sort((a, b) => (b.relevance - a.relevance));

    //return results.slice(0, sl); // this is imperfect, if the last element has relevance 5 the same as the elements that follow, then why should this element, go and the next not.
    let last = Math.min(results.length-1, sl-1);
    let referenceGate = Math.max(results[last].relevance, 1);
    return results.filter(result => result.relevance >= referenceGate);
};

const singleSuggestionSearch = (blocks, word, synonymCost=0, letterCost=1, threshold=2, sl=10) => {

    let results = match(word, dictionary, letterCost, threshold);

    for (var i in results) {
        for (var j in blocks) {
            if (blocks[j].prompt.includes(results[i].word)) {
                blocks[j].relevance += threshold + 1 - results[i].distance;
            }
        }
    }

    results = match(word, synonym_dictionary, letterCost, threshold-synonymCost); // no need to return a word in synonym, if finding a synonym will make it go over threshold

    for (var i in results) {
        results[i].distance += synonymCost;
        results[i].word = synonym_dictionary[results[i].word];
        for (var j in blocks) {
            if (blocks[j].prompt.includes(results[i].word)) {
                blocks[j].relevance += threshold + 1 - results[i].distance;
            }
        }
    }

    return blocks;
}

/**
 * returns the closest available word to whatever the targetWord is, if there are more
 * than one option, returns the word with the lowest distance, and the word with the highest
 * frequency
 * @param {String} targetWord   - the word typed
 * @param {JSON} dictionary     - a list of all word
 * @param {Integer} threshold   - optional, how large the distance between the two words can be
 * @returns 
 */
 const match = (targetWord, dictionary, cost=1, threshold=2) => {

    let results = [];

    if (targetWord.length <= threshold/cost) { // used to avoid a word returning all words of the same size
        cost = cost * 2;
    }

    for (var sourceWord in dictionary) {
        let distance = levenshteinCalculate(sourceWord, targetWord, cost);
        if (distance <= threshold) {
            results.push({'word': sourceWord, 'distance': distance });
        }
    }

    return results;
};

// editted from https://www.codedrome.com/levenshtein-word-distance-in-javascript/
/**
 * Uses the levenshtein method to calculate the distance between 2 words
 * the distance between taret and target is 1
 * @param {String} sourceWord   - the word we're starting from
 * @param {String} targetWord   - the word we're going towards
 * @param {int} cost            - the cost of 
 * @returns 
 */
function levenshteinCalculate(sourceWord, targetWord, cost=1)
{
    let lev = {};
    lev.grid = [];
    lev.sourceLength = sourceWord.length;
    lev.targetLength = targetWord.length;
    lev.minimum_cost = 0;
    lev.sourceWord = sourceWord;
    lev.targetWord = targetWord;
    for(let r = 0; r <= lev.sourceLength; r++)
    {
        lev.grid[r] = [];
        for(let c = 0; c <= lev.targetLength; c++)
        {
            if(r == 0)
            {
                lev.grid[r][c] = c;
            }
            else if(c == 0)
            {
                lev.grid[r][c] = r;
            }
            else
            {
                lev.grid[r][c] = 0;
            }
        }
    }
    const min = (a, b, c) =>
    {
        let m;
        (a <= b && a <= c) ? (m = a) : (b <= a && b <= c) ? (m = b) : (m = c);
        return m;
    }

    const INSERT_COST = cost;
    const DELETE_COST = cost;
    const SUBSTITUTE_COST = cost;
    let totalSubstitutionCost;
    let totalDeletionCost;
    let totalInsertionCost;
    for(let sourceLetter = 0; sourceLetter < lev.sourceLength; sourceLetter++)
    {
        for(let targetLetter = 0; targetLetter < lev.targetLength; targetLetter++)
        {
            if(lev.targetWord[targetLetter] != lev.sourceWord[sourceLetter])
            {
                totalSubstitutionCost = lev.grid[sourceLetter][targetLetter] + SUBSTITUTE_COST;
            }
            else
            {
                totalSubstitutionCost = lev.grid[sourceLetter][targetLetter];
            }
            totalDeletionCost = lev.grid[sourceLetter][targetLetter+1] + DELETE_COST;
            totalInsertionCost = lev.grid[sourceLetter+1][targetLetter] + INSERT_COST;
            lev.grid[sourceLetter+1][targetLetter+1] = min(totalSubstitutionCost, totalDeletionCost, totalInsertionCost);
        }
    }
    return lev.grid[lev.sourceLength][lev.targetLength];
}

// =============================================================================================

// TAGS
// =============================================================================================

/**
 * First search algorithm, simply returns an input if 
 * @param {array} blocks - list of blocks to search through
 * @param {String} query - user query
 * @param {Integer} sl - size of slice to take (by default 5)
 * @returns - a list of relevant results
 */
const tagSearch = (blocks, tags, sl=5) => {

    tags = tags.map(tag => tag.substring(1));

    if (tags.length === 0) {
        return [];
    }
    
    let results = blocks;

    for (var i = 0; i < tags.length; i ++) {
        results = results.filter(block => block.tags.includes(tags[i].toLowerCase()));
    }
    results = results.filter((arr, index, self) => index === self.findIndex((b) => (b.prompt === arr.prompt)));

    return results;
};

// =============================================================================================

/**
 * adds together a number of results, from all our search algorithms, in random order of compl
 * @param {array} blocks - list of blocks to search through
 * @param {String} query - user query
 * @returns - a list of relevant results
 */
export const search = (blocks, query, tags) => {

    let usingTags = false;

    if (!query && tags.length === 0) {
        console.log("## CLEARED SEARCH");
        return [];
    }

    let tagResults = tagSearch(blocks, tags);
    let autocompleteResults = [];
    let suggestionResults = [];

    if (tags.length === 0) {
        autocompleteResults = autocompleteSearch(blocks, query);
        suggestionResults = suggestionSearch(blocks, query, 1, 1, 2, 3);    
    } else {
        usingTags = true;
        autocompleteResults = autocompleteSearch(tagResults, query);
        suggestionResults = suggestionSearch(tagResults, query, 1, 1, 2, 3);   
    }

    if (tagResults.length > 0) {
        if (!query) {
            console.log('## SEARCH', JSON.stringify({
                'tags': tags,
                'results': {
                    'tag': tagResults.map((block) => blockToID(block)),
                    'autocomplete': undefined,
                    'suggestion': undefined
                }
            }));

            return [
                `<sep gap="72"/>`,
                `<category name="" id="motion">`,
                tagResults.map((block) => block.xml).join('\n'),
                `</category>`
            ].join('\n');
        }
    }

    //used to filter duplicates
    let autocompleteResults_ = new Set(autocompleteResults.map((block) => block.prompt));

    //filter out duplicates from tag search
    suggestionResults = suggestionResults.filter((el) => {
        return !autocompleteResults_.has(el.prompt);
    });

    console.log('## SEARCH', JSON.stringify({
        'tags': tags,
        'results': {
            'tag': undefined,
            'autocomplete': autocompleteResults.map((block) => blockToID(block)),
            'suggestion': suggestionResults.map((block) => blockToID(block))
        }
    }));

    const results = [
        `<sep gap="36"/>`,
        `<category name="" id="motion">`,
        autocompleteResults.map((block) => block.xml).join('\n'),
        `</category>`,
        `<category name="did you mean..." id="">`,
        suggestionResults.map((block) => block.xml).join('\n'),
        `</category>`
    ]
    
    return results.join('\n');
};

/**
 * used to make atag_ dictionary of all words in prompt, only ran once and kept as a list
 * @param {JSON} blocks 
 * @returns 
 */
const promptDictionary = (blocks) => {
    var all = '';
    for (var i = 0; i < blocks.length; i ++) {
        all += ' ' + blocks[i].prompt;
    }
    return wordFreq(all);
};

const tagsDictionary = (blocks) => {
    var all = '';
    for (var i = 0; i < blocks.length; i ++) {
        for (var j = 0; j < blocks[i].tags.length; j ++) {
            all += ' #' + blocks[i].tags[j];
        }
    }
    return wordFreq(all);
};

function wordFreq(string) {
    var words = string.replace(/[.]/g, '').split(/\s/);
    var freqMap = {};
    words.forEach(function(w) {
        if (w != '') {
            if (!freqMap[w]) {
                freqMap[w] = 0;
            }
            freqMap[w] += 1;
        }
    });
    return freqMap;
};

// We need to clean the results from "synonyms"
// We remove all single letter outputs (they are often times incorrect)
// This isn't super ideal, but once again, we only run this once, before saving the
// resulting map
function synonymMap() {

    const map = {}

    for (var word in dictionary) {
        if (synonyms(word) != undefined) {
            let synonym = synonyms(word);
            for (var key in synonym) {
                if (synonym[key][0].length > 1) {
                    for (let i = 1; i < synonym[key].length; i += 1) {
                        if (synonym[key][i].length > 1) {
                            map[synonym[key][i]] = synonym[key][0];
                        }
                    }
                }
            }
        }
    }

    return map;
}

const blockToID = (block) => {
    return block.xml.split('"')[1];
}

const promptToBlock = (prompt, blocks) => {
    for (var i = 0; i < blocks.length; i ++) {
        if (blocks[i].prompt === prompt) {
            return blocks[i];
        }
    }
    return {};
}

export default search;