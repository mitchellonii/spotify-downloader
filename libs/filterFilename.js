module.exports = function(input) {
    let output = input;
    output = output.replaceAll("/", "")
    output = output.replaceAll(":", "")
    output = output.replaceAll("?", "")
    output = output.replaceAll("\\", "")
    output = output.replaceAll("<", "")
    output = output.replaceAll(">", "")
    output = output.replaceAll("\"", "")
    output = output.replaceAll("|", "")
    output = output.replaceAll("*", "")
    output = output.replaceAll(".", "") //just to be safe

    if (output.length == 0) output = "[invalid name]"

    return output;
}