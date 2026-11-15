import { NextRequest, NextResponse } from 'next/server';

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
let cache: { data: unknown; ts: number } | null = null;

export async function GET(_req: NextRequest) {
  const username = process.env.GITHUB_USERNAME || 'amritchand';
  const token = process.env.GITHUB_TOKEN;

  // Return cached data if fresh
  if (cache && Date.now() - cache.ts < CACHE_TTL) {
    return NextResponse.json(cache.data);
  }

  const query = `
    query($login: String!) {
      user(login: $login) {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              stargazerCount
              primaryLanguage { name color }
              repositoryTopics(first: 5) {
                nodes { topic { name } }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query, variables: { login: username } }),
    });

    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

    const json = await res.json();
    const repos = json?.data?.user?.pinnedItems?.nodes?.map((r: any) => ({
      name: r.name,
      description: r.description,
      url: r.url,
      stars: r.stargazerCount,
      language: r.primaryLanguage?.name || 'Unknown',
      languageColor: r.primaryLanguage?.color,
      topics: r.repositoryTopics?.nodes?.map((t: any) => t.topic.name) || [],
    })) ?? [];

    cache = { data: { repos }, ts: Date.now() };
    return NextResponse.json({ repos });
  } catch (err) {
    console.error('GitHub API error:', err);
    return NextResponse.json({ repos: [], error: 'Could not fetch repos' }, { status: 500 });
  }
}
