Package.describe({
  name: 'orionjs:file-attribute',
  summary: 'File attribute for orion',
  version: '1.3.1',
  git: 'http://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'orionjs:base@1.3.1',
    'orionjs:attributes@1.3.1',
    'orionjs:filesystem@1.3.1',
    'less'
    ]);

  api.addFiles([
    'attribute.js',
    ]);

  api.addFiles([
    'file.html',
    'file.less',
    'file.js',
    ], 'client');
});
