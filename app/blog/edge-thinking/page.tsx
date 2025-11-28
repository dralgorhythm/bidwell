export const metadata = {
    title: 'Edge Thinking',
    description:
        'Explore the concept of edge thinking and how it can inspire creativity, innovation, and problem-solving in various domains.',
    publishedAt: '2025-02-20',
    image: '/og?title=Edge%20Thinking',
}

export default function EdgeThinkingPost() {
    return (
        <section>
            <script
                type='application/ld+json'
                suppressHydrationWarning
                // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires this
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BlogPosting',
                        headline: metadata.title,
                        datePublished: metadata.publishedAt,
                        dateModified: metadata.publishedAt,
                        description: metadata.description,
                        image: `https://bidwell.consulting${metadata.image}`,
                        url: `https://bidwell.consulting/blog/edge-thinking`,
                        author: {
                            '@type': 'Person',
                            name: 'Bidwell Consulting',
                        },
                    }),
                }}
            />
            <h1 className='title font-semibold text-2xl tracking-tighter'>{metadata.title}</h1>
            <div className='flex justify-between items-center mt-2 mb-8 text-sm'>
                <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                    {new Date(metadata.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </p>
            </div>
            <article className='prose'>
                <blockquote
                    style={{ fontSize: '1.5em', color: 'lightgrey', opacity: 0.75 }}
                    className='border-l-4 border-neutral-300 pl-4 italic'
                >
                    "Estuaries occur where rivers meet the tide. These dynamic, highly productive systems
                    attract fish and other wildlife."
                    <sup>
                        <a style={{ fontSize: '0.75em' }} href='#fn1' id='ref1'>
                            1
                        </a>
                    </sup>
                </blockquote>

                <h2>Introduction</h2>

                <p>
                    Edges are ambiguous, murky. They have indefinite levels, unclear expectations. This is a
                    micro-region where salinity spikes, washes of tidal erosion, and the onslaught of
                    shallow-water predators threaten any perceived stability or homeostasis that might be
                    perceived as "safety." Yet, we find that these environments do more than harbor life, they
                    generate it.
                </p>

                <p>
                    In graph theory, an edge is BLAHBLAHBLAH and can represent THIS AND THAT. We can use
                    analysis of edges to tell us THIS AND THIS about a set of data.
                </p>

                <p>
                    We can see this in Systems Thinking graphs where edges can be flows or feedback loops.
                    These inform the fitness and operation of a system fundamentally, as opposed to analysis
                    of the stocks.
                </p>

                <p>
                    In design and visual learning, contrast is used to draw attention to important
                    information. A clever combination of color or design elements can cement safety imagery or
                    evoke unexpected emotional response. Parallel processing of juxtaposed experiences
                    creating emotional peaks and valleys. Dynamic mental landscapes allow novel thougths to
                    develop and thought to move from Point A to Point B following a gravitational down-hill
                    slope. Mental topography. Current flowing from high to low. Equilibrium high pressure to
                    low pressure.
                </p>

                <p>
                    We can apply this in Software Engineering and Systems Design in a few of ways that I would
                    like to explore.
                </p>

                <p>How might these lessons apply to our own experience?</p>

                <h2>Swimming Upstream in Brackish Water and Murky Expectations</h2>
                <p>
                    "Where are you at? Where are you going? What do you know? What do you need to know?"
                    <sup>
                        <a style={{ fontSize: '0.75em' }} href='#fn2' id='ref2'>
                            2
                        </a>
                    </sup>
                </p>

                <h3>Be a Filter Fish</h3>
                <p>Reduce uncertainty as a mechanism to enhance understanding of the problem space.</p>

                <h3>Be a Light House</h3>
                <p>Spotlight value to provide a clear path forward.</p>

                <h2>Differentiation in an Opportu-niche-stic Market</h2>

                <h3>Competition for Resources</h3>
                <p>In a Healthy System, Resources Exist to Fuel Innovation</p>
                <p>Innovation Becomes Competitive Advantage</p>

                <h3>Land, Air, Water. High, Low. Day, Night. Dichotomies.</h3>
                <p>Divide Large Problems or Opportunities.</p>
                <p>Dynamics Create Energy</p>

                <h2>Tidal Exposure Therapy and Resilience</h2>

                <h3>Tidal Iteration and Increments</h3>
                <p>compared to one-directional waterfall</p>
                <p>building upon</p>
                <p>acretion and erosion</p>

                <h3>Loops - Repetition Builds Legitimacy</h3>
                <p>Repetition Teaches, Muscle Memory</p>
                <p>Practice Makes Perfect</p>

                <div className='mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800'>
                    <h3 className='text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-4'>
                        Footnotes
                    </h3>
                    <ol className='list-none pl-0 space-y-2 text-sm text-neutral-500 dark:text-neutral-400'>
                        <li id='fn1'>
                            <sup className='mr-1'>1</sup> Osborn, Katherine, "Seasonal fish and invertebrate
                            communities in three northern California estuaries" (2017). Cal Poly Humboldt theses
                            and projects. 101. https://digitalcommons.humboldt.edu/etd/101{' '}
                            <a href='#ref1' aria-label='Back to text'>
                                ↩
                            </a>
                        </li>
                        <li id='fn2'>
                            <sup className='mr-1'>2</sup> Hickey, Rich, "Design in Practice" (2023). Clojure Conj.
                            https://www.youtube.com/watch?v=c5QF2HjHLSE{' '}
                            <a href='#ref2' aria-label='Back to text'>
                                ↩
                            </a>
                        </li>
                    </ol>
                </div>
            </article>
        </section>
    )
}
