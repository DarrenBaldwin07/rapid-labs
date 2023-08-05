'use-client'
import axios from 'axios';

// TODO: we should update this to simply be treeshacken out of bundle with the webpack plugin (use unplugin for this)
const RapidClientOnly$ = <T>(thing: () => T): T => {
    return thing();
}

export const result = RapidClientOnly$(() => {
    return axios.get("/api/endpoint")
});

export default RapidClientOnly$;
