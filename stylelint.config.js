module.exports = {
    //此项指定环境的全局变量，下面的配置指定为浏览器环境
    env: {
        browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    // 此项是用来配置标准的js风格，就是说写代码的时候要规范的写，如果你使用vs-code我觉得应该可以避免出错
    extends: 'stylelint-config-standard',
    rules: {
        // 颜色值避免直接使用颜色名
        'color-named': [
            'never', {
                ignore: ['inside-function']
            }
        ],
        'comment-whitespace-inside': null,
        "comment-empty-line-before": null,
        // 使用数字或命名的 (可能的情况下) font-weight 值
        'font-weight-notation': null,
        // 在函数的逗号之后要求有一个换行符或禁止有空白
        'function-comma-newline-after': null,
        // 在函数的括号内要求有一个换行符或禁止有空白
        'function-parentheses-newline-inside': null,
        // url使用引号
        'function-url-quotes': 'always',
        // 禁止小于 1 的小数的前导 0
        'number-leading-zero': 'always',
        // 字符串使用双引号
        'string-quotes': 'single',
        "selector-combinator-space-after": null,//在复合选择器之后要求或不允许留有一个空格
        "selector-combinator-space-before": null,//在复合选择器之后要求或不允许留有一个空格
        "declaration-colon-newline-after": null,
        "selector-pseudo-element-colon-notation": null,
        "font-family-no-missing-generic-family-keyword": null,
        // 要求选择器列表的逗号之前有一个换行符
        'selector-list-comma-newline-before':null,
        'selector-list-comma-newline-after':null,
        // 在媒体查询的逗号之前禁止有一换行
        'media-query-list-comma-newline-before': 'never-multi-line',
        // 缩进
        'indentation': null,
        // 禁止低优先级的选择器出现在高优先级的选择器之后
        'no-descending-specificity': null,
        // 禁止空源
        'no-empty-source': null,
        // 禁止缺少文件末尾的换行符
        'no-missing-end-of-source-newline': null
    }
}
