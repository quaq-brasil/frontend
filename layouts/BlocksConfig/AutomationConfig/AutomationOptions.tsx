import { Translate } from "next-translate"

export enum ComparisonType {
  Equals = "equals",
  NotEquals = "notEquals",
  Contains = "contains",
  NotContains = "notContains",
  GreaterThan = "greaterThan",
  LessThan = "lessThan",
  StartsWith = "startsWith",
  EndsWith = "endsWith",
  LengthEquals = "lengthEquals",
  LengthGreaterThan = "lengthGreaterThan",
  LengthLessThan = "lengthLessThan",
  MatchesRegex = "matchesRegex",
  IsArray = "isArray",
  IsObject = "isObject",
  IsTruthy = "isTruthy",
  IsFalsy = "isFalsy",
  IsNumber = "isNumber",
  IsBoolean = "isBoolean",
  IsUndefined = "isUndefined",
  IsNull = "isNull",
  IsNullOrUndefined = "isNullOrUndefined",
  IsDate = "isDate",
  IsSymbol = "isSymbol",
  IsRegExp = "isRegExp",
  IsString = "isString",
}

export const AutomationOptions = (text: Translate) => [
  {
    title: text("automationconfig:equals"),
    value: ComparisonType.Equals,
  },
  {
    title: text("automationconfig:not_equals"),
    value: ComparisonType.NotEquals,
  },
  {
    title: text("automationconfig:contains"),
    value: ComparisonType.Contains,
  },
  {
    title: text("automationconfig:not_contains"),
    value: ComparisonType.NotContains,
  },
  {
    title: text("automationconfig:greater_than"),
    value: ComparisonType.GreaterThan,
  },
  {
    title: text("automationconfig:less_than"),
    value: ComparisonType.LessThan,
  },
  {
    title: text("automationconfig:starts_with"),
    value: ComparisonType.StartsWith,
  },
  {
    title: text("automationconfig:ends_with"),
    value: ComparisonType.EndsWith,
  },
  {
    title: text("automationconfig:length_equals"),
    value: ComparisonType.LengthEquals,
  },
  {
    title: text("automationconfig:length_greater_than"),
    value: ComparisonType.LengthGreaterThan,
  },
  {
    title: text("automationconfig:length_less_than"),
    value: ComparisonType.LengthLessThan,
  },
  {
    title: text("automationconfig:matches_regex"),
    value: ComparisonType.MatchesRegex,
  },
  {
    title: text("automationconfig:is_array"),
    value: ComparisonType.IsArray,
  },
  {
    title: text("automationconfig:is_truthy"),
    value: ComparisonType.IsTruthy,
  },
  {
    title: text("automationconfig:is_falsy"),
    value: ComparisonType.IsFalsy,
  },
  {
    title: text("automationconfig:is_number"),
    value: ComparisonType.IsNumber,
  },
  {
    title: text("automationconfig:is_boolean"),
    value: ComparisonType.IsBoolean,
  },
  {
    title: text("automationconfig:is_undefined"),
    value: ComparisonType.IsUndefined,
  },
  {
    title: text("automationconfig:is_null"),
    value: ComparisonType.IsNull,
  },
  {
    title: text("automationconfig:is_null_or_undefined"),
    value: ComparisonType.IsNullOrUndefined,
  },
  {
    title: text("automationconfig:is_date"),
    value: ComparisonType.IsDate,
  },
  {
    title: text("automationconfig:is_symbol"),
    value: ComparisonType.IsSymbol,
  },
  {
    title: text("automationconfig:is_regexp"),
    value: ComparisonType.IsRegExp,
  },
  {
    title: text("automationconfig:is_string"),
    value: ComparisonType.IsString,
  },
]

export const typesWithSecondValue = [
  "equals",
  "notEquals",
  "contains",
  "notContains",
  "greaterThan",
  "lessThan",
  "startsWith",
  "endsWith",
  "lengthEquals",
  "lengthGreaterThan",
  "lengthLessThan",
  "matchesRegex",
]
