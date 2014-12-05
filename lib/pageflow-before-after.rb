require 'pageflow/before_after/engine'

module Pageflow
  module BeforeAfter
    def self.page_type
      BeforeAfter::PageType.new
    end
  end
end
