import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { HomepageInput } from "@/components/sanity-studio/HomepageInput";

export default {
  name: 'art_page',
  title: 'Artwork Page',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
      {
          title: 'Nav Title',
          name: 'nav_title',
          type: 'string',
          description: 'The page title to appear in the navigation menu',
          validation: Rule => Rule.required()
      },
      {
          title: 'Page Heading',
          name: 'page_heading',
          type: 'string',
          description: 'Title/heading to appear at the top of the page',
          validation: Rule => Rule.required()
      },
      orderRankField({ type: 'art_page' }),
      {
          name: 'homepage',
          title: 'Homepage?',
          type: 'boolean',
          description: 'Select if this artwork page going to be used as the homepage and landing page. Make sure only one artwork page has this field selected!',
          initialValue: false,
          validation: Rule => Rule.required(),
          components: {
              input: HomepageInput,
          }
      },
      {
          name: 'slug',
          title: 'Slug',
          type: 'slug',
          description: 'The slug that will appear in the URL for this page',
          options: {
              source: 'page_heading',
          },
          validation: Rule => Rule.required(),
      },
      {
          name: 'art_gallery',
          title: 'Art Gallery',
          type: 'array',
          description: 'A gallery of artwork to be featured on this page',
          of: [
              {
                  name: 'artwork',
                  type: 'document',
                  title: 'Artwork',
                  fields: [
                      {
                          name: 'image',
                          title: 'Image',
                          type: 'image',
                          description: 'Image of the artwork',
                          required: true
                      },
                      {
                          name: 'date',
                          title: 'Date',
                          type: 'date',
                          description: "The date the work was completed, or first shown (don't worry about the day)"
                      },
                      {
                          name: 'title',
                          title: 'Title',
                          type: 'string',
                          description: 'The title of the work',
                          required: true,
                      },
                      {
                          name: 'width',
                          title: 'Width',
                          type: 'number',
                          description: 'Width of the work in inches',
                          validation: Rule => Rule.positive()
                      },
                      {
                          name: 'height',
                          title: 'Height',
                          type: 'number',
                          description: 'Height of the work in inches',
                          validation: Rule => Rule.positive()
                      },
                      {
                          name: 'blurb',
                          title: 'Blurb',
                          type: 'text',
                          description: 'A short blurb about the work'
                      },
                      {
                          name: 'medium',
                          title: 'Medium',
                          type: 'string',
                          description: 'Information about the media used to create the work'
                      },
                  ]
              }
          ]
      },
  ]
}