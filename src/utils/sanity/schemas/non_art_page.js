import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default {
    name: 'non_art_page',
    title: 'Non-Artwork Page',
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
        orderRankField({ type: 'category' }),
        {
            title: 'Page Type',
            name: 'page_type',
            type: 'string',
            options: {
                list: [
                    {title: 'Friends', value: 'friends'},
                    {title: 'Process/Studio', value: 'process'},
                    {title: 'About', value: 'about'}
                ],
                layout: 'radio'
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'The slug that will appear in the URL for this page',
            // hidden: ({document}) => document?.homepage,
            // readOnly: true,
            options: {
                source: 'page_heading',
            },
            validation: Rule => Rule.required(),
        },
        {
            title: 'Blurb',
            name: 'blurb',
            description: 'A blurb describing the contents or subject matter of the page',
            type: 'array',
            of: [{type: 'block'}],
        },
        {
            name: 'friends_gallery',
            title: 'Friends Gallery',
            type: 'array',
            description: 'A gallery of friends',
            hidden: ({document}) => document?.page_type !== 'friends',
            validation: Rule => Rule.custom((gallery, context) => {
                if (context.document.page_type === 'friends') {
                    if (Array.isArray(gallery) && gallery.length > 0) {
                        return true 
                    } else {
                        return 'Friends pages require a gallery with at least one item'
                    }
                }
                return true
            }).error('Friends pages require a gallery with at least one item'),
            of: [
                {
                    name: 'friend',
                    type: 'document',
                    title: 'Friend',
                    orderings: [orderRankOrdering],
                    fields: [
                        {
                            name: 'first_name',
                            title: 'First Name',
                            type: 'string',
                            description: "Friend's first name",
                            validation: Rule => Rule.required(),
                        },
                        {
                            name: 'last_name',
                            title: 'Last Name',
                            type: 'string',
                            description: "Friend's last name"
                        },
                        orderRankField({ type: 'category' }),
                        {
                            name: 'blurb',
                            title: 'Blurb',
                            type: 'text',
                            description: 'Blurb about friend'
                        },
                        {
                            name: 'friend_url',
                            type: 'url',
                            title: "URL",
                            description: "Link to friend's work/website"
                        },
                        {
                            name: 'photo',
                            type: 'image',
                            title: 'Photo',
                            description: "Image of friend or friend's work",
                            fields: [
                                {
                                    name: 'alt',
                                    title: 'Alt Text',
                                    type: 'string',
                                    description: 'Alt text is important for accessibility reasons. It should be a very brief description of the image',
                                    validation: Rule => Rule.required(),
                                },
                            ]
                        },
                    ]
                }
            ]
        },
        {
            name: 'process_gallery',
            title: 'Process/Studio Gallery',
            type: 'array',
            description: 'A gallery of process/studio photos to be featured on this page',
            hidden: ({document}) => document?.page_type !== 'process' && document?.page_type !== 'about',
            of: [
                {
                    name: 'process',
                    title: 'Studio/Process',
                    type: 'document',
                    orderings: [orderRankOrdering],
                    fields: [
                        {
                            name: 'photo',
                            title: 'Process/Studio Photo',
                            type: 'image',
                            required: true,
                            fields: [
                                {
                                    name: 'caption',
                                    title: 'Caption',
                                    type: 'text',
                                    description: 'A caption for the image'
                                },
                                {
                                    name: 'attribution',
                                    title: 'Attribution',
                                    type: 'string',
                                    description: 'Attribution if the photo was taken by someone else'
                                },
                                {
                                    name: 'alt',
                                    title: 'Alt Text',
                                    type: 'string',
                                    description: 'Alt text is important for accessibility reasons. It should be a very brief description of the image',
                                    validation: Rule => Rule.required(),
                                },
                            ]
                        },
                        {
                            name: 'blurb',
                            title: 'Blurb',
                            type: 'text',
                            description: "Anything additional you'd like to add about the image"
                        },
                        orderRankField({ type: 'category' }),
                    ]
                }
            ]
        }
    ]
}