"use client"

import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { client } from "../lib/client";

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
            validation: Rule => Rule.required().custom( async (homepage, context ) => {
                if (homepage) {
                    // from context, _id can be prepended with 'draft.', but will not appear with such in GROQ queries
                    const rawId = context.document._id;
                    const docId = rawId.includes("draft") ? rawId.substring(rawId.indexOf('.')+1) : rawId
                    const query = `*[_type == 'art_page' && homepage == true && _id != $docId]`;
                    const params = { docId: docId };
                    const match = await client.fetch(query, params)   
                    
                    return match.length === 0 ? true : `${match[0].page_heading} is already set as homepage, please update ${match[0].page_heading} before attempting to set this artwork page as your homepage`;
                }
                return true;
            })
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