const tempGenerator = require("./tempGenerator");
//const input = require("./pajama-ssg");

describe("Tests for generating html", () => {
  test('HTML should be generated', async () => {
    const generatedHTML = tempGenerator("", "", "", "", "");
    expect(generatedHTML).toContain('<!doctype html>');
  });
  });


describe("Argument match tests", () => {
  test("no specified style", () => {
    expect(
      tempGenerator("", "language", "title", "titleName", "text")
    ).argv_s = `<link rel="stylesheet" type="text/css" href="please_add_your_css_path" />`;
  });

  test("no specified laungage", () => {
    expect(
      tempGenerator("style", "", "title", "titleName", "text")
    ).argv_l = `<html lang="en-CA">`;
  });

  test("no specified title", () => {
    expect(
      tempGenerator("style", "language", "", "titleName", "text")
    ).title = "";
  });

  test("no specified text", () => {
    expect(
      tempGenerator("style", "language", "title", "titleName", "")
    ).text = "";
  });
});

describe("Function argument tests", () => {
test("input all arguments", () => {
  expect(
    tempGenerator("style", "language", "title", "titleName", "text")
  ).toBeDefined();
});

test("missing style", () => {
  expect(
    tempGenerator("", "language", "title", "titleName", "text")
  ).toBeDefined();
});

test("missing language", () => {
  expect(
    tempGenerator("style", "", "title", "titleName", "text")
  ).toBeDefined();
});

test("missing title", () => {
  expect(
    tempGenerator("style", "language", "", "titleName", "text")
  ).toBeDefined();
});

test("missing titleName", () => {
  expect(
    tempGenerator("style", "language", "title", "", "text")
  ).toBeDefined();
});

test("missing text", () => {
  expect(
    tempGenerator("style", "language", "title", "titleName", "")
  ).toBeDefined();
});

test("missing all arguments", () => {
  expect(
    tempGenerator("", "", "", "", "")
  ).toBeDefined();
});

test("null arguments", () => {
  expect(
    tempGenerator(null)
  ).toBeDefined();
});

});
