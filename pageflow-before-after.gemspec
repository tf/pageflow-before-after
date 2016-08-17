# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'pageflow/before_after/version'

Gem::Specification.new do |spec|
  spec.name          = 'pageflow-before-after'
  spec.version       = Pageflow::BeforeAfter::VERSION
  spec.authors       = ['Codevise Solutions']
  spec.email         = ['info@codevise.de']
  spec.summary       = 'Pageflow page type for before/after image slider.'
  spec.homepage      = 'https://github.com/codevise/pageflow-before-after'
  spec.license       = 'MIT'

  spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ['lib']

  spec.add_dependency 'pageflow', '~> 0.11.pre'
  spec.add_dependency 'pageflow-public-i18n', '~> 1.0'

  spec.add_dependency 'jquery-ui-rails', '~> 5.0'

  # Using translations from rails locales in javascript code.
  spec.add_dependency 'i18n-js'

  # Semantic versioning rake tasks
  spec.add_development_dependency 'semmy', '~> 0.2.1'
end
