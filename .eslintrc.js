module.exports = {
    //此项是用来告诉eslint找当前配置文件不能往父级查找
    root: true,
    //此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
    parser: 'babel-eslint',
    //此项是用来指定javaScript语言类型和风格，sourceType用来指定js导入的方式，默认是script，此处设置为module，指某块导入方式
    parserOptions: {
        sourceType: 'module'
    },
    //此项指定环境的全局变量，下面的配置指定为浏览器环境
    env: {
        browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    // 此项是用来配置标准的js风格，就是说写代码的时候要规范的写，如果你使用vs-code我觉得应该可以避免出错
    extends: 'eslint-config-alloy',
    // required to lint *.vue files
    // 此项是用来提供插件的，插件名称省略了eslint-plugin-，下面这个配置是用来规范html的
    plugins: [
        'html'
    ],
    // add your custom rules here
    // 下面这些rules是用来设置从插件来的规范代码的规则，使用必须去掉前缀eslint-plugin-
    // 主要有如下的设置规则，可以设置字符串也可以设置数字，两者效果一致
    // "off" -> 0 关闭规则
    // "warn" -> 1 开启警告规则
    //"error" -> 2 开启错误规则
    rules: {
        "eqeqeq": 1,//绝对等于
        'arrow-parens': 0, //允许箭头函数参数使用括号
        'generator-star-spacing': 0, //允许方法之间加星号
        "complexity": [2,100], //程序中允许的最大环路复杂度0
        "no-const-assign": 2, //禁止修改const声明的变量
        "no-dupe-keys": 2, //在创建对象字面量时不允许键重复 {a:1,a:1}
        "no-dupe-args": 2, //函数参数不能重复
        "no-duplicate-case": 2, //switch中的case标签不能重复
        "no-func-assign": 2,//禁止重复的函数声明
        "no-irregular-whitespace": 1,//不能有不规则的空格
        "no-redeclare": 2,//禁止重复声明变量
        "no-regex-spaces": 2,//禁止在正则表达式字面量中使用多个空格 /foo bar/
        "no-self-compare": 1,//不能比较自身
        "no-shadow": 2,//外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
        "no-shadow-restricted-names": 2,//严格模式中规定的限制标识符不能作为声明时的变量名使用
        "no-spaced-func": 1,//函数调用时 函数名与()之间不能有空格
        "no-sparse-arrays": 1,//禁止稀疏数组， [1,,2]
        "no-trailing-spaces": 1,//一行结束后面不要有空格
        "no-undef": 1,//不能有未定义的变量
        "one-var": 0,
        "no-implicit-coercion": 1,//禁止使用短符号进行类型转换
        "key-spacing": 0,
        "no-extend-native": 0,//只读对象的属性不可编辑
        "no-unneeded-ternary": 1,//禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
        "no-unreachable": 1,//不能有无法执行的代码
        "no-unused-expressions": 2,//禁止无用的表达式
        "no-unused-vars": 0,//不能有声明后未被使用的变量或参数
        "no-use-before-define": 2,//未定义前不能使用
        "no-var": 1,//禁用var，用let和const代替
        "array-bracket-spacing": [2, "never"],//是否允许非空数组里面有多余的空格
        "comma-dangle": [1, "never"],//对象字面量项尾不能有逗号
        "comma-style": [1, "last"],//逗号风格，换行时在行首还是行尾
        "comma-spacing": 0,
        "curly": [2, "all"],//必须使用 if(){} 中的{}
        "indent": [0, 2],//缩进风格
        "max-depth": [1, 5],//嵌套块深度
        "new-parens": 2,//new时必须加小括号
        "semi": [0, "always"],//语句强制分号结尾
        "strict": 0,//使用严格模式
        "quotes": 0,//字符串必须使用单引号
        "padded-blocks": 0,//块级元素必须新起一行
        "spaced-comment": 0,
        "radix": 0,
        "no-param-reassign": 0,//不允许对 function 的参数进行重新赋值
        "object-curly-spacing": 0,
        "no-multiple-empty-lines":0,//禁止出现多行空行
        "eol-last":0,//要求或禁止文件末尾存在空行
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}