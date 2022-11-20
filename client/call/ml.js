const APIV1 = "http://web:8000"
export const SUMMARYV1 = `${APIV1}/core/video/add/`
function postData(url = '', data = {}) {
   return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

export function getSummary(videoId) {
	return postData(`${SUMMARYV1}`, {"video_id": videoId});
};

export const KEYWORDV1 = `${APIV1}/core/keyword`

export const CREATE_NOTE = `${APIV1}/core/video/notes/add/`
export const GET_NOTES = (videoId) => `${APIV1}/core/video/${videoId}/notes/`
