module.exports = {
  extends: ['./node_modules/commitlint-config-gitmoji'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        ':star2:',
        ':beetle:',
        ':police_car:',
        ':nut_and_bolt:',
        ':pencil2:',
        ':books:',
        ':art:',
        ':moneybag:',
        ':rocket:',
        ':traffic_light:',
        ':pill:',
      ],
    ],
    'scope-enum': [2, 'always', ['lib-elasticsearch']],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(:\w*:)(?:\s)(?:\((.*?)\))?\s((?:.*(?=\())|.*)(?:\(#(\d*)\))?/,
      headerCorrespondence: ['type', 'scope', 'subject', 'ticket'],
    },
  },
};
