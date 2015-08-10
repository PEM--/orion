Package.describe({
  name: 'orionjs:summernote',
  summary: 'Summernote editor for orion',
  version: '1.3.1',
  git: 'https://github.com/orionjs/orion'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'orionjs:base@1.3.1',
    'orionjs:attributes@1.3.1',
    'less',
    'orionjs:filesystem@1.3.1',
    'summernote:standalone@0.6.15',
    'jquery'
    ]);

  api.imply([
    'summernote:standalone',
    ]);

  api.addFiles([
    'attribute.js',
    ]);

  api.addFiles([
    'summernote.html',
    'summernote.js',
    'summernote.less',
    ], 'client');
});
