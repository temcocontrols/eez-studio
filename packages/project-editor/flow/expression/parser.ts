import { readFileSync } from "fs";
import { resolve } from "path";
import peggy from "peggy";

import { isDev } from "eez-studio-shared/util-web";
import { sourceRootDir } from "eez-studio-shared/util";

// Vite ?raw import — embeds grammar at build time
import grammarRaw from "../../../../resources/expression-grammar.pegjs?raw";

const expressionParserGrammar = grammarRaw;

const peggyParser = peggy.generate(expressionParserGrammar, {
    cache: true,
    optimize: "speed"
});

const cache = new Map<string, any>();

export const expressionParser = {
    parse(expr: string) {
        let result: any;

        let resultJSONStr = cache.get(expr);
        if (resultJSONStr != undefined) {
            result = JSON.parse(resultJSONStr);
        } else {
            result = peggyParser.parse(expr, {
                grammarSource: expr
            });
            resultJSONStr = JSON.stringify(result);
            cache.set(expr, resultJSONStr);
        }

        return result;
    }
};

export const identifierParser = peggy.generate(expressionParserGrammar, {
    allowedStartRules: ["Identifier"],
    cache: true
});
