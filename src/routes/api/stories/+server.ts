import { NYT_API_KEY } from '$env/static/private'
import { json } from '@sveltejs/kit'
import type { RequestEvent } from '@sveltejs/kit'

export async function GET({ fetch, params, route, cookies }) {
	try {
		// console.log('params', params, route, cookies.get('section') )
		const section = cookies.get("section") || 'home'

		const data = await fetch(
			`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${NYT_API_KEY}`
		)
			.then((r) => r.json())
			.catch((e) => console.log(e))
		const obj = {
			sectionQuery: data.section,
			stories: data.results,
			lastUpdate: data.last_updated
		}

		return json(obj)
		// return json(data);
	} catch (err) {
		console.error(err)
		return json({ error: 'There was an error processing your request' }, { status: 500 })
	}
}
