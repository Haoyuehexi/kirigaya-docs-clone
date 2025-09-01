# Rust Nom 教程 (Nominomicon)

> 用Rust和Nom构建高性能解析器

## 什么是 Nom？

Nom是Rust中最强大的解析器组合子库之一。它基于函数式编程思想，通过组合小的解析器函数来构建复杂的解析器。

## 核心概念

### 解析器函数

在Nom中，解析器是一个函数，它接受输入并返回结果：

```rust
use nom::IResult;

// 基本解析器签名
fn my_parser(input: &str) -> IResult<&str, OutputType> {
    // 解析逻辑
}
```

### IResult 类型

```rust
pub type IResult<I, O, E = Error<I>> = Result<(I, O), Err<E>>;

// 成功: Ok((remaining_input, parsed_output))
// 失败: Err(error_info)
```

## 基础解析器

### 字符和字符串

```rust
use nom::{
    bytes::complete::{tag, take_while1},
    character::complete::{char, alpha1, digit1},
    IResult,
};

// 解析特定字符串
fn parse_hello(input: &str) -> IResult<&str, &str> {
    tag("Hello")(input)
}

// 解析单个字符
fn parse_comma(input: &str) -> IResult<&str, char> {
    char(',')(input)
}

// 解析字母
fn parse_word(input: &str) -> IResult<&str, &str> {
    alpha1(input)
}

// 解析数字
fn parse_number(input: &str) -> IResult<&str, &str> {
    digit1(input)
}
```

### 组合器

```rust
use nom::{
    branch::alt,
    sequence::{preceded, terminated, delimited, tuple},
    multi::{many0, separated_list0},
    combinator::{map, opt},
};

// 选择 (或)
fn parse_bool(input: &str) -> IResult<&str, bool> {
    alt((
        map(tag("true"), |_| true),
        map(tag("false"), |_| false),
    ))(input) 
}

// 序列
fn parse_assignment(input: &str) -> IResult<&str, (&str, &str)> {
    tuple((
        alpha1,
        preceded(char('='), alpha1),
    ))(input)
}

// 重复
fn parse_list(input: &str) -> IResult<&str, Vec<&str>> {
    separated_list0(char(','), alpha1)(input)
}
```

## 实际示例

### JSON 解析器

