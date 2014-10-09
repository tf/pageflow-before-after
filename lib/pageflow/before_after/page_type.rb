module Pageflow
  module BeforeAfter
    class PageType < Pageflow::PageType
      name 'before_after'

      def thumbnail_candidates
        [
          {attribute: 'thumbnail_image_id', file_collection: 'image_files'},
          {attribute: 'after_image_id', file_collection: 'image_files'}
        ]
      end
    end
  end
end
