//import argv from './yargsConfig';
module.exports = tempGenerate = (
  argv_s,
  argv_l,
  title,
  titleName = "",
  text
) => {
  let style = argv_s
    ? `<link rel="stylesheet" type="text/css" href="${argv_s}" />`
    : `<link rel="stylesheet" type="text/css" href="please_add_your_css_path" />`;
  let lang = argv_l ? `<html lang="${argv_l}">` : `<html lang="en-CA">`;
  let titleLine = title ? `<title>${title}</title>` : "";

  var template = `
            <!doctype html>
            ${lang}
            <head>
              <meta charset="utf-8">
              ${style}
              ${titleLine}
              <meta name="viewport" content="width=device-width, initial-scale=1">
            </head>
            <body>
              ${titleName}
              ${text}
            </body>
            </html>
            `;
  return template;
};