```rust
use nom::{
    branch::alt,
    bytes::complete::{escaped, tag, take_while},
    character::complete::{char, multispace0, none_of, one_of},
    combinator::{cut, map, opt, value},
    error::{context, VerboseError},
    multi::separated_list0,
    number::complete::double,
    sequence::{delimited, preceded, separated_pair, terminated},
    IResult,
};
use std::collections::HashMap;

#[derive(Debug, PartialEq)]
pub enum JsonValue {
    Str(String),
    Num(f64),
    Bool(bool),
    Null,
    Array(Vec<JsonValue>),
    Object(HashMap<String, JsonValue>),
}

// 解析字符串
fn parse_string(input: &str) -> IResult<&str, String, VerboseError<&str>> {
    context(
        "string",
        preceded(
            char('"'),
            cut(terminated(
                map(
                    escaped(none_of("\"\\"), '\\', one_of(r#""\/bfnrt"#)),
                    String::from,
                ),
                char('"'),
            )),
        ),
    )(input)
}

// 解析数值
fn parse_number(input: &str) -> IResult<&str, JsonValue, VerboseError<&str>> {
    context("number", map(double, JsonValue::Num))(input)
}

// 解析布尔值
fn parse_bool(input: &str) -> IResult<&str, JsonValue, VerboseError<&str>> {
    context(
        "boolean",
        alt((
            value(JsonValue::Bool(true), tag("true")),
            value(JsonValue::Bool(false), tag("false")),
        )),
    )(input)
}

// 解析null
fn parse_null(input: &str) -> IResult<&str, JsonValue, VerboseError<&str>> {
    context("null", value(JsonValue::Null, tag("null")))(input)
}

// 解析数组
fn parse_array(input: &str) -> IResult<&str, JsonValue, VerboseError<&str>> {
    context(
        "array",
        map(
            delimited(
                char('['),
                separated_list0(
                    preceded(multispace0, char(',')),
                    parse_json_value,
                ),
                char(']'),
            ),
            JsonValue::Array,
        ),
    )(input)
}

// 解析对象
fn parse_object(input: &str) -> IResult<&str, JsonValue, VerboseError<&str>> {
    context(
        "object",
        map(
            delimited(
                char('{'),
                separated_list0(
                    preceded(multispace0, char(',')),
                    separated_pair(
                        preceded(multispace0, parse_string),
                        preceded(multispace0, char(':')),
                        parse_json_value,
                    ),
                ),
                char('}'),
            ),
            |tuple_vec| {
                JsonValue::Object(
                    tuple_vec
                        .into_iter()
                        .map(|(k, v)| (k, v))
                        .collect(),
                )
            },
        ),
    )(input)
}

// 主解析函数
fn parse_json_value(input: &str) -> IResult<&str, JsonValue, VerboseError<&str>> {
    preceded(
        multispace0,
        alt((
            parse_null,
            parse_bool,
            parse_number,
            map(parse_string, JsonValue::Str),
            parse_array,
            parse_object,
        )),
    )(input)
}

// 公共API
pub fn parse_json(input: &str) -> Result<JsonValue, String> {
    match parse_json_value(input) {
        Ok(("", value)) => Ok(value),
        Ok((remaining, _)) => Err(format!("Unexpected remaining input: {}", remaining)),
        Err(err) => Err(format!("Parse error: {:?}", err)),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_parse_json() {
        let json = r#"
        {
            "name": "John",
            "age": 30,
            "active": true,
            "address": null,
            "hobbies": ["reading", "coding"]
        }
        "#;

        let result = parse_json(json);
        assert!(result.is_ok());
    }
}
```

## 高级技巧

### 自定义错误处理

```rust
use nom::error::{ErrorKind, ParseError};

#[derive(Debug, PartialEq)]
pub struct CustomError<I> {
    pub input: I,
    pub kind: ErrorKind,
    pub message: String,
}

impl<I> ParseError<I> for CustomError<I> {
    fn from_error_kind(input: I, kind: ErrorKind) -> Self {
        CustomError {
            input,
            kind,
            message: format!("Parse error: {:?}", kind),
        }
    }

    fn append(_input: I, _kind: ErrorKind, other: Self) -> Self {
        other
    }
}
```

### 流式解析

```rust
use nom::{Needed, streaming};

fn parse_streaming(input: &[u8]) -> IResult<&[u8], Vec<&[u8]>> {
    streaming::many0(streaming::tag("data"))(input)
}
```

### 宏使用

```rust
use nom::{named, tag, do_parse, take};

named!(parse_header<&[u8], (&[u8], &[u8])>,
    do_parse!(
        magic: tag!("MAGIC") >>
        version: take!(4) >>
        (magic, version)
    )
);
```

## 性能优化

1. **使用 `complete` vs `streaming`**: 根据输入类型选择合适的解析器
2. **避免回溯**: 使用 `cut` 组合器
3. **零拷贝解析**: 返回输入的切片而不是拷贝
4. **预编译正则表达式**: 对于复杂模式匹配

## 最佳实践

1. **错误处理**: 提供有意义的错误消息
2. **测试**: 为每个解析器编写单元测试
3. **文档**: 为复杂解析器添加文档注释
4. **模块化**: 将相关解析器组织到模块中

## 学习资源

- [Nom GitHub](https://github.com/rust-bakery/nom)
- [官方文档](https://docs.rs/nom/)
- [解析器组合子教程](https://bodil.lol/parser-combinators/)

---

*最后更新: 2024-11-28*