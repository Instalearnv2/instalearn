// utils/jsonParser.js

/**
 * Parses a string that may contain a JSON object wrapped in backticks or code block.
 * 
 * @param {string} str - The string to parse
 * @returns {Object} The parsed JSON object
 */
export function parseJsonOutput(str) {
    // Remove leading/trailing whitespace
    str = str.trim();

    // Remove backticks or code block syntax if present
    if (str.startsWith('```') && str.endsWith('```')) {
        str = str.slice(3, -3);
    } else if (str.startsWith('`') && str.endsWith('`')) {
        str = str.slice(1, -1);
    }

    // Remove "json" if it appears at the start (from code block syntax)
    if (str.startsWith('json')) {
        str = str.slice(4).trim();
    }

    // Parse the remaining string as JSON
    try {
        return JSON.parse(str);
    } catch (error) {
        console.error("Error parsing JSON:", error);
        console.error("Problematic string:", str);
        throw new Error("Failed to parse JSON output");
    }
}