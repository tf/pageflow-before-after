# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = 'pageflow-before-after'
  spec.version       = '0.3.0'
  spec.authors       = ['Codevise Solutions']
  spec.email         = ['info@codevise.de']
  spec.summary       = 'Pageflow page type for before/after image slider.'
  spec.homepage      = 'https://github.com/codevise/pageflow-before-after'
  spec.license       = 'MIT'

  spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ['lib']


  spec.add_dependency 'pageflow', '~> 0.7'

  spec.add_dependency 'jquery-ui-rails', '~> 5.0'

  # Using translations from rails locales in javascript code.
  spec.add_dependency 'i18n-js'
end
